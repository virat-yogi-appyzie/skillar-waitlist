'use server'

import { aiService } from './ai-service/ai-service 1'
import { SKILLAR_LOGO_DATA_URI } from './logo'

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
  // Comma-separated list of all assessed skills with ratings
  skillsOverview?: string
  // Text summary of all roles and their skills
  rolesOverview?: string
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
    skillsOverview: 'Frontline safety & compliance (2/5); Leadership coaching (3/5)',
    rolesOverview: 'Chief Learning Officer: Frontline safety & compliance (2/5), Leadership coaching (3/5)',
  }

  const html = buildHtmlTemplate({
    name: effective.name,
    aiReport: effective.aiReport || '',
    userGoal: effective.userGoal,
    userIndustry: effective.userIndustry,
    userRole: effective.userRole,
    companySize: effective.companySize,
    lowestScoringSkill: effective.lowestScoringSkill,
    timeToBuild: effective.timeToBuild,
    businessImpact: effective.businessImpact,
    skillsOverview: effective.skillsOverview || '',
    rolesOverview: effective.rolesOverview || '',
  })

  let browser

  if (process.env.VERCEL === '1') {
    // ✅ Vercel (Serverless)
    const chromium = await import('@sparticuz/chromium')
    const puppeteer = await import('puppeteer-core')

    browser = await puppeteer.default.launch({
      args: chromium.default.args,
      executablePath: await chromium.default.executablePath(),
      headless:true,
    })

  } else {
    // ✅ Local Development
    const packageName = 'puppeteer';
    const puppeteer = await import(packageName);

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
      displayHeaderFooter: true,

      headerTemplate: buildHeader(effective.name),
      footerTemplate: buildFooter(),
          margin: {
            top: '110px',
            bottom: '70px',
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
  userGoal,
  userIndustry,
  userRole,
  companySize,
  lowestScoringSkill,
  timeToBuild,
  businessImpact,
  skillsOverview,
  rolesOverview,
}: {
  name: string
  aiReport: string
  userGoal: string
  userIndustry: string
  userRole: string
  companySize: string
  lowestScoringSkill: string
  timeToBuild: string
  businessImpact: string
  skillsOverview: string
  rolesOverview: string
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
    margin: 20mm 10mm 10mm 10mm;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #2c3e50;
    background: white;
}

/* ================= HEADER ================= */

.header {
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;

   border-bottom: 2px solid #000;
   padding-bottom: 6px;
    background: white;
    z-index: 1000;
}

.logo-img {
    width: 120px;
    height: auto;
    display: block;
    margin:0
}

.report-date {
    text-align: right;
    font-size: 11px;
    color: #7f8c8d;
}

.report-date strong {
    color: #2c3e50;
    font-size: 12px;
}

/* ================= CONTENT ================= */

.content {
  display: flex;
  flex-direction: column;
  flex:  1;
  margin-top: 15px;
  margin-bottom: 10px;
}


.report-title {
    margin-top: 5px;     
}

.report-title h1 {
    font-size: 28px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 5px;
}

/* Section Headers */

.section-header:first-of-type {
    margin-top: 18px;   
}

.section-header {
    font-size: 18px;
    margin: 24px 0 14px 0;   
    padding-bottom: 6px;     
    border-bottom: 1px solid #dcdcdc;  /* lighter */
    font-weight: 600;
    page-break-after: avoid;
}

/* Section Content */

.section-content {
    font-size: 11px;
    line-height: 1.7;
    margin-bottom: 20px;
}

.section-content p {
    margin-bottom: 10px;
}

/* Lists */

ul.bullet-list {
    margin: 10px 0 12px 20px;
}

ol.numbered-list {
    margin: 10px 0 12px 20px;
}

.numbered-item {
    margin-bottom: 6px;
}

/* Tables */

table.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 14px 0;
    font-size: 10px;
    border: 1px solid #ddd;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 14px 0;
    font-size: 10px;
    border: 1px solid #ddd;
}

table.data-table th {
    background: #444;
    color: white;
    padding: 8px;
    text-align: left;
}

table th {
    background: #444;
    color: white;
    padding: 8px;
    text-align: left;
}
table.data-table td {
    padding: 8px;
    border-bottom: 1px solid #e8e8e8;
}
table  td {
    padding: 8px;
    border-bottom: 1px solid #e8e8e8;
}

