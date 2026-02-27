'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { WaitlistService } from '@/lib/waitlist-service'

export interface WaitlistSubmissionResult {
  success: boolean
  message: string
  userPosition?: number // Add user position for successful submissions
  totalUsers?: number // Add total users count
  errors?: {
    email?: string
    recaptcha?: string
    general?: string
  }
}

export interface SkillsGapAssessmentPayload {
  name: string
  email: string
  industryName: string
  roleName: string
  userGoal: string
  selectedSkills: { name: string; proficiency: number }[]
  timeToBuildLabel: string
  businessImpact: string
  companySize: string
  criticalFlag: boolean
}

export interface EmailSubmissionData {
  id: string
  email: string
  createdAt: Date
  userAgent: string | null
  source: string | null
  status: 'ACTIVE' | 'UNSUBSCRIBED'
}

// Verify reCAPTCHA token with Google
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not set in environment variables');
      return false;
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export async function saveSkillsGapAssessment(
  payload: SkillsGapAssessmentPayload
): Promise<{ success: boolean }> {
  const {
    name,
    email,
    industryName,
    roleName,
    userGoal,
    selectedSkills,
    timeToBuildLabel,
    businessImpact,
    companySize,
    criticalFlag,
  } = payload

  // Basic guard: require minimal fields
  if (!email || !industryName || !roleName) {
    return { success: false }
  }

  // Map the user-facing time-to-build label to an approximate month count
  const timeToBuildMonths = (() => {
    switch (timeToBuildLabel) {
      case 'Less than 1 month':
        return 1
      case '1-3 months':
        return 3
      case '3-6 months':
        return 6
      case '6-12 months':
        return 12
      case 'More than 12 months':
        return 18
      default:
        return 0
    }
  })()

  // NOTE: Avoid interactive transactions in Next.js server actions.
  // A sequential write flow is more reliable here.

  // Find existing user by email, or create if not present
  let user = await prisma.user.findFirst({
    where: { email },
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
      },
    })
  } else if (name && name !== user.name) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: { name },
    })
  }

  const industry = await prisma.industry.upsert({
    where: { name: industryName },
    update: {},
    create: {
      name: industryName,
      isUserGenerated: true,
    },
  })

  // Find or create role linked to industry (handles race conditions safely)
  let role = await prisma.role.findFirst({
    where: { name: roleName, industryId: industry.id },
  })

  if (!role) {
    try {
      role = await prisma.role.create({
        data: {
          name: roleName,
          industryId: industry.id,
        },
      })
    } catch {
      role = await prisma.role.findFirst({
        where: { name: roleName, industryId: industry.id },
      })
    }
  }

  if (!role) {
    return { success: false }
  }

  const assessment = await prisma.userAssessment.create({
    data: {
      userId: user.id,
      industryId: industry.id,
      roleId: role.id,
      timeToBuildMonths,
      businessImpact,
      companySize,
      criticalFlag,
    },
  })

  for (const { name: skillName, proficiency } of selectedSkills) {
    if (!skillName) continue

    const skill = await prisma.skill.upsert({
      where: { name: skillName },
      update: {},
      create: {
        name: skillName,
      },
    })

    await prisma.skillAssessment.create({
      data: {
        assessmentId: assessment.id,
        skillId: skill.id,
        proficiency,
      },
    })
  }

  return { success: true }
}

export interface SkillsGapReportPayload {
  userGoal: string
  userIndustry: string
  userRole: string
  lowestScoringSkill: string
  skillScore: number
  timeToBuild: string
  businessImpact: string
  companySize: string
}

