import { EmailTemplate } from './provider-interface';

export interface TemplateData {
  userPosition?: number;
  totalUsers?: number;
  [key: string]: unknown;
}

/**
 * Waitlist welcome email template
 */
export function getWaitlistWelcomeTemplate(data: TemplateData): EmailTemplate {
  const { userPosition, totalUsers } = data;
  
  const subject = "🎉 Welcome to Skillar's Waitlist!";
  
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Skillar</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 0; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
            .content { padding: 40px 30px; }
            .content h2 { color: #333; font-size: 24px; margin-bottom: 20px; }
            .content p { margin-bottom: 16px; color: #666; }
            .highlight { background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .footer { background-color: #f8f9fa; padding: 30px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #e9ecef; }
            .footer a { color: #667eea; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 Skillar</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Welcome to the future of skill development</p>
            </div>
            
            <div class="content">
                <h2>You're officially on the list! 🎉</h2>
                
                <p>Thank you for joining Skillar's waitlist! We're thrilled to have you on board as we prepare to launch something truly special.</p>
                
                ${userPosition && totalUsers ? `
                <div class="highlight">
                    <strong>Your Position:</strong> #${userPosition} out of ${totalUsers} early adopters<br>
                    <small>You're among the first to discover Skillar!</small>
                </div>
                ` : ''}
                
                <h3>🎯 What to expect:</h3>
                <ul>
                    <li><strong>Early Access:</strong> Be the first to try our platform when we launch</li>
                    <li><strong>Exclusive Updates:</strong> Get insider updates on our development progress</li>
                    <li><strong>Special Perks:</strong> Waitlist members get exclusive benefits</li>
                </ul>
                
                <h3>🚀 What's Next?</h3>
                <p>We're working hard to bring you an incredible skill development platform. Keep an eye on your inbox for updates on our progress and launch timeline.</p>
                
                <a href="https://skillar.ai" class="cta-button">Visit Our Website</a>
                
                <p style="margin-top: 30px; color: #888; font-size: 14px;">
                    Have questions? Just reply to this email - we'd love to hear from you!
                </p>
            </div>
            
            <div class="footer">
                <p><strong>Skillar Team</strong></p>
                <p>Building the future of skill development, one learner at a time.</p>
                <p>
                    <a href="https://skillar.ai">Website</a> | 
                    <a href="mailto:hello@skillar.ai">Contact Us</a>
                </p>
            </div>
        </div>
    </body>
    </html>
  `;

  const textContent = `
🎉 Welcome to Skillar's Waitlist!

Thank you for joining Skillar's waitlist! We're thrilled to have you on board as we prepare to launch something truly special.

${userPosition && totalUsers ? `Your Position: #${userPosition} out of ${totalUsers} early adopters\nYou're among the first to discover Skillar!\n` : ''}

🎯 What to expect:
• Early Access: Be the first to try our platform when we launch
• Exclusive Updates: Get insider updates on our development progress  
• Special Perks: Waitlist members get exclusive benefits

🚀 What's Next?
We're working hard to bring you an incredible skill development platform. Keep an eye on your inbox for updates on our progress and launch timeline.

Visit our website: https://skillar.ai

Have questions? Just reply to this email - we'd love to hear from you!

---
Skillar Team
Building the future of skill development, one learner at a time.

Website: https://skillar.ai
Contact: hello@skillar.ai
  `;

  return {
    subject,
    htmlContent,
    textContent
  };
}

/**
 * Get template by name
 */
export function getEmailTemplate(templateName: string, data: TemplateData): EmailTemplate {
  switch (templateName) {
    case 'waitlist-welcome':
      return getWaitlistWelcomeTemplate(data);
    default:
      throw new Error(`Unknown email template: ${templateName}`);
  }
}