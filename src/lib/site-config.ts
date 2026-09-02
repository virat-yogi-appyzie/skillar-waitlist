/**
 * site-config.ts — Single source of truth for all global site URLs,
 * application endpoints, email addresses, contact details, and social links.
 *
 * Never hardcode external URLs or email addresses in components or copy modules.
 * Import from here instead.
 */

export const SITE_CONFIG = {
  name: "Skillar",
  legalName: "Skillar Inc.",
  domain: "skillar.ai",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://skillar.ai",
  /** Primary learning platform / application portal (previously app.skillar.ai) */
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://learning.skillar.ai",
  
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@skillar.ai",
    emailHref: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@skillar.ai"}`,
    phone: "+91 9256219292",
    phoneHref: "tel:+919256219292",
    location: "Jaipur, India (Global Remote)",
  },

  social: {
    linkedin: "https://www.linkedin.com/company/skillar-ai",
    twitter: "https://x.com/skillar_ai",
    instagram: "https://instagram.com/skillar.ai",
  },

  notifications: {
    receiverEmail: process.env.NOTIFICATION_RECEIVER_EMAIL || process.env.MAIL_USER || "hello@skillar.ai",
  },
} as const;

export default SITE_CONFIG;
