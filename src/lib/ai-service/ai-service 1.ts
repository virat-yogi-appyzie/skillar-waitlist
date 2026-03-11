/**
 * AI Service Layer - Centralized AI request management
 * Provides high-level AI services that existing functions can consume
 */

import { loadBalancedGeminiClient } from "./gemini-client";
// import { jsonrepair } from "jsonrepair";

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
    
      

      // Step 2: Remove markdown fences (```json ... ```)
      // let cleanedResponse = response.message
      //   .replace(/^```json\s*/g, "")
      //   .replace(/\s*```$/g, "")
      //   .trim();

      // // Step 3: Extract first JSON object pattern
      // const match = cleanedResponse.match(/{[\s\S]*}/);
      // if (!match) {
      //   return {
      //     success: false,
      //     message: "No valid JSON found in response",
      //   };
      // }

      // let json;
      // try {
      //   // Attempt 1: Direct parse
      //   let directAttempt = match[0].replace(/```json|```/g, "").trim();
      //   json = JSON.parse(directAttempt);
      //   return {
      //     success: true,
      //     message: JSON.stringify(json),
      //   };
      // } catch (directError) {
      //   // Step 4: Clean common AI JSON issues
      //   let toRepair = match[0]
      //     .replace(/,(\s*[}\]])/g, "$1")
      //     .replace(/:\s*"([^"]*?)"/g, (m, p1) => {
      //       return `: "${p1.replace(/"/g, '\\"')}"`;
      //     })
      //     .trim();

      //   // Step 5: Repair using jsonrepair
      //   try {
      //     const repaired = jsonrepair(toRepair);
      //     json = JSON.parse(repaired);
      //     return {
      //       success: true,
      //       message: JSON.stringify(json),
      //     };
      //   } catch (repairError) {
      //     return {
      //       success: false,
      //       message: "Failed to repair JSON response",
      //     };
      //   }
      // }
    } catch (error: unknown) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to generate step content",
      };
    }
  }

  /**
   * Get AI service statistics
   */
  getServiceStats() {
    return {
      loadBalancer: loadBalancedGeminiClient.getStats(),
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Reset a specific API key
   */
  resetApiKey(keyPrefix: string): boolean {
    return loadBalancedGeminiClient.resetKey(keyPrefix);
  }

  /**
   * Generate quizzes of ALL types in parallel (single API call)
   * No loop - sends all quiz types in one prompt and processes output together
   */

  /**
   * Build unified prompt for ALL quiz types at once (no loop)
   * Generates MCQ, MSQ, TRUE_FALSE, MATCHING, CODING in a single prompt
   */
  private buildSkillGapPrompt(input: {
    userGoal: string;
    userIndustry: string;
    userRole: string;
    lowestScoringSkill: string;
    skillScore: number;
    timeToBuild: string;
    businessImpact: string;
    companySize: string;
    skillsOverview: string;
    rolesOverview: string;
  }): string {
    const skillRiskLevel = input.skillScore <= 2 ? 'CRITICAL' : 'HIGH'
    const trainingRiskLevel = input.timeToBuild.includes('6') || input.timeToBuild.includes('12') ? 'CRITICAL' : 'HIGH'
    const proficiencyLabel = input.skillScore === 1 ? 'Critical' : input.skillScore === 2 ? 'Major Gap' : 'Moderate Gap'
    // const timeSavings = input.timeToBuild.includes('6') || input.timeToBuild.includes('12') ? '5-6 months' : '3-4 months'
    // const impactSavings = input.timeToBuild.includes('6') || input.timeToBuild.includes('12') ? '8-11 months' : '5-8 months'
    const speedImprovement = input.timeToBuild.includes('6') || input.timeToBuild.includes('12') ? '95%+ faster' : '90%+ faster'
    const deploySpeed = input.timeToBuild.includes('6') || input.timeToBuild.includes('12') ? '12x faster' : '8x faster'
    
    const prompt = `You are an elite Chief Learning Officer (CLO) and an expert in corporate instructional design. Your job is to analyze data from a "Strategic L&D Alignment Audit" and generate a hard-hitting, highly personalized, 3-section diagnostic report for a corporate L&D leader. 

Your tone must be authoritative, diagnostic, and urgent. Do not use corporate fluff. Speak directly to the business cost of delayed training.

Here is the user's diagnostic data:
- Primary Goal: ${input.userGoal}
- Industry: ${input.userIndustry}
- Target Role(s): ${input.userRole}
- Most Critical Skill Gap Identified: ${input.lowestScoringSkill} (Score: ${input.skillScore}/5)
- All Priority Skills & Ratings: ${input.skillsOverview || "Not specified"}
- Roles and Skill Breakdown: ${input.rolesOverview || "Not specified"}
- Time it currently takes them to build a course: ${input.timeToBuild}
- Primary Business Impact of this gap: ${input.businessImpact}
- Company Size: ${input.companySize} employees

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

**3.1 The Solution**
Write 3-4 numbered points about the AI-powered approach:
1. [First point about AI curriculum generation in days vs months]
2. [Second point about industry-specific customization for ${input.userIndustry}]
3. [Third point about immediate deployment to ${input.companySize} employees]
4. [Fourth point about measurable impact on ${input.lowestScoringSkill}]

**3.2 Implementation Framework**
1. **Rapid Generation** — AI creates ${input.lowestScoringSkill} curriculum for ${input.userRole} (3-5 days)
2. **Industry Customization** — Content tailored for ${input.userIndustry} compliance and best practices
3. **Instant Editing** — Your instructional designers refine and brand immediately
4. **Fast Deployment** — Launch to ${input.companySize} employees within 2-3 weeks
5. **Measurable Results** — Track closure of ${input.lowestScoringSkill} gap in real-time

**3.3 ROI Comparison**
| Metric | Traditional Approach | With Skillar | Improvement |
|--------|---------------------|--------------|-------------|
| Development | ${input.timeToBuild} | 3-5 days | ${speedImprovement} |
| Deployment | 6-12 months | 2-3 weeks | ${deploySpeed} |
| Relevance | Generic content | ${input.userIndustry}-specific | 100% targeted |
| Impact | Delayed mitigation | Immediate action | Same week |

**3.4 Next Step**
Stop letting manual curriculum design bottleneck your growth. Book a live demo to see how we can generate your custom ${input.lowestScoringSkill} module for ${input.userRole} in ${input.userIndustry} today.

IMPORTANT FORMATTING RULES:
- Use **bold** for all subheadings (e.g., **1.1 Executive Summary**)
- Use numbered points (1. 2. 3. 4.) for all analysis - NO long paragraphs
- Use bullet points (-) for simple lists
- Use tables (|) for comparative data
- Keep each point to 1-2 sentences maximum
- Every section must have numbered subheadings (1.1, 1.2, 2.1, 2.2, etc.)
- Be direct and punchy - no filler words`

    return prompt;
  }
}

// Singleton instance
export const aiService = new AIService();
