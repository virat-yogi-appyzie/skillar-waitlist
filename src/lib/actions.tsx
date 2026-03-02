'use server'

/* =====================================================
   PDF GENERATION (WORKS LOCALLY & ON VERCEL)
===================================================== */



export async function generatePuppeteerPdf(input?: {
  name: string
  userGoal: string
  userIndustry: string
  userRole: string
  lowestScoringSkill: string
  skillScore: number
  timeToBuild: string
  businessImpact: string
  companySize: string
  aiReport?: string
}): Promise<string> {
  const effective = input ?? {
    name: 'Ritesh Upadhyay',
    userGoal: 'Reduce critical safety incidents by 20%',
    userIndustry: 'Heavy Manufacturing',
    userRole: 'Chief Learning Officer',
    lowestScoringSkill: 'Frontline safety & compliance',
    skillScore: 2,
    timeToBuild: '3-6 months',
    businessImpact: 'Regulatory & safety exposure',
    companySize: '5,000-19,999',
    aiReport: '',
  }

  const html = buildHtmlTemplate({
    name: effective.name,
    aiReport: effective.aiReport || '',
  })

  let browser

  if (process.env.VERCEL === '1') {
    // ✅ Vercel (Serverless)
    const chromium = await import('@sparticuz/chromium')
    const puppeteer = await import('puppeteer-core')

    browser = await puppeteer.default.launch({
      args: chromium.default.args,
      executablePath: await chromium.default.executablePath(),
      headless: true,
    })

  } else {
    // ✅ Local Development
    const puppeteer = await import('puppeteer')

    browser = await puppeteer.default.launch({
      headless: true,
    })
  }

  try {
    const page = await browser.newPage()

    // Use 'domcontentloaded' instead of 'networkidle0' to avoid waiting for external resources
    // This prevents timeouts from slow or unreachable external images/assets
    await page.setContent(html, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 // 60 second timeout as fallback
    })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '40px',
        bottom: '40px',
        left: '40px',
        right: '40px',
      },
    })

    return Buffer.from(pdfBuffer).toString('base64')

  } catch (error) {
    console.error('PDF generation failed:', error)
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
  } finally {
    await browser.close()
  }
}

/**
 * Extract plain text from HTML for PDF fallback
 */


/**
 * Generate a simple PDF from HTML - works without external dependencies
 * This creates a basic PDF file that can be downloaded
 */


/* =====================================================
   HTML TEMPLATE
===================================================== */

/**
 * Parse Gemini response into three sections
 */
