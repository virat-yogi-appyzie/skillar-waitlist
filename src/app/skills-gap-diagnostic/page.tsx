"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  saveSkillsGapAssessment,
  updateAssessmentStatus,
  processDiagnosticReportInBackground,
} from "@/lib/actions";
import {
  getIndustries,
  getRolesByIndustry,
  getSkillsByIndustryAndRole,
  type IndustryOption,
  type RoleOption,
  type SkillOption,
} from "@/lib/dropdown-actions";
import { 
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  ShieldAlert,
  Mail,
  Cpu,
  Activity
} from "lucide-react";
import Link from "next/link";
import { sidebar, processing, leadCapture, results } from "@/content/diagnostic";

const TIME_TO_BUILD_OPTIONS = [
  { value: "Less than 1 month", label: "< 1 month", desc: "Material already exists internally" },
  { value: "1-3 months", label: "1 – 3 months", desc: "One owner writing it alongside other work" },
  { value: "3-6 months", label: "3 – 6 months", desc: "Needs subject-matter experts across departments" },
  { value: "6-12 months", label: "6 – 12 months", desc: "Budgeted, scheduled, and reviewed before release" },
  { value: "More than 12 months", label: "12+ months", desc: "No realistic path with current resourcing" },
];

const BUSINESS_IMPACT_OPTIONS = [
  { value: "Low – Nice to have", label: "Low Priority", desc: "Useful, but nothing stops without it" },
  { value: "Medium – Important but not urgent", label: "Medium Impact", desc: "Workarounds exist and people use them" },
  { value: "High – Impacts quarterly targets", label: "High Risk", desc: "Slows delivery or holds up a certification" },
  { value: "Critical – Direct revenue / safety risk", label: "Critical", desc: "Exposure to revenue loss, safety, or an audit finding" },
];

const COMPANY_SIZE_OPTIONS = [
  { value: "0-199 employees", label: "1 – 199", tag: "Growth" },
  { value: "200-999 employees", label: "200 – 999", tag: "Mid-Market" },
  { value: "1,000-4,999 employees", label: "1K – 5K", tag: "Enterprise" },
  { value: "5,000-19,999 employees", label: "5K – 20K", tag: "Large Enterprise" },
  { value: "20,000+ employees", label: "20K+", tag: "Global Scale" },
];

type SelectedSkill = {
  id: number;
  name: string;
};

type SelectedRole = { 
  id: number; 
  name: string 
};

type QuestionnairePhase = "questionnaire" | "processing" | "leadCapture" | "results";

type FormState = {
  industryId: number | null;
  industry: string;
  roleId: number | null;
  role: string;
  selectedSkills: SelectedSkill[];
  proficiencyBySkill: Record<string, number>;
  timeToBuild: string;
  businessImpact: string;
  primaryBusinessGoal: string;
  companySize: string;
  name: string;
  workEmail: string;
  companyName: string;
  customIndustry: string;
  customRole: string;
  customSkills: string;
  selectedRoles: SelectedRole[];
  selectedSkillsByRole: Record<string, SelectedSkill[]>;
  customSkillsByRole: Record<string, string>;
};

const INITIAL_FORM_STATE: FormState = {
  industryId: null,
  industry: "",
  roleId: null,
  role: "",
  selectedSkills: [],
  proficiencyBySkill: {},
  timeToBuild: "",
  businessImpact: "",
  primaryBusinessGoal: "",
  companySize: "",
  name: "",
  workEmail: "",
  companyName: "",
  customIndustry: "",
  customRole: "",
  customSkills: "",
  selectedRoles: [],
  selectedSkillsByRole: {},
  customSkillsByRole: {},
};

const STEPS = [
  { step: 1, label: "Industry", short: "Industry" },
  { step: 2, label: "Target Roles", short: "Roles" },
  { step: 3, label: "Skills", short: "Skills" },
  { step: 4, label: "Proficiency", short: "Proficiency" },
  { step: 5, label: "Time To Build", short: "Timeline" },
  { step: 6, label: "Business Impact", short: "Impact" },
  { step: 7, label: "Scale & Goal", short: "Objective" },
];

