'use server'

import { PrismaClient } from '@/generated/prisma'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

const prisma = new PrismaClient()

export interface WaitlistSubmissionResult {
  success: boolean
  message: string
  userPosition?: number // Add user position for successful submissions
  totalUsers?: number // Add total users count
  errors?: {
    email?: string
    captcha?: string
    general?: string
  }
}

export interface EmailSubmissionData {
  id: string
  email: string
  createdAt: Date
  userAgent: string | null
  source: string | null
  status: 'ACTIVE' | 'UNSUBSCRIBED'
}

// Submit email to waitlist
export async function submitToWaitlist(
  email: string,
  captchaAnswer: number,
  expectedAnswer: number,
  source?: string
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

    // Validate CAPTCHA
    if (captchaAnswer !== expectedAnswer) {
      // Log failed attempt
      await logSubmissionAttempt(ipAddress, userAgent, email, false, 'Invalid CAPTCHA')
      
      return {
        success: false,
        message: 'Invalid CAPTCHA',
        errors: { captcha: 'Incorrect answer. Please try again.' }
      }
    }

    // Check for disposable email domains
    const disposableDomains = [
      '10minutemail.com', 'tempmail.org', 'guerrillamail.com',
      'mailinator.com', 'yopmail.com', 'temp-mail.org', 'throwaway.email'
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

    // Check if email already exists
    const existingSubmission = await prisma.emailSubmission.findUnique({
      where: { email }
    })

    if (existingSubmission) {
      await logSubmissionAttempt(ipAddress, userAgent, email, false, 'Email already exists')
      
      return {
        success: false,
        message: 'Email already registered',
        errors: { email: 'This email is already on our waitlist!' }
      }
    }

    // Create new email submission
    const newSubmission = await prisma.emailSubmission.create({
      data: {
        email,
        userAgent,
        ipAddress, // Note: In production, you should encrypt this
        source: source || 'waitlist-form'
      }
    })

    // Get the user's position in the waitlist and total count
    const totalUsers = await prisma.emailSubmission.count({
      where: {
        status: 'ACTIVE'
      }
    })

    // Get user's position by counting submissions created before or at the same time
    const userPosition = await prisma.emailSubmission.count({
      where: {
        createdAt: {
          lte: newSubmission.createdAt
        },
        status: 'ACTIVE'
      }
    })

    // Log successful attempt
    await logSubmissionAttempt(ipAddress, userAgent, email, true)

    // Revalidate any cached data
    revalidatePath('/')

    return {
      success: true,
      message: 'Successfully joined the waitlist!',
      userPosition,
      totalUsers
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
    const csvRows = emails.map(submission => {
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