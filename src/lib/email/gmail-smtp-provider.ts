import nodemailer from 'nodemailer';
import { EmailProvider, EmailSendResult, SendEmailRequest } from './provider-interface';

interface SMTPError {
  message?: string;
  code?: string | number;
  status?: number;
  response?: string;
  responseCode?: number;
  command?: string;
}

export class GmailSMTPProvider extends EmailProvider {
  readonly name = 'gmail-smtp';
  private transporter: nodemailer.Transporter;

  constructor(
    private email: string,
    private appPassword: string
  ) {
    super();
    
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: this.email,
        pass: this.appPassword,
      },
    });
  }

  async sendEmail(request: SendEmailRequest): Promise<EmailSendResult> {
    try {
      const mailOptions = {
        from: `Skillar <${this.email}>`,
        to: request.to,
        subject: request.template.subject,
        html: request.template.htmlContent,
        text: request.template.textContent,
      };

      const result = await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: result.messageId,
      };
    } catch (error) {
      const smtpError = error as SMTPError;
      console.error('Gmail SMTP send error:', smtpError);

      const isHardBounce = this.isHardBounce(smtpError);
      
      return {
        success: false,
        error: {
          code: smtpError.code?.toString() || 'UNKNOWN_ERROR',
          message: smtpError.message || 'Unknown error occurred',
          isHardBounce,
        },
      };
    }
  }

  protected isHardBounce(error: SMTPError): boolean {
    if (!error.message) return false;

    const message = error.message.toLowerCase();
    
    const hardBouncePatterns = [
      'user unknown',
      'no such user',
      'invalid recipient',
      'recipient address rejected',
      'mailbox unavailable',
      'address not found',
      'does not exist',
      '550 5.1.1',
      '551 5.1.1',
      '553 5.3.0',
    ];

    return hardBouncePatterns.some(pattern => message.includes(pattern));
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Gmail SMTP connection test failed:', error);
      return false;
    }
  }
}