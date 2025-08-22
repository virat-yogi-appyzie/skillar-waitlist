import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { EmailProvider, EmailSendResult, SendEmailRequest } from './provider-interface';

interface GmailError {
  message?: string;
  code?: string | number;
  status?: number;
  response?: string;
  responseCode?: number;
  command?: string;
}

export class GmailProvider extends EmailProvider {
  readonly name = 'gmail';
  private transporter: nodemailer.Transporter | null = null;

  constructor(
    private clientId: string,
    private clientSecret: string,
    private refreshToken: string,
    private fromEmail: string = 'virat.yogi06@gmail.com'
    // virat.yogi06@gmail.com
  ) {
    super();
  }

  /**
   * Get OAuth2 access token and create transporter
   */
  private async getTransporter(): Promise<nodemailer.Transporter> {
    if (this.transporter) {
      return this.transporter;
    }

    console.log('🔧 Attempting Gmail OAuth2 authentication...');
    console.log('Client ID:', this.clientId?.substring(0, 20) + '...');
    console.log('From Email:', this.fromEmail);

    const oauth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      'https://developers.google.com/oauthplayground' // Redirect URI used during setup
    );

    oauth2Client.setCredentials({
      refresh_token: this.refreshToken,
    });

    try {
      console.log('🔄 Getting access token...');
      // Get fresh access token
      const { token } = await oauth2Client.getAccessToken();
      console.log('✅ Access token obtained successfully');
      
      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          type: 'OAuth2',
          user: this.fromEmail,
          clientId: this.clientId,
          clientSecret: this.clientSecret,
          refreshToken: this.refreshToken,
          accessToken: token as string,
        },
      });

      console.log('✅ Gmail transporter created successfully');
      return this.transporter;
    } catch (error) {
      const gmailError = error as GmailError;
      console.error('❌ Gmail OAuth2 Error Details:', {
        error: gmailError?.message || 'Unknown error',
        code: gmailError?.code || 'UNKNOWN_CODE',
        status: gmailError?.status || 'UNKNOWN_STATUS',
        clientId: this.clientId?.substring(0, 20) + '...',
        fromEmail: this.fromEmail,
        hasRefreshToken: !!this.refreshToken
      });
      throw new Error('Failed to authenticate with Gmail API');
    }
  }

  async sendEmail(request: SendEmailRequest): Promise<EmailSendResult> {
    try {
      const transporter = await this.getTransporter();

      const mailOptions = {
        from: `Skillar <${this.fromEmail}>`,
        to: request.to,
        subject: request.template.subject,
        html: request.template.htmlContent,
        text: request.template.textContent,
      };

      const result = await transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: result.messageId,
      };
    } catch (error) {
      const gmailError = error as GmailError;
      console.error('Gmail send error:', gmailError);

      const isHardBounce = this.isHardBounce(gmailError);
      
      return {
        success: false,
        error: {
          code: gmailError.code?.toString() || 'UNKNOWN_ERROR',
          message: gmailError.message || 'Unknown error occurred',
          isHardBounce,
        },
      };
    }
  }

  /**
   * Check if Gmail error indicates hard bounce
   */
  protected isHardBounce(error: GmailError): boolean {
    if (!error.message) return false;

    const message = error.message.toLowerCase();
    
    // Gmail/SMTP hard bounce indicators
    const hardBouncePatterns = [
      'user unknown',
      'no such user',
      'invalid recipient',
      'recipient address rejected',
      'mailbox unavailable',
      'address not found',
      'does not exist',
      '550 5.1.1', // User unknown
      '551 5.1.1', // User not local
      '553 5.3.0', // Address invalid
    ];

    return hardBouncePatterns.some(pattern => message.includes(pattern));
  }

  /**
   * Test the Gmail connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const transporter = await this.getTransporter();
      await transporter.verify();
      return true;
    } catch (error) {
      console.error('Gmail connection test failed:', error);
      return false;
    }
  }
}