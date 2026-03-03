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
// FETCH ACTIONS
// =====================================================

/**
 * Fetch all industries (excluding Generic industry which is for internal use)
 */
export async function getIndustries(): Promise<IndustryOption[]> {
  const industries = await prisma.industry.findMany({
    where: {
      name: { not: "Generic" }, // Exclude the internal Generic industry
    },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      isCustom: true,
    },
  });

  return industries;
}

/**
 * Fetch roles for a specific industry
 * If the industry is custom (isCustom = true), return generic roles
 */
export async function getRolesByIndustry(
  industryId: number
): Promise<RoleOption[]> {
  // First check if this is a custom industry
  const industry = await prisma.industry.findUnique({
    where: { id: industryId },
    select: { isCustom: true },
  });

  if (!industry) {
    return [];
  }

  // If custom industry, fetch generic roles from the Generic industry
  if (industry.isCustom) {
    const genericIndustry = await prisma.industry.findFirst({
      where: { name: "Generic" },
      select: { id: true },
    });

    if (!genericIndustry) {
      return [];
    }

    const genericRoles = await prisma.role.findMany({
      where: {
        industryId: genericIndustry.id,
        isGeneric: true,
      },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        industryId: true,
        isCustom: true,
        isGeneric: true,
      },
    });

    return genericRoles;
  }

  // Otherwise, fetch roles for the specific industry
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

  return roles;
}

/**
 * Fetch skills for a specific industry and role combination
 */
export async function getSkillsByIndustryAndRole(
  industryId: number,
  roleId: number
): Promise<SkillOption[]> {
  // Check if this is a custom industry
  const industry = await prisma.industry.findUnique({
    where: { id: industryId },
    select: { isCustom: true },
  });

  // Check if this is a generic role
  const role = await prisma.role.findUnique({
    where: { id: roleId },
    select: { isGeneric: true, industryId: true },
  });

  if (!industry || !role) {
    return [];
  }

  // If industry is custom and role is generic, fetch skills for that generic role
  if (industry.isCustom && role.isGeneric) {
    const skills = await prisma.skill.findMany({
      where: {
        roleId: roleId,
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

    return skills;
  }

  // Fetch skills for the specific industry and role
  const skills = await prisma.skill.findMany({
    where: {
      industryId,
      roleId,
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

  return skills;
}

// =====================================================
// CREATE CUSTOM ENTRIES
// =====================================================

/**
 * Create a custom industry (for "Other" option)
 */
export async function createCustomIndustry(
  name: string
): Promise<{ success: boolean; industry?: IndustryOption; error?: string }> {
  try {
    // Check if industry with same name already exists
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
    console.error("Error creating custom industry:", error);
    return { success: false, error: "Failed to create custom industry" };
  }
}

/**
 * Create a custom role linked to an industry (for "Other" option)
 */
export async function createCustomRole(
  name: string,
  industryId: number
): Promise<{ success: boolean; role?: RoleOption; error?: string }> {
  try {
    // Check if role with same name already exists for this industry
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
    console.error("Error creating custom role:", error);
    return { success: false, error: "Failed to create custom role" };
  }
}

/**
 * Create a custom skill linked to an industry and role (for "Other" option)
 */
export async function createCustomSkill(
  name: string,
  industryId: number,
  roleId: number
): Promise<{ success: boolean; skill?: SkillOption; error?: string }> {
  try {
    // Check if skill with same name already exists for this industry/role
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
    console.error("Error creating custom skill:", error);
    return { success: false, error: "Failed to create custom skill" };
  }
}

/**
 * Create multiple custom skills at once
 */
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

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Get industry by ID
 */
export async function getIndustryById(
  id: number
): Promise<IndustryOption | null> {
  const industry = await prisma.industry.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      isCustom: true,
    },
  });

  return industry;
}

/**
 * Get role by ID
 */
export async function getRoleById(
  id: number
): Promise<RoleOption | null> {
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
}

/**
 * Get skill by ID
 */
export async function getSkillById(id: number): Promise<SkillOption | null> {
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
}

/**
 * Get multiple skills by IDs
 */
export async function getSkillsByIds(ids: number[]): Promise<SkillOption[]> {
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
}