function parseGeminiSections(aiReport: string): {
  section1: string
  section2: string
  section3: string
} {
  if (!aiReport || aiReport.trim().length === 0) {
    return {
      section1: 'No analysis available.',
      section2: 'No analysis available.',
      section3: 'No analysis available.',
    }
  }

  // Try to extract sections by headings
  const section1Match = aiReport.match(/###\s*Section 1[^\n]*\n([\s\S]*?)(?=###\s*Section 2|$)/i)
  const section2Match = aiReport.match(/###\s*Section 2[^\n]*\n([\s\S]*?)(?=###\s*Section 3|$)/i)
  const section3Match = aiReport.match(/###\s*Section 3[^\n]*\n([\s\S]*?)$/i)

  // Extract and clean the content
  const section1 = section1Match ? section1Match[1].trim() : ''
  const section2 = section2Match ? section2Match[1].trim() : ''
  const section3 = section3Match ? section3Match[1].trim() : ''

  // Fallback: if sections not found, try to split by paragraph breaks
  if (!section1 && !section2 && !section3) {
    const paragraphs = aiReport.split(/\n\n+/).filter(p => p.trim().length > 50)
    return {
      section1: paragraphs[0] || 'No analysis available.',
      section2: paragraphs[1] || 'No analysis available.',
      section3: paragraphs[2] || 'No analysis available.',
    }
  }

  return {
    section1: section1 || 'No analysis available.',
    section2: section2 || 'No analysis available.',
    section3: section3 || 'No analysis available.',
  }
}

function buildHtmlTemplate({
  name,
  aiReport,
}: {
  name: string
  aiReport: string
}) {
  // Parse the Gemini response into three sections
  const sections = parseGeminiSections(aiReport)
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Strategic L&D Alignment Audit - Skillar.ai</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        @page {
            size: A4;
            margin: 8mm 10mm 15mm 10mm;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: white;
        }

        /* Header Styles - Fixed on every page */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0;
            padding-bottom: 8px;
            border-bottom: 2px solid #3498db;
            margin-bottom: 15px;
            position: running(header);
        }

        .logo-section {
            display: flex;
            align-items: center;
        }

        .logo {
            max-width: 100px;
            height: auto;
        }

        .report-date {
            text-align: right;
            color: #7f8c8d;
            font-size: 11px;
        }

        .report-date strong {
            color: #2c3e50;
            font-size: 12px;
        }

        /* Title Section */
        .report-title {
            text-align: left;
            margin: 20px 0 30px 0;
        }

        .report-title h1 {
            font-size: 28px;
            color: #2c3e50;
            margin-bottom: 0;
        }

        /* Section Styles */
        .section-header {
            font-size: 22px;
            color: #2c3e50;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #e0e0e0;
            margin-top: 25px;
            page-break-after: avoid;
            page-break-inside: avoid;
        }

        .section-content {
            background: #f8f9fa;
            border-left: 4px solid #3498db;
            padding: 20px;
            margin: 15px 0;
            border-radius: 5px;
            font-size: 14px;
            line-height: 1.8;
            color: #2c3e50;
            text-align: justify;
            page-break-inside: avoid;
        }

        .section-content p {
            margin-bottom: 15px;
        }

        /* Footer - Fixed on every page */
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 12px 10mm;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #7f8c8d;
            font-size: 10px;
            background: white;
        }

        .footer-logo {
            font-weight: bold;
            color: #3498db;
        }

        /* Content area to account for fixed footer */
        .content {
            margin-bottom: 50px;
        }

        @media print {
            .header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                padding: 8px 10mm;
                background: white;
                z-index: 1000;
            }

            .footer {
                position: fixed;
                bottom: 0;
            }

            .content {
                margin-top: 60px;
                margin-bottom: 60px;
            }

            .section-header {
                page-break-after: avoid;
                page-break-inside: avoid;
                page-break-before: auto;
            }

            .section-content {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <!-- Header - Fixed on every page -->
    <div class="header">
        <div class="logo-section">
            <img src="https://app.skillar.ai/full-skillar-logo.png" alt="Skillar.ai" class="logo" />
        </div>
        <div class="report-date">
            <div>Prepared for</div>
            <div><strong>${escapeHtml(name)}</strong></div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="content">
        <!-- Report Title -->
        <div class="report-title">
            <h1>Strategic L&D Alignment Audit</h1>
        </div>

        <!-- Section 1: The Strategic Diagnosis -->
        <h2 class="section-header">The Strategic Diagnosis</h2>
        <div class="section-content">
            ${escapeHtml(sections.section1)}
        </div>

        <!-- Section 2: The Bottleneck -->
        <h2 class="section-header">The Bottleneck</h2>
        <div class="section-content">
            ${escapeHtml(sections.section2)}
        </div>

        <!-- Section 3: The Skillar Bridge -->
        <h2 class="section-header">The Skillar Bridge</h2>
        <div class="section-content">
            ${escapeHtml(sections.section3)}
        </div>
    </div>

    <!-- Footer - Fixed on every page -->
    <div class="footer">
        <p><span class="footer-logo">skillar.ai</span> — Confidential Strategic Advisory</p>
    </div>
</body>
</html>
`
}

/* =====================================================
   SECURITY SAFE ESCAPE
===================================================== */

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/* =====================================================
   SKILLS GAP REPORT GENERATION (WITH GEMINI API)
===================================================== */

export async function generateSkillsGapReport(input: {
  userGoal: string
  userIndustry: string
  userRole: string
  lowestScoringSkill: string
  skillScore: number
  timeToBuild: string
  businessImpact: string
  companySize: string
}): Promise<{ success: boolean; fullReport?: string; error?: string }> {
  try {
    // Get API key and model from environment
    const apiKey = process.env.GEMINI_API_KEY
    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
    
    if (!apiKey) {
      console.warn('⚠️ GEMINI_API_KEY not set - returning placeholder')
      return getPlaceholderReport(input)
    }

    // Import Gemini SDK
    const { GoogleGenerativeAI } = await import('@google/generative-ai')
    const client = new GoogleGenerativeAI(apiKey)
    
    // Use configured model
    const model = client.getGenerativeModel({ model: modelName })

    // Create the prompt
    const prompt = `You are an elite Chief Learning Officer (CLO) and an expert in corporate instructional design. Your job is to analyze data from a "Strategic L&D Alignment Audit" and generate a hard-hitting, highly personalized, 3-section diagnostic report for a corporate L&D leader. 

Your tone must be authoritative, diagnostic, and urgent. Do not use corporate fluff. Speak directly to the business cost of delayed training.

Here is the user's diagnostic data:
- Primary Goal: ${input.userGoal}
- Industry: ${input.userIndustry}
- Target Role: ${input.userRole}
- Most Critical Skill Gap Identified: ${input.lowestScoringSkill} (Score: ${input.skillScore}/5)
- Time it currently takes them to build a course: ${input.timeToBuild}
- Primary Business Impact of this gap: ${input.businessImpact}
- Company Size: ${input.companySize} employees

Structure the report using the following three sections EXACTLY. 

### Section 1: The Strategic Diagnosis (Focus on the Gap)
Write one paragraph analyzing the severe disconnect between their [Primary Goal] and their low proficiency in [Most Critical Skill Gap] for their [Target Role]. Explain why failing to train this specific role effectively in this specific skill will directly cause [Primary Business Impact] within the [Industry] sector. Make the stakes clear.

### Section 2: The Bottleneck (Focus on the Cost of Time)
Write one paragraph aggressively challenging their [Time to build] timeframe. Explain that taking [Time to build] to deploy a custom training module for [Most Critical Skill Gap] is too slow for a company of [Company Size] people. Emphasize that while they are spending months drafting content, the business is actively bleeding money/efficiency due to the [Primary Business Impact]. 

### Section 3: The Skillar Bridge (The Solution)
Write a final, punchy paragraph pitching a better way. Explain that they do not have to choose between slow, custom training or fast, irrelevant off-the-shelf courses. Explicitly state that using an AI-powered curriculum engine can generate a highly customized, industry-specific module for [Target Role] focusing on [Most Critical Skill Gap] in a matter of days, allowing their instructional designers to edit and deploy immediately.

End the report with this exact Call to Action:
"Stop letting manual curriculum design bottleneck your growth. Click the link below to see a live demo of how we can generate your custom ${input.lowestScoringSkill} module today."`

    console.log('📤 Calling Gemini API...')
    
    // Call Gemini and get response
    const response = await model.generateContent(prompt)
    const fullReport = response.response.text()

    console.log('✅ Gemini response received')
    console.log('📊 Response length:', fullReport.length, 'characters')

    if (!fullReport || fullReport.trim().length === 0) {
      console.warn('⚠️ Empty response from Gemini')
      return getPlaceholderReport(input)
    }
    // Paste the code here
    console.log('📄 Gemini Report Preview:', fullReport.substring(0, 500), '...')
    return {
      success: true,
      fullReport: fullReport.trim(),
    }

  } catch (error) {
    console.error('❌ Gemini API call failed:', error)
    
    // Check if it's an API key issue
    if (error instanceof Error && error.message.includes('API key')) {
      return {
        success: false,
        error: 'Gemini API key not configured or invalid',
      }
    }

    // For other errors, show the actual error
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to call Gemini API',
    }
  }
}


/**
 * Get placeholder report when Gemini is not available
 */
function getPlaceholderReport(input: {
  userGoal: string
  userIndustry: string
  userRole: string
  lowestScoringSkill: string
  skillScore: number
  timeToBuild: string
  businessImpact: string
  companySize: string
}): { success: boolean; fullReport?: string; error?: string } {
  const fullReport = `
SKILLS GAP ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString()}

ORGANIZATION PROFILE
- Industry: ${input.userIndustry}
- Role: ${input.userRole}  
- Company Size: ${input.companySize}
- Business Goal: ${input.userGoal}

CRITICAL SKILL GAP
Skill: ${input.lowestScoringSkill}
Current Proficiency: ${input.skillScore}/5
Timeline to Build: ${input.timeToBuild}
Business Impact: ${input.businessImpact}

ANALYSIS
This organization has identified a critical gap in "${input.lowestScoringSkill}". With only ${input.skillScore}/5 proficiency and ${input.timeToBuild} needed to build training internally, this represents significant business risk given the ${input.businessImpact} impact level.

RECOMMENDATIONS
1. Fast-track capability development given the impact level
2. Consider accelerated solutions vs. ${input.timeToBuild} timeline
3. Focus on high-impact roles first
4. Implement interim mitigation strategies
5. Establish clear proficiency targets and measurement

NOTE: This is a placeholder analysis. Configure GEMINI_API_KEY environment variable to get AI-powered analysis.
  `.trim()

  return {
    success: true,
    fullReport,
  }
}


/* =====================================================
   SEND SKILLS GAP REPORT VIA EMAIL
===================================================== */

export async function sendSkillsGapReportEmail(input: {
  name: string
  email: string
  userGoal: string
  userIndustry: string
  userRole: string
  lowestScoringSkill: string
  skillScore: number
  timeToBuild: string
  businessImpact: string
  companySize: string
  aiReport: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const nodemailer = await import('nodemailer')

    // 1. Generate the PDF (returns base64)
    console.log('📄 Generating PDF for email...')
    const base64Pdf = await generatePuppeteerPdf({
      name: input.name,
      userGoal: input.userGoal,
      userIndustry: input.userIndustry,
      userRole: input.userRole,
      lowestScoringSkill: input.lowestScoringSkill,
      skillScore: input.skillScore,
      timeToBuild: input.timeToBuild,
      businessImpact: input.businessImpact,
      companySize: input.companySize,
      aiReport: input.aiReport,
    })

    if (!base64Pdf) {
      throw new Error('PDF generation returned empty result')
    }

    // 2. Convert base64 to Buffer for attachment
    const pdfBuffer = Buffer.from(base64Pdf, 'base64')
    console.log('📎 PDF generated, size:', pdfBuffer.length, 'bytes')

    // 3. Create SMTP transporter
    const transporter = nodemailer.default.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    // 4. Send the email with PDF attachment
    console.log('📧 Sending email to:', input.email)
    await transporter.sendMail({
      from: `Skillar.ai <${process.env.EMAIL_USER}>`,
      to: input.email,
      subject: `Your Strategic L&D Alignment Audit — ${input.name}`,
     html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <div style="text-align: center; margin-bottom: 30px;">
    <img src="https://app.skillar.ai/full-skillar-logo.png" 
         alt="Skillar.ai" 
         style="max-width: 150px; height: auto;" />
  </div>

  <h2 style="color: #2c3e50; margin-bottom: 10px;">
    Hi ${escapeHtml(input.name)},
  </h2>

  <p style="color: #555; line-height: 1.6;">
    Thank you for completing the Skillar.ai Skills Gap Diagnostic.
  </p>

  <p style="color: #555; line-height: 1.6;">
    Attached to this email, you'll find your personalized 
    <strong>Strategic L&D Alignment Audit</strong> — a tailored PDF report that breaks down:
  </p>

  <ul style="color: #555; line-height: 1.8; padding-left: 20px;">
    <li>
      <strong>The Strategic Diagnosis</strong> — why your critical skill gap in 
      <em>${escapeHtml(input.lowestScoringSkill)}</em> is a business risk
    </li>
    <li>
      <strong>The Bottleneck</strong> — the real cost of your current 
      ${escapeHtml(input.timeToBuild)} build timeline
    </li>
    <li>
      <strong>The Skillar Bridge</strong> — how to compress months into days with AI-powered curriculum design
    </li>
  </ul>

  <p style="color: #555; line-height: 1.6;">
    Ready to see how fast we can build your custom training module?
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://app.skillar.ai" 
       target="_blank"
       title="Click to visit Skillar.ai"
       style="background: linear-gradient(135deg, #3498db, #2980b9); 
              color: white; 
              padding: 14px 30px; 
              text-decoration: none; 
              border-radius: 8px; 
              font-weight: 600; 
              display: inline-block;">
      Book a Live Demo
    </a>
  </div>

  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />

  <p style="color: #999; font-size: 12px; text-align: center;">
    Skillar.ai — Confidential Strategic Advisory<br/>
    This email was sent because you completed a Skills Gap Diagnostic on 
    <a href="https://app.skillar.ai" 
       target="_blank"
       title="Click to visit Skillar.ai"
       style="color:#3498db; text-decoration: underline; font-weight:500;">
       skillar.ai
    </a>
  </p>

</div>
`,
      text: `Hi ${input.name},\n\nThank you for completing the <a href="https://app.skillar.ai" 
       target="_blank"
       title="Click to visit Skillar.ai"
       style="color:#3498db; text-decoration: underline; font-weight:500;">Skillar.ai </a> Skills Gap Diagnostic. Attached is your personalized Strategic L&D Alignment Audit.\n\nSkillar.ai — Confidential Strategic Advisory`,
      attachments: [
        {
          filename: `Skillar-AI-Skills-Gap-Report-${input.name.replace(/\s+/g, '-')}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    })

    console.log('✅ Email sent successfully to:', input.email)
    return { success: true }

  } catch (error) {
    console.error('❌ Failed to send skills gap report email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

/* =====================================================
   SKILLS GAP ASSESSMENT PERSISTENCE
===================================================== */

export async function saveSkillsGapAssessment(input: {
  name: string
  email: string
  industryName: string
  roleName: string
  userGoal: string
  selectedSkills: Array<{ name: string; proficiency: number }>
  timeToBuildLabel: string
  businessImpact: string
  companySize: string
  criticalFlag: boolean
}): Promise<{ success: boolean; error?: string }> {
  try {
    // TODO: Save assessment to database via Prisma
    // For now, just log and return success
    console.log('Saving skills gap assessment:', {
      name: input.name,
      email: input.email,
      industry: input.industryName,
      role: input.roleName,
      skillsCount: input.selectedSkills.length,
      criticalFlag: input.criticalFlag,
    })

    // This would normally save to database
    // const assessment = await prisma.skillsGapAssessment.create({
    //   data: {
    //     name: input.name,
    //     email: input.email,
    //     industryName: input.industryName,
    //     roleName: input.roleName,
    //     userGoal: input.userGoal,
    //     timeToBuildLabel: input.timeToBuildLabel,
    //     businessImpact: input.businessImpact,
    //     companySize: input.companySize,
    //     criticalFlag: input.criticalFlag,
    //     selectedSkills: input.selectedSkills,
    //   }
    // })

    return { success: true }
  } catch (error) {
    console.error('Failed to save skills gap assessment:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/* =====================================================
   WAITLIST SUBMISSION TYPES
===================================================== */

export interface WaitlistSubmissionResult {
  success: boolean
  userPosition?: number
  message?: string
  errors?: {
    email?: string
    recaptcha?: string
    general?: string
  }
}

/* =====================================================
   WAITLIST OPERATIONS
===================================================== */

export async function getWaitlistCount(): Promise<number> {
  try {
    // Import prisma only when needed (avoids import at module level)
    const { prisma } = await import('@/lib/db')
    
    const count = await prisma.emailSubmission.count({
      where: {
        status: 'ACTIVE',
        confirmedAt: { not: null },
      },
    })
    
    return count
  } catch (error) {
    console.error('Error fetching waitlist count:', error)
    return 0
  }
}

export async function submitToWaitlist(
  email: string,
  recaptchaToken: string,
  source: string,
  discoverySource: string
): Promise<WaitlistSubmissionResult> {
  try {
    // Validate email format
    if (!email || !email.includes('@')) {
      return {
        success: false,
        errors: { email: 'Please enter a valid email address' },
      }
    }

    if (!discoverySource) {
      return {
        success: false,
        errors: { general: 'Please select how you discovered us' },
      }
    }

    // Skip reCAPTCHA verification in development
    if (process.env.NODE_ENV !== 'development' && recaptchaToken !== 'dev-bypass') {
      // TODO: Implement reCAPTCHA verification
      // For now, accept all tokens
      if (!recaptchaToken) {
        return {
          success: false,
          errors: { recaptcha: 'Please complete reCAPTCHA verification' },
        }
      }
    }

    // Import prisma and WaitlistService
    const { prisma } = await import('@/lib/db')
    const { WaitlistService } = await import('@/lib/waitlist-service')

    // Use WaitlistService to handle submission
    const service = new WaitlistService()
    const result = await service.joinWaitlistAndSend({
      email,
      source,
      discoverySource,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    })

    if (result.result === 'ok' || result.result === 'exists') {
      return {
        success: true,
        userPosition: result.userPosition,
        message: result.result === 'exists' 
          ? 'You are already on our waitlist!' 
          : 'Successfully added to waitlist!',
      }
    } else if (result.result === 'invalid') {
      return {
        success: false,
        errors: { email: 'Invalid email address' },
      }
    } else if (result.result === 'suppressed') {
      return {
        success: false,
        errors: { email: 'This email is not eligible for our waitlist' },
      }
    } else {
      return {
        success: false,
        errors: { general: result.error || 'Failed to add to waitlist' },
      }
    }
  } catch (error) {
    console.error('Error submitting to waitlist:', error)
    return {
      success: false,
      errors: { general: 'An error occurred. Please try again.' },
    }
  }
}