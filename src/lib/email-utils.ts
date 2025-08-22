/**
 * Email normalization utilities for consistent email handling
 * Handles Gmail/Outlook normalization and deduplication
 */

export interface NormalizedEmail {
  original: string;
  normalized: string;
  provider: string;
}

/**
 * Normalize an email address for consistent storage and deduplication
 * 
 * Rules:
 * - Always lowercase
 * - Gmail/Googlemail: Remove dots from username, remove +alias
 * - Outlook: Remove +alias (but keep dots)
 * - Other providers: Just lowercase
 */
export function normalizeEmail(email: string): NormalizedEmail {
  const trimmedEmail = email.trim().toLowerCase();
  
  if (!isValidEmailFormat(trimmedEmail)) {
    throw new Error('Invalid email format');
  }

  const [username, domain] = trimmedEmail.split('@');
  let normalizedUsername = username;
  let provider = 'other';

  // Gmail normalization (gmail.com and googlemail.com)
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    provider = 'gmail';
    // Remove dots and everything after +
    normalizedUsername = username
      .split('+')[0]  // Remove +alias
      .replace(/\./g, '');  // Remove all dots
  }
  // Outlook normalization (outlook.com, hotmail.com, live.com)
  else if (['outlook.com', 'hotmail.com', 'live.com'].includes(domain)) {
    provider = 'outlook';
    // Remove +alias but keep dots
    normalizedUsername = username.split('+')[0];
  }
  // Yahoo normalization (yahoo.com, yahoo.co.uk, etc.)
  else if (domain.startsWith('yahoo.')) {
    provider = 'yahoo';
    // Remove -alias (Yahoo uses - instead of +)
    normalizedUsername = username.split('-')[0];
  }

  const normalized = `${normalizedUsername}@${domain}`;

  return {
    original: email.trim(),
    normalized,
    provider
  };
}

/**
 * Basic email format validation
 */
export function isValidEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Extract email provider from normalized email
 */
export function getEmailProvider(email: string): string {
  const domain = email.toLowerCase().split('@')[1];
  
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    return 'gmail';
  } else if (['outlook.com', 'hotmail.com', 'live.com'].includes(domain)) {
    return 'outlook';
  } else if (domain.startsWith('yahoo.')) {
    return 'yahoo';
  }
  
  return 'other';
}