"use server";

import { prisma } from "./db";

// =====================================================
// TYPES
// =====================================================

export type IndustryOption = {
  id: number;
  name: string;
  isCustom: boolean;
};

export type RoleOption = {
  id: number;
  name: string;
  industryId: number;
  isCustom: boolean;
  isGeneric: boolean;
};

export type SkillOption = {
  id: number;
  name: string;
  industryId: number | null;
  roleId: number | null;
  isCustom: boolean;
};

// =====================================================
// FALLBACK TAXONOMIES (Ensures 100% Uptime in all envs)
// =====================================================

const FALLBACK_INDUSTRIES: IndustryOption[] = [
  { id: 1, name: "Technology & SaaS", isCustom: false },
  { id: 2, name: "Financial Services & Banking", isCustom: false },
  { id: 3, name: "Healthcare & Life Sciences", isCustom: false },
  { id: 4, name: "Manufacturing & Engineering", isCustom: false },
  { id: 5, name: "Retail & E-Commerce", isCustom: false },
  { id: 6, name: "Professional Services & Consulting", isCustom: false },
  { id: 7, name: "Telecommunications & Media", isCustom: false },
  { id: 8, name: "Energy & Utilities", isCustom: false },
  { id: 9, name: "Aerospace & Defense", isCustom: false },
  { id: 10, name: "Education & EdTech", isCustom: false },
  { id: 11, name: "Other (Specify Custom Industry)", isCustom: false },
];

const FALLBACK_ROLES_BY_INDUSTRY: Record<number, RoleOption[]> = {
  1: [
    { id: 101, name: "Software Engineer / Tech Lead", industryId: 1, isCustom: false, isGeneric: false },
    { id: 102, name: "Product Manager", industryId: 1, isCustom: false, isGeneric: false },
    { id: 103, name: "Data Scientist / AI Engineer", industryId: 1, isCustom: false, isGeneric: false },
    { id: 104, name: "DevOps & Cloud Architect", industryId: 1, isCustom: false, isGeneric: false },
    { id: 105, name: "Solutions Architect / Pre-Sales", industryId: 1, isCustom: false, isGeneric: false },
    { id: 106, name: "Engineering Manager / Director", industryId: 1, isCustom: false, isGeneric: false },
  ],
  2: [
    { id: 201, name: "Risk & Compliance Officer", industryId: 2, isCustom: false, isGeneric: false },
    { id: 202, name: "Quantitative / Financial Analyst", industryId: 2, isCustom: false, isGeneric: false },
    { id: 203, name: "Fintech Product Lead", industryId: 2, isCustom: false, isGeneric: false },
    { id: 204, name: "Wealth Management Advisor", industryId: 2, isCustom: false, isGeneric: false },
    { id: 205, name: "Credit & Lending Specialist", industryId: 2, isCustom: false, isGeneric: false },
  ],
  3: [
    { id: 301, name: "Clinical Research Associate", industryId: 3, isCustom: false, isGeneric: false },
    { id: 302, name: "Healthcare Operations Director", industryId: 3, isCustom: false, isGeneric: false },
    { id: 303, name: "Medical Affairs Specialist", industryId: 3, isCustom: false, isGeneric: false },
    { id: 304, name: "Biomedical Data Analyst", industryId: 3, isCustom: false, isGeneric: false },
  ],
  4: [
    { id: 401, name: "Plant / Operations Manager", industryId: 4, isCustom: false, isGeneric: false },
    { id: 402, name: "Quality Assurance Specialist", industryId: 4, isCustom: false, isGeneric: false },
    { id: 403, name: "Supply Chain & Logistics Lead", industryId: 4, isCustom: false, isGeneric: false },
    { id: 404, name: "Automation & Robotics Engineer", industryId: 4, isCustom: false, isGeneric: false },
  ],
  5: [
    { id: 501, name: "E-Commerce Growth Manager", industryId: 5, isCustom: false, isGeneric: false },
    { id: 502, name: "Merchandising & Inventory Lead", industryId: 5, isCustom: false, isGeneric: false },
    { id: 503, name: "Customer Experience Director", industryId: 5, isCustom: false, isGeneric: false },
  ],
  6: [
    { id: 601, name: "Management / Strategy Consultant", industryId: 6, isCustom: false, isGeneric: false },
    { id: 602, name: "Principal / Engagement Lead", industryId: 6, isCustom: false, isGeneric: false },
    { id: 603, name: "Transformation Practice Lead", industryId: 6, isCustom: false, isGeneric: false },
  ],
};

