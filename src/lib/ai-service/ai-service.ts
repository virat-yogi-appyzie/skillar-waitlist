/**
 * AI Service Layer - Centralized AI request management
 * Provides high-level AI services that existing functions can consume
 */

import { loadBalancedGeminiClient } from "./gemini-client";

export interface ContentGenerationParams {
  userGoal: string;
  userIndustry: string;
  userRole: string;
  // Most critical individual skill (for sharp focus)
  lowestScoringSkill: string;
  skillScore: number;
  timeToBuild: string;
  businessImpact: string;
  companySize: string;
  // Overview of ALL priority skills and their ratings
  skillsOverview: string;
  // Overview of ALL roles and their skills/ratings
  rolesOverview: string;
}

/**
 * AI Service - High-level service for AI operations
 */
class AIService {
  async generateSkillGap(
    params: ContentGenerationParams,
  ): Promise<{ success: boolean; message: string }> {
    const prompt = this.buildSkillGapPrompt({
      userGoal: params.userGoal,
      userIndustry: params.userIndustry,
      userRole: params.userRole,
      lowestScoringSkill: params.lowestScoringSkill,
      skillScore: params.skillScore,
      timeToBuild: params.timeToBuild,
      businessImpact: params.businessImpact,
      companySize: params.companySize,
      skillsOverview: params.skillsOverview,
      rolesOverview: params.rolesOverview,
    });

    try {
      // Step 1: Generate AI response
      const response = await loadBalancedGeminiClient.generateContent(prompt);

      if (!response || !response.success) {
        return {
          success: false,
          message: response?.message || "Failed to generate content",
        };
      }
      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      console.error("AI Skill Gap generation failed:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Internal error in AI service",
      };
    }
  }