table.data-table tr:nth-child(even) {
    background: #fafafa;
}

table tr:nth-child(even) {
    background: #fafafa;
}

.risk-critical { color: #c0392b; font-weight: 600; }
.risk-high { color: #d35400; font-weight: 600; }
.highlight-positive { color: #27ae60; font-weight: 600; }
</style>
</head>

<body>



<!-- CONTENT -->
<div class="content">

    <div class="report-title">
        <h1>Strategic L&D Alignment Audit</h1>
    </div>

    <table class="data-table" style="margin-top: 6px; font-size: 10px;">
      <tbody>
        <tr>
          <th style="width: 32%;">Industry</th>
          <td>${escapeHtml(userIndustry || 'Not specified')}</td>
        </tr>
        <tr>
          <th>Role(s)</th>
          <td>${escapeHtml(userRole || 'Not specified')}</td>
        </tr>
        <tr>
          <th>Company Size</th>
          <td>${escapeHtml(companySize || 'Not specified')}</td>
        </tr>
        <tr>
          <th>Primary Goal</th>
          <td>${escapeHtml(userGoal || 'Not specified')}</td>
        </tr>
        <tr>
          <th>Critical Skill Highlight</th>
          <td>${escapeHtml(lowestScoringSkill || 'Not specified')} — ${escapeHtml(timeToBuild || '')} · ${escapeHtml(businessImpact || '')}</td>
        </tr>
        <tr>
          <th>All Assessed Skill Areas</th>
          <td>${escapeHtml(skillsOverview || 'Not specified')}</td>
        </tr>
        <tr>
          <th>Roles & Skill Breakdown</th>
          <td>${escapeHtml(rolesOverview || 'Not specified')}</td>
        </tr>
      </tbody>
    </table>

    <h2 class="section-header">1. The Strategic Diagnosis</h2>
    <div class="section-content">
        ${markdownToHtml(sections.section1)}
    </div>

    <h2 class="section-header">2. The Bottleneck</h2>
    <div class="section-content">
        ${markdownToHtml(sections.section2)}
    </div>

    <h2 class="section-header">3. The Skillar Bridge</h2>
    <div class="section-content">
        ${markdownToHtml(sections.section3)}
    </div>

</div>



</body>
</html>
`
}

function buildHeader(name: string) {
  return `
  <div style="
    width:100%;
    font-size:10px;
    padding:0 40px;
  ">
      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding-bottom:8px;
      ">
          <img src="${SKILLAR_LOGO_DATA_URI}" style="height:28px" />

          <div style="text-align:right;">
              <div>Prepared for</div>
              <div style="font-weight:600">${escapeHtml(name)}</div>
          </div>
      </div>
      <div style="
        border-bottom:1px solid #2c3e50;
        margin:0;
      "></div>
  </div>
  `
}

function buildFooter() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return `
  <div style="
      width:100%;
      font-size:9px;
      color:#7f8c8d;
      padding:0 40px;
      text-align:center;
  ">
      skillar.ai — Confidential Strategic Advisory | ${currentDate}
      <span style="float:right">
        Page <span class="pageNumber"></span> / <span class="totalPages"></span>
      </span>
  </div>
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
   MARKDOWN TO HTML CONVERTER
===================================================== */

function markdownToHtml(markdown: string): string {
  if (!markdown) return ''
  
  let html = markdown
  
  // Escape basic HTML first (but preserve our formatting)
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // Convert tables (must be done before other conversions)
  // More flexible regex to match markdown tables
  html = html.replace(/(\|[^\n]+\|)\n(\|[\s:|-]+\|)\n((?:\|[^\n]+\|\n?)+)/g, (match, headerRow, separatorRow, bodyRows) => {
    // Parse header cells
    const headers = headerRow
      .split('|')
      .map((h: string) => h.trim())
      .filter((h: string) => h.length > 0)
    
    // Parse body rows
    const rows = bodyRows
      .trim()
      .split('\n')
      .filter((row: string) => row.trim().length > 0)
      .map((row: string) => 
        row
          .split('|')
          .map((cell: string) => cell.trim())
          .filter((cell: string, idx: number, arr: string[]) => {
            // Filter out empty first/last cells from | delimiters
            if (idx === 0 && cell === '') return false
            if (idx === arr.length - 1 && cell === '') return false
            return true
          })
      )
    
    let table = '<table class="data-table"><thead><tr>'
    headers.forEach((h: string) => {
      table += `<th>${h}</th>`
    })
    table += '</tr></thead><tbody>'
    rows.forEach((row: string[]) => {
      table += '<tr>'
      row.forEach((cell: string) => {
        // Apply risk level styling
        let cellClass = ''
        if (cell === 'CRITICAL') cellClass = ' class="risk-critical"'
        else if (cell === 'HIGH') cellClass = ' class="risk-high"'
        else if (cell.includes('faster') || cell === 'Immediate' || cell === '100% targeted') cellClass = ' class="highlight-positive"'
        table += `<td${cellClass}>${cell}</td>`
      })
      table += '</tr>'
    })
    table += '</tbody></table>'
    return table
  })
  
  // Convert bold headers like **Key Risk Indicators:**
  html = html.replace(/\*\*([^*]+):\*\*/g, '<h4 class="subsection-header">$1</h4>')
  
  // Convert remaining bold text
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  
  // Convert numbered lists
  html = html.replace(/^(\d+).\s+(.+)$/gm,'<li class="numbered-item">$2</li>')
  html = html.replace(/(<li class="numbered-item">.*<\/li>\n?)+/g, '<ol class="numbered-list">$&</ol>')
  
  // Convert bullet lists (- item)
  html = html.replace(/^-\s+(.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>(?!<span class="list-number").*<\/li>\n?)+/g, (match) => {
    if (!match.includes('numbered-item')) {
      return '<ul class="bullet-list">' + match + '</ul>'
    }
    return match
  })
  
  // Convert paragraphs (double newlines)
  html = html.replace(/\n\n+/g, '</p><p>')
  html = '<p>' + html + '</p>'
  
  // Clean up empty paragraphs and fix structure
  html = html.replace(/<p>\s*<\/p>/g, '')
  html = html.replace(/<p>\s*(<h4|<table|<ul|<ol)/g, '$1')
  html = html.replace(/(<\/h4>|<\/table>|<\/ul>|<\/ol>)\s*<\/p>/g, '$1')
  html = html.replace(/<p>\s*<h4/g, '<h4')
  html = html.replace(/<\/h4>\s*<\/p>/g, '</h4>')
  
  // Fix any remaining single newlines to line breaks within paragraphs
  html = html.replace(/([^>])\n([^<])/g, '$1<br/>$2')
  
  return html
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
  // Text summary of ALL selected skills and their ratings
  skillsOverview: string
  // Text summary of ALL roles and their skills
  rolesOverview: string
}): Promise<{ success: boolean; fullReport?: string; error?: string }> {
  try {

    const result = await aiService.generateSkillGap(input)
    if (!result.success) {
      return { success: false, error: result.message }
    }

    // Get API key and model from environment
    // const apiKey = process.env.GEMINI_API_KEY
    // const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
    
    // if (!apiKey) {
    //   console.warn('⚠️ GEMINI_API_KEY not set - returning placeholder')
    //   return getPlaceholderReport(input)
    // }

    // // Import Gemini SDK
    // const { GoogleGenerativeAI } = await import('@google/generative-ai')
    // const client = new GoogleGenerativeAI(apiKey)
    
    // Use configured model
    // const model = client.getGenerativeModel({ model: modelName })

    // Create the prompt with tables and lists
//     const skillRiskLevel = input.skillScore <= 2 ? 'CRITICAL' : 'HIGH'
//     const trainingRiskLevel = input.timeToBuild.includes('6') || input.timeToBuild.includes('12') ? 'CRITICAL' : 'HIGH'
//     const proficiencyLabel = input.skillScore === 1 ? 'Critical' : input.skillScore === 2 ? 'Major Gap' : 'Moderate Gap'
//     const timeSavings = input.timeToBuild.includes('6') || input.timeToBuild.includes('12') ? '5-6 months' : '3-4 months'
//     const impactSavings = input.timeToBuild.includes('6') || input.timeToBuild.includes('12') ? '8-11 months' : '5-8 months'
//     const speedImprovement = input.timeToBuild.includes('6') || input.timeToBuild.includes('12') ? '95%+ faster' : '90%+ faster'
//     const deploySpeed = input.timeToBuild.includes('6') || input.timeToBuild.includes('12') ? '12x faster' : '8x faster'
    
//     const prompt = `You are an elite Chief Learning Officer (CLO) and an expert in corporate instructional design. Your job is to analyze data from a "Strategic L&D Alignment Audit" and generate a hard-hitting, highly personalized, 3-section diagnostic report for a corporate L&D leader. 

// Your tone must be authoritative, diagnostic, and urgent. Do not use corporate fluff. Speak directly to the business cost of delayed training.

// Here is the user's diagnostic data:
// - Primary Goal: ${input.userGoal}
// - Industry: ${input.userIndustry}
// - Target Role: ${input.userRole}
// - Most Critical Skill Gap Identified: ${input.lowestScoringSkill} (Score: ${input.skillScore}/5)
// - Time it currently takes them to build a course: ${input.timeToBuild}
// - Primary Business Impact of this gap: ${input.businessImpact}
// - Company Size: ${input.companySize} employees

// Structure the report using the following three sections EXACTLY. Use numbered points, bullet lists, and tables. DO NOT write long paragraphs. Break everything into scannable numbered points with proper subheadings.

// ### Section 1: The Strategic Diagnosis

// **1.1 Executive Summary**
// Write 3-4 numbered points analyzing the disconnect between their goal and skill gap:
// 1. [First key insight about the gap between ${input.userGoal} and ${input.lowestScoringSkill}]
// 2. [Second point about why ${input.userRole} needs this skill]
// 3. [Third point about business risk in ${input.userIndustry}]
// 4. [Fourth point about ${input.businessImpact} consequences]

// **1.2 Risk Assessment**
// | Metric | Current State | Risk Level |
// |--------|---------------|------------|
// | Skill Proficiency | ${input.skillScore}/5 | ${skillRiskLevel} |
// | Training Timeline | ${input.timeToBuild} | ${trainingRiskLevel} |
// | Business Exposure | ${input.businessImpact} | HIGH |
// | Workforce Impact | ${input.companySize} employees | ${skillRiskLevel} |

// **1.3 Key Risk Indicators**
// - Critical Skill Gap: ${input.lowestScoringSkill}
// - Current Proficiency: ${input.skillScore}/5 (${proficiencyLabel})
// - Business Impact Zone: ${input.businessImpact}
// - Target Role: ${input.userRole}
// - Industry: ${input.userIndustry}

// ### Section 2: The Bottleneck

// **2.1 Time Analysis**
// Write 3-4 numbered points challenging their timeline:
// 1. [First point about why ${input.timeToBuild} is too slow for ${input.companySize} employees]
// 2. [Second point about opportunity cost during development]
// 3. [Third point about ${input.businessImpact} compounding daily]
// 4. [Fourth point about competitive disadvantage]

// **2.2 Cost of Delay**
// | Factor | Your Current State | Business Impact |
// |--------|-------------------|----------------|
// | Development Time | ${input.timeToBuild} | Extended exposure |
// | Workforce Gap | ${input.companySize} employees | Productivity loss |
// | Skill Deficit | ${input.lowestScoringSkill} at ${input.skillScore}/5 | Performance drag |
// | Business Risk | ${input.businessImpact} | Revenue/safety impact |

// **2.3 The Real Cost**
// - Training Development Time: ${input.timeToBuild}
// - Affected Workforce: ${input.companySize} employees
// - Critical Skill Gap: ${input.lowestScoringSkill} (${input.skillScore}/5)
// - Ongoing Business Impact: ${input.businessImpact}

// ### Section 3: The Skillar Bridge

// **3.1 The Solution**
// Write 3-4 numbered points about the AI-powered approach:
// 1. [First point about AI curriculum generation in days vs months]
// 2. [Second point about industry-specific customization for ${input.userIndustry}]
// 3. [Third point about immediate deployment to ${input.companySize} employees]
// 4. [Fourth point about measurable impact on ${input.lowestScoringSkill}]

// **3.2 Implementation Framework**
// 1. **Rapid Generation** — AI creates ${input.lowestScoringSkill} curriculum for ${input.userRole} (3-5 days)
// 2. **Industry Customization** — Content tailored for ${input.userIndustry} compliance and best practices
// 3. **Instant Editing** — Your instructional designers refine and brand immediately
// 4. **Fast Deployment** — Launch to ${input.companySize} employees within 2-3 weeks
// 5. **Measurable Results** — Track closure of ${input.lowestScoringSkill} gap in real-time

// **3.3 ROI Comparison**
// | Metric | Traditional Approach | With Skillar | Improvement |
// |--------|---------------------|--------------|-------------|
// | Development | ${input.timeToBuild} | 3-5 days | ${speedImprovement} |
// | Deployment | 6-12 months | 2-3 weeks | ${deploySpeed} |
// | Relevance | Generic content | ${input.userIndustry}-specific | 100% targeted |
// | Impact | Delayed mitigation | Immediate action | Same week |

// **3.4 Next Step**
// Stop letting manual curriculum design bottleneck your growth. Book a live demo to see how we can generate your custom ${input.lowestScoringSkill} module for ${input.userRole} in ${input.userIndustry} today.

// IMPORTANT FORMATTING RULES:
// - Use **bold** for all subheadings (e.g., **1.1 Executive Summary**)
// - Use numbered points (1. 2. 3. 4.) for all analysis - NO long paragraphs
// - Use bullet points (-) for simple lists
// - Use tables (|) for comparative data
// - Keep each point to 1-2 sentences maximum
// - Every section must have numbered subheadings (1.1, 1.2, 2.1, 2.2, etc.)
// - Be direct and punchy - no filler words`

//     // console.log('📤 Calling Gemini API...')
    
//     // Call Gemini and get response
//     const response = await model.generateContent(prompt)
//     const fullReport = response.response.text()

    // console.log('✅ Gemini response received')
    // // console.log('📊 Response length:', fullReport.length, 'characters')

    if (!result || result.message.trim().length === 0) {
      console.warn('⚠️ Empty response from Gemini')
      return getPlaceholderReport(input)
    }
    // Paste the code here
    const fullReport = result.message
    // console.log('📄 Gemini Report Preview:', fullReport.substring(0, 500), '...')
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
  skillsOverview: string
  rolesOverview: string
}): { success: boolean; fullReport?: string; error?: string } {
  const fullReport = `
SKILLS GAP ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString()}

ORGANIZATION PROFILE
- Industry: ${input.userIndustry}
- Role: ${input.userRole}  
- Company Size: ${input.companySize}
- Business Goal: ${input.userGoal}
- All Assessed Skills: ${input.skillsOverview || "Not specified"}
- Roles & Skills: ${input.rolesOverview || "Not specified"}

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
  skillsOverview: string
  rolesOverview: string
  assessmentId?: number // Optional assessment ID for tracking
}): Promise<{ success: boolean; error?: string }> {
  try {
    const nodemailer = await import('nodemailer')

    // 1. Generate the PDF (returns base64)
    // console.log('📄 Generating PDF for email...')
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
    skillsOverview: input.skillsOverview,
    rolesOverview: input.rolesOverview,
    })

    if (!base64Pdf) {
      const errorMsg = 'PDF generation returned empty result'
      if (input.assessmentId) {
        await updateAssessmentStatus({
          assessmentId: input.assessmentId,
          emailSent: false,
          emailFailureReason: errorMsg
        })
      }
      throw new Error(errorMsg)
    }

    // 2. Convert base64 to Buffer for attachment
    const pdfBuffer = Buffer.from(base64Pdf, 'base64')
    // console.log('📎 PDF generated, size:', pdfBuffer.length, 'bytes')

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
    // console.log('📧 Sending email to:', input.email)
    await transporter.sendMail({
      from: `Skillar.ai <${process.env.MAIL_USER}>`,
      to: input.email,
      subject: `Your Strategic L&D Alignment Audit — ${input.name}`,
      html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background:#f8fafc; padding:30px 10px;">
  <div style="max-width:800px; margin:0 auto; background:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.06);">

    <!-- CONTENT -->
    <div style="padding:40px 35px;">

      <h2 style="color:#1e293b; font-size:26px; margin-bottom:15px;">
        Hi ${escapeHtml(input.name)},
      </h2>

      <p style="color:#475569; font-size:17px; line-height:1.7; margin-bottom:20px;">
        Thank you for completing the 
        <a href="https://app.skillar.ai"
           target="_blank"
           title="Click to visit Skillar.ai"
           style="color:#667eea; text-decoration:underline; font-weight:600;">
           Skillar.ai
        </a> 
        Skills Gap Diagnostic.
      </p>

      <p style="color:#475569; font-size:17px; line-height:1.7; margin-bottom:20px;">
        Attached to this email, you'll find your personalized 
        <strong>Strategic L&D Alignment Audit</strong> — a tailored PDF report that breaks down:
      </p>

      <ul style="color:#475569; font-size:16px; line-height:1.8; padding-left:20px;">
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

    </div>

    <!-- FOOTER -->
    <div style="background:#1e293b; padding:40px 20px; text-align:center; color:#cbd5e1;">

      <div style="font-size:22px; font-weight:700; color:white;">
        Skillar.ai
      </div>

      <div style="font-size:14px; margin-top:5px; margin-bottom:25px; opacity:0.9;">
        Accelerating skills through AI-powered learning
      </div>

      <!-- CONTACT + SOCIAL -->
      <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:30px auto;">
        <tr>
          <td align="center" style="padding:20px; font-size:14px;">

            <a href="mailto:hello@skillar.ai"
               style="color:#cbd5e1; text-decoration:none;">
              ✉️ hello@skillar.ai
            </a>

            &nbsp;&nbsp;|&nbsp;&nbsp;

            <a href="tel:+919256219292"
               style="color:#cbd5e1; text-decoration:none;">
              📞 +91 9256219292
            </a>

            <div style="margin-top:20px;">
              <a href="https://www.linkedin.com/company/skillar-ai"
                 style="display:inline-block;
                        width:40px;
                        height:40px;
                        line-height:40px;
                        text-align:center;
                        background:rgba(255,255,255,0.1);
                        border-radius:50%;
                        color:white;
                        text-decoration:none;
                        margin-right:8px;">
                in
              </a>

              <a href="https://instagram.com/skillar.ai"
                 style="display:inline-block;
                        width:40px;
                        height:40px;
                        line-height:40px;
                        text-align:center;
                        background:rgba(255,255,255,0.1);
                        border-radius:50%;
                        color:white;
                        text-decoration:none;">
                📸
              </a>
            </div>

          </td>
        </tr>
      </table>

      <!-- PRIVACY -->
      <div style="margin-top:15px;">
        <a href="https://skillar.ai/privacy-policy"
           style="color:#94a3b8; font-size:14px; text-decoration:none;">
          Privacy Policy
        </a>
      </div>

      <!-- COPYRIGHT -->
      <div style="font-size:12px; opacity:0.6; margin-top:30px; padding-top:20px; border-top:1px solid rgba(255,255,255,0.1);">
        © 2025 Skillar.ai. All rights reserved.<br/>
        <span style="font-size:11px; opacity:0.7;">
          This email was sent to ${escapeHtml(input.email)} as part of your Skillar.ai Skills Gap Diagnostic.
        </span>
      </div>

    </div>

  </div>
</div>
`,
      text: `Hi ${input.name},

Thank you for completing the Skillar.ai Skills Gap Diagnostic.

Attached to this email, you'll find your personalized Strategic L&D Alignment Audit — a tailored PDF report that breaks down:

• The Strategic Diagnosis — why your critical skill gap in ${input.lowestScoringSkill} is a business risk
• The Bottleneck — the real cost of your current ${input.timeToBuild} build timeline
• The Skillar Bridge — how to compress months into days with AI-powered curriculum design

Ready to see how fast we can build your custom training module?
Visit: https://app.skillar.ai

---
Skillar.ai - Accelerating skills through AI-powered learning
Contact: hello@skillar.ai | +91 9256219292
© 2025 Skillar.ai. All rights reserved.`,
      attachments: [
        {
          filename: `Skillar-AI-Skills-Gap-Report-${input.name.replace(/\s+/g, '-')}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    })

    // console.log('✅ Email sent successfully to:', input.email)
    
    // Mark email as sent in database
    if (input.assessmentId) {
      await updateAssessmentStatus({
        assessmentId: input.assessmentId,
        emailSent: true,
        emailFailureReason: undefined // Clear any previous error
      })
    }
    
    return { success: true }

  } catch (error) {
    console.error('❌ Failed to send skills gap report email:', error)
    
    // Store email failure reason in database
    if (input.assessmentId) {
      await updateAssessmentStatus({
        assessmentId: input.assessmentId,
        emailSent: false,
        emailFailureReason: error instanceof Error ? error.message : 'Failed to send email'
      })
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

/* =====================================================
   SKILLS GAP ASSESSMENT PERSISTENCE
===================================================== */

/**
 * Helper to parse time to build label into months
 */
function parseTimeToBuildMonths(timeToBuildLabel: string): number {
  if (timeToBuildLabel.includes('Less than 1')) return 1
  if (timeToBuildLabel.includes('1-3')) return 2
  if (timeToBuildLabel.includes('3-6')) return 4
  if (timeToBuildLabel.includes('6-12')) return 9
  if (timeToBuildLabel.includes('More than 12')) return 18
  return 3 // default
}

export async function saveSkillsGapAssessment(input: {
  name: string
  email: string
  companyName?: string
  industryId: number
  roleId?: number
  customIndustry?: string
  customRole?: string
  userGoal: string
  selectedSkills?: Array<{ id: number; name: string; proficiency: number }>
  timeToBuildLabel: string
  businessImpact: string
  companySize: string
  criticalFlag: boolean
  /** Multiple roles: when provided, assessment is linked to these roles via UserAssessmentRole */
  roleIds?: number[]
  /** Skills per role (key = String(roleId)); used when roleIds is provided */
  selectedSkillsByRole?: Record<string, Array<{ id: number; name: string; proficiency: number }>>
  /** Custom skills entered by user for each role (key = String(roleId)) */
  customSkillsByRole?: Record<string, string>
  /** Custom roles data for saving to JSON column */
  customAddedRoles?: string[]
  /** Custom skills data for saving to JSON column */
  customAddedSkills?: string[]
}): Promise<{ success: boolean; assessmentId?: number; error?: string }> {
  try {
    const { prisma } = await import('@/lib/db')

    const useMultiRole = Array.isArray(input.roleIds) && input.roleIds.length > 0
    const roleIdsToSave: number[] = useMultiRole
      ? input.roleIds!
      : [input.roleId!]
    const skillsByRole = useMultiRole && input.selectedSkillsByRole
      ? input.selectedSkillsByRole
      : input.selectedSkills?.length
        ? { [String(input.roleId)]: input.selectedSkills }
        : {}

    // Find or create user
    let user = await prisma.user.findFirst({
      where: { email: input.email }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          companyName: input.companyName
        }
      })
    } else if (input.companyName && !user.companyName) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { companyName: input.companyName }
      })
    }

    let industryId = input.industryId
    if (input.industryId === -1) {
      if (!input.customIndustry || input.customIndustry.trim() === '') {
        throw new Error('Custom industry name is required')
      }
      const customIndustry = await prisma.industry.create({
        data: { name: input.customIndustry.trim(), isCustom: true }
      })
      industryId = customIndustry.id
    }

    const industry = await prisma.industry.findUnique({
      where: { id: industryId }
    })
    if (!industry) {
      throw new Error(`Industry not found: ${industryId}`)
    }

    // Resolve role IDs: create custom role for each -1
    const resolvedRoleIds: number[] = []
    for (const rid of roleIdsToSave) {
      if (rid === -1) {
        if (!input.customRole?.trim()) {
          throw new Error('Custom role name is required')
        }
        const customRole = await prisma.role.create({
          data: {
            name: input.customRole.trim(),
            industryId,
            isCustom: true
          }
        })
        resolvedRoleIds.push(customRole.id)
      } else {
        const role = await prisma.role.findUnique({ where: { id: rid } })
        if (!role) throw new Error(`Role not found: ${rid}`)
        resolvedRoleIds.push(rid)
      }
    }

    const timeToBuildMonths = parseTimeToBuildMonths(input.timeToBuildLabel)

    // Prepare custom data for JSON columns
    const customRolesData: string[] = []
    const customSkillsData: string[] = []

    // Collect custom roles
    if (input.customAddedRoles && input.customAddedRoles.length > 0) {
      customRolesData.push(...input.customAddedRoles.filter(role => role.trim() !== ''))
    }

    // Collect custom skills from all roles
    if (input.customSkillsByRole) {
      for (const [roleKey, customSkillsText] of Object.entries(input.customSkillsByRole)) {
        if (customSkillsText && customSkillsText.trim() !== '') {
          const skills = customSkillsText.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
          customSkillsData.push(...skills)
        }
      }
    }

    // Also collect from customAddedSkills if provided
    if (input.customAddedSkills && input.customAddedSkills.length > 0) {
      customSkillsData.push(...input.customAddedSkills.filter(skill => skill.trim() !== ''))
    }

    // Remove duplicates
    const uniqueCustomRoles = [...new Set(customRolesData)]
    const uniqueCustomSkills = [...new Set(customSkillsData)]

    // Create assessment (no roleId on UserAssessment; roles go in UserAssessmentRole)
    const assessment = await prisma.userAssessment.create({
      data: {
        userId: user.id,
        industryId,
        timeToBuildMonths,
        businessImpact: input.businessImpact,
        companySize: input.companySize,
        criticalFlag: input.criticalFlag,
        reportStatus: 'PENDING',
        emailSent: false,
        ...(uniqueCustomRoles.length > 0 && { customAddedRoles: uniqueCustomRoles }),
        ...(uniqueCustomSkills.length > 0 && { customAddedSkills: uniqueCustomSkills })
      }
    })

    // Link assessment to each role
    for (const roleId of resolvedRoleIds) {
      await prisma.userAssessmentRole.create({
        data: { assessmentId: assessment.id, roleId }
      })
    }

    // Map each roleKey (string) to resolved roleId (resolvedRoleIds is in same order as roleIdsToSave)
    const resolvedIdByKey: Record<string, number> = {}
    roleIdsToSave.forEach((rid, i) => {
      resolvedIdByKey[String(rid)] = resolvedRoleIds[i]
    })

    for (const [roleKey, skillsList] of Object.entries(skillsByRole)) {
      const roleId = resolvedIdByKey[roleKey] ?? Number(roleKey)
      for (const skillInput of skillsList) {
        let skillId: number
        if (skillInput.id < 0) {
          const created = await prisma.skill.create({
            data: {
              name: skillInput.name.trim(),
              industryId,
              roleId,
              isCustom: true
            }
          })
          skillId = created.id
        } else {
          const skill = await prisma.skill.findUnique({
            where: { id: skillInput.id }
          })
          if (!skill) {
            console.warn(`Skill not found, skipping: ${skillInput.id}`)
            continue
          }
          skillId = skill.id
        }
        await prisma.skillAssessment.create({
          data: {
            assessmentId: assessment.id,
            skillId,
            proficiency: Math.min(5, Math.max(1, skillInput.proficiency))
          }
        })
      }
    }

    return { success: true, assessmentId: assessment.id }
  } catch (error) {
    console.error('❌ Failed to save skills gap assessment:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save assessment to database',
    }
  }
}

/**
 * Update assessment report and email status
 */
export async function updateAssessmentStatus(input: {
  assessmentId: number
  reportStatus?: 'PENDING' | 'COMPLETED' | 'FAILED'
  emailSent?: boolean
  emailFailureReason?: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { prisma } = await import('@/lib/db')
    
    const updateData: {
      reportStatus?: 'PENDING' | 'COMPLETED' | 'FAILED'
      emailSent?: boolean
      emailFailureReason?: string | null
    } = {}
    
    if (input.reportStatus !== undefined) {
      updateData.reportStatus = input.reportStatus
    }
    if (input.emailSent !== undefined) {
      updateData.emailSent = input.emailSent
    }
    if (input.emailFailureReason !== undefined) {
      updateData.emailFailureReason = input.emailFailureReason
    }
    
    await prisma.userAssessment.update({
      where: { id: input.assessmentId },
      data: updateData
    })
    
    // console.log('✅ Assessment status updated:', input.assessmentId)
    return { success: true }
  } catch (error) {
    console.error('❌ Failed to update assessment status:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update status'
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