export async function generateSkillsGapReport(
  payload: SkillsGapReportPayload
): Promise<{ success: boolean; report?: string; error?: string }> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return { success: false, error: 'GEMINI_API_KEY is not set' }
  }

  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash'

  const prompt = `You are an elite Chief Learning Officer (CLO) and an expert in corporate instructional design. Your job is to analyze data from a "Strategic L&D Alignment Audit" and generate a hard-hitting, highly personalized, 3-section diagnostic report for a corporate L&D leader. 

Your tone must be authoritative, diagnostic, and urgent. Do not use corporate fluff. Speak directly to the business cost of delayed training.

Here is the user's diagnostic data:
- Primary Goal: ${payload.userGoal}
- Industry: ${payload.userIndustry}
- Target Role: ${payload.userRole}
- Most Critical Skill Gap Identified: ${payload.lowestScoringSkill} (Score: ${payload.skillScore}/5)
- Time it currently takes them to build a course: ${payload.timeToBuild}
- Primary Business Impact of this gap: ${payload.businessImpact}
- Company Size: ${payload.companySize} employees

Structure the report using the following three sections EXACTLY. 

### Section 1: The Strategic Diagnosis (Focus on the Gap)
Write one paragraph analyzing the severe disconnect between their [Primary Goal] and their low proficiency in [Most Critical Skill Gap] for their [Target Role]. Explain why failing to train this specific role effectively in this specific skill will directly cause [Primary Business Impact] within the [Industry] sector. Make the stakes clear.

### Section 2: The Bottleneck (Focus on the Cost of Time)
Write one paragraph aggressively challenging their [Time to build] timeframe. Explain that taking [Time to build] to deploy a custom training module for [Most Critical Skill Gap] is too slow for a company of [Company Size] people. Emphasize that while they are spending months drafting content, the business is actively bleeding money/efficiency due to the [Primary Business Impact]. 

### Section 3: The Skillar Bridge (The Solution)
Write a final, punchy paragraph pitching a better way. Explain that they do not have to choose between slow, custom training or fast, irrelevant off-the-shelf courses. Explicitly state that using an AI-powered curriculum engine can generate a highly customized, industry-specific module for [Target Role] focusing on [Most Critical Skill Gap] in a matter of days, allowing their instructional designers to edit and deploy immediately.

End the report with this exact Call to Action:
"Stop letting manual curriculum design bottleneck your growth. Click the link below to see a live demo of how we can generate your custom ${payload.lowestScoringSkill} module today."`

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 2048,
          },
        }),
      }
    )

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      return { success: false, error: `Gemini error (${res.status}): ${text}` }
    }

    const data = (await res.json()) as any
    const report: string | undefined =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join('') ||
      data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!report) {
      return { success: false, error: 'Gemini returned empty response' }
    }

    // Log full report to server terminal for easy inspection
    console.log('📝 GEMINI SKILLS GAP REPORT START =========================')
    console.log(report)
    console.log('📝 GEMINI SKILLS GAP REPORT END   =========================')

    return { success: true, report }
  } catch (e: any) {
    console.error('⚠️ Gemini report generation failed:', e)
    return { success: false, error: e?.message || 'Failed to call Gemini' }
  }
}