  private buildSkillGapPrompt(input: ContentGenerationParams) {
    const skillRiskLevel = input.skillScore <= 2 ? "CRITICAL" : "HIGH";
    const trainingRiskLevel =
      input.timeToBuild.includes("6") || input.timeToBuild.includes("12")
        ? "CRITICAL"
        : "HIGH";
    const proficiencyLabel =
      input.skillScore === 1
        ? "Critical"
        : input.skillScore === 2
        ? "Major Gap"
        : "Moderate Gap";
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
    - All Assessed Skills Overview: ${input.skillsOverview}
    - All Roles & Skills Overview: ${input.rolesOverview}

    Structure the report using the following three sections EXACTLY. Use numbered points, bullet lists, and tables. DO NOT write long paragraphs. Break everything into scannable numbered points with proper subheadings.

    ### Section 1: The Strategic Diagnosis

    **1.1 Executive Summary**
    Write 3-4 numbered points analyzing the disconnect between their goal and skill gap:
    1. [First key insight about the gap between ${input.userGoal} and ${input.lowestScoringSkill}]
    2. [Second point about why ${input.userRole} needs this skill]
    3. [Third point about business risk in ${input.userIndustry}]
    4. [Fourth point about ${input.businessImpact} consequences]

    **1.2 Risk Assessment**
    | Metric | Current State | Risk Level |
    |--------|---------------|------------|
    | Skill Proficiency | ${input.skillScore}/5 | ${skillRiskLevel} |
    | Training Timeline | ${input.timeToBuild} | ${trainingRiskLevel} |
    | Business Exposure | ${input.businessImpact} | HIGH |
    | Workforce Impact | ${input.companySize} employees | ${skillRiskLevel} |

    **1.3 Key Risk Indicators**
    - Critical Skill Gap: ${input.lowestScoringSkill}
    - Current Proficiency: ${input.skillScore}/5 (${proficiencyLabel})
    - Business Impact Zone: ${input.businessImpact}
    - Target Role: ${input.userRole}
    - Industry: ${input.userIndustry}

    ### Section 2: The Bottleneck

    **2.1 Time Analysis**
    Write 3-4 numbered points challenging their timeline:
    1. [First point about why ${input.timeToBuild} is too slow for ${input.companySize} employees]
    2. [Second point about opportunity cost during development]
    3. [Third point about ${input.businessImpact} compounding daily]
    4. [Fourth point about competitive disadvantage]

    **2.2 Cost of Delay**
    | Factor | Your Current State | Business Impact |
    |--------|-------------------|----------------|
    | Development Time | ${input.timeToBuild} | Extended exposure |
    | Workforce Gap | ${input.companySize} employees | Productivity loss |
    | Skill Deficit | ${input.lowestScoringSkill} at ${input.skillScore}/5 | Performance drag |
    | Business Risk | ${input.businessImpact} | Revenue/safety impact |

    **2.3 The Real Cost**
    - Training Development Time: ${input.timeToBuild}
    - Affected Workforce: ${input.companySize} employees
    - Critical Skill Gap: ${input.lowestScoringSkill} (${input.skillScore}/5)
    - Ongoing Business Impact: ${input.businessImpact}

    ### Section 3: The Skillar Bridge

    **3.1 What Skillar Does About It**
    Write 3-4 numbered points drawn ONLY from these true capabilities:
    1. [Learning roadmaps and assessment quizzes are AI-generated from a topic and level, grounded in the organisation's own uploaded documents rather than the open internet]
    2. [Content is targeted to ${input.userIndustry} and to what ${input.userRole} is accountable for]
    3. [Bayesian Knowledge Tracing reads each assessment result and flags the concepts still below mastery, person by person]
    4. [A revision roadmap covering only those flagged concepts is generated, and a follow-up assessment confirms the gap on ${input.lowestScoringSkill} has closed]

    **3.2 How A Rollout Runs**
    1. **Define the role** — map ${input.lowestScoringSkill} alongside the other skills ${input.userRole} is accountable for
    2. **Generate** — AI drafts roadmap milestones, steps, and assessment quizzes from your own source material
    3. **Review** — your subject-matter experts edit and approve before anything is published
    4. **Assign** — role and department rules auto-enroll the right people across ${input.companySize} employees
    5. **Verify** — scheduled re-assessment confirms closure, and certificates are issued with expiry tracking and an audit-ready trail

    **3.3 What Changes**
    | Area | Today | With Skillar |
    |------|-------|--------------|
    | Course build | ${input.timeToBuild}, built by hand | AI-drafted from your own documents, then reviewed by your SMEs |
    | Targeting | One generic course for everyone | A revision roadmap scoped to each person's below-mastery concepts |
    | Evidence | Spreadsheets and completion checkboxes | An audit-ready trail of completions, acknowledgements, and certificate expiry |
    | Renewal | Chased manually | Expiry alerts and automatic re-enrollment |

    **3.4 Next Step**
    Book a live walkthrough to see a ${input.lowestScoringSkill} roadmap and its assessment generated for ${input.userRole} in ${input.userIndustry}.

    HONESTY RULES (these override tone):
    - Never invent a percentage, a speed multiple, a delivery timeline, a customer count, or a certification. If a figure is not in the data above, describe the change qualitatively instead.
    - Skillar is pre-launch: do not reference existing customers, case studies, or measured outcomes.
    - Do not claim real-time adaptive difficulty, simulations, or ingestion of code or system telemetry. Personalization happens after an assessment, not during one.

    IMPORTANT FORMATTING RULES:
    - Use **bold** for all subheadings (e.g., **1.1 Executive Summary**)
    - Use numbered points (1. 2. 3. 4.) for all analysis - NO long paragraphs
    - Use bullet points (-) for simple lists
    - Use tables (|) for comparative data
    - Keep each point to 1-2 sentences maximum
    - Every section must have numbered subheadings (1.1, 1.2, 2.1, 2.2, etc.)
    - Be direct and punchy - no filler words`;

    return prompt;
  }
}

// Singleton instance
export const aiService = new AIService();