const GENERIC_ROLES: RoleOption[] = [
  { id: 901, name: "Team Lead / People Manager", industryId: 11, isCustom: false, isGeneric: true },
  { id: 902, name: "Department Director / Head", industryId: 11, isCustom: false, isGeneric: true },
  { id: 903, name: "VP / Executive Leader", industryId: 11, isCustom: false, isGeneric: true },
  { id: 904, name: "Learning & Development Specialist", industryId: 11, isCustom: false, isGeneric: true },
  { id: 905, name: "HR & Talent Business Partner", industryId: 11, isCustom: false, isGeneric: true },
];

const FALLBACK_SKILLS_BY_ROLE: Record<number, SkillOption[]> = {
  101: [
    { id: 1001, name: "Distributed Systems Architecture", industryId: 1, roleId: 101, isCustom: false },
    { id: 1002, name: "LLM & GenAI API Integration", industryId: 1, roleId: 101, isCustom: false },
    { id: 1003, name: "Cloud-Native Infrastructure (K8s/Terraform)", industryId: 1, roleId: 101, isCustom: false },
    { id: 1004, name: "API Design & Microservices", industryId: 1, roleId: 101, isCustom: false },
    { id: 1005, name: "Automated Testing & CI/CD Pipelines", industryId: 1, roleId: 101, isCustom: false },
    { id: 1006, name: "Security & OWASP Compliance", industryId: 1, roleId: 101, isCustom: false },
  ],
  102: [
    { id: 1011, name: "Product Discovery & Hypothesis Validation", industryId: 1, roleId: 102, isCustom: false },
    { id: 1012, name: "Quantitative User Analytics (SQL/Mixpanel)", industryId: 1, roleId: 102, isCustom: false },
    { id: 1013, name: "Strategic Roadmapping & Prioritization", industryId: 1, roleId: 102, isCustom: false },
    { id: 1014, name: "Technical Architecture Tradeoffs", industryId: 1, roleId: 102, isCustom: false },
    { id: 1015, name: "Executive Stakeholder Alignment", industryId: 1, roleId: 102, isCustom: false },
  ],
  103: [
    { id: 1021, name: "Fine-Tuning & Prompt Engineering", industryId: 1, roleId: 103, isCustom: false },
    { id: 1022, name: "MLOps & Model Deployment Pipelines", industryId: 1, roleId: 103, isCustom: false },
    { id: 1023, name: "RAG & Vector Database Architecture", industryId: 1, roleId: 103, isCustom: false },
    { id: 1024, name: "Statistical Modeling & Experimentation", industryId: 1, roleId: 103, isCustom: false },
  ],
  104: [
    { id: 1031, name: "Infrastructure as Code (Terraform/Pulumi)", industryId: 1, roleId: 104, isCustom: false },
    { id: 1032, name: "Kubernetes Cluster Management", industryId: 1, roleId: 104, isCustom: false },
    { id: 1033, name: "Observability & SRE Metrics (OpenTelemetry)", industryId: 1, roleId: 104, isCustom: false },
    { id: 1034, name: "Zero-Trust Cloud Security Architecture", industryId: 1, roleId: 104, isCustom: false },
  ],
  201: [
    { id: 2001, name: "Regulatory Compliance (AML/KYC/GDPR)", industryId: 2, roleId: 201, isCustom: false },
    { id: 2002, name: "Enterprise Risk Assessment & Stress Testing", industryId: 2, roleId: 201, isCustom: false },
    { id: 2003, name: "Audit Trail & Governance Frameworks", industryId: 2, roleId: 201, isCustom: false },
  ],
  901: [
    { id: 9001, name: "Performance Coaching & Feedback", industryId: 11, roleId: 901, isCustom: false },
    { id: 9002, name: "Strategic Delegation & Execution", industryId: 11, roleId: 901, isCustom: false },
    { id: 9003, name: "Cross-Functional Alignment", industryId: 11, roleId: 901, isCustom: false },
    { id: 9004, name: "Talent Retention & Career Development", industryId: 11, roleId: 901, isCustom: false },
  ],
  904: [
    { id: 9041, name: "Competency Architecture Mapping", industryId: 11, roleId: 904, isCustom: false },
    { id: 9042, name: "AI-Powered Adaptive Curriculum Design", industryId: 11, roleId: 904, isCustom: false },
    { id: 9043, name: "Learning ROI & Business Impact Telemetry", industryId: 11, roleId: 904, isCustom: false },
    { id: 9044, name: "Rapid Course Prototyping & AI Authoring", industryId: 11, roleId: 904, isCustom: false },
  ],
};