// Submit email to waitlist with reCAPTCHA
export async function submitToWaitlist(
  email: string,
  recaptchaToken: string,
  source?: string,
  discoverySource?: string
): Promise<WaitlistSubmissionResult> {
  try {
    // Get headers for tracking - await the headers function
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || 'Unknown'
    const forwardedFor = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const cfConnectingIp = headersList.get('cf-connecting-ip') // Cloudflare
    const xForwardedFor = headersList.get('x-forwarded-for')
    
    // Better IP address detection
    let ipAddress = 'unknown'
    if (cfConnectingIp) {
      ipAddress = cfConnectingIp
    } else if (xForwardedFor) {
      // x-forwarded-for can contain multiple IPs, get the first one (original client)
      ipAddress = xForwardedFor.split(',')[0].trim()
    } else if (realIp) {
      ipAddress = realIp
    } else if (forwardedFor) {
      ipAddress = forwardedFor.split(',')[0].trim()
    }
    
    // Handle localhost/development IPs
    if (ipAddress === '::1' || ipAddress === '127.0.0.1') {
      ipAddress = 'localhost'
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Invalid email format',
        errors: { email: 'Please enter a valid email address' }
      }
    }

    // Skip reCAPTCHA validation for localhost/development
    const isLocalhost = ipAddress === 'localhost' || process.env.NODE_ENV === 'development'
    
    if (!isLocalhost && recaptchaToken !== 'dev-bypass') {
      // Validate reCAPTCHA only in production
      const recaptchaValid = await verifyRecaptcha(recaptchaToken);
      if (!recaptchaValid) {
        // Log failed attempt
        await logSubmissionAttempt(ipAddress, userAgent, email, false, 'Invalid reCAPTCHA')
        
        return {
          success: false,
          message: 'Invalid reCAPTCHA',
          errors: { recaptcha: 'reCAPTCHA verification failed. Please try again.' }
        }
      }
    } else {
      console.log('🔧 Development mode: Skipping reCAPTCHA validation for localhost')
    }

    // Check for disposable email domains
    const disposableDomains = [
      '10minutemail.com', 'tempmail.org', 'guerrillamail.com',
      'mailinator.com', 'yopmail.com', 'temp-mail.org', 'throwaway.email',
      // Yopmail variants
      'yopmail.com', 'yopmail.fr', 'yopmail.net',
      // Mailinator variants
      'mailinator.net', 'mailinator.org',
      // 10MinuteMail variants
      '10minutemail.net', '10minutemail.co.uk',
      // Guerrilla Mail variants
      'guerrillamailblock.com', 'sharklasers.com',
      // TempMail variants
      'tempmail.com', 'tempmailo.com', 'tempmail.net',
      // TrashMail variants
      'trashmail.com', 'trashmail.net', 'trashmail.de',
      // Getnada / Inboxbear
      'getnada.com', 'inboxbear.com', 'nada.email',
      // EmailOnDeck
      'emailondeck.com',
      // FakeInbox
      'fakeinbox.com', 'fakeinbox.net',
      // Mohmal
      'mohmal.com',
      // Dispostable
      'dispostable.com',
      // ThrowawayMail
      'throwawaymail.com',
      // MailDrop
      'maildrop.cc',
      // BurnerMail
      'burnermail.io',
      // Guerillamail Variants
      'pokemail.net', 'grr.la',
      // Tempail
      'tempail.com',
      // Spamgourmet
      'spamgourmet.com',
      // AnonAddy
      'anonaddy.me',
      // Mailnesia
      'mailnesia.com',
      // MinuteInbox
      'minutemail.com', 'minutemail.net', 'minutemail.org',
      // MyTempEmail
      'mytempmail.com',
      // TMail
      'tmail.ws',
      // MailCatch
      'mailcatch.com',
      // ThrowAwayMail Variants
      'trash-mail.com', 'trash-mail.de', 'rcpt.at',
      // Other Known
      'spambog.com', 'bugmenot.com', 'mailtothis.com', 'instantemailaddress.com'
    ]
    
    const domain = email.split('@')[1]?.toLowerCase()
    if (disposableDomains.includes(domain)) {
      await logSubmissionAttempt(ipAddress, userAgent, email, false, 'Disposable email domain')
      
      return {
        success: false,
        message: 'Disposable email not allowed',
        errors: { email: 'Please use a permanent email address' }
      }
    }

    // Check rate limiting - max 5 attempts per IP per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    const recentAttempts = await prisma.submissionAttempt.count({
      where: {
        ipAddress: ipAddress,
        attemptedAt: {
          gte: oneHourAgo
        }
      }
    })

    if (recentAttempts >= 5) {
      await logSubmissionAttempt(ipAddress, userAgent, email, false, 'Rate limit exceeded')
      
      return {
        success: false,
        message: 'Too many attempts',
        errors: { general: 'Too many attempts. Please try again later.' }
      }
    }

    // Use the new email service for submission and sending
    const waitlistService = new WaitlistService()
    const result = await waitlistService.joinWaitlistAndSend({
      email,
      source,
      discoverySource,
      userAgent,
      ipAddress
    })

    // Log submission attempt based on result
    const success = result.result === 'ok' || result.result === 'exists'
    let reason: string | undefined
    
    switch (result.result) {
      case 'suppressed':
        reason = 'Email suppressed (hard bounce)'
        break
      case 'invalid':
        reason = 'Invalid email address'
        break
      case 'failed':
        reason = 'Email sending failed'
        break
      case 'exists':
        reason = 'Email already exists'
        break
    }

    await logSubmissionAttempt(ipAddress, userAgent, email, success, reason)

    // Handle different results
    switch (result.result) {
      case 'ok':
        // Revalidate any cached data
        revalidatePath('/')
        return {
          success: true,
          message: 'Successfully joined the waitlist!',
          userPosition: result.userPosition,
          totalUsers: result.totalUsers
        }

      case 'exists':
        return {
          success: false,
          message: 'Email already registered',
          errors: { email: 'This email is already on our waitlist!' }
        }

      case 'suppressed':
        return {
          success: false,
          message: 'Email not allowed',
          errors: { email: 'This email address cannot receive emails.' }
        }

      case 'invalid':
        return {
          success: false,
          message: 'Invalid email address',
          errors: { email: 'The email address appears to be invalid.' }
        }

      case 'failed':
      default:
        return {
          success: false,
          message: 'Server error',
          errors: { general: 'Something went wrong. Please try again.' }
        }
    }

  } catch (error) {
    console.error('Error submitting to waitlist:', error)
    
    // Log failed attempt - handle headers properly
    try {
      const headersList = await headers()
      const userAgent = headersList.get('user-agent') || 'Unknown'
      const forwardedFor = headersList.get('x-forwarded-for')
      const realIp = headersList.get('x-real-ip')
      const cfConnectingIp = headersList.get('cf-connecting-ip')
      
      let ipAddress = 'unknown'
      if (cfConnectingIp) {
        ipAddress = cfConnectingIp
      } else if (forwardedFor) {
        ipAddress = forwardedFor.split(',')[0].trim()
      } else if (realIp) {
        ipAddress = realIp
      }
      
      if (ipAddress === '::1' || ipAddress === '127.0.0.1') {
        ipAddress = 'localhost'
      }
      
      await logSubmissionAttempt(ipAddress, userAgent, email, false, 'Database error')
    } catch (headerError) {
      console.error('Error getting headers in catch block:', headerError)
    }

    return {
      success: false,
      message: 'Server error',
      errors: { general: 'Something went wrong. Please try again.' }
    }
  }
}

