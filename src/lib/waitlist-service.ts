import { prisma } from '@/lib/db';
import { normalizeEmail } from '@/lib/email-utils';
import { GmailProvider } from './email/gmail-provider';
import { EmailProvider } from './email/provider-interface';
import { getEmailTemplate, TemplateData } from './email/templates';

export interface WaitlistServiceOptions {
  email: string;
  source?: string;
  discoverySource?: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface WaitlistResult {
  result: 'ok' | 'suppressed' | 'invalid' | 'failed' | 'exists';
  messageId?: string;
  error?: string;
  userPosition?: number;
  totalUsers?: number;
}

export class WaitlistService {
  private emailProvider: EmailProvider;

  constructor() {
    // Initialize Gmail provider with environment variables
    this.emailProvider = new GmailProvider(
      process.env.GMAIL_CLIENT_ID!,
      process.env.GMAIL_CLIENT_SECRET!,
      process.env.GMAIL_REFRESH_TOKEN!,
      process.env.EMAIL_FROM || 'hello@skillar.ai'
    );
  }

  /**
   * Add email to waitlist and send welcome email (single opt-in)
   */
  async joinWaitlistAndSend(options: WaitlistServiceOptions): Promise<WaitlistResult> {
    const { email, source, discoverySource, userAgent, ipAddress } = options;

    try {
      // Step 1: Normalize email
      const normalizedData = normalizeEmail(email);

      // Step 2: Check suppression list
      const suppression = await prisma.emailSuppression.findUnique({
        where: { emailNormalized: normalizedData.normalized }
      });

      if (suppression) {
        // Create delivery record for tracking
        await this.logEmailDelivery({
          emailSubmissionId: 'suppressed',
          toEmailNormalized: normalizedData.normalized,
          templateName: 'waitlist-welcome',
          subject: "Welcome to Skillar's Waitlist!",
          status: 'SUPPRESSED',
          errorMessage: `Suppressed due to: ${suppression.reason}`,
        });

        return { result: 'suppressed' };
      }

      // Step 3: Idempotent persistence (transaction)
      const submissionResult = await prisma.$transaction(async (tx) => {
        // Find existing submission by normalized email
        let submission = await tx.emailSubmission.findUnique({
          where: { emailNormalized: normalizedData.normalized }
        });

        let isNewSubmission = false;

        if (!submission) {
          // Create new submission
          submission = await tx.emailSubmission.create({
            data: {
              email: normalizedData.original,
              emailNormalized: normalizedData.normalized,
              source: source || 'waitlist-form',
              discoverySource,
              userAgent,
              ipAddress,
              confirmedAt: new Date(), // Single opt-in: immediate confirmation
              lastDeliveryStatus: 'NONE',
            }
          });
          isNewSubmission = true;
        } else {
          // Update existing submission with latest info if needed
          if (!submission.confirmedAt) {
            submission = await tx.emailSubmission.update({
              where: { id: submission.id },
              data: { confirmedAt: new Date() }
            });
          }
        }

        return { submission, isNewSubmission };
      });

      // Step 4: If existing submission, return success without sending
      if (!submissionResult.isNewSubmission) {
        // Get user position for response
        const stats = await this.getUserStats(submissionResult.submission.id);
        return { 
          result: 'exists',
          userPosition: stats.userPosition,
          totalUsers: stats.totalUsers
        };
      }

      // Step 5: Send welcome email for new submissions
      const emailResult = await this.sendWelcomeEmail(
        submissionResult.submission.id,
        normalizedData.original,
        normalizedData.normalized
      );

      if (!emailResult.success) {
        // Handle send failure
        await this.handleEmailFailure(
          submissionResult.submission.id,
          normalizedData.normalized,
          emailResult.error!
        );

        return { 
          result: emailResult.error?.isHardBounce ? 'invalid' : 'failed',
          error: emailResult.error?.message 
        };
      }

      // Step 6: Update submission with successful send
      await prisma.emailSubmission.update({
        where: { id: submissionResult.submission.id },
        data: {
          messageProvider: this.emailProvider.name,
          firstMessageId: emailResult.messageId,
          lastDeliveryStatus: 'SENT',
          lastDeliveryAt: new Date(),
          lastErrorCode: null,
          lastErrorMessage: null,
        }
      });

      // Get user stats for response
      const stats = await this.getUserStats(submissionResult.submission.id);

      return {
        result: 'ok',
        messageId: emailResult.messageId,
        userPosition: stats.userPosition,
        totalUsers: stats.totalUsers,
      };

    } catch (error) {
      console.error('Waitlist service error:', error);
      return { 
        result: 'failed', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Send welcome email to new subscriber
   */
  private async sendWelcomeEmail(
    submissionId: string, 
    email: string, 
    emailNormalized: string
  ) {
    // Get user stats for email personalization
    const stats = await this.getUserStats(submissionId);
    
    const templateData: TemplateData = {
      userPosition: stats.userPosition,
      totalUsers: stats.totalUsers,
    };

    const template = getEmailTemplate('waitlist-welcome', templateData);

    const sendResult = await this.emailProvider.sendEmail({
      to: email,
      toNormalized: emailNormalized,
      templateName: 'waitlist-welcome',
      template,
      metadata: { submissionId }
    });

    // Log the delivery attempt
    await this.logEmailDelivery({
      emailSubmissionId: submissionId,
      toEmailNormalized: emailNormalized,
      templateName: 'waitlist-welcome',
      subject: template.subject,
      messageId: sendResult.messageId,
      status: sendResult.success ? 'SENT' : 'FAILED',
      errorCode: sendResult.error?.code,
      errorMessage: sendResult.error?.message,
      sentAt: sendResult.success ? new Date() : undefined,
    });

    return sendResult;
  }

  /**
   * Handle email sending failures
   */
  private async handleEmailFailure(
    submissionId: string,
    emailNormalized: string, 
    error: { code: string; message: string; isHardBounce?: boolean }
  ) {
    // Update submission with error
    await prisma.emailSubmission.update({
      where: { id: submissionId },
      data: {
        lastDeliveryStatus: error.isHardBounce ? 'SUPPRESSED' : 'FAILED',
        lastDeliveryAt: new Date(),
        lastErrorCode: error.code,
        lastErrorMessage: error.message,
      }
    });

    // If hard bounce, add to suppression list
    if (error.isHardBounce) {
      await prisma.emailSuppression.upsert({
        where: { emailNormalized },
        create: {
          emailNormalized,
          reason: 'HARD_BOUNCE',
          provider: this.emailProvider.name,
          evidence: { 
            errorCode: error.code, 
            errorMessage: error.message,
            timestamp: new Date().toISOString()
          }
        },
        update: {
          lastSeenAt: new Date(),
          evidence: {
            errorCode: error.code,
            errorMessage: error.message,
            timestamp: new Date().toISOString()
          }
        }
      });
    }
  }

  /**
   * Log email delivery attempt
   */
  private async logEmailDelivery(data: {
    emailSubmissionId: string;
    toEmailNormalized: string;
    templateName: string;
    subject: string;
    messageId?: string;
    status: 'QUEUED' | 'SENT' | 'FAILED' | 'SUPPRESSED';
    errorCode?: string;
    errorMessage?: string;
    sentAt?: Date;
  }) {
    try {
      await prisma.emailDelivery.create({
        data: {
          ...data,
          provider: this.emailProvider.name,
        }
      });
    } catch (error) {
      console.error('Failed to log email delivery:', error);
    }
  }

  /**
   * Get user position and total count
   */
  private async getUserStats(submissionId: string) {
    const submission = await prisma.emailSubmission.findUnique({
      where: { id: submissionId }
    });

    if (!submission) {
      return { userPosition: 0, totalUsers: 0 };
    }

    const [userPosition, totalUsers] = await Promise.all([
      prisma.emailSubmission.count({
        where: {
          createdAt: { lte: submission.createdAt },
          status: 'ACTIVE'
        }
      }),
      prisma.emailSubmission.count({
        where: { status: 'ACTIVE' }
      })
    ]);

    return { userPosition, totalUsers };
  }

  /**
   * Check if email is suppressed
   */
  async checkSuppression(email: string): Promise<boolean> {
    const normalizedData = normalizeEmail(email);
    const suppression = await prisma.emailSuppression.findUnique({
      where: { emailNormalized: normalizedData.normalized }
    });
    return !!suppression;
  }
}