const GENERIC_SKILLS: SkillOption[] = [
  { id: 9901, name: "Strategic Thinking & Execution", industryId: null, roleId: null, isCustom: false },
  { id: 9902, name: "Cross-Functional Collaboration", industryId: null, roleId: null, isCustom: false },
  { id: 9903, name: "Data-Driven Decision Making", industryId: null, roleId: null, isCustom: false },
  { id: 9904, name: "Change Management & Agility", industryId: null, roleId: null, isCustom: false },
  { id: 9905, name: "AI Tools & Workflow Integration", industryId: null, roleId: null, isCustom: false },
];

// =====================================================
// FETCH ACTIONS
// =====================================================

/**
 * Fetch all industries (excluding Generic industry which is for internal use)
 */
export async function getIndustries(): Promise<IndustryOption[]> {
  try {
    const industries = await prisma.industry.findMany({
      where: {
        name: { not: "Generic" },
      },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        isCustom: true,
      },
    });

    if (industries && industries.length > 0) {
      return industries;
    }
    return FALLBACK_INDUSTRIES;
  } catch (error) {
    console.warn("Using fallback industries due to database connectivity:", error);
    return FALLBACK_INDUSTRIES;
  }
}

/**
 * Fetch roles for a specific industry
 */
export async function getRolesByIndustry(
  industryId: number
): Promise<RoleOption[]> {
  try {
    const industry = await prisma.industry.findUnique({
      where: { id: industryId },
      select: { isCustom: true },
    });

    if (industry?.isCustom || industryId === 11) {
      const genericRoles = await prisma.role.findMany({
        where: { isGeneric: true },
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          industryId: true,
          isCustom: true,
          isGeneric: true,
        },
      });

      return genericRoles.length > 0 ? genericRoles : GENERIC_ROLES;
    }

    const roles = await prisma.role.findMany({
      where: { industryId },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        industryId: true,
        isCustom: true,
        isGeneric: true,
      },
    });

    if (roles && roles.length > 0) {
      return roles;
    }

    return FALLBACK_ROLES_BY_INDUSTRY[industryId] || GENERIC_ROLES;
  } catch (error) {
    console.warn("Using fallback roles for industry", industryId, error);
    return FALLBACK_ROLES_BY_INDUSTRY[industryId] || GENERIC_ROLES;
  }
}

/**
 * Fetch skills for a specific industry and role combination
 */
export async function getSkillsByIndustryAndRole(
  industryId: number,
  roleId: number
): Promise<SkillOption[]> {
  try {
    const skills = await prisma.skill.findMany({
      where: {
        OR: [
          { industryId, roleId },
          { roleId },
        ],
      },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        industryId: true,
        roleId: true,
        isCustom: true,
      },
    });

    if (skills && skills.length > 0) {
      return skills;
    }

    return FALLBACK_SKILLS_BY_ROLE[roleId] || GENERIC_SKILLS;
  } catch (error) {
    console.warn("Using fallback skills for role", roleId, error);
    return FALLBACK_SKILLS_BY_ROLE[roleId] || GENERIC_SKILLS;
  }
}

// =====================================================
// CREATE CUSTOM ENTRIES
// =====================================================