// Log submission attempt for analytics and spam prevention
async function logSubmissionAttempt(
  ipAddress: string,
  userAgent: string,
  email?: string,
  success: boolean = false,
  reason?: string
) {
  try {
    await prisma.submissionAttempt.create({
      data: {
        ipAddress, // Note: In production, you should encrypt this
        userAgent,
        email,
        success,
        reason
      }
    })
  } catch (error) {
    console.error('Error logging submission attempt:', error)
  }
}

// Get waitlist statistics
export async function getWaitlistStats() {
  try {
    const totalEmails = await prisma.emailSubmission.count({
      where: {
        status: 'ACTIVE'
      }
    })

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayEmails = await prisma.emailSubmission.count({
      where: {
        createdAt: {
          gte: today
        },
        status: 'ACTIVE'
      }
    })

    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const thisWeekEmails = await prisma.emailSubmission.count({
      where: {
        createdAt: {
          gte: weekAgo
        },
        status: 'ACTIVE'
      }
    })

    const totalAttempts = await prisma.submissionAttempt.count()
    const successfulAttempts = await prisma.submissionAttempt.count({
      where: {
        success: true
      }
    })

    return {
      totalEmails,
      todayEmails,
      thisWeekEmails,
      totalAttempts,
      successfulAttempts,
      conversionRate: totalAttempts > 0 ? (successfulAttempts / totalAttempts) * 100 : 0
    }
  } catch (error) {
    console.error('Error getting waitlist stats:', error)
    return {
      totalEmails: 0,
      todayEmails: 0,
      thisWeekEmails: 0,
      totalAttempts: 0,
      successfulAttempts: 0,
      conversionRate: 0
    }
  }
}

// Get total waitlist count for display
export async function getWaitlistCount(): Promise<number> {
  try {
    const totalUsers = await prisma.emailSubmission.count({
      where: {
        status: 'ACTIVE'
      }
    })
    
    return totalUsers
  } catch (error) {
    console.error('Error getting waitlist count:', error)
    return 0
  }
}

// Get all email submissions (for admin)
export async function getAllEmailSubmissions(
  page: number = 1,
  limit: number = 50
): Promise<{
  emails: EmailSubmissionData[]
  total: number
  pages: number
}> {
  try {
    const skip = (page - 1) * limit
    
    const [emails, total] = await Promise.all([
      prisma.emailSubmission.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          userAgent: true,
          source: true,
          status: true
        }
      }),
      prisma.emailSubmission.count()
    ])

    const pages = Math.ceil(total / limit)

    return {
      emails: emails as EmailSubmissionData[],
      total,
      pages
    }
  } catch (error) {
    console.error('Error getting email submissions:', error)
    return {
      emails: [],
      total: 0,
      pages: 0
    }
  }
}

// Export emails to CSV format
export async function exportEmailsToCSV(): Promise<string> {
  try {
    const emails = await prisma.emailSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        email: true,
        createdAt: true,
        userAgent: true,
        source: true,
        status: true
      }
    })

    // Create CSV header
    const csvHeader = 'Email,Date,Time,User Agent,Source,Status\n'
    
    // Create CSV rows
    const csvRows = emails.map((submission: {
      email: string;
      createdAt: Date;
      userAgent: string | null;
      source: string | null;
      status: string;
    }) => {
      const date = submission.createdAt.toLocaleDateString()
      const time = submission.createdAt.toLocaleTimeString()
      const userAgent = submission.userAgent || 'Unknown'
      const source = submission.source || 'Unknown'
      
      return `"${submission.email}","${date}","${time}","${userAgent}","${source}","${submission.status}"`
    }).join('\n')

    return csvHeader + csvRows
  } catch (error) {
    console.error('Error exporting emails to CSV:', error)
    throw new Error('Failed to export emails')
  }
}

// Unsubscribe email
export async function unsubscribeEmail(email: string): Promise<boolean> {
  try {
    await prisma.emailSubmission.update({
      where: { email },
      data: { status: 'UNSUBSCRIBED' }
    })
    
    revalidatePath('/')
    return true
  } catch (error) {
    console.error('Error unsubscribing email:', error)
    return false
  }
}

// Clean up old submission attempts (for maintenance)
export async function cleanupOldAttempts(): Promise<number> {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    
    const result = await prisma.submissionAttempt.deleteMany({
      where: {
        attemptedAt: {
          lt: thirtyDaysAgo
        }
      }
    })

    return result.count
  } catch (error) {
    console.error('Error cleaning up old attempts:', error)
    return 0
  }
}