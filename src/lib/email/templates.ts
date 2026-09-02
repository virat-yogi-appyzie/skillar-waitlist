import { EmailTemplate } from './provider-interface';
import { SITE_CONFIG } from '@/lib/site-config';

export interface TemplateData {
  userPosition?: number;
  totalUsers?: number;
  [key: string]: unknown;
}

export interface DemoEmailData {
  name: string;
  firstName?: string;
  email: string;
  company: string;
  teamSize: string;
  focusArea?: string;
  submittedAt?: string;
}

export interface PricingEmailData {
  name: string;
  firstName?: string;
  email: string;
  company: string;
  workforceSize: string;
  deploymentTier: string;
  notes?: string;
  submittedAt?: string;
}

export interface ContactEmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  submittedAt?: string;
}

export interface BaseEmailLayoutOptions {
  title?: string;
  previewText?: string;
  userEmail?: string;
  hideFooter?: boolean;
}

function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * High-End SaaS Email Layout matching the official Skillar platform:
 * - 4px top brand accent bar (Indigo #4F46E5)
 * - Hosted high-contrast Skillar Logo
 * - Plus Jakarta Sans & system typography
 * - Responsive 580px container
 * - Cohesive brand footer with legal links
 */
export function renderBaseLayout(contentHtml: string, options: BaseEmailLayoutOptions = {}): string {
  const currentYear = new Date().getFullYear();
  const appUrl = SITE_CONFIG.appUrl;
  const siteUrl = SITE_CONFIG.siteUrl;
  const logoSrc = `${SITE_CONFIG.appUrl}/full-skillar-logo.png`;

  const footerHtml = options.hideFooter
    ? ''
    : `
      <!-- Minimal Brand Footer with Guaranteed Spacer -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td height="36" style="height: 36px; line-height: 36px; font-size: 36px;">&nbsp;</td>
        </tr>
        <tr>
          <td align="center" style="border-top: 1px solid #e2e8f0; padding-top: 24px; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; color: #94a3b8;">
            <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #64748b; letter-spacing: -0.2px;">
              Skillar<span style="color: #4f46e5;">.ai</span> &bull; Skill Intelligence Platform
            </p>
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 8px auto;">
              <tr>
                <td style="padding: 0 10px;">
                  <a href="${siteUrl}/privacy-policy" style="color: #94a3b8; font-size: 11px; text-decoration: none;">Privacy Policy</a>
                </td>
                <td style="color: #cbd5e1; font-size: 11px;">&bull;</td>
                <td style="padding: 0 10px;">
                  <a href="${SITE_CONFIG.contact.emailHref}" style="color: #94a3b8; font-size: 11px; text-decoration: none;">${SITE_CONFIG.contact.email}</a>
                </td>
              </tr>
            </table>
            <p style="margin: 10px 0 0 0; font-size: 11px; color: #cbd5e1;">&copy; ${currentYear} Skillar.ai. All rights reserved.</p>
          </td>
        </tr>
      </table>
    `;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escapeHtml(options.title || 'Skillar')}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    body {
      margin: 0 !important;
      padding: 0 !important;
      -webkit-text-size-adjust: 100% !important;
      -ms-text-size-adjust: 100% !important;
      background-color: #f8fafc !important;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
    }
    img {
      -ms-interpolation-mode: bicubic;
    }
    a {
      text-decoration: none;
      color: #4f46e5;
    }
    .action-btn:hover {
      background-color: #4338ca !important;
    }
    @media screen and (max-width: 600px) {
      body {
        background-color: #ffffff !important;
        padding: 0 !important;
      }
      .outer-cell {
        padding: 0 !important;
      }
      .email-wrapper {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 0 !important;
        border: none !important;
        box-shadow: none !important;
      }
      .card-header {
        padding: 20px 16px 8px 16px !important;
      }
      .card-body {
        padding: 12px 16px 28px 16px !important;
      }
      .action-btn {
        width: 100% !important;
        text-align: center !important;
        box-sizing: border-box !important;
        padding: 14px 20px !important;
      }
    }
  </style>
</head>
<body style="background-color: #f8fafc; margin: 0; padding: 0;">
  ${
    options.previewText
      ? `<div style="display: none; font-size: 1px; color: #ffffff; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
          ${escapeHtml(options.previewText)}
        </div>`
      : ''
  }

  <!-- Main Container: Full Width On Mobile, Centered Max 580px On Desktop -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; width: 100%; padding: 24px 12px;">
    <tr>
      <td align="center" class="outer-cell" style="padding: 0;">
        <table role="presentation" class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; width: 100%; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 24px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0; margin: 0 auto;">
          
          <!-- Top Brand Accent Bar -->
          <tr>
            <td height="4" style="background-color: #4f46e5; height: 4px; line-height: 4px; font-size: 4px;">
              &nbsp;
            </td>
          </tr>

          <!-- Clean Header with High-Contrast Logo -->
          <tr>
            <td class="card-header" style="padding: 24px 24px 8px 24px; background-color: #ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <a href="${appUrl}" style="text-decoration: none; display: inline-block;">
                      <img src="${logoSrc}" alt="Skillar.ai" width="135" style="width: 135px; max-width: 135px; height: auto; display: block; border: 0;" />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td class="card-body" style="padding: 12px 24px 32px 24px; background-color: #ffffff;">
              ${contentHtml}
              ${footerHtml}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 1. Waitlist welcome email template
 */
export function getWaitlistWelcomeTemplate(data: TemplateData): EmailTemplate {
  const { userPosition, totalUsers } = data;
  const appUrl = SITE_CONFIG.appUrl;
  const subject = "🎉 Welcome to Skillar's Early Access";

  const content = `
    <!-- Hero Section with Welcome Banner -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #ede9fe 100%); border-radius: 12px;">
      <tr>
        <td style="padding: 32px 28px; text-align: center;">
          <div style="font-size: 34px; line-height: 1; margin-bottom: 12px;">&#127891;</div>
          <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #1e1b4b; letter-spacing: -0.5px; line-height: 28px;">
            You're on the Skillar list
          </h1>
          <p style="margin: 0; font-size: 14px; color: #4338ca; font-weight: 500;">
            One intelligence layer for workforce capability and skill compliance.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin: 28px 0 20px 0; font-size: 14px; line-height: 24px; color: #475569;">
      Thank you for joining our early access queue. We are rolling out access in scheduled cohorts to ensure seamless integrations with existing LMS and HRMS platforms.
    </p>

    ${userPosition && totalUsers ? `
    <!-- Position Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #4f46e5; border-radius: 10px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 16px 20px;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 4px;">Waitlist Position</div>
          <div style="font-size: 18px; font-weight: 800; color: #0f172a;">
            #${userPosition} <span style="font-size: 13px; font-weight: 500; color: #64748b;">out of ${totalUsers} early adopters</span>
          </div>
        </td>
      </tr>
    </table>
    ` : ''}

    <!-- 3 Value Pillars -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td style="padding-bottom: 10px;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4f46e5;">
            What To Expect
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
            <tr>
              <td width="44" style="padding: 12px 0 12px 14px; vertical-align: top;">
                <div style="width: 28px; height: 28px; border-radius: 6px; background: #eef2ff; color: #4f46e5; font-size: 13px; font-weight: 700; text-align: center; line-height: 28px;">1</div>
              </td>
              <td style="padding: 12px 14px 12px 10px; vertical-align: middle;">
                <div style="font-size: 13px; font-weight: 600; color: #0f172a;">Cohort Invitations</div>
                <div style="font-size: 12px; color: #64748b;">Direct login credentials delivered straight to your inbox.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
            <tr>
              <td width="44" style="padding: 12px 0 12px 14px; vertical-align: top;">
                <div style="width: 28px; height: 28px; border-radius: 6px; background: #eef2ff; color: #4f46e5; font-size: 13px; font-weight: 700; text-align: center; line-height: 28px;">2</div>
              </td>
              <td style="padding: 12px 14px 12px 10px; vertical-align: middle;">
                <div style="font-size: 13px; font-weight: 600; color: #0f172a;">Custom Competency Mapping</div>
                <div style="font-size: 12px; color: #64748b;">Early access members receive complimentary taxonomy mapping for their team roles.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
            <tr>
              <td width="44" style="padding: 12px 0 12px 14px; vertical-align: top;">
                <div style="width: 28px; height: 28px; border-radius: 6px; background: #eef2ff; color: #4f46e5; font-size: 13px; font-weight: 700; text-align: center; line-height: 28px;">3</div>
              </td>
              <td style="padding: 12px 14px 12px 10px; vertical-align: middle;">
                <div style="font-size: 13px; font-weight: 600; color: #0f172a;">Product Previews</div>
                <div style="font-size: 12px; color: #64748b;">Direct feedback channel into our product roadmap.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- CTA Button -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 16px 0 8px 0;">
          <a href="${appUrl}" class="action-btn" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); background-color: #4f46e5; color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 36px; border-radius: 8px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);">
            Visit Skillar Platform &rarr;
          </a>
        </td>
      </tr>
    </table>
  `;

  const textContent = `
Welcome to Skillar's Early Access Queue!

You're officially on the list for Skillar — One intelligence layer for workforce capability and skill compliance.
${userPosition && totalUsers ? `Your Position: #${userPosition} out of ${totalUsers} early adopters\n` : ''}
What to expect:
• Cohort Invitations: Direct login credentials delivered straight to your inbox.
• Custom Competency Mapping: Complimentary taxonomy mapping for your organization.
• Product Previews: Direct feedback channel into our engineering roadmap.

Visit: ${appUrl}
Support: ${SITE_CONFIG.contact.email}
  `.trim();

  return {
    subject,
    htmlContent: renderBaseLayout(content, {
      title: "Welcome to Skillar's Waitlist",
      previewText: "You are officially registered for early platform access.",
    }),
    textContent,
  };
}

/**
 * 2. Demo Walkthrough - Internal Notification
 */
export function getDemoNotificationTemplate(data: DemoEmailData): EmailTemplate {
  const subject = `[Demo Request] ${data.name} at ${data.company}`;
  const content = `
    <!-- Hero Banner -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); border-radius: 12px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 24px; text-align: left;">
          <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.1em; color: #4338ca; text-transform: uppercase; margin-bottom: 6px;">
            ⚡ INBOUND DEMO REQUEST
          </div>
          <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #1e1b4b; line-height: 1.3;">
            ${escapeHtml(data.name)} &bull; ${escapeHtml(data.company)}
          </h1>
        </td>
      </tr>
    </table>

    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 22px; color: #475569;">
      A prospective client has requested a 30-minute capability walkthrough:
    </p>

    <!-- Details Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #4f46e5; border-radius: 10px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 18px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 3px;">Prospect Name</div>
                <div style="font-size: 15px; font-weight: 600; color: #0f172a;">${escapeHtml(data.name)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 3px;">Work Email</div>
                <div style="font-size: 14px; font-weight: 600; color: #4f46e5;">
                  <a href="mailto:${escapeHtml(data.email)}" style="color: #4f46e5; text-decoration: underline;">${escapeHtml(data.email)}</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 3px;">Organization</div>
                <div style="font-size: 14px; font-weight: 600; color: #0f172a;">${escapeHtml(data.company)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; ${data.focusArea ? 'border-bottom: 1px solid #e2e8f0;' : ''}">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 3px;">Workforce Scale</div>
                <div style="font-size: 14px; font-weight: 600; color: #0f172a;">${escapeHtml(data.teamSize)}</div>
              </td>
            </tr>
            ${data.focusArea ? `
            <tr>
              <td style="padding-top: 12px;">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 3px;">Priority Focus Area</div>
                <div style="font-size: 14px; font-weight: 600; color: #0f172a;">${escapeHtml(data.focusArea)}</div>
              </td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="mailto:${escapeHtml(data.email)}?subject=Re:%20Skillar%20Walkthrough%20for%20${encodeURIComponent(data.company)}" class="action-btn" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); background-color: #4f46e5; color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 8px;">
            Reply to Prospect &rarr;
          </a>
        </td>
      </tr>
    </table>
  `;

  const textContent = `
NEW DEMO WALKTHROUGH REQUEST

Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Workforce Scale: ${data.teamSize}
${data.focusArea ? `Priority Focus: ${data.focusArea}\n` : ''}Submitted At: ${data.submittedAt || new Date().toISOString()}

Reply to: ${data.email}
  `.trim();

  return {
    subject,
    htmlContent: renderBaseLayout(content, {
      title: 'New Demo Request',
      previewText: `Demo request from ${data.name} at ${data.company}`,
    }),
    textContent,
  };
}

/**
 * 3. Demo Walkthrough - Confirmation to Requester
 */
export function getDemoConfirmationTemplate(data: DemoEmailData): EmailTemplate {
  const firstName = data.firstName || data.name.split(' ')[0] || 'there';
  const subject = `Your Skillar Walkthrough Request — ${firstName}`;

  const content = `
    <!-- Hero Section -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #ede9fe 100%); border-radius: 12px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 28px 24px; text-align: center;">
          <div style="font-size: 32px; line-height: 1; margin-bottom: 10px;">&#128197;</div>
          <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #1e1b4b; letter-spacing: -0.4px;">
            Walkthrough Request Confirmed
          </h1>
          <p style="margin: 0; font-size: 13px; color: #4338ca; font-weight: 500;">
            A capability specialist is preparing a session tailored to ${escapeHtml(data.company)}.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 600; color: #0f172a;">
      Hello ${escapeHtml(firstName)},
    </p>
    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 24px; color: #475569;">
      Thank you for your interest in Skillar. We have received your walkthrough request. Our solutions team will review your organization's context and reach out within <strong>one business day</strong> to coordinate a 30-minute live demonstration.
    </p>

    <!-- Scope Summary Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #4f46e5; border-radius: 10px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 16px 20px;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4f46e5; margin-bottom: 10px;">
            Walkthrough Parameters
          </div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Organization:</td>
              <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #0f172a; text-align: right;">${escapeHtml(data.company)}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Workforce Scale:</td>
              <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #0f172a; text-align: right;">${escapeHtml(data.teamSize)}</td>
            </tr>
            ${data.focusArea ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Target Priority:</td>
              <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #0f172a; text-align: right;">${escapeHtml(data.focusArea)}</td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>
    </table>

    <!-- Next Steps Flow -->
    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4f46e5; margin-bottom: 12px;">
      What We'll Cover In 30 Minutes
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td style="background-color: #f8fafc; border: 1px solid #eef2f6; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">1. Capability Mapping:</strong> How your organization's roles and SOPs translate into measurable skill matrices.
        </td>
      </tr>
      <tr><td height="8"></td></tr>
      <tr>
        <td style="background-color: #f8fafc; border: 1px solid #eef2f6; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">2. Adaptive Skill Testing:</strong> Live demonstration of scheduled evaluations that isolate knowledge gaps without self-reporting guesswork.
        </td>
      </tr>
      <tr><td height="8"></td></tr>
      <tr>
        <td style="background-color: #f8fafc; border: 1px solid #eef2f6; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">3. Audit-Ready Certification:</strong> Generating verifiable records of workforce compliance for regulatory bodies.
        </td>
      </tr>
    </table>

    <p style="margin: 0; font-size: 13px; line-height: 20px; color: #64748b;">
      Need to include additional stakeholders or share existing competency frameworks beforehand? Simply reply directly to this email.
    </p>
  `;

  const textContent = `
Hello ${firstName},

Thank you for requesting a walkthrough of Skillar for ${data.company}.

Our solutions team has received your details:
• Organization: ${data.company}
• Workforce Scale: ${data.teamSize}
${data.focusArea ? `• Target Priority: ${data.focusArea}\n` : ''}
We will review your context and follow up within one business day to coordinate a 30-minute demonstration.

What we will cover:
1. Capability Mapping: Translating your SOPs into clear competency matrices.
2. Adaptive Skill Testing: Isolating skill gaps with objective evaluation.
3. Audit-Ready Certification: Verifiable compliance records.

If you have questions, reply directly to this email.

---
Skillar Solutions Team
${SITE_CONFIG.appUrl} &bull; ${SITE_CONFIG.contact.email}
  `.trim();

  return {
    subject,
    htmlContent: renderBaseLayout(content, {
      title: 'Skillar Walkthrough Confirmation',
      previewText: `Your walkthrough request for ${data.company} has been received.`,
    }),
    textContent,
  };
}

/**
 * 4. Enterprise Pricing - Internal Notification
 */
export function getPricingNotificationTemplate(data: PricingEmailData): EmailTemplate {
  const subject = `[Enterprise Quote Request] ${data.name} at ${data.company} (${data.deploymentTier})`;
  const content = `
    <!-- Hero Banner -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); border-radius: 12px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 24px; text-align: left;">
          <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.1em; color: #4338ca; text-transform: uppercase; margin-bottom: 6px;">
            💼 ENTERPRISE PRICING INQUIRY
          </div>
          <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #1e1b4b; line-height: 1.3;">
            ${escapeHtml(data.name)} &bull; ${escapeHtml(data.company)}
          </h1>
        </td>
      </tr>
    </table>

    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 22px; color: #475569;">
      A custom enterprise pricing scope request was submitted through the pricing calculator:
    </p>

    <!-- Details Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #4f46e5; border-radius: 10px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 18px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 3px;">Lead Name</div>
                <div style="font-size: 15px; font-weight: 600; color: #0f172a;">${escapeHtml(data.name)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 3px;">Work Email</div>
                <div style="font-size: 14px; font-weight: 600; color: #4f46e5;">
                  <a href="mailto:${escapeHtml(data.email)}" style="color: #4f46e5; text-decoration: underline;">${escapeHtml(data.email)}</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 3px;">Company</div>
                <div style="font-size: 14px; font-weight: 600; color: #0f172a;">${escapeHtml(data.company)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 3px;">Workforce Scale</div>
                <div style="font-size: 14px; font-weight: 600; color: #0f172a;">${escapeHtml(data.workforceSize)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; ${data.notes ? 'border-bottom: 1px solid #e2e8f0;' : ''}">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 3px;">Deployment Model</div>
                <div style="font-size: 14px; font-weight: 600; color: #059669;">${escapeHtml(data.deploymentTier)}</div>
              </td>
            </tr>
            ${data.notes ? `
            <tr>
              <td style="padding-top: 12px;">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; margin-bottom: 3px;">Custom Notes & Integrations</div>
                <div style="font-size: 13px; line-height: 20px; color: #334155;">${escapeHtml(data.notes)}</div>
              </td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="mailto:${escapeHtml(data.email)}?subject=Re:%20Skillar%20Enterprise%20Pricing%20for%20${encodeURIComponent(data.company)}" class="action-btn" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); background-color: #4f46e5; color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 8px;">
            Respond with Custom Proposal &rarr;
          </a>
        </td>
      </tr>
    </table>
  `;

  const textContent = `
ENTERPRISE PRICING QUOTE REQUEST

Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Workforce Scale: ${data.workforceSize}
Deployment Tier: ${data.deploymentTier}
${data.notes ? `Notes: ${data.notes}\n` : ''}Submitted At: ${data.submittedAt || new Date().toISOString()}

Reply to: ${data.email}
  `.trim();

  return {
    subject,
    htmlContent: renderBaseLayout(content, {
      title: 'Enterprise Pricing Request',
      previewText: `Quote request from ${data.name} at ${data.company}`,
    }),
    textContent,
  };
}

/**
 * 5. Enterprise Pricing - Confirmation to Requester
 */
export function getPricingConfirmationTemplate(data: PricingEmailData): EmailTemplate {
  const firstName = data.firstName || data.name.split(' ')[0] || 'there';
  const subject = `Your Skillar Enterprise Pricing Scope — ${firstName}`;

  const content = `
    <!-- Hero Section -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #ede9fe 100%); border-radius: 12px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 28px 24px; text-align: center;">
          <div style="font-size: 32px; line-height: 1; margin-bottom: 10px;">&#9889;</div>
          <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #1e1b4b; letter-spacing: -0.4px;">
            Enterprise Scope Request Received
          </h1>
          <p style="margin: 0; font-size: 13px; color: #4338ca; font-weight: 500;">
            Preparing capability architecture and custom agreement terms for ${escapeHtml(data.company)}.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 600; color: #0f172a;">
      Hello ${escapeHtml(firstName)},
    </p>
    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 24px; color: #475569;">
      Thank you for contacting Skillar regarding enterprise deployment pricing. Our solutions architecture team is modelling your organization's scope based on the parameters submitted below:
    </p>

    <!-- Scope Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #059669; border-radius: 10px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 16px 20px;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #059669; margin-bottom: 10px;">
            Submitted Parameters
          </div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Organization:</td>
              <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #0f172a; text-align: right;">${escapeHtml(data.company)}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Workforce Scale:</td>
              <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #0f172a; text-align: right;">${escapeHtml(data.workforceSize)}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Deployment Model:</td>
              <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #059669; text-align: right;">${escapeHtml(data.deploymentTier)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4f46e5; margin-bottom: 12px;">
      Next Steps
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td style="background-color: #f8fafc; border: 1px solid #eef2f6; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #334155; line-height: 1.5;">
          &bull; An enterprise specialist will provide a tailored scope summary outlining multi-site licensing, user volume tiers, and SLA guarantees.
        </td>
      </tr>
      <tr><td height="8"></td></tr>
      <tr>
        <td style="background-color: #f8fafc; border: 1px solid #eef2f6; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #334155; line-height: 1.5;">
          &bull; We will include technical integration blueprints for your LMS (SCORM), HRMS (Workday/Darwinbox), and identity provider.
        </td>
      </tr>
    </table>

    <p style="margin: 0; font-size: 13px; line-height: 20px; color: #64748b;">
      If you require a bilateral NDA prior to technical architecture exchange, reply directly to this email and our legal operations team will facilitate it immediately.
    </p>
  `;

  const textContent = `
Hello ${firstName},

Thank you for your enterprise pricing inquiry for ${data.company}.

Submitted parameters:
• Organization: ${data.company}
• Workforce Scale: ${data.workforceSize}
• Deployment Model: ${data.deploymentTier}

Our enterprise solutions team will follow up within one business day with specific tier structure, integration pathways, and agreement terms.

If you have questions, reply directly to this message.

---
Skillar Enterprise Solutions
${SITE_CONFIG.appUrl} &bull; ${SITE_CONFIG.contact.email}
  `.trim();

  return {
    subject,
    htmlContent: renderBaseLayout(content, {
      title: 'Skillar Enterprise Pricing Scope',
      previewText: `Scope parameters received for ${data.company}.`,
    }),
    textContent,
  };
}

/**
 * 6. Contact Inquiry - Internal Notification
 */
export function getContactNotificationTemplate(data: ContactEmailData): EmailTemplate {
  const subject = `[Contact Inquiry] ${data.name} — ${data.subject || 'General Inquiry'}`;
  const content = `
    <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #0f172a;">New Inbound Contact Inquiry</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
      <tr>
        <td>
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin-bottom: 4px;">From</div>
          <div style="font-size: 14px; font-weight: 600; color: #0f172a;">${escapeHtml(data.name)} (${escapeHtml(data.email)})</div>
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin: 12px 0 4px 0;">Subject</div>
          <div style="font-size: 14px; font-weight: 600; color: #0f172a;">${escapeHtml(data.subject || 'General')}</div>
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin: 12px 0 4px 0;">Message</div>
          <div style="font-size: 13px; line-height: 20px; color: #334155; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
        </td>
      </tr>
    </table>
  `;

  return {
    subject,
    htmlContent: renderBaseLayout(content, { title: 'Contact Inquiry' }),
    textContent: `From: ${data.name} (${data.email})\nSubject: ${data.subject}\n\n${data.message}`,
  };
}

/**
 * 7. Contact Inquiry - Confirmation to Submitter
 */
export function getContactConfirmationTemplate(data: ContactEmailData): EmailTemplate {
  const firstName = data.name.split(' ')[0] || 'there';
  const subject = `We received your message — Skillar`;
  const content = `
    <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 700; color: #0f172a;">
      Thanks for reaching out, ${escapeHtml(firstName)}.
    </h2>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 22px; color: #475569;">
      We have received your message and a member of our team will get back to you as soon as possible.
    </p>
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #64748b; margin-bottom: 20px;">
      "${escapeHtml(data.message)}"
    </div>
  `;

  return {
    subject,
    htmlContent: renderBaseLayout(content, { title: 'Message Received' }),
    textContent: `Hi ${firstName},\n\nWe received your message and will follow up shortly.\n\nSkillar Team\n${SITE_CONFIG.appUrl}`,
  };
}

/**
 * 8. Skills Gap Diagnostic Report Email (Sent with PDF Attachment)
 */
export interface DiagnosticReportEmailData {
  name: string;
  email: string;
  lowestScoringSkill: string;
  timeToBuild: string;
  userIndustry?: string;
  userRole?: string;
}

export function getDiagnosticReportEmailTemplate(data: DiagnosticReportEmailData): EmailTemplate {
  const firstName = data.name.split(' ')[0] || 'there';
  const subject = `Your Strategic L&D Alignment Audit — ${data.name}`;

  const content = `
    <!-- Hero Banner -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #ede9fe 100%); border-radius: 12px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 28px 24px; text-align: center;">
          <div style="font-size: 34px; line-height: 1; margin-bottom: 10px;">&#127891;</div>
          <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #1e1b4b; letter-spacing: -0.4px;">
            Strategic L&amp;D Alignment Audit
          </h1>
          <p style="margin: 0; font-size: 13px; color: #4338ca; font-weight: 500;">
            Your personalized workforce capability assessment is ready.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 600; color: #0f172a;">
      Hello ${escapeHtml(firstName)},
    </p>

    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 24px; color: #475569;">
      Thank you for completing the Skillar Skills Gap Diagnostic. Attached to this email, you will find your comprehensive <strong>Strategic L&amp;D Alignment Audit</strong> in PDF format.
    </p>

    <!-- Key Insights Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #4f46e5; border-radius: 10px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 16px 20px;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4f46e5; margin-bottom: 10px;">
            Key Diagnostic Findings
          </div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Critical Skill Gap:</td>
              <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #b91c1c; text-align: right;">${escapeHtml(data.lowestScoringSkill)}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Internal Build Timeline:</td>
              <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #0f172a; text-align: right;">${escapeHtml(data.timeToBuild)}</td>
            </tr>
            ${data.userIndustry ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Industry Context:</td>
              <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #0f172a; text-align: right;">${escapeHtml(data.userIndustry)}</td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>
    </table>

    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4f46e5; margin-bottom: 12px;">
      What Your Attached PDF Report Contains
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
      <tr>
        <td style="background-color: #f8fafc; border: 1px solid #eef2f6; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">• The Strategic Diagnosis:</strong> Detailed risk assessment of why capability gaps in <em>${escapeHtml(data.lowestScoringSkill)}</em> directly affect operational delivery.
        </td>
      </tr>
      <tr><td height="8"></td></tr>
      <tr>
        <td style="background-color: #f8fafc; border: 1px solid #eef2f6; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">• The Timeline Bottleneck:</strong> The compounding cost of the current ${escapeHtml(data.timeToBuild)} development cycle versus continuous adaptive roadmaps.
        </td>
      </tr>
      <tr><td height="8"></td></tr>
      <tr>
        <td style="background-color: #f8fafc; border: 1px solid #eef2f6; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #334155; line-height: 1.5;">
          <strong style="color: #0f172a;">• The Skillar Bridge:</strong> Actionable pathways to convert organizational documentation and SOPs into verified competency tracks.
        </td>
      </tr>
    </table>

    <!-- CTA Button -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 16px 0 8px 0;">
          <a href="${SITE_CONFIG.appUrl}" class="action-btn" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); background-color: #4f46e5; color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 36px; border-radius: 8px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);">
            Access Skillar Learning &rarr;
          </a>
        </td>
      </tr>
    </table>
  `;

  const textContent = `
Hello ${firstName},

Thank you for completing the Skillar Skills Gap Diagnostic. Attached is your Strategic L&D Alignment Audit PDF.

Key Diagnostic Findings:
• Critical Skill Gap: ${data.lowestScoringSkill}
• Internal Build Timeline: ${data.timeToBuild}
${data.userIndustry ? `• Industry Context: ${data.userIndustry}\n` : ''}
Your attached report covers:
1. The Strategic Diagnosis of capability gaps in ${data.lowestScoringSkill}
2. The operational cost of your ${data.timeToBuild} development cycle
3. The Skillar Bridge: Converting internal SOPs into verified competency roadmaps

Visit platform: ${SITE_CONFIG.appUrl}
Support: ${SITE_CONFIG.contact.email}
  `.trim();

  return {
    subject,
    htmlContent: renderBaseLayout(content, {
      title: 'Strategic L&D Alignment Audit',
      previewText: `Your Strategic L&D Alignment Audit is attached.`,
    }),
    textContent,
  };
}

/**
 * Template Dispatcher
 */
export function getEmailTemplate(templateName: string, data: TemplateData): EmailTemplate {
  switch (templateName) {
    case 'waitlist-welcome':
      return getWaitlistWelcomeTemplate(data);
    case 'demo-notification':
      return getDemoNotificationTemplate(data as unknown as DemoEmailData);
    case 'demo-confirmation':
      return getDemoConfirmationTemplate(data as unknown as DemoEmailData);
    case 'pricing-notification':
      return getPricingNotificationTemplate(data as unknown as PricingEmailData);
    case 'pricing-confirmation':
      return getPricingConfirmationTemplate(data as unknown as PricingEmailData);
    case 'contact-notification':
      return getContactNotificationTemplate(data as unknown as ContactEmailData);
    case 'contact-confirmation':
      return getContactConfirmationTemplate(data as unknown as ContactEmailData);
    case 'diagnostic-report':
      return getDiagnosticReportEmailTemplate(data as unknown as DiagnosticReportEmailData);
    default:
      throw new Error(`Unknown email template: ${templateName}`);
  }
}