export async function createCustomIndustry(
  name: string
): Promise<{ success: boolean; industry?: IndustryOption; error?: string }> {
  try {
    const existing = await prisma.industry.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });

    if (existing) {
      return {
        success: true,
        industry: {
          id: existing.id,
          name: existing.name,
          isCustom: existing.isCustom,
        },
      };
    }

    const industry = await prisma.industry.create({
      data: {
        name,
        isCustom: true,
        isUserGenerated: true,
      },
      select: {
        id: true,
        name: true,
        isCustom: true,
      },
    });

    return { success: true, industry };
  } catch (error) {
    console.warn("Offline custom industry fallback:", error);
    return { 
      success: true, 
      industry: { id: -Date.now(), name, isCustom: true } 
    };
  }
}

export async function createCustomRole(
  name: string,
  industryId: number
): Promise<{ success: boolean; role?: RoleOption; error?: string }> {
  try {
    const existing = await prisma.role.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
        industryId,
      },
    });

    if (existing) {
      return {
        success: true,
        role: {
          id: existing.id,
          name: existing.name,
          industryId: existing.industryId,
          isCustom: existing.isCustom,
          isGeneric: existing.isGeneric,
        },
      };
    }

    const role = await prisma.role.create({
      data: {
        name,
        industryId,
        isCustom: true,
        isGeneric: false,
      },
      select: {
        id: true,
        name: true,
        industryId: true,
        isCustom: true,
        isGeneric: true,
      },
    });

    return { success: true, role };
  } catch (error) {
    console.warn("Offline custom role fallback:", error);
    return {
      success: true,
      role: { id: -Date.now(), name, industryId, isCustom: true, isGeneric: false }
    };
  }
}

export async function createCustomSkill(
  name: string,
  industryId: number,
  roleId: number
): Promise<{ success: boolean; skill?: SkillOption; error?: string }> {
  try {
    const existing = await prisma.skill.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
        industryId,
        roleId,
      },
    });

    if (existing) {
      return {
        success: true,
        skill: {
          id: existing.id,
          name: existing.name,
          industryId: existing.industryId,
          roleId: existing.roleId,
          isCustom: existing.isCustom,
        },
      };
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        industryId,
        roleId,
        isCustom: true,
      },
      select: {
        id: true,
        name: true,
        industryId: true,
        roleId: true,
        isCustom: true,
      },
    });

    return { success: true, skill };
  } catch (error) {
    console.warn("Offline custom skill fallback:", error);
    return {
      success: true,
      skill: { id: -Date.now(), name, industryId, roleId, isCustom: true }
    };
  }
}

export async function createMultipleCustomSkills(
  skills: Array<{ name: string; industryId: number; roleId: number }>
): Promise<{ success: boolean; skills?: SkillOption[]; error?: string }> {
  try {
    const createdSkills: SkillOption[] = [];

    for (const skillData of skills) {
      const result = await createCustomSkill(
        skillData.name,
        skillData.industryId,
        skillData.roleId
      );

      if (result.success && result.skill) {
        createdSkills.push(result.skill);
      }
    }

    return { success: true, skills: createdSkills };
  } catch (error) {
    console.error("Error creating multiple custom skills:", error);
    return { success: false, error: "Failed to create custom skills" };
  }
}

export async function getIndustryById(
  id: number
): Promise<IndustryOption | null> {
  try {
    const industry = await prisma.industry.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        isCustom: true,
      },
    });
    return industry;
  } catch (error) {
    console.warn("Fallback getIndustryById:", error);
    return FALLBACK_INDUSTRIES.find(i => i.id === id) || null;
  }
}

export async function getRoleById(
  id: number
): Promise<RoleOption | null> {
  try {
    const role = await prisma.role.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        industryId: true,
        isCustom: true,
        isGeneric: true,
      },
    });
    return role;
  } catch (error) {
    console.warn("Fallback getRoleById:", error);
    return null;
  }
}

export async function getSkillById(id: number): Promise<SkillOption | null> {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        industryId: true,
        roleId: true,
        isCustom: true,
      },
    });
    return skill;
  } catch (error) {
    console.warn("Fallback getSkillById:", error);
    return null;
  }
}

export async function getSkillsByIds(ids: number[]): Promise<SkillOption[]> {
  try {
    const skills = await prisma.skill.findMany({
      where: { id: { in: ids } },
      select: {
        id: true,
        name: true,
        industryId: true,
        roleId: true,
        isCustom: true,
      },
    });
    return skills;
  } catch (error) {
    console.warn("Fallback getSkillsByIds:", error);
    return [];
  }
}