export default function SkillsGapDiagnosticPage() {
  const [phase, setPhase] = useState<QuestionnairePhase>("questionnaire");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState(0);
  const [showEmailNotificationModal, setShowEmailNotificationModal] = useState(false);

  const [industries, setIndustries] = useState<IndustryOption[]>([]);
  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [skillsByRole, setSkillsByRole] = useState<Record<string, SkillOption[]>>({});
  const [isLoadingIndustries, setIsLoadingIndustries] = useState(true);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);

  // Report generation takes ~40s. Advance a staged message so the wait reads as
  // progress rather than a hung button.
  useEffect(() => {
    if (!isSubmitting) {
      setSubmitStage(0);
      return;
    }
    const timers = [
      setTimeout(() => setSubmitStage(1), 4000),
      setTimeout(() => setSubmitStage(2), 12000),
      setTimeout(() => setSubmitStage(3), 24000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isSubmitting]);

  // Prefill handoff from the homepage's inline diagnostic
  // (/skills-gap-diagnostic?industry=<id>&role=<id>). The role half is
  // applied once its industry's roles have loaded, then cleared.
  const prefillRoleRef = useRef<number | null>(null);

  // Fetch industries on mount
  useEffect(() => {
    async function fetchIndustries() {
      try {
        setIsLoadingIndustries(true);
        const data = await getIndustries();
        setIndustries(data);

        const params = new URLSearchParams(window.location.search);
        const wantIndustry = Number(params.get("industry"));
        const wantRole = Number(params.get("role"));
        if (Number.isInteger(wantRole) && wantRole > 0) {
          prefillRoleRef.current = wantRole;
        }
        if (Number.isInteger(wantIndustry) && wantIndustry > 0) {
          const match = data.find((i) => i.id === wantIndustry && !i.isCustom);
          if (match) {
            setForm((prev) =>
              prev.industryId
                ? prev
                : { ...prev, industryId: match.id, industry: match.name }
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch industries:", error);
      } finally {
        setIsLoadingIndustries(false);
      }
    }
    fetchIndustries();
  }, []);

  // Fetch roles when industry changes
  useEffect(() => {
    async function fetchRoles() {
      if (!form.industryId) {
        setRoles([]);
        return;
      }
      try {
        setIsLoadingRoles(true);
        const data = await getRolesByIndustry(form.industryId);
        setRoles(data);

        const wantRole = prefillRoleRef.current;
        if (wantRole) {
          prefillRoleRef.current = null;
          const match = data.find((r) => r.id === wantRole && r.id > 0 && !r.isCustom);
          if (match) {
            setForm((prev) =>
              prev.selectedRoles.length > 0
                ? prev
                : { ...prev, selectedRoles: [{ id: match.id, name: match.name }] }
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setIsLoadingRoles(false);
      }
    }
    fetchRoles();
  }, [form.industryId]);

  // Fetch skills per role for multi-role
  useEffect(() => {
    if (form.selectedRoles.length === 0) {
      setSkillsByRole({});
      return;
    }
    const roleIds = form.selectedRoles.filter((r) => r.id !== -1).map((r) => r.id);
    if (roleIds.length === 0) {
      setSkillsByRole({});
      return;
    }
    let cancelled = false;
    setIsLoadingSkills(true);
    Promise.all(
      roleIds.map((roleId) =>
        getSkillsByIndustryAndRole(form.industryId!, roleId).then((data) => ({ roleId, data }))
      )
    ).then((results) => {
      if (cancelled) return;
      const next: Record<string, SkillOption[]> = {};
      results.forEach(({ roleId, data }) => {
        next[String(roleId)] = data;
      });
      setSkillsByRole(next);
      setIsLoadingSkills(false);
    });
    return () => { cancelled = true; };
  }, [form.industryId, form.selectedRoles]);

  // Sync role field
  useEffect(() => {
    if (form.selectedRoles.length === 0) return;
    const roleId = form.selectedRoles[0]?.id ?? null;
    const role = form.selectedRoles
      .map((r) => (r.id === -1 ? form.customRole || "Other" : r.name))
      .filter(Boolean)
      .join(", ");
    setForm((prev) => ({ ...prev, roleId, role }));
  }, [form.selectedRoles, form.customRole]);

  // Keyboard navigation listener (Enter to proceed)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== "questionnaire") return;
      if (e.key === "Enter" && !e.shiftKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === "TEXTAREA") return;
        if (isStepValid()) {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Analysis computations
  const lowestScoringSkill = useMemo(() => {
    if (!form.selectedSkills.length) return null;
    let lowest: { skill: string; score: number } | null = null;
    for (const skillObj of form.selectedSkills) {
      const score = form.proficiencyBySkill[skillObj.name] ?? 3;
      if (!lowest || score < lowest.score) {
        lowest = { skill: skillObj.name, score };
      }
    }
    return lowest;
  }, [form.selectedSkills, form.proficiencyBySkill]);

  const hasCriticalVulnerability = useMemo(() => {
    if (!form.selectedSkills.length || !form.timeToBuild) return false;
    const timeIndex = ["Less than 1 month", "1-3 months", "3-6 months", "6-12 months", "More than 12 months"].indexOf(form.timeToBuild);
    const isSlowBuild = timeIndex >= 2;
    const anyLow = form.selectedSkills.some((skillObj) => {
      const score = form.proficiencyBySkill[skillObj.name] ?? 3;
      return score <= 2;
    });
    return isSlowBuild && anyLow;
  }, [form.selectedSkills, form.proficiencyBySkill, form.timeToBuild]);

  const handleNext = () => {
    if (step === 7) {
      setPhase("processing");
      setTimeout(() => {
        setPhase("leadCapture");
      }, 1500);
      return;
    }
    setStep((prev) => Math.min(prev + 1, 7));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMilestoneClick = (targetStep: number) => {
    if (targetStep < step) {
      setStep(targetStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateCustomSkills = (value: string, roleKey?: string) => {
    const key = roleKey ?? String(form.roleId);
    setForm((prev) => {
      const skillNames = value.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
      const baseSelectedSkills = (prev.selectedSkillsByRole[key] ?? []).filter((s) => s.id > 0);
      const customSelectedSkills: SelectedSkill[] = [];
      skillNames.forEach((name, index) => {
        const existsInBase = baseSelectedSkills.some((s) => s.name.toLowerCase() === name.toLowerCase());
        if (!existsInBase) {
          customSelectedSkills.push({ id: -(index + 1), name });
        }
      });
      const roleSkills = [...baseSelectedSkills, ...customSelectedSkills];
      const nextByRole = { ...prev.selectedSkillsByRole, [key]: roleSkills };
      const nextCustom = { ...prev.customSkillsByRole, [key]: value };
      const flat = Object.values(nextByRole).flat();
      const proficiencyBySkill = { ...prev.proficiencyBySkill };
      const validSkillNames = new Set(flat.map((s) => s.name));
      Object.keys(proficiencyBySkill).forEach((k) => {
        if (!validSkillNames.has(k)) delete proficiencyBySkill[k];
      });
      flat.forEach((skill) => {
        if (proficiencyBySkill[skill.name] == null) proficiencyBySkill[skill.name] = 3;
      });
      return {
        ...prev,
        customSkillsByRole: nextCustom,
        customSkills: key === String(prev.roleId) ? value : prev.customSkills,
        selectedSkillsByRole: nextByRole,
        selectedSkills: flat,
        proficiencyBySkill,
      };
    });
  };

  const toggleRole = (roleOption: RoleOption | "other") => {
    setForm((prev) => {
      if (roleOption === "other") {
        const hasOther = prev.selectedRoles.some((r) => r.id === -1);
        if (hasOther) {
          const nextRoles = prev.selectedRoles.filter((r) => r.id !== -1);
          const nextByRole = { ...prev.selectedSkillsByRole };
          delete nextByRole["-1"];
          const nextCustom = { ...prev.customSkillsByRole };
          delete nextCustom["-1"];
          const flat = Object.values(nextByRole).flat();
          return {
            ...prev,
            selectedRoles: nextRoles,
            selectedSkillsByRole: nextByRole,
            customSkillsByRole: nextCustom,
            selectedSkills: flat,
            roleId: nextRoles[0]?.id ?? null,
            role: nextRoles.map((r) => r.name).join(", "),
            customRole: prev.customRole,
          };
        }
        const nextRoles = [...prev.selectedRoles, { id: -1, name: prev.customRole || "Other" }];
        return { ...prev, selectedRoles: nextRoles };
      }
      const id = (roleOption as RoleOption).id;
      const name = (roleOption as RoleOption).name;
      const exists = prev.selectedRoles.some((r) => r.id === id);
      if (exists) {
        const nextRoles = prev.selectedRoles.filter((r) => r.id !== id);
        const nextByRole = { ...prev.selectedSkillsByRole };
        delete nextByRole[String(id)];
        const nextCustom = { ...prev.customSkillsByRole };
        delete nextCustom[String(id)];
        const flat = Object.values(nextByRole).flat();
        return {
          ...prev,
          selectedRoles: nextRoles,
          selectedSkillsByRole: nextByRole,
          customSkillsByRole: nextCustom,
          selectedSkills: flat,
          roleId: nextRoles[0]?.id ?? null,
          role: nextRoles.map((r) => (r.id === -1 ? prev.customRole : r.name)).join(", "),
        };
      }
      const nextRoles = [...prev.selectedRoles, { id, name }];
      return {
        ...prev,
        selectedRoles: nextRoles,
        roleId: nextRoles[0]?.id ?? null,
        role: nextRoles.map((r) => (r.id === -1 ? prev.customRole : r.name)).join(", "),
      };
    });
  };

  const toggleSkill = (skillOption: SkillOption, roleKey?: string) => {
    const key = roleKey ?? String(form.roleId);
    setForm((prev) => {
      const byRole = prev.selectedSkillsByRole[key] ?? [];
      const isSelected = byRole.some((s) => s.id === skillOption.id);
      const nextByRole = {
        ...prev.selectedSkillsByRole,
        [key]: isSelected
          ? byRole.filter((s) => s.id !== skillOption.id)
          : [...byRole, { id: skillOption.id, name: skillOption.name }],
      };
      const flat = Object.values(nextByRole).flat();
      const proficiencyBySkill = { ...prev.proficiencyBySkill };
      if (!isSelected && proficiencyBySkill[skillOption.name] == null) {
        proficiencyBySkill[skillOption.name] = 3;
      }
      if (isSelected) {
        delete proficiencyBySkill[skillOption.name];
      }
      return {
        ...prev,
        selectedSkillsByRole: nextByRole,
        selectedSkills: flat,
        proficiencyBySkill,
      };
    });
  };

  const updateProficiency = (skill: string, value: number) => {
    setForm((prev) => ({
      ...prev,
      proficiencyBySkill: { ...prev.proficiencyBySkill, [skill]: value },
    }));
  };

  const handleLeadCaptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasRoles = form.selectedRoles.length > 0 || form.roleId != null;
    if (!form.workEmail || !form.name || !form.companyName || !form.industryId || !hasRoles) {
      return;
    }

    setIsSubmitting(true);
    let assessmentId: number | undefined;

    const useMultiRole = form.selectedRoles.length > 0;
    const effectiveRolesList = form.selectedRoles.flatMap(role => {
      if (role.id === -1 && form.customRole) {
        const customRolesList = form.customRole.split(',').map(s => s.trim()).filter(Boolean);
        if (customRolesList.length > 0) {
          return customRolesList.map((cr, index) => ({ id: -1 - index, name: cr }));
        }
      }
      return [role];
    });

    const roleIds = useMultiRole ? effectiveRolesList.map((r) => r.id) : undefined;
    const customRolesMapping: Record<number, string> = {};
    effectiveRolesList.forEach(r => {
      if (r.id < 0) {
        customRolesMapping[r.id] = r.name;
      }
    });

    const selectedSkillsByRole: Record<string, { id: number; name: string; proficiency: number }[]> | undefined = useMultiRole ? {} : undefined;
    const customSkillsByRoleMapped: Record<string, string> | undefined = useMultiRole ? {} : undefined;

    if (useMultiRole) {
      effectiveRolesList.forEach(r => {
        const originalKey = r.id < 0 ? `custom-${r.name.toLowerCase()}` : String(r.id);
        const submitKey = String(r.id);
        selectedSkillsByRole![submitKey] = (form.selectedSkillsByRole[originalKey] ?? []).map((s) => ({
          id: s.id,
          name: s.name,
          proficiency: form.proficiencyBySkill[s.name] ?? 3,
        }));
        if (form.customSkillsByRole[originalKey]) {
          customSkillsByRoleMapped![submitKey] = form.customSkillsByRole[originalKey];
        }
      });
    }

    const customRolesData: string[] = [];
    const customSkillsData: string[][] = [];
    const customIndustryData: string[] = [];

    if (form.industryId === -1 || form.industryId === 11) {
      if (form.customIndustry?.trim()) {
        customIndustryData.push(form.customIndustry.trim());
      }
    }

    if (useMultiRole) {
      for (const role of effectiveRolesList) {
        const isCustomRole = role.id < 0;
        const originalKey = role.id < 0 ? `custom-${role.name.toLowerCase()}` : String(role.id);
        const customSkillsText = form.customSkillsByRole[originalKey];
        const textSkillNames = customSkillsText ? customSkillsText.split(',').map(s => s.trim()).filter(Boolean) : [];
        const selectedSkills = form.selectedSkillsByRole[originalKey] ?? [];
        const customSelectedSkillNames = selectedSkills.filter(s => s.id < 0).map(s => s.name);
        const allCustomSkillsForThisRole = [...new Set([...customSelectedSkillNames, ...textSkillNames])];
        if (isCustomRole || allCustomSkillsForThisRole.length > 0) {
          customRolesData.push(role.name);
          customSkillsData.push(allCustomSkillsForThisRole);
        }
      }
    } else {
      if (form.roleId === -1 && form.customRole?.trim()) {
        customRolesData.push(form.customRole.trim());
      }
      if (form.customSkills?.trim()) {
        const customSkillsList = form.customSkills.split(',').map(s => s.trim()).filter(Boolean);
        if (customSkillsList.length > 0) {
          customSkillsData.push(customSkillsList);
        }
      }
    }

    try {
      const saveResult = await saveSkillsGapAssessment({
        name: form.name,
        email: form.workEmail,
        companyName: form.companyName,
        industryId: form.industryId!,
        roleId: form.roleId ?? undefined,
        roleIds,
        customRolesMapping: Object.keys(customRolesMapping).length > 0 ? customRolesMapping : undefined,
        userGoal: form.primaryBusinessGoal,
        selectedSkills: form.selectedSkills.map((s) => ({
          id: s.id,
          name: s.name,
          proficiency: form.proficiencyBySkill[s.name] ?? 3,
        })),
        selectedSkillsByRole: selectedSkillsByRole,
        customSkillsByRole: customSkillsByRoleMapped,
        timeToBuildLabel: form.timeToBuild,
        businessImpact: form.businessImpact,
        companySize: form.companySize,
        criticalFlag: hasCriticalVulnerability,
        customIndustry: customIndustryData.length > 0 ? customIndustryData[0] : undefined,
        customRole: form.customRole?.trim() || undefined,
        customAddedIndustry: customIndustryData.length > 0 ? customIndustryData : undefined,
        customAddedRoles: customRolesData.length > 0 ? customRolesData : undefined,
        customAddedSkills: customSkillsData.length > 0 ? customSkillsData : undefined,
      });

      if (saveResult.success && saveResult.assessmentId) {
        assessmentId = saveResult.assessmentId;
      }

      const skillsOverview = form.selectedSkills
        .map((s) => {
          const score = form.proficiencyBySkill[s.name] ?? 3;
          return `${s.name} (${score}/5)`;
        })
        .join("; ");

      const rolesOverview = effectiveRolesList.length > 0
        ? effectiveRolesList
            .map((role) => {
              const roleKey = role.id < 0 ? `custom-${role.name.toLowerCase()}` : String(role.id);
              const roleName = role.name;
              const skillsForRole = form.selectedSkillsByRole[roleKey] ?? [];
              if (!skillsForRole.length) {
                return roleName;
              }
              const skillsText = skillsForRole
                .map((s) => {
                  const score = form.proficiencyBySkill[s.name] ?? 3;
                  return `${s.name} (${score}/5)`;
                })
                .join(", ");
              return `${roleName}: ${skillsText}`;
            })
            .join(" | ")
        : form.role
          ? `${form.role}: ${skillsOverview}`
          : "Not specified";

      const lowestSkillName = lowestScoringSkill?.skill ?? form.selectedSkills[0]?.name ?? "Key Competency";
      const lowestSkillScore = lowestScoringSkill?.score ?? 3;

      // Non-blocking background execution:
      // Trigger AI report generation, PDF rendering, and branded email dispatch
      // asynchronously so the user flow proceeds immediately to results with zero lag.
      processDiagnosticReportInBackground({
        name: form.name,
        email: form.workEmail,
        userGoal: form.primaryBusinessGoal,
        userIndustry: form.industry,
        userRole: form.role,
        lowestScoringSkill: lowestSkillName,
        skillScore: lowestSkillScore,
        timeToBuild: form.timeToBuild,
        businessImpact: form.businessImpact,
        companySize: form.companySize,
        skillsOverview,
        rolesOverview,
        assessmentId,
      }).catch((bgErr) => {
        console.error("Background diagnostic report error:", bgErr);
      });

      // Proceed immediately to results phase
      setPhase("results");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error('Unexpected error in assessment submission:', error);
      const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred';
      if (assessmentId) {
        await updateAssessmentStatus({
          assessmentId,
          reportStatus: 'FAILED',
          emailFailureReason: `System Error: ${errorMsg}`
        }).catch(() => {});
      }
      // Still allow the user to view their local diagnostic results
      setPhase("results");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validation checks per step
  const canProceedStep1 = !!form.industryId && (form.industryId !== 11 || form.customIndustry.trim().length > 0);
  const canProceedStep2 = form.selectedRoles.length > 0 && (!form.selectedRoles.some(r => r.id === -1) || form.customRole.trim().length > 0);
  const canProceedStep3 = form.selectedRoles.length > 0 && form.selectedRoles.every((r) => {
    const effectiveRoles = r.id === -1 && form.customRole
      ? form.customRole.split(',').map(s => s.trim()).filter(Boolean).map((cr, i) => ({ id: -1 - i, name: cr }))
      : [r];
    return effectiveRoles.every((er) => {
      const roleKey = er.id < 0 ? `custom-${er.name.toLowerCase()}` : String(er.id);
      return (form.selectedSkillsByRole[roleKey]?.length ?? 0) > 0 || (form.customSkillsByRole[roleKey]?.trim()?.length ?? 0) > 0;
    });
  });
  const canProceedStep4 = form.selectedSkills.length > 0;
  const canProceedStep5 = !!form.timeToBuild;
  const canProceedStep6 = !!form.businessImpact && !!form.companyName.trim();
  const canProceedStep7 = !!form.companySize && !!form.primaryBusinessGoal.trim();

  const isStepValid = () => {
    switch (step) {
      case 1: return canProceedStep1;
      case 2: return canProceedStep2;
      case 3: return canProceedStep3;
      case 4: return canProceedStep4;
      case 5: return canProceedStep5;
      case 6: return canProceedStep6;
      case 7: return canProceedStep7;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-bg text-navy flex flex-col justify-between selection:bg-accent/15">
      <Header />

      <main className="flex-1 pt-28 sm:pt-32 pb-16">
        <h1 className="sr-only">Skills Gap Diagnostic</h1>
        <div className="container max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Grid: Form Canvas (Left) + Diagnostic Summary (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Main Interactive Diagnostic Canvas */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Header Badge & Title */}
              <div>
                <div className="flex items-center justify-between gap-2 pb-2">
                  <span className="label-mono text-[10px] text-accent font-bold uppercase tracking-wider">
                    Diagnostic Survey · Step 0{step} of 07
                  </span>
                  <span className="text-xs font-mono text-navy-400">
                    {STEPS[step - 1].label}
                  </span>
                </div>
                <div className="w-full bg-border/60 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-accent h-full transition-all duration-300 rounded-full"
                    style={{ width: `${(step / 7) * 100}%` }}
                  />
                </div>
              </div>

              {/* Milestone Step Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pb-1">
                {STEPS.map((s) => {
                  const isCompleted = s.step < step;
                  const isCurrent = s.step === step;
                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => handleMilestoneClick(s.step)}
                      disabled={!isCompleted}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1 shrink-0",
                        isCurrent && "bg-accent text-white font-semibold shadow-2xs",
                        isCompleted && "bg-accent/10 text-accent font-medium hover:bg-accent/20 cursor-pointer",
                        !isCurrent && !isCompleted && "bg-surface text-navy-400 opacity-40 cursor-not-allowed border border-border"
                      )}
                    >
                      {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : <span>{s.step}</span>}
                      <span>{s.short}</span>
                    </button>
                  );
                })}
              </div>

              {/* QUESTIONNAIRE PHASE */}
              {phase === "questionnaire" && (
                <div className="bg-surface-elevated rounded-3xl border border-border/80 shadow-xs p-6 sm:p-8 space-y-6">
                  
                  {/* Step 1: Industry */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <h2 className="font-serif text-2xl font-medium text-navy tracking-tight">
                          Select your industry domain
                        </h2>
                        <p className="text-xs text-navy-400 mt-1 font-light">
                          Our intelligence layer aligns domain-specific capabilities to your operating sector.
                        </p>
                        {/* Disclose the email requirement here rather than after seven
                            steps of effort. */}
                        <p className="text-xs text-navy-500 mt-3 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                          <span>
                            Seven quick questions, about three minutes. At the end we&apos;ll ask
                            for your work email so we can send the report: no account needed, and
                            no sales call.
                          </span>
                        </p>
                      </div>

                      {isLoadingIndustries ? (
                        <div className="p-8 text-center text-xs text-navy-400 font-mono animate-pulse">
                          <Cpu className="w-5 h-5 mx-auto mb-1 text-accent animate-spin" />
                          <span>Loading sector taxonomies...</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                          {industries.filter(i => !i.isCustom).map((ind) => {
                            const isSelected = form.industryId === ind.id;
                            return (
                              <button
                                key={ind.id}
                                type="button"
                                onClick={() => {
                                  updateForm("industryId", ind.id);
                                  updateForm("industry", ind.name);
                                  updateForm("roleId", null);
                                  updateForm("role", "");
                                  updateForm("selectedSkills", []);
                                  updateForm("proficiencyBySkill", {});
                                  updateForm("selectedRoles", []);
                                  updateForm("selectedSkillsByRole", {});
                                  updateForm("customSkillsByRole", {});
                                }}
                                className={cn(
                                  "p-3.5 rounded-2xl border text-left transition-all duration-150 flex items-center justify-between text-xs font-medium",
                                  isSelected 
                                    ? "bg-accent/5 border-accent text-accent shadow-xs font-semibold ring-1 ring-accent/30" 
                                    : "bg-surface hover:bg-surface-warm border-border text-navy hover:border-accent/40"
                                )}
                              >
                                <span className="pr-2 leading-snug">{ind.name}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {form.industryId === 11 && (
                        <div className="pt-2">
                          <input
                            type="text"
                            value={form.customIndustry}
                            onChange={(e) => {
                              const sanitized = e.target.value.replace(/[^a-zA-Z\s&-]/g, '');
                              updateForm("customIndustry", sanitized);
                              updateForm("industry", sanitized);
                            }}
                            placeholder="Specify custom sector (e.g. Clean Tech Grid, GovTech)"
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs text-navy outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 2: Roles */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <h2 className="font-serif text-2xl font-medium text-navy tracking-tight">
                          Select focus roles
                        </h2>
                        <p className="text-xs text-navy-400 mt-1 font-light">
                          Identify job functions currently facing capability transformation demands.
                        </p>
                      </div>

                      {isLoadingRoles ? (
                        <div className="p-8 text-center text-xs text-navy-400 font-mono animate-pulse">
                          <Cpu className="w-5 h-5 mx-auto mb-1 text-accent animate-spin" />
                          <span>Mapping roles for {form.industry}...</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                          {roles.filter(r => r.id > 0 && !r.isCustom).map((r) => {
                            const isSelected = form.selectedRoles.some(sr => sr.id === r.id);
                            return (
                              <button
                                key={r.id}
                                type="button"
                                onClick={() => toggleRole(r)}
                                className={cn(
                                  "p-3.5 rounded-2xl border text-left transition-all duration-150 flex items-center justify-between text-xs font-medium",
                                  isSelected 
                                    ? "bg-accent/5 border-accent text-accent shadow-xs font-semibold ring-1 ring-accent/30" 
                                    : "bg-surface hover:bg-surface-warm border-border text-navy hover:border-accent/40"
                                )}
                              >
                                <span className="pr-2 leading-snug">{r.name}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
                              </button>
                            );
                          })}

                          <button
                            type="button"
                            onClick={() => toggleRole("other")}
                            className={cn(
                              "p-3.5 rounded-2xl border text-left transition-all duration-150 flex items-center justify-between text-xs font-medium",
                              form.selectedRoles.some(sr => sr.id === -1)
                                ? "bg-accent/5 border-accent text-accent shadow-xs font-semibold ring-1 ring-accent/30"
                                : "bg-surface hover:bg-surface-warm border-border text-navy hover:border-accent/40"
                            )}
                          >
                            <span className="truncate pr-2">+ Custom Role Title</span>
                            {form.selectedRoles.some(sr => sr.id === -1) && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
                          </button>
                        </div>
                      )}

                      {form.selectedRoles.some((r) => r.id === -1) && (
                        <div className="pt-2">
                          <input
                            type="text"
                            value={form.customRole}
                            onChange={(e) => updateForm("customRole", e.target.value)}
                            placeholder="Specify proprietary role titles (comma separated)"
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs text-navy outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 3: Skills */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div>
                        <h2 className="font-serif text-2xl font-medium text-navy tracking-tight">
                          Map core capabilities
                        </h2>
                        <p className="text-xs text-navy-400 mt-1 font-light">
                          Select the target competencies required for each role track.
                        </p>
                      </div>

                      {isLoadingSkills ? (
                        <div className="p-8 text-center text-xs text-navy-400 font-mono animate-pulse">
                          <Cpu className="w-5 h-5 mx-auto mb-1 text-accent animate-spin" />
                          <span>Mapping capability vectors...</span>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {form.selectedRoles.map((role) => {
                            const roleKey = role.id < 0 ? `custom-${role.name.toLowerCase()}` : String(role.id);
                            const roleName = role.name === "Other" && form.customRole ? form.customRole : role.name;
                            // Only offer curated skills. User-submitted custom skills are
                            // persisted against the assessment but must not leak into the
                            // catalogue shown to other visitors (industries and roles filter
                            // the same way).
                            const roleSkills = role.id < 0
                              ? []
                              : (skillsByRole[String(role.id)] ?? []).filter(s => !s.isCustom);
                            const selectedForRole = form.selectedSkillsByRole[roleKey] ?? [];
                            const customForRole = form.customSkillsByRole[roleKey] ?? "";

                            return (
                              <div key={roleKey} className="p-4 rounded-2xl bg-surface border border-border/80 space-y-3">
                                <div className="flex items-center justify-between text-xs font-semibold text-navy pb-1 border-b border-border/60">
                                  <span>{roleName}</span>
                                  <span className="text-[10px] font-mono text-accent font-semibold">
                                    {selectedForRole.length} selected
                                  </span>
                                </div>

                                {role.id > 0 && roleSkills.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 pt-1">
                                    {roleSkills.map((sk) => {
                                      const isSelected = selectedForRole.some(s => s.id === sk.id);
                                      return (
                                        <button
                                          key={sk.id}
                                          type="button"
                                          onClick={() => toggleSkill(sk, roleKey)}
                                          className={cn(
                                            "px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5",
                                            isSelected 
                                              ? "bg-accent text-white border-accent shadow-2xs scale-105" 
                                              : "bg-surface-elevated text-navy-600 border-border hover:border-accent/40"
                                          )}
                                        >
                                          {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                                          <span>{sk.name}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}

                                <input
                                  type="text"
                                  value={customForRole}
                                  onChange={(e) => updateCustomSkills(e.target.value, roleKey)}
                                  placeholder="Add custom specialized skills (comma separated)"
                                  className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs text-navy outline-none focus:border-accent"
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 4: Proficiency */}
                  {step === 4 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="font-serif text-2xl font-medium text-navy tracking-tight">
                            Proficiency calibration
                          </h2>
                          <p className="text-xs text-navy-400 mt-1 font-light">
                            1 = Novice/Deficit · 3 = Standard Baseline · 5 = Expert
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const nextProf: Record<string, number> = {};
                            form.selectedSkills.forEach((s) => { nextProf[s.name] = 3; });
                            updateForm("proficiencyBySkill", nextProf);
                          }}
                          className="px-2.5 py-1 rounded-full bg-surface border border-border text-[10px] font-mono text-navy-600 hover:bg-surface-warm"
                        >
                          All Baseline (3)
                        </button>
                      </div>

                      <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                        {form.selectedSkills.map((sk) => {
                          const score = form.proficiencyBySkill[sk.name] ?? 3;
                          return (
                            <div key={sk.name} className="p-3.5 rounded-2xl bg-surface border border-border/80 flex items-center justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-navy leading-snug">{sk.name}</p>
                                <span className={cn(
                                  "text-[10px] font-mono font-medium",
                                  score <= 2 ? "text-rose-600" : score === 3 ? "text-amber-600" : "text-emerald-600"
                                )}>
                                  {score <= 2 ? "Critical Deficit" : score === 3 ? "Standard Baseline" : "Proficient"} ({score}/5)
                                </span>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                {[1, 2, 3, 4, 5].map((lvl) => (
                                  <button
                                    key={lvl}
                                    type="button"
                                    onClick={() => updateProficiency(sk.name, lvl)}
                                    className={cn(
                                      "w-8 h-8 rounded-xl font-mono text-xs font-bold border transition-all flex items-center justify-center",
                                      score === lvl 
                                        ? "bg-accent text-white border-accent shadow-xs scale-105" 
                                        : "bg-surface-elevated text-navy-500 border-border hover:border-accent/40"
                                    )}
                                  >
                                    {lvl}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Timeline */}
                  {step === 5 && (
                    <div className="space-y-4">
                      <div>
                        <h2 className="font-serif text-2xl font-medium text-navy tracking-tight">
                          Time to build this internally
                        </h2>
                        <p className="text-xs text-navy-400 mt-1 font-light">
                          Current duration required to develop and deploy this capability internally.
                        </p>
                      </div>

                      <div className="space-y-2">
                        {TIME_TO_BUILD_OPTIONS.map((opt) => {
                          const isSelected = form.timeToBuild === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => updateForm("timeToBuild", opt.value)}
                              className={cn(
                                "w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between text-xs",
                                isSelected 
                                  ? "bg-accent/5 border-accent text-accent shadow-xs font-semibold ring-1 ring-accent/30" 
                                  : "bg-surface hover:bg-surface-warm border-border text-navy"
                              )}
                            >
                              <div>
                                <span className="font-semibold block">{opt.label}</span>
                                <span className="text-[11px] text-navy-400 font-light">{opt.desc}</span>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-accent shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 6: Impact */}
                  {step === 6 && (
                    <div className="space-y-4">
                      <div>
                        <h2 className="font-serif text-2xl font-medium text-navy tracking-tight">
                          Severity & company context
                        </h2>
                        <p className="text-xs text-navy-400 mt-1 font-light">
                          Strategic risk if this capability deficit persists unaddressed.
                        </p>
                      </div>

                      <div>
                        <label htmlFor="diag-company-name" className="block text-[11px] font-mono uppercase text-navy-600 font-semibold mb-1">
                          Company / Organization Name <span className="text-accent">*</span>
                        </label>
                        <input
                          id="diag-company-name"
                          name="companyName"
                          autoComplete="organization"
                          type="text"
                          value={form.companyName}
                          onChange={(e) => updateForm("companyName", e.target.value)}
                          placeholder="e.g. Acme Systems Corp"
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-xs text-navy outline-none focus:border-accent focus:bg-white transition-colors"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {BUSINESS_IMPACT_OPTIONS.map((opt) => {
                          const isSelected = form.businessImpact === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => updateForm("businessImpact", opt.value)}
                              className={cn(
                                "p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between text-xs",
                                isSelected 
                                  ? "bg-accent/5 border-accent text-accent shadow-xs font-semibold ring-1 ring-accent/30" 
                                  : "bg-surface hover:bg-surface-warm border-border text-navy"
                              )}
                            >
                              <div className="pr-2">
                                <span className="font-semibold block">{opt.label}</span>
                                <span className="text-[10px] text-navy-400 leading-tight block mt-0.5">{opt.desc}</span>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 7: Scale & Goal */}
                  {step === 7 && (
                    <div className="space-y-4">
                      <div>
                        <h2 className="font-serif text-2xl font-medium text-navy tracking-tight">
                          Workforce scale & objective
                        </h2>
                        <p className="text-xs text-navy-400 mt-1 font-light">
                          Calibrate rollout economics and specify your primary goal.
                        </p>
                      </div>

                      {/* These options are buttons, not a single control, so this is a
                          labelled group rather than a <label>. */}
                      <div role="group" aria-labelledby="headcount-label">
                        <span
                          id="headcount-label"
                          className="block text-[11px] font-mono uppercase text-navy-600 font-semibold mb-1"
                        >
                          Enterprise Headcount <span className="text-accent">*</span>
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {COMPANY_SIZE_OPTIONS.map((opt) => {
                            const isSelected = form.companySize === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => updateForm("companySize", opt.value)}
                                className={cn(
                                  "p-2.5 rounded-xl border text-center transition-all text-xs",
                                  isSelected 
                                    ? "bg-accent/5 border-accent text-accent font-semibold ring-1 ring-accent/30" 
                                    : "bg-surface hover:bg-surface-warm border-border text-navy"
                                )}
                              >
                                <span className="block font-medium">{opt.label}</span>
                                <span className="text-[10px] text-navy-400 font-mono">{opt.tag}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="diag-objective" className="block text-[11px] font-mono uppercase text-navy-600 font-semibold mb-1">
                          Primary Transformation Objective <span className="text-accent">*</span>
                        </label>
                        <textarea
                          id="diag-objective"
                          name="primaryBusinessGoal"
                          rows={2}
                          value={form.primaryBusinessGoal}
                          onChange={(e) => updateForm("primaryBusinessGoal", e.target.value)}
                          placeholder="e.g. Accelerate GenAI adoption across engineering, reduce ramp time from 90 to 21 days"
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-xs text-navy outline-none focus:border-accent focus:bg-white transition-colors"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Docked Action Bar */}
                  <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={step === 1}
                      className={cn(
                        "px-4 py-2 rounded-full border border-border text-xs font-semibold text-navy flex items-center gap-1.5 transition-all hover:bg-surface",
                        step === 1 ? "opacity-0 pointer-events-none" : "opacity-100"
                      )}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <div className="text-[11px] font-mono text-navy-400 hidden sm:block">
                      Press <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-navy-600 text-[10px]">Enter ↵</kbd>
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      className={cn(
                        "px-6 py-2.5 rounded-full bg-accent text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs",
                        !isStepValid() ? "opacity-40 cursor-not-allowed" : "hover:bg-accent-hover hover:scale-105 active:scale-95"
                      )}
                    >
                      <span>{step === 7 ? "Generate my report" : "Continue"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              )}

              {/* PROCESSING STATE */}
              {phase === "processing" && (
                <div className="bg-surface-elevated rounded-3xl border border-border shadow-md p-10 text-center space-y-4">
                  <div className="relative w-14 h-14 mx-auto">
                    <div className="absolute inset-0 rounded-full border-3 border-accent/20 animate-ping" />
                    <div className="absolute inset-0 rounded-full border-3 border-t-accent border-b-transparent animate-spin" />
                    <div className="absolute inset-2 rounded-full bg-accent/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-accent" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="font-serif text-xl font-medium text-navy">{processing.title}</h2>
                    <p className="text-xs text-navy-500 font-mono">
                      {processing.detail(form.selectedSkills.length)}
                    </p>
                  </div>
                </div>
              )}

              {/* LEAD CAPTURE PHASE */}
              {phase === "leadCapture" && (
                <div className="bg-surface-elevated rounded-3xl border border-border shadow-md p-8">
                  <div className="text-center max-w-md mx-auto mb-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs inline-block mb-3">
                      {leadCapture.badge}
                    </span>
                    <h2 className="font-serif text-2xl font-normal text-navy tracking-[-0.02em]">
                      {leadCapture.title}
                    </h2>
                    <p className="text-sm text-navy-500 mt-2">
                      {leadCapture.subtitle(form.companyName || "your organisation")}
                    </p>
                  </div>

                  <form onSubmit={handleLeadCaptureSubmit} className="max-w-md mx-auto space-y-3">
                    <div>
                      <label htmlFor="diag-lead-name" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-navy mb-1">
                        Your Full Name
                      </label>
                      <input
                        id="diag-lead-name"
                        name="name"
                        autoComplete="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => updateForm("name", e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-xs text-navy outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="diag-lead-email" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-navy mb-1">
                        Work Email Address
                      </label>
                      <input
                        id="diag-lead-email"
                        name="workEmail"
                        autoComplete="email"
                        type="email"
                        required
                        value={form.workEmail}
                        onChange={(e) => updateForm("workEmail", e.target.value)}
                        placeholder="e.g. s.jenkins@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-xs text-navy outline-none focus:border-accent"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting || !form.name || !form.workEmail}
                        className={cn(
                          "w-full py-3 rounded-full bg-accent text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs",
                          isSubmitting ? "opacity-75 cursor-wait" : "hover:bg-accent-hover hover:scale-[1.02]"
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            <span>
                              {[
                                "Saving your responses…",
                                "Analysing capability gaps…",
                                "Generating your report…",
                                "Preparing your PDF…",
                              ][submitStage]}
                            </span>
                          </>
                        ) : (
                          <>
                            <span>Generate & View Executive Report</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-center text-xs text-navy-500 pt-1">
                      {isSubmitting
                        ? "This usually takes about a minute. Please keep this tab open."
                        : "The report takes about a minute to generate. No sales calls. We never sell or share your data."}
                    </p>
                  </form>
                </div>
              )}

              {/* RESULTS PHASE */}
              {phase === "results" && (
                <div className="bg-surface-elevated rounded-3xl border border-border shadow-md p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
                    <div>
                      <h2 className="font-serif text-2xl font-normal text-navy tracking-[-0.02em]">
                        {results.titlePrefix} {form.companyName || "your organisation"}
                      </h2>
                      <p className="text-sm text-navy-500 mt-1">
                        {results.metaIndustryLabel}: {form.industry} · {results.metaRoleLabel}: {form.role}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs flex items-center gap-1.5 self-start sm:self-auto">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{results.dispatched}</span>
                    </span>
                  </div>

                  {/* Vulnerability Alert */}
                  {hasCriticalVulnerability && lowestScoringSkill && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-rose-900">
                          {results.criticalTitlePrefix} {lowestScoringSkill.skill}
                        </h4>
                        <p className="text-[11px] text-rose-800 mt-0.5 leading-relaxed font-normal">
                          {results.criticalBody(form.timeToBuild, form.businessImpact)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-surface border border-border">
                      <span className="text-sm text-navy-500 block">{results.metrics.skills}</span>
                      <p className="text-xl font-mono tabular text-navy mt-1">{form.selectedSkills.length}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface border border-border">
                      <span className="text-sm text-navy-500 block">{results.metrics.timeToBuild}</span>
                      <p className="text-xl font-serif font-normal text-navy mt-1">{form.timeToBuild}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface border border-border">
                      <span className="text-sm text-navy-500 block">{results.metrics.lowest}</span>
                      <p className="text-sm font-serif font-normal text-navy mt-1 truncate">{lowestScoringSkill?.skill || results.lowestFallback}</p>
                      <span className="text-xs text-navy-500 font-mono tabular block mt-0.5">Score {lowestScoringSkill?.score || 3}/5</span>
                    </div>
                  </div>

                  {/* Skill Breakdown */}
                  <div>
                    <h3 className="text-sm font-semibold text-navy-500 mb-2.5">
                      {results.breakdownHeading}
                    </h3>
                    <div className="divide-y divide-border border border-border rounded-2xl overflow-hidden text-xs">
                      {form.selectedSkills.map((sk) => {
                        const score = form.proficiencyBySkill[sk.name] ?? 3;
                        return (
                          <div key={sk.name} className="p-3.5 bg-surface flex items-center justify-between gap-3">
                            <span className="font-medium text-navy truncate">{sk.name}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              <div className="w-24 bg-border h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className={cn(
                                    "h-full rounded-full",
                                    score <= 2 ? "bg-rose-500" : score === 3 ? "bg-amber-500" : "bg-emerald-500"
                                  )}
                                  style={{ width: `${(score / 5) * 100}%` }}
                                />
                              </div>
                              <span className="font-mono text-[11px] font-semibold text-navy">{score}/5</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA Box */}
                  <div className="p-5 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <h4 className="font-serif text-lg font-normal text-navy">{results.cta.title}</h4>
                      <p className="text-sm text-navy-500 mt-1">{results.cta.body}</p>
                    </div>
                    <Link
                      href="/demo"
                      className="px-5 py-2.5 rounded-full bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
                    >
                      <span>{results.cta.button}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              )}

            </div>

            {/* RIGHT COLUMN: Diagnostic Summary Sidebar (Sticky on Desktop) */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-36">

              {/* Summary Card */}
              <div className="bg-surface-elevated rounded-3xl border border-border/80 p-5 space-y-4 shadow-xs">
                
                <div className="flex items-center gap-2 pb-3 border-b border-border/60">
                  <Activity className="w-4 h-4 text-navy-400" />
                  <span className="text-sm font-semibold text-navy-500">
                    {sidebar.heading}
                  </span>
                </div>

                {/* Answers So Far */}
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-xs text-navy-500 block">{sidebar.fields.industry}</span>
                    <p className="font-medium text-navy mt-0.5">
                      {form.industry || <span className="text-navy-400">{sidebar.emptyValue}</span>}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-navy-500 block">{sidebar.fields.roles}</span>
                    <p className="font-medium text-navy mt-0.5">
                      {form.selectedRoles.length > 0
                        ? `${form.selectedRoles.length} ${form.selectedRoles.length === 1 ? "role" : "roles"} selected`
                        : <span className="text-navy-400">{sidebar.emptyValue}</span>}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-navy-500 block">{sidebar.fields.skills}</span>
                    <p className="font-medium text-navy mt-0.5">
                      {form.selectedSkills.length > 0
                        ? `${form.selectedSkills.length} ${form.selectedSkills.length === 1 ? "skill" : "skills"} mapped`
                        : <span className="text-navy-400">{sidebar.emptyValue}</span>}
                    </p>
                  </div>

                  {form.timeToBuild && (
                    <div>
                      <span className="text-xs text-navy-500 block">{sidebar.fields.timeToBuild}</span>
                      <p className="font-medium text-navy mt-0.5">{form.timeToBuild}</p>
                    </div>
                  )}
                </div>

                {/* How Skillar Closes The Gap */}
                <div className="p-3.5 rounded-2xl bg-surface border border-border space-y-1.5">
                  <div className="flex items-center gap-1.5 text-navy text-sm font-semibold">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-navy-400" />
                    <span>{sidebar.model.title}</span>
                  </div>
                  <p className="text-sm text-navy-500 leading-relaxed">
                    {sidebar.model.body}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Email Modal */}
      <Dialog open={showEmailNotificationModal} onOpenChange={setShowEmailNotificationModal}>
        <DialogContent className="sm:max-w-md bg-surface-elevated border border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-serif font-normal text-navy">Report dispatched</DialogTitle>
            <DialogDescription className="text-sm text-navy-500 pt-1">
              Your audit report is being sent to <strong className="text-navy">{form.workEmail}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-3">
            <button
              onClick={() => setShowEmailNotificationModal(false)}
              className="px-4 py-1.5 rounded-full bg-accent text-white text-xs font-semibold"
            >
              Continue
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
