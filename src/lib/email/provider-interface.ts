/**
 * Email provider interface for sending emails through different services
 */

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: {
    code: string;
    message: string;
    isHardBounce?: boolean;
  };
}

export interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent?: string;
}

export interface SendEmailRequest {
  to: string;
  toNormalized: string;
  templateName: string;
  template: EmailTemplate;
  metadata?: Record<string, unknown>;
}

export abstract class EmailProvider {
  abstract readonly name: string;
  
  abstract sendEmail(request: SendEmailRequest): Promise<EmailSendResult>;
  
  /**
   * Check if an error indicates a hard bounce (invalid recipient)
   */
  protected isHardBounce(_error: unknown): boolean {
    return false; // Override in specific providers
  }
}