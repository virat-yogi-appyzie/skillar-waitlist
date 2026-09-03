import { GmailSMTPProvider } from './gmail-smtp-provider';
import { EmailProvider, EmailSendResult } from './provider-interface';
import { SITE_CONFIG } from '@/lib/site-config';
import {
  DemoEmailData,
  PricingEmailData,
  ContactEmailData,
  getDemoNotificationTemplate,
  getDemoConfirmationTemplate,
  getPricingNotificationTemplate,
  getPricingConfirmationTemplate,
  getContactNotificationTemplate,
  getContactConfirmationTemplate,
  getEmailTemplate,
} from './templates';

export {
  getEmailTemplate,
  getDemoNotificationTemplate,
  getDemoConfirmationTemplate,
  getPricingNotificationTemplate,
  getPricingConfirmationTemplate,
  getContactNotificationTemplate,
  getContactConfirmationTemplate,
};

let providerInstance: EmailProvider | null = null;

export function getEmailProvider(): EmailProvider {
  if (!providerInstance) {
    const email = process.env.MAIL_USER || SITE_CONFIG.contact.email;
    const password = process.env.MAIL_PASS || '';
    providerInstance = new GmailSMTPProvider(email, password);
  }
  return providerInstance;
}

/**
 * Send demo request notification (to internal team) and confirmation (to requester)
 */
export async function sendDemoEmails(data: DemoEmailData): Promise<{
  internalResult: EmailSendResult;
  confirmationResult: EmailSendResult;
}> {
  const provider = getEmailProvider();
  const internalRecipient = process.env.NOTIFICATION_RECEIVER_EMAIL || SITE_CONFIG.notifications.receiverEmail;

  const [internalResult, confirmationResult] = await Promise.all([
    provider.sendEmail({
      to: internalRecipient,
      toNormalized: internalRecipient.toLowerCase().trim(),
      templateName: 'demo-notification',
      template: getDemoNotificationTemplate(data),
      metadata: { leadEmail: data.email, company: data.company },
    }),
    provider.sendEmail({
      to: data.email,
      toNormalized: data.email.toLowerCase().trim(),
      templateName: 'demo-confirmation',
      template: getDemoConfirmationTemplate(data),
      metadata: { company: data.company },
    }),
  ]);

  return { internalResult, confirmationResult };
}

/**
 * Send pricing quote request notification (to internal team) and confirmation (to requester)
 */
export async function sendPricingEmails(data: PricingEmailData): Promise<{
  internalResult: EmailSendResult;
  confirmationResult: EmailSendResult;
}> {
  const provider = getEmailProvider();
  const internalRecipient = process.env.NOTIFICATION_RECEIVER_EMAIL || SITE_CONFIG.notifications.receiverEmail;

  const [internalResult, confirmationResult] = await Promise.all([
    provider.sendEmail({
      to: internalRecipient,
      toNormalized: internalRecipient.toLowerCase().trim(),
      templateName: 'pricing-notification',
      template: getPricingNotificationTemplate(data),
      metadata: { leadEmail: data.email, company: data.company, deploymentTier: data.deploymentTier },
    }),
    provider.sendEmail({
      to: data.email,
      toNormalized: data.email.toLowerCase().trim(),
      templateName: 'pricing-confirmation',
      template: getPricingConfirmationTemplate(data),
      metadata: { company: data.company, deploymentTier: data.deploymentTier },
    }),
  ]);

  return { internalResult, confirmationResult };
}

/**
 * Send general contact inquiry notification and confirmation
 */
export async function sendContactEmails(data: ContactEmailData): Promise<{
  internalResult: EmailSendResult;
  confirmationResult: EmailSendResult;
}> {
  const provider = getEmailProvider();
  const internalRecipient = process.env.NOTIFICATION_RECEIVER_EMAIL || SITE_CONFIG.notifications.receiverEmail;

  const [internalResult, confirmationResult] = await Promise.all([
    provider.sendEmail({
      to: internalRecipient,
      toNormalized: internalRecipient.toLowerCase().trim(),
      templateName: 'contact-notification',
      template: getContactNotificationTemplate(data),
      metadata: { leadEmail: data.email },
    }),
    provider.sendEmail({
      to: data.email,
      toNormalized: data.email.toLowerCase().trim(),
      templateName: 'contact-confirmation',
      template: getContactConfirmationTemplate(data),
      metadata: {},
    }),
  ]);

  return { internalResult, confirmationResult };
}
