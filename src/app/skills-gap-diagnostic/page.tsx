"use client";



import { useMemo, useState, useEffect } from "react";

import Header from "@/components/Header";

import Footer from "@/components/Footer";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

import { generateSkillsGapReport, saveSkillsGapAssessment, sendSkillsGapReportEmail, updateAssessmentStatus } from "@/lib/actions";

import {

  getIndustries,

  getRolesByIndustry,

  getSkillsByIndustryAndRole,

  type IndustryOption,

  type RoleOption,

  type SkillOption,

} from "@/lib/dropdown-actions";



// Static options for non-database-driven fields



const TIME_TO_BUILD_OPTIONS = [

  "Less than 1 month",

  "1-3 months",

  "3-6 months",

  "6-12 months",

  "More than 12 months",

];



const BUSINESS_IMPACT_OPTIONS = [

  "Low – Nice to have",

  "Medium – Important but not urgent",

  "High – Impacts quarterly targets",

  "Critical – Direct revenue / safety risk",

];



const COMPANY_SIZE_OPTIONS = [

  "0-199 employees",

  "200-999 employees",

  "1,000-4,999 employees",

  "5,000-19,999 employees",

  "20,000+ employees",

];



// Selected skill with its database ID and display name

type SelectedSkill = {

  id: number;

  name: string;

};



// One selected role (id can be -1 for "Other")

type SelectedRole = { id: number; name: string };



type QuestionnairePhase = "questionnaire" | "processing" | "leadCapture" | "results";



type FormState = {

  industryId: number | null;

  industry: string; // Display name

  roleId: number | null;

  role: string; // Display name

  selectedSkills: SelectedSkill[];

  proficiencyBySkill: Record<string, number>; // Keyed by skill name

  timeToBuild: string;

  businessImpact: string;

  primaryBusinessGoal: string;

  companySize: string;

  name: string;

  workEmail: string;

  companyName: string;

  // For custom "Other" entries

  customIndustry: string;

  customRole: string;

  customSkills: string;

  // Multi-role: selected roles and per-role skills

  selectedRoles: SelectedRole[];

  selectedSkillsByRole: Record<string, SelectedSkill[]>; // key = String(roleId)

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



export default function SkillsGapDiagnosticPage() {

  const [phase, setPhase] = useState<QuestionnairePhase>("questionnaire");

  const [step, setStep] = useState(1);

  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [aiReport, setAiReport] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [aiReportError, setAiReportError] = useState<string>("");

  const [showEmailNotificationModal, setShowEmailNotificationModal] = useState(false);

  const [failureReason, setFailureReason] = useState<string>("");



  // Database-driven dropdown state

  const [industries, setIndustries] = useState<IndustryOption[]>([]);

  const [roles, setRoles] = useState<RoleOption[]>([]);

  const [skills, setSkills] = useState<SkillOption[]>([]);

  const [skillsByRole, setSkillsByRole] = useState<Record<string, SkillOption[]>>({});

  const [isLoadingIndustries, setIsLoadingIndustries] = useState(true);

  const [isLoadingRoles, setIsLoadingRoles] = useState(false);

  const [isLoadingSkills, setIsLoadingSkills] = useState(false);



  // Fetch industries on mount

  useEffect(() => {

    async function fetchIndustries() {

      try {

        setIsLoadingIndustries(true);

        const data = await getIndustries();

        setIndustries(data);

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

      } catch (error) {

        console.error("Failed to fetch roles:", error);

      } finally {

        setIsLoadingRoles(false);

      }

    }

    fetchRoles();

  }, [form.industryId]);



  // Fetch skills for single-role mode (when no multi-role selection yet)

  useEffect(() => {

    if (form.selectedRoles.length > 0) return; // multi-role uses skillsByRole

    if (!form.industryId || !form.roleId) {

      setSkills([]);

      return;

    }

    async function fetchSkills() {

      try {

        setIsLoadingSkills(true);

        const data = await getSkillsByIndustryAndRole(form.industryId!, form.roleId!);

        setSkills(data);

      } catch (error) {

        console.error("Failed to fetch skills:", error);

      } finally {

        setIsLoadingSkills(false);

      }

    }

    fetchSkills();

  }, [form.industryId, form.roleId, form.selectedRoles.length]);



  // Fetch skills per role when multiple roles selected

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

    return () => {

      cancelled = true;

    };

  }, [form.industryId, form.selectedRoles]);



  // Sync roleId and role from selectedRoles (selectedSkills is set by handlers)

  useEffect(() => {

    if (form.selectedRoles.length === 0) return;

    const roleId = form.selectedRoles[0]?.id ?? null;

    const role = form.selectedRoles

      .map((r) => (r.id === -1 ? form.customRole || "Other" : r.name))

      .filter(Boolean)

      .join(", ");

    setForm((prev) => ({ ...prev, roleId, role }));

  }, [form.selectedRoles, form.customRole]);



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

    const timeIndex = TIME_TO_BUILD_OPTIONS.indexOf(form.timeToBuild);

    const isSlowBuild = timeIndex >= 2; // 3-6 months or longer



    const anyLow = form.selectedSkills.some((skillObj) => {

      const score = form.proficiencyBySkill[skillObj.name] ?? 3;

      return score <= 2;

    });



    return isSlowBuild && anyLow;

  }, [form.selectedSkills, form.proficiencyBySkill, form.timeToBuild]);



  const handleNext = () => {

    if (step === 7) {

      setPhase("processing");

      // Simulate a short analysis step

      setTimeout(() => {

        setPhase("leadCapture");

      }, 1200);

      return;

    }

    setStep((prev) => Math.min(prev + 1, 7));

  };



  const handleBack = () => {

    if (phase !== "questionnaire") return;

    setStep((prev) => Math.max(prev - 1, 1));

  };



  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {

    setForm((prev) => ({

      ...prev,

      [key]: value,

    }));

  };



  const updateCustomSkills = (value: string, roleKey?: string) => {

    const key = roleKey ?? String(form.roleId);

    setForm((prev) => {

      const skillNames = value

        .split(",")

        .map((s) => s.trim())

        .filter((s) => s.length > 0);



      const baseSelectedSkills = (prev.selectedSkillsByRole[key] ?? []).filter((s) => s.id > 0);

      const customSelectedSkills: SelectedSkill[] = [];

      skillNames.forEach((name, index) => {

        const existsInBase = baseSelectedSkills.some(

          (s) => s.name.toLowerCase() === name.toLowerCase()

        );

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

      proficiencyBySkill: {

        ...prev.proficiencyBySkill,

        [skill]: value,

      },

    }));

  };



  const handleLeadCaptureSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const hasRoles = form.selectedRoles.length > 0 || form.roleId != null;

    if (!form.workEmail || !form.name || !form.companyName || !form.industryId || !hasRoles) {

      return;

    }



    setIsSubmitting(true);

    setAiReport("");

    setAiReportError("");

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
    // const selectedSkillsByRole: Record<string, any[]> | undefined = useMultiRole ? {} : undefined;

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



    // Trace which roles and skills are custom and log them into JSON
    const customRolesData: string[] = []
    const customSkillsData: string[][] = []
    const customIndustryData: string[] = []

    // 1. Collect Custom Industry
    if (form.industryId === -1 || form.industryId === 11) {
      if (form.customIndustry?.trim()) {
        customIndustryData.push(form.customIndustry.trim())
      }
    }

    // 2. Collect Custom Roles and Skills
    if (useMultiRole) {
      for (const role of effectiveRolesList) {
        const isCustomRole = role.id < 0;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const submitKey = String(role.id);
        const originalKey = role.id < 0 ? `custom-${role.name.toLowerCase()}` : String(role.id);
        
        // Get text-box skills for this role
        const customSkillsText = form.customSkillsByRole[originalKey];
        const textSkillNames = customSkillsText ? customSkillsText.split(',').map(s => s.trim()).filter(Boolean) : [];
        
        // Find which selected skills are custom (negative IDs)
        const selectedSkills = form.selectedSkillsByRole[originalKey] ?? [];
        const customSelectedSkillNames = selectedSkills
          .filter(s => s.id < 0)
          .map(s => s.name);

        const allCustomSkillsForThisRole = [...new Set([...customSelectedSkillNames, ...textSkillNames])];

        if (isCustomRole || allCustomSkillsForThisRole.length > 0) {
          customRolesData.push(role.name);
          customSkillsData.push(allCustomSkillsForThisRole);
        }
      }
    } else {
      // Single role handling
      const isCustomRole = form.roleId === -1;
      const customSelectedSkillNames = form.selectedSkills
        .filter(s => s.id < 0)
        .map(s => s.name);
        
      const customSkillsText = form.customSkills;
      const textSkillNames = customSkillsText ? customSkillsText.split(',').map(s => s.trim()).filter(Boolean) : [];
      const allCustomSkills = [...new Set([...customSelectedSkillNames, ...textSkillNames])];

      if (isCustomRole || allCustomSkills.length > 0) {
        customRolesData.push(isCustomRole ? (form.customRole.trim() || form.role) : form.role);
        customSkillsData.push(allCustomSkills);
      }
    }



    try {

      const saveResult = await saveSkillsGapAssessment({

        name: form.name,

        email: form.workEmail,

        companyName: form.companyName,

        industryId: form.industryId!,

        customIndustry: form.industryId === 11 ? form.customIndustry : undefined,

        ...(useMultiRole

          ? { roleIds, selectedSkillsByRole, customRole: form.customRole, customRolesMapping, customSkillsByRole: customSkillsByRoleMapped }

          : {

            roleId: form.roleId!,

            customRole: form.customRole,

            selectedSkills: form.selectedSkills.map((skill) => ({

              id: skill.id,

              name: skill.name,

              proficiency: form.proficiencyBySkill[skill.name] ?? 3,

            })),

          }),

        userGoal: form.primaryBusinessGoal,

        timeToBuildLabel: form.timeToBuild,

        businessImpact: form.businessImpact,

        companySize: form.companySize,

        criticalFlag: hasCriticalVulnerability,

        customAddedRoles: customRolesData.length > 0 ? customRolesData : undefined,

        customAddedSkills: customSkillsData.length > 0 ? customSkillsData : undefined,

        customAddedIndustry: customIndustryData.length > 0 ? customIndustryData : undefined,

      });



      if (!saveResult.success) {

        // Database save failed

        const errorMsg = `Database Error: ${saveResult.error || 'Failed to save your assessment'}`;

        setFailureReason(errorMsg);

        setShowEmailNotificationModal(true);

        setAiReportError(errorMsg);

        setPhase("results");

        return;

      }



      assessmentId = saveResult.assessmentId;

      // console.log('✅ Assessment saved with ID:', assessmentId);



      const lowestSkillName = lowestScoringSkill?.skill || form.selectedSkills[0]?.name || "Unknown skill";

      const lowestSkillScore = lowestScoringSkill?.score ?? (form.proficiencyBySkill[lowestSkillName] ?? 3);



      // Build an overview string for ALL selected skills and their ratings

      const skillsOverview =

        form.selectedSkills.length > 0

          ? form.selectedSkills

            .map((skill) => {

              const score = form.proficiencyBySkill[skill.name] ?? 3;

              return `${skill.name} (${score}/5)`;

            })

            .join("; ")

          : "None selected";



      // Build an overview string for ALL roles and their skills

      const rolesOverview =

        effectiveRolesList.length > 0

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



      // Step 2: Generate AI report





      const reportResult = await generateSkillsGapReport({

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

      });



      if (reportResult.success && reportResult.fullReport) {

        setAiReport(reportResult.fullReport);



        // Update report status to COMPLETED

        if (assessmentId) {

          await updateAssessmentStatus({

            assessmentId,

            reportStatus: 'COMPLETED'

          });

        }



        // Step 3: Send PDF report via email (non-blocking)

        sendSkillsGapReportEmail({

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

          aiReport: reportResult.fullReport,

          skillsOverview,

          rolesOverview,

          assessmentId: assessmentId,

        }).then((emailResult) => {

          if (emailResult.success) {

            // console.log('✅ Report email sent to:', form.workEmail);

          } else {

            console.error('❌ Email send failed:', emailResult.error);

            // Show notification modal when email fails

            // setFailureReason(`Email Delivery Issue: ${emailResult.error || 'Failed to send your report'}`);

            setShowEmailNotificationModal(true);

          }

        }).catch((err) => {

          console.error('❌ Email send error:', err);

          // Show notification modal when email fails

          const errorMsg = err instanceof Error ? err.message : 'Unknown email error';

          setFailureReason(`Email System Error: ${errorMsg}`);

          setShowEmailNotificationModal(true);

        });

      } else {

        // AI Report generation failed

        const errorMsg = `AI Report Generation Failed: ${reportResult.error || 'Failed to generate report'}`;

        if (assessmentId) {

          await updateAssessmentStatus({

            assessmentId,

            reportStatus: 'FAILED',

            emailFailureReason: errorMsg

          });

        }

        // setFailureReason(errorMsg);

        setShowEmailNotificationModal(true);

        // setAiReportError(reportResult.error || "Failed to generate report.");

      }



      setPhase("results");

    } catch (error) {

      // Catch any unexpected errors

      console.error('❌ Unexpected error:', error);

      const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred';



      if (assessmentId) {

        await updateAssessmentStatus({

          assessmentId,

          reportStatus: 'FAILED',

          emailFailureReason: `System Error: ${errorMsg}`

        });

      }



      // setFailureReason(`System Error: ${errorMsg}`);

      setShowEmailNotificationModal(true);

      // setAiReportError(errorMsg);

      setPhase("results");

    } finally {

      setIsSubmitting(false);

    }

  };



  return (

    <div className="min-h-screen bg-background-primary text-text-primary">

      <Header />

      <main>

        {/* Hero-style header to match home page, slightly more compact */}

        <section className="hero pb-6 md:pb-4">

          <div className="container">

            <div className="hero-content">

              <h1 className="hero-title text-3xl md:text-4xl">

                Run your free AI-powered

                <br />

                <span className="gradient-text">Skills Gap Analysis</span>

              </h1>

              <p className="hero-description mt-4">

                In a few quick steps, reveal your biggest capability gaps and the cost of waiting to close them.

              </p>



            </div>

          </div>

        </section>



        {/* Centered diagnostic content below hero */}

        <section className="-mt-6 md:-mt-10">

          <div className="container">

            <div className="mx-auto mb-16 max-w-4xl">

              {phase === "questionnaire" && (

                <QuestionnaireStep

                  step={step}

                  form={form}

                  industries={industries}

                  roles={roles}

                  skills={skills}

                  skillsByRole={skillsByRole}

                  isLoadingIndustries={isLoadingIndustries}

                  isLoadingRoles={isLoadingRoles}

                  isLoadingSkills={isLoadingSkills}

                  onUpdate={updateForm}

                  onCustomSkillsChange={updateCustomSkills}

                  onToggleRole={toggleRole}

                  onToggleSkill={toggleSkill}

                  onUpdateProficiency={updateProficiency}

                  onNext={handleNext}

                  onBack={handleBack}

                />

              )}



              {phase === "processing" && (

                <ProcessingState

                  industry={form.industry}

                  role={form.role}

                  selectedSkillsCount={form.selectedSkills.length}

                />

              )}



              {phase === "leadCapture" && (

                <LeadCapture

                  form={form}

                  onUpdate={updateForm}

                  onSubmit={handleLeadCaptureSubmit}

                  isSubmitting={isSubmitting}

                />

              )}



              {phase === "results" && (

                <div className="space-y-6">

                  <ResultsSummary

                    form={form}

                    lowestScoringSkill={lowestScoringSkill}

                    hasCriticalVulnerability={hasCriticalVulnerability}

                  />

                </div>

              )}

            </div>

          </div>

        </section>

      </main>

      <Footer />



      {/* Email Notification Modal */}

      <Dialog open={showEmailNotificationModal} onOpenChange={setShowEmailNotificationModal}>

        <DialogContent className="sm:max-w-md bg-background-secondary border-border">

          <DialogHeader>

            <div className="flex items-center gap-3 mb-2">

              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">

                <svg

                  className="w-6 h-6 text-white"

                  fill="none"

                  stroke="currentColor"

                  viewBox="0 0 24 24"

                >

                  <path

                    strokeLinecap="round"

                    strokeLinejoin="round"

                    strokeWidth={2}

                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"

                  />

                </svg>

              </div>

              <DialogTitle className="text-xl text-text-primary">

                {failureReason.includes('Email') ? 'Report Processing Delayed 📧' : 'High Demand Notice!!'}

              </DialogTitle>

            </div>

            <DialogDescription className="text-text-secondary text-base leading-relaxed pt-2">

              <div className="space-y-3">

                <p>

                  We&apos;re experiencing <span className="text-primary font-semibold">high demand</span> right now!

                </p>

                {failureReason.includes('Email') ? (

                  <>

                    <p>

                      Your personalized <strong className="text-text-primary">Strategic L&D Alignment Audit</strong> will be sent to{" "}

                      <span className="text-primary font-medium">{form.workEmail}</span> within the next few minutes.

                    </p>



                  </>

                ) : (

                  <>

                    <p>

                      We&apos;re working on generating your <strong className="text-text-primary">Strategic L&D Alignment Audit</strong>.

                      Once ready, it will be sent to <span className="text-primary font-medium">{form.workEmail}</span>.

                    </p>

                    <div className="bg-background-primary/50 border border-border/50 rounded-lg p-4 mt-4">

                      <p className="text-sm text-text-secondary">

                        <span className="font-medium text-text-primary">What&apos;s happening:</span> Our AI system is processing your assessment.

                        You&apos;ll receive your detailed report via email shortly.

                      </p>

                    </div>

                  </>

                )}



              </div>

            </DialogDescription>

          </DialogHeader>

          <div className="flex justify-end gap-3 mt-4">

            <Button

              onClick={() => setShowEmailNotificationModal(false)}

              className="bg-gradient-to-r from-accent-blue to-accent-purple hover:opacity-90 text-white"

            >

              Got it, thanks!

            </Button>

          </div>

        </DialogContent>

      </Dialog>

    </div>

  );

}



// eslint-disable-next-line @typescript-eslint/no-unused-vars
function StepIndicator({

  step,

  phase,

}: {

  step: number;

  phase: QuestionnairePhase;

}) {

  const effectiveStep = phase === "questionnaire" ? step : 7;



  return (

    <div className="flex items-center gap-2 text-xs md:text-sm">

      {Array.from({ length: 7 }).map((_, index) => {

        const current = index + 1;

        const isActive = current === effectiveStep && phase === "questionnaire";

        const isCompleted = current < effectiveStep || phase !== "questionnaire";

        return (

          <div

            key={current}

            className={cn(

              "flex h-7 min-w-[2rem] items-center justify-center rounded-full border text-[11px] font-medium md:h-8 md:min-w-[2.25rem] md:text-xs",

              isActive &&

              "border-primary-300 bg-primary-300/20 text-primary-100 shadow-[0_0_0_1px_rgba(50,184,198,0.6)]",

              !isActive &&

              (isCompleted

                ? "border-primary-300/70 bg-primary-300/10 text-primary-100"

                : "border-border/60 bg-background-secondary text-text-secondary")

            )}

          >

            {current}

          </div>

        );

      })}

      <span className="ml-2 hidden text-xs text-text-secondary md:inline">

        {phase === "questionnaire" && <>Step {step} of 7</>}

        {phase === "processing" && "Analyzing your skills gap"}

        {phase === "leadCapture" && "Almost there – get your results"}

        {phase === "results" && "Your diagnostic results"}

      </span>

    </div>

  );

}



type QuestionnaireStepProps = {

  step: number;

  form: FormState;

  industries: IndustryOption[];

  roles: RoleOption[];

  skills: SkillOption[];

  skillsByRole: Record<string, SkillOption[]>;

  isLoadingIndustries: boolean;

  isLoadingRoles: boolean;

  isLoadingSkills: boolean;

  onUpdate: <K extends keyof FormState>(key: K, value: FormState[K]) => void;

  onCustomSkillsChange: (value: string, roleKey?: string) => void;

  onToggleRole: (role: RoleOption | "other") => void;

  onToggleSkill: (skill: SkillOption, roleKey?: string) => void;

  onUpdateProficiency: (skill: string, value: number) => void;

  onNext: () => void;

  onBack: () => void;

};



// function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {

//   const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;



//   const steps = [

//     { label: "Industry", icon: "🏢" },

//     { label: "Role", icon: "👤" },

//     { label: "Skills", icon: "🎯" },

//     { label: "Proficiency", icon: "📊" },

//     { label: "Timeline", icon: "⏱️" },

//     { label: "Impact", icon: "💡" },

//     { label: "Company", icon: "🏛️" }

//   ];



//   return (

//     <div className="px-6 pt-5 pb-2">

//       {/* Modern step progress */}

//       <div className="relative">

//         {/* Background track line */}

//         <div className="absolute top-4 left-0 right-0 h-[2px] bg-border/40" />



//         {/* Animated progress line */}

//         <div

//           className="absolute top-4 left-0 h-[2px] bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 transition-all duration-500 ease-out"

//           style={{ width: `${progress}%` }}

//         >

//           <div className="absolute inset-0 bg-primary-300/50 blur-sm" />

//         </div>



//         {/* Step indicators */}

//         <div className="relative flex justify-between">

//           {steps.map((step, index) => {

//             const stepNum = index + 1;

//             const isCompleted = stepNum < currentStep;

//             const isCurrent = stepNum === currentStep;

//             const isFuture = stepNum > currentStep;



//             return (

//               <div

//                 key={stepNum}

//                 className="flex flex-col items-center"

//                 style={{ flex: '1', maxWidth: index === 0 || index === steps.length - 1 ? 'auto' : undefined }}

//               >

//                 {/* Step circle */}

//                 <div

//                   className={cn(

//                     "relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",

//                     isCompleted && "bg-primary-300 shadow-lg shadow-primary-300/30",

//                     isCurrent && "bg-background-secondary ring-2 ring-primary-300 ring-offset-2 ring-offset-background-secondary shadow-lg shadow-primary-300/20",

//                     isFuture && "bg-background-secondary border border-border/60"

//                   )}

//                 >

//                   {isCompleted ? (

//                     <svg className="w-4 h-4 text-background-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>

//                       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />

//                     </svg>

//                   ) : (

//                     <span className={cn(

//                       "text-sm transition-all duration-300",

//                       isCurrent ? "grayscale-0" : "grayscale opacity-50"

//                     )}>

//                       {step.icon}

//                     </span>

//                   )}

//                 </div>



//                 {/* Step label */}

//                 <span className={cn(

//                   "mt-2 text-[10px] font-medium transition-all duration-300 text-center whitespace-nowrap",

//                   isCompleted && "text-primary-300",

//                   isCurrent && "text-primary-300",

//                   isFuture && "text-text-secondary/50"

//                 )}>

//                   {step.label}

//                 </span>

//               </div>

//             );

//           })}

//         </div>

//       </div>

//     </div>

//   );

// }

function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const steps = [
    { label: "Industry", icon: "🏢" },
    { label: "Role", icon: "👤" },
    { label: "Skills", icon: "🎯" },
    { label: "Proficiency", icon: "📊" },
    { label: "Timeline", icon: "⏱️" },
    { label: "Impact", icon: "💡" },
    { label: "Company", icon: "🏛️" }
  ];

  const stepPercent = 100 / (totalSteps - 1);
  const halfStep = stepPercent / 2;

  return (
    <div className="px-6 pt-5 pb-2">
      <div className="relative">

        {/* 
          CHANGE 1: left was `${halfStep}%`, now 0
          WHY: Track must start from the left edge so it visually 
          begins behind the first step circle, not at its center 
        */}
        <div
          className="absolute top-4 h-[2px] bg-border/40"
          style={{
            left: 0,
            right: `${halfStep}%`,  // unchanged — still ends at last step's center
          }}
        />

        {/* 
          CHANGE 2: left was `${halfStep}%`, now 0
          CHANGE 3: width formula updated
          
          OLD width: calc((100% - ${halfStep * 2}%) * ${(currentStep - 1) / (totalSteps - 1)})
          NEW width: calc(${halfStep}% + (100% - ${halfStep * 2}%) * ${(currentStep - 1) / (totalSteps - 1)})
          
          WHY: Since left is now 0, the fill needs to always cover 
          at minimum halfStep% (left edge → first step center).
          Then on top of that, it grows proportionally with progress.
          
          So on step 1: width = halfStep% + 0 = reaches first circle center ✓
          On step 2: width = halfStep% + one step worth = reaches second circle center ✓
          On step 7: width = halfStep% + full inner width = reaches last circle center ✓
        */}
        <div
          className="absolute top-4 h-[2px] bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 transition-all duration-500 ease-out"
          style={{
            left: 0,
            width: `calc(${halfStep}% + (100% - ${halfStep * 2}%) * ${(currentStep - 1) / (totalSteps - 1)})`,
          }}
        >
          <div className="absolute inset-0 bg-primary-300/50 blur-sm" />
        </div>

        {/* Step indicators — unchanged */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            const isFuture = stepNum > currentStep;

            return (
              <div key={stepNum} className="flex flex-col items-center">
                <div
                  className={cn(
                    "relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                    isCompleted && "bg-primary-300 shadow-lg shadow-primary-300/30",
                    // CHANGE 4: ring-offset-background-secondary → ring-offset-background-primary
                    // WHY: Matches the actual dark page background so the ring
                    // gap doesn't show a mismatched color bleeding onto the emoji
                    isCurrent && "bg-background-secondary ring-2 ring-primary-300 ring-offset-2 ring-offset-background-primary shadow-lg shadow-primary-300/20",
                    isFuture && "bg-background-secondary border border-border/60"
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4 text-background-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className={cn(
                      "text-sm transition-all duration-300",
                      isCurrent ? "grayscale-0" : "grayscale opacity-50"
                    )}>
                      {step.icon}
                    </span>
                  )}
                </div>

                <span className={cn(
                  "mt-2 text-[10px] font-medium transition-all duration-300 text-center whitespace-nowrap",
                  isCompleted && "text-primary-300",
                  isCurrent && "text-primary-300",
                  isFuture && "text-text-secondary/50"
                )}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



function QuestionnaireStep({

  step,

  form,

  industries,

  roles,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  skills,

  skillsByRole,

  isLoadingIndustries,

  isLoadingRoles,

  isLoadingSkills,

  onUpdate,

  onCustomSkillsChange,

  onToggleRole,

  onToggleSkill,

  onUpdateProficiency,

  onNext,

  onBack,

}: QuestionnaireStepProps) {

  const canGoBack = step > 1;

  const [showCustomSkillsByRole, setShowCustomSkillsByRole] = useState<Record<string, boolean>>({});



  return (

    <Card className="bg-background-secondary/80 border-border/70 shadow-lg shadow-black/40 backdrop-blur">

      {/* Progress Bar */}

      <ProgressBar currentStep={step} totalSteps={7} />



      <CardHeader className="pt-4">

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

          <div>

            <CardTitle className="text-lg md:text-xl">

              {getStepTitle(step)}

            </CardTitle>

            <CardDescription>{getStepDescription(step)}</CardDescription>

          </div>

        </div>

      </CardHeader>

      <CardContent className="space-y-6">

        {step === 1 && (

          <div className="grid gap-4 md:grid-cols-2">

            <div className="md:col-span-2">

              <Label htmlFor="industry">Primary industry</Label>

              <select

                id="industry"

                className="mt-2 h-9 w-full rounded-md border border-border bg-background-secondary px-3 text-sm outline-none ring-offset-background focus-visible:border-primary-300 focus-visible:ring-2 focus-visible:ring-primary-300/40"

                value={form.industryId ?? ""}

                onChange={(e) => {

                  const selectedId = e.target.value ? Number(e.target.value) : null;

                  const selectedIndustry = industries.find((i) => i.id === selectedId);

                  onUpdate("industryId", selectedId);

                  onUpdate("industry", selectedIndustry?.name ?? "");

                  onUpdate("roleId", null);

                  onUpdate("role", "");

                  onUpdate("selectedSkills", []);

                  onUpdate("proficiencyBySkill", {});

                  onUpdate("selectedRoles", []);

                  onUpdate("selectedSkillsByRole", {});

                  onUpdate("customSkillsByRole", {});

                }}

                disabled={isLoadingIndustries}

              >

                <option value="">{isLoadingIndustries ? "Loading..." : "Select industry"}</option>

                {industries.filter(i => !i.isCustom).map((industry) => (
                  <option key={industry.id} value={industry.id}>
                    {industry.name}
                  </option>
                ))}

              </select>

              {form.industryId === 11 && (

                <div className="mt-4">

                  <Label htmlFor="customIndustry">Specify your industry <span className="text-error">*</span></Label>

                  <Input

                    id="customIndustry"

                    value={form.customIndustry}

                    onChange={(e) => {

                      const value = e.target.value;

                      // Validation: Allow only letters, spaces, and basic punctuation (no commas or separators)

                      const sanitizedValue = value.replace(/[^a-zA-Z\s&-]/g, '');

                      onUpdate("customIndustry", sanitizedValue);

                      onUpdate("industry", sanitizedValue);

                    }}

                    placeholder="e.g. Space Technology, Renewable Infrastructure"

                    className="mt-2"

                    required

                  />

                  <p className="mt-1 text-xs text-text-secondary">Enter your industry name (no commas or separators).</p>

                </div>

              )}

              <p className="mt-2 text-xs text-text-secondary">

                This helps us benchmark you against similar organizations.

              </p>

            </div>

          </div>

        )}



        {step === 2 && (

          <div className="space-y-4">

            <p className="text-sm text-text-secondary">

              Select one or more roles that apply. You’ll choose skills for each role on the next step.

            </p>

            {!form.industryId || isLoadingRoles ? (

              <p className="rounded-md border border-dashed border-border px-3 py-2 text-xs text-text-secondary">

                {isLoadingRoles ? "Loading roles..." : "Select an industry first."}

              </p>

            ) : (

              <>

                <div className="grid gap-2 md:grid-cols-2">
                  {roles.filter(role => role.id > 0 && !role.isCustom).map((role) => {
                    const checked = form.selectedRoles.some((r) => r.id === role.id);
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => onToggleRole(role)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-all",
                          checked
                            ? "border-primary-300 bg-primary-300/10 text-primary-50"
                            : "border-border/70 bg-background-secondary hover:border-primary-300/60"
                        )}
                      >

                        <span className="inline-flex size-4 shrink-0 rounded border border-border">

                          {checked && <span className="block size-full rounded bg-primary-300" />}

                        </span>

                        {role.name}

                      </button>

                    );

                  })}

                  <button

                    type="button"

                    onClick={() => onToggleRole("other")}

                    className={cn(

                      "flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-all",

                      form.selectedRoles.some((r) => r.id === -1)

                        ? "border-primary-300 bg-primary-300/10 text-primary-50"

                        : "border-border/70 bg-background-secondary hover:border-primary-300/60"

                    )}

                  >

                    <span className="inline-flex size-4 shrink-0 rounded border border-border">

                      {form.selectedRoles.some((r) => r.id === -1) && (

                        <span className="block size-full rounded bg-primary-300" />

                      )}

                    </span>

                    Other (specify)

                  </button>

                </div>

                {form.selectedRoles.some((r) => r.id === -1) && (

                  <div className="pt-2">

                    <Label htmlFor="customRole">Specify your role <span className="text-error">*</span></Label>

                    <Input

                      id="customRole"

                      value={form.customRole}

                      onChange={(e) => onUpdate("customRole", e.target.value)}

                      placeholder="e.g. Training Coordinator, Skills Development Manager"

                      className="mt-2"

                    />

                  </div>

                )}

              </>

            )}

          </div>

        )}



        {step === 3 && (

          <div className="space-y-6">

            <p className="text-sm text-text-secondary">

              For each role, choose the strategic skill areas you want to assess. You can add custom skills per role.

            </p>



            {form.selectedRoles.length === 0 ? (

              <p className="rounded-md border border-dashed border-border px-3 py-2 text-xs text-text-secondary">

                Select at least one role on the previous step.

              </p>

            ) : isLoadingSkills && form.selectedRoles.some((r) => r.id !== -1) ? (

              <p className="rounded-md border border-dashed border-border px-3 py-2 text-xs text-text-secondary">

                Loading skills...

              </p>

            ) : (

              form.selectedRoles.flatMap((role) => {
                if (role.id === -1 && form.customRole) {
                  const customRolesList = form.customRole.split(',').map(s => s.trim()).filter(Boolean);
                  if (customRolesList.length > 0) {
                    return customRolesList.map((cr, index) => ({ id: -1 - index, name: cr }));
                  }
                }
                return [role];
              }).map((role) => {

                const roleKey = role.id < 0 ? `custom-${role.name.toLowerCase()}` : String(role.id);

                const roleName = role.name;

                const roleSkills = role.id < 0 ? [] : (skillsByRole[String(role.id)] ?? []);

                const selectedForRole = form.selectedSkillsByRole[roleKey] ?? [];

                const customForRole = form.customSkillsByRole[roleKey] ?? "";

                const showOther = role.id < 0 ? true : (showCustomSkillsByRole[roleKey] ?? false);



                return (

                  <div key={roleKey} className="rounded-lg border border-border/70 bg-background-primary/30 p-4 space-y-3">

                    <h4 className="text-sm font-semibold text-text-primary">

                      Skills for {roleName}

                    </h4>

                    {role.id < 0 ? (

                      <div>

                        <Label htmlFor={`customSkills-${roleKey}`}>Enter your priority skills <span className="text-error">*</span></Label>

                        <textarea

                          id={`customSkills-${roleKey}`}

                          value={customForRole}

                          onChange={(e) => onCustomSkillsChange(e.target.value, roleKey)}

                          placeholder="e.g. Leadership Development, Change Management (separate with commas)"

                          className="mt-2 w-full min-h-[80px] rounded-md border border-border bg-background-secondary px-3 py-2 text-sm outline-none focus-visible:border-primary-300 focus-visible:ring-2 focus-visible:ring-primary-300/40"

                        />

                        <p className="mt-1 text-xs text-text-secondary">Enter skills separated by commas.</p>

                      </div>

                    ) : (

                      <>

                        {roleSkills.length === 0 ? (

                          <p className="text-xs text-text-secondary">No predefined skills for this role. Add your own below.</p>

                        ) : (

                          <div className="grid gap-2 md:grid-cols-2">
                            {roleSkills.filter(skill => skill.id > 0 && !skill.isCustom).map((skill) => {
                              const checked = selectedForRole.some((s) => s.id === skill.id);
                              return (
                                <button
                                  key={skill.id}
                                  type="button"
                                  onClick={() => onToggleSkill(skill, roleKey)}
                                  className={cn(
                                    "flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs md:text-sm transition-all",
                                    checked
                                      ? "border-primary-300 bg-primary-300/10 text-primary-50"
                                      : "border-border/70 bg-background-secondary hover:border-primary-300/60"
                                  )}
                                >

                                  <span className="inline-flex size-3 shrink-0 rounded border border-border">

                                    {checked && <span className="block size-full rounded bg-primary-300" />}

                                  </span>

                                  {skill.name}

                                </button>

                              );

                            })}

                          </div>

                        )}

                        <div className="pt-2">

                          <button

                            type="button"

                            onClick={() => setShowCustomSkillsByRole((prev) => ({ ...prev, [roleKey]: !prev[roleKey] }))}

                            className="text-xs font-medium text-primary-100 hover:underline"

                          >

                            {showOther ? "Hide other skills" : "Add other skills (specify)"}

                          </button>

                          {showOther && (

                            <div className="mt-2">

                              <Label htmlFor={`customSkills-${roleKey}`}>Additional skills for {roleName}</Label>

                              <textarea

                                id={`customSkills-${roleKey}`}

                                value={customForRole}

                                onChange={(e) => onCustomSkillsChange(e.target.value, roleKey)}

                                placeholder="e.g. Digital Transformation (separate with commas)"

                                className="mt-1 w-full min-h-[60px] rounded-md border border-border bg-background-secondary px-3 py-2 text-sm outline-none focus-visible:border-primary-300 focus-visible:ring-2 focus-visible:ring-primary-300/40"

                              />

                            </div>

                          )}

                        </div>

                      </>

                    )}

                  </div>

                );

              })

            )}



            <p className="text-xs text-text-secondary">

              Select or enter at least one skill per role. You’ll rate all skills together on the next step.

            </p>

          </div>

        )}



        {step === 4 && (

          <div className="space-y-5">

            {form.selectedSkills.length === 0 ? (

              <p className="rounded-md border border-dashed border-border px-3 py-2 text-xs text-text-secondary">

                Select at least one skill on the previous step to rate your current

                proficiency.

              </p>

            ) : (

              <>

                <p className="text-sm text-text-secondary">

                  For each skill, how would you rate your organization&apos;s current

                  proficiency today?

                </p>

                <div className="space-y-4">

                  {form.selectedSkills.map((skillObj, index) => {

                    const value = form.proficiencyBySkill[skillObj.name] ?? 3;

                    return (

                      <div

                        key={`${skillObj.id}-${skillObj.name}-${index}`}

                        className="rounded-lg border border-border/70 bg-background-secondary px-3 py-3"

                      >

                        <div className="flex items-center justify-between gap-3">

                          <p className="text-sm font-medium">{skillObj.name}</p>

                          <span className="text-xs text-text-secondary">

                            {value}/5

                          </span>

                        </div>

                        <div className="mt-3 flex items-center gap-2">

                          {Array.from({ length: 5 }).map((_, index) => {

                            const score = index + 1;

                            const isActive = score <= value;

                            return (

                              <button

                                key={score}

                                type="button"

                                onClick={() => onUpdateProficiency(skillObj.name, score)}

                                className={cn(

                                  "flex h-7 w-7 items-center justify-center rounded-full border text-[11px] transition-all",

                                  isActive

                                    ? "border-primary-300 bg-primary-300/20 text-primary-50"

                                    : "border-border/60 bg-background-secondary text-text-secondary hover:border-primary-300/60 hover:bg-primary-300/5"

                                )}

                              >

                                {score}

                              </button>

                            );

                          })}

                        </div>

                        <p className="mt-2 text-[11px] text-text-secondary">

                          1 = No capability in place • 5 = World‑class, repeatable capability

                        </p>

                      </div>

                    );

                  })}

                </div>

              </>

            )}

          </div>

        )}



        {step === 5 && (

          <div className="space-y-4">

            <Label htmlFor="timeToBuild">

              If you had to build high‑quality training for these skills internally,

              how long would it realistically take?

            </Label>

            <select

              id="timeToBuild"

              className="mt-2 h-9 w-full rounded-md border border-border bg-background-secondary px-3 text-sm outline-none focus-visible:border-primary-300 focus-visible:ring-2 focus-visible:ring-primary-300/40"

              value={form.timeToBuild}

              onChange={(e) => onUpdate("timeToBuild", e.target.value)}

            >

              <option value="">Select a timeframe</option>

              {TIME_TO_BUILD_OPTIONS.map((option) => (

                <option key={option} value={option}>

                  {option}

                </option>

              ))}

            </select>

            <p className="text-xs text-text-secondary">

              Consider design, stakeholder alignment, SME time, pilots, and rollout.

            </p>

          </div>

        )}



        {step === 6 && (

          <div className="space-y-4">

            <div className="space-y-2">

              <Label htmlFor="companyName">

                Company name

              </Label>

              <Input

                id="companyName"

                value={form.companyName}

                onChange={(e) => onUpdate("companyName", e.target.value)}

                placeholder="e.g. Appyzie Inc."

                className="mt-2"

              />

            </div>

            <div className="space-y-2">

              <Label htmlFor="businessImpact">

                If these skills remain under‑developed for the next 6–12 months, what is

                the likely business impact?

              </Label>

              <select

                id="businessImpact"

                className="mt-2 h-9 w-full rounded-md border border-border bg-background-secondary px-3 text-sm outline-none focus-visible:border-primary-300 focus-visible:ring-2 focus-visible:ring-primary-300/40"

                value={form.businessImpact}

                onChange={(e) => onUpdate("businessImpact", e.target.value)}

              >

                <option value="">Select impact level</option>

                {BUSINESS_IMPACT_OPTIONS.map((option) => (

                  <option key={option} value={option}>

                    {option}

                  </option>

                ))}

              </select>

            </div>

          </div>

        )}



        {step === 7 && (

          <div className="space-y-4">

            <div className="space-y-2">

              <Label htmlFor="companySize">

                Roughly how many employees are in your organization?

              </Label>

              <select

                id="companySize"

                className="mt-2 h-9 w-full rounded-md border border-border bg-background-secondary px-3 text-sm outline-none focus-visible:border-primary-300 focus-visible:ring-2 focus-visible:ring-primary-300/40"

                value={form.companySize}

                onChange={(e) => onUpdate("companySize", e.target.value)}

              >

                <option value="">Select company size</option>

                {COMPANY_SIZE_OPTIONS.map((option) => (

                  <option key={option} value={option}>

                    {option}

                  </option>

                ))}

              </select>

            </div>



            <Label htmlFor="primaryBusinessGoal">

              What is the primary business goal driving your training initiatives this year?

            </Label>

            <Input

              id="primaryBusinessGoal"

              value={form.primaryBusinessGoal}

              onChange={(e) => onUpdate("primaryBusinessGoal", e.target.value)}

              placeholder="e.g. Reduce safety incidents by 20%, improve sales conversion, accelerate onboarding"

              className="mt-2"

            />

          </div>

        )}

      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3">

        <Button

          type="button"

          variant="ghost"

          size="sm"

          onClick={onBack}

          disabled={!canGoBack}

          className="text-text-secondary hover:text-text-primary"

        >

          Back

        </Button>

        <div className="flex items-center gap-3">

          <span className="hidden text-[11px] text-text-secondary md:inline">

            {step < 7 ? "Next: continue questionnaire" : "Next: analyze your skills gap"}

          </span>

          <Button

            type="button"

            size="sm"

            onClick={onNext}

            disabled={!canProceed(step, form)}

            className="px-5"

          >

            {step < 7 ? "Next" : "Analyze my gaps"}

          </Button>

        </div>

      </CardFooter>

    </Card>

  );

}



function getStepTitle(step: number): string {

  switch (step) {

    case 1:

      return "Select your industry";

    case 2:

      return "Select your role";

    case 3:

      return "Choose priority skill areas";

    case 4:

      return "Rate current proficiency";

    case 5:

      return "Estimate time to build training";

    case 6:

      return "Assess business impact of delay";

    case 7:

      return "Company context";

    default:

      return "";

  }

}



function getStepDescription(step: number): string {

  switch (step) {

    case 1:

      return "We’ll benchmark you against similar organizations in your sector.";

    case 2:

      return "So we can tailor the diagnostic to your decision-making context.";

    case 3:

      return "Pick the skill areas that keep you up at night.";

    case 4:

      return "Capture how far along your organization is today.";

    case 5:

      return "Estimate the realistic internal build time for high-quality training.";

    case 6:

      return "Quantify the cost of doing nothing for the next few quarters.";

    case 7:

      return "Company size and goals help quantify impact and urgency.";

    default:

      return "";

  }

}



function canProceed(step: number, form: FormState): boolean {

  switch (step) {

    case 1:

      return form.industryId !== null;

    case 2:

      // Multi-role: at least one role; if "Other" is selected, customRole must be filled

      if (form.selectedRoles.length > 0) {

        const hasOther = form.selectedRoles.some((r) => r.id === -1);

        return !hasOther || form.customRole.trim().length > 0;

      }

      return form.roleId !== null && (form.roleId !== -1 || form.customRole.trim().length > 0);

    case 3:

      // Multi-role: every selected role must have at least one skill

      if (form.selectedRoles.length > 0) {

        const effectiveRolesList = form.selectedRoles.flatMap(role => {
          if (role.id === -1 && form.customRole) {
            const customRolesList = form.customRole.split(',').map(s => s.trim()).filter(Boolean);
            if (customRolesList.length > 0) {
              return customRolesList.map((cr, index) => ({ id: -1 - index, name: cr }));
            }
          }
          return [role];
        });

        return effectiveRolesList.every(
          (r) => {
            const roleKey = r.id < 0 ? `custom-${r.name.toLowerCase()}` : String(r.id);
            const hasSelected = (form.selectedSkillsByRole[roleKey]?.length ?? 0) > 0;
            const hasCustom = (form.customSkillsByRole[roleKey]?.trim()?.length ?? 0) > 0;
            return hasSelected || hasCustom;
          }
        );

      }

      if (form.roleId === -1) return form.customSkills.trim().length > 0;

      return form.selectedSkills.length > 0;

    case 4:

      return form.selectedSkills.length > 0;

    case 5:

      return !!form.timeToBuild;

    case 6:

      return !!form.companyName.trim() && !!form.businessImpact;

    case 7:

      return !!form.companySize && !!form.primaryBusinessGoal;

    default:

      return true;

  }

}



function ProcessingState({

  industry,

  role,

  selectedSkillsCount,

}: {

  industry: string;

  role: string;

  selectedSkillsCount: number;

}) {

  return (

    <Card className="bg-background-secondary/80 border-border/70 shadow-lg shadow-black/40 backdrop-blur">

      <CardHeader>

        <CardTitle className="text-lg md:text-xl">

          Analyzing your skills gap…

        </CardTitle>

        <CardDescription>

          We&apos;re modeling risk, cost of delay, and where Skillar can create the

          biggest lift first.

        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-4">

        <div className="flex items-center gap-3">

          <div className="relative inline-flex size-8 md:size-10">

            <span className="absolute inset-0 animate-ping rounded-full bg-primary-300/30" />

            <span className="relative flex size-full items-center justify-center rounded-full bg-primary-300/80 text-xs font-semibold text-background-primary">

              AI

            </span>

          </div>

          <div className="space-y-1 text-sm">

            <p>

              Running scenario models for{" "}

              <span className="font-medium text-primary-100">

                {industry || "your industry"}

              </span>{" "}

              and{" "}

              <span className="font-medium text-primary-100">

                {role || "your role"}

              </span>

              .

            </p>

            {selectedSkillsCount > 0 && (

              <p className="text-xs text-text-secondary">

                Evaluating {selectedSkillsCount} priority skill

                {selectedSkillsCount > 1 ? "s" : ""} against internal build time.

              </p>

            )}

          </div>

        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-background-primary/70">

          <div className="h-full w-1/3 animate-[shimmer_1.8s_ease-in-out_infinite] rounded-full bg-gradient-primary" />

        </div>

        <style jsx>{`

           @keyframes shimmer {

             0% {

               transform: translateX(-100%);

             }

             50% {

               transform: translateX(10%);

             }

             100% {

               transform: translateX(120%);

             }

           }

         `}</style>

      </CardContent>

    </Card>

  );

}



type LeadCaptureProps = {

  form: FormState;

  onUpdate: <K extends keyof FormState>(key: K, value: FormState[K]) => void;

  onSubmit: (e: React.FormEvent) => void;

  isSubmitting: boolean;

};



function LeadCapture({ form, onUpdate, onSubmit, isSubmitting }: LeadCaptureProps) {

  return (

    <Card className="bg-background-secondary/80 border-border/70 shadow-lg shadow-black/40 backdrop-blur">

      <CardHeader>

        <CardTitle className="text-lg md:text-xl">

          Get your personalized diagnostic

        </CardTitle>

        <CardDescription>

          Enter your work details to see your high-level summary on this page. We’ll

          also send a deeper PDF breakdown to your inbox.

        </CardDescription>

      </CardHeader>

      <form onSubmit={onSubmit}>

        <CardContent className="space-y-5">

          <div className="grid gap-4 md:grid-cols-2">

            <div>

              <Label htmlFor="name">Full name</Label>

              <Input

                id="name"

                value={form.name}

                onChange={(e) => onUpdate("name", e.target.value)}

                placeholder="Alex Rivera"

                className="mt-2"

                required

              />

            </div>

            <div>

              <Label htmlFor="workEmail">Work email</Label>

              <Input

                id="workEmail"

                type="email"

                value={form.workEmail}

                onChange={(e) => onUpdate("workEmail", e.target.value)}

                placeholder="you@company.com"

                className="mt-2"

                required

              />

            </div>

          </div>

          <p className="text-[11px] text-text-secondary">

            We only use this to send your diagnostic and follow-up resources. No spam,

            no sales SDR swarms.

          </p>

        </CardContent>

        <CardFooter className="flex items-center justify-between gap-3">

          <p className="text-[11px] text-text-secondary">

            By continuing, you agree to receive product updates from Skillar.ai. You

            can opt out anytime.

          </p>

          <Button type="submit" size="sm" disabled={isSubmitting || !form.name || !form.workEmail}>

            {isSubmitting ? "Preparing your results…" : "View my results"}

          </Button>

        </CardFooter>

      </form>

    </Card>

  );

}



type ResultsSummaryProps = {

  form: FormState;

  lowestScoringSkill: { skill: string; score: number } | null;

  hasCriticalVulnerability: boolean;

};



function ResultsSummary({

  form,

  lowestScoringSkill,

  hasCriticalVulnerability,

}: ResultsSummaryProps) {

  return (

    <div className="space-y-6">

      <Card className="bg-background-secondary/80 border-primary-300/60 shadow-lg shadow-primary-300/20 backdrop-blur">

        <CardHeader>

          <CardTitle className="text-lg md:text-xl">

            High-level skills gap summary

          </CardTitle>

          <CardDescription>

            Here&apos;s how your current capability, internal build time, and business

            impact stack up.

          </CardDescription>

        </CardHeader>

        <CardContent className="space-y-4 text-sm">

          <div className="grid gap-4 md:grid-cols-3">

            <SummaryPill

              label="Industry & role"

              value={

                form.industry && form.role

                  ? `${form.industry} · ${form.role}`

                  : "Not specified"

              }

            />

            <SummaryPill

              label="Time to build internally"

              value={form.timeToBuild || "Not estimated"}

            />

            <SummaryPill

              label="Business impact of delay"

              value={form.businessImpact || "Not specified"}

            />

          </div>



          {lowestScoringSkill && (

            <div className="mt-3 rounded-lg border border-primary-300/60 bg-primary-300/10 px-3 py-3 text-xs md:text-sm">

              <p className="font-medium text-primary-100">

                Highest‑risk capability: {lowestScoringSkill.skill}

              </p>

              <p className="mt-1 text-text-secondary">

                You rated this at {lowestScoringSkill.score}/5. Combined with your{" "}

                <span className="font-medium text-primary-100">

                  {form.timeToBuild || "internal build time"}

                </span>{" "}

                and{" "}

                <span className="font-medium text-primary-100">

                  {form.businessImpact || "business impact"}

                </span>

                , this sits at the top of your risk stack.

              </p>

            </div>

          )}



          {form.selectedSkills.length > 0 && (

            <div className="mt-3 rounded-lg border border-border/70 bg-background-primary/40 px-3 py-3 text-xs md:text-sm">

              <p className="font-medium text-text-primary">

                All skills you assessed

              </p>

              <p className="mt-1 text-text-secondary">

                {form.selectedSkills

                  .map((skill) => {

                    const score = form.proficiencyBySkill[skill.name] ?? 3;

                    return `${skill.name} (${score}/5)`;

                  })

                  .join(" · ")}

              </p>

            </div>

          )}



          {hasCriticalVulnerability ? (

            <div className="mt-3 rounded-lg border border-error/60 bg-error/10 px-3 py-3 text-xs md:text-sm">

              <p className="font-semibold text-error">

                Critical vulnerability detected

              </p>

              <p className="mt-1 text-text-secondary">

                At least one skill is both low proficiency (1–2/5) and slow to address

                (3+ months to build training). This combination typically correlates

                with elevated incident risk, missed revenue, or regulatory exposure in{" "}

                {form.industry || "your industry"}.

              </p>

            </div>

          ) : (

            <p className="mt-3 text-xs text-text-secondary">

              We didn&apos;t detect a &quot;red alert&quot; scenario, but there is still

              meaningful upside in accelerating capability build-out in the skills you

              selected.

            </p>

          )}

        </CardContent>

      </Card>



      <Card className="bg-background-secondary/80 border-border/70 shadow-lg shadow-black/40 backdrop-blur">

        <CardHeader>

          <CardTitle className="text-lg md:text-xl">

            How Skillar can close this gap

          </CardTitle>

          <CardDescription>

            Instantly generate tailored, scenario‑based training for your highest‑risk

            capabilities without waiting months for internal build.

          </CardDescription>

        </CardHeader>

        <CardContent className="space-y-3 text-sm text-text-secondary">

          <p>

            For{" "}

            <span className="font-medium text-text-primary">

              {form.industry || "organizations like yours"}

            </span>{" "}

            and leaders in{" "}

            <span className="font-medium text-text-primary">

              {form.role || "L&D / HR"}

            </span>

            , the slowest part of closing skills gaps is turning expert knowledge into

            engaging, role‑relevant training.

          </p>

          <p>

            With Skillar, you can generate a full, ready‑to‑deploy course on{" "}

            <span className="font-semibold text-text-primary">

              {lowestScoringSkill?.skill || "your priority capability"}

            </span>{" "}

            in minutes – including scenarios, assessments, and practice activities

            tuned to your context – instead of waiting{" "}

            <span className="font-semibold text-text-primary">

              {form.timeToBuild || "months"}

            </span>{" "}

            for internal teams or vendors.

          </p>

          <p>

            The full PDF we email you will break down:

          </p>

          <ul className="list-disc space-y-1 pl-5 text-xs md:text-sm">

            <li>Which capabilities are most exposed today and why</li>

            <li>How delay compounds cost given your company size and impact level</li>

            <li>Where Skillar can immediately compress build time from months to days</li>

          </ul>

        </CardContent>

      </Card>

    </div>

  );

}



function SummaryPill({ label, value }: { label: string; value: string }) {

  return (

    <div className="rounded-lg border border-border/70 bg-background-primary/50 px-3 py-3">

      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary">

        {label}

      </p>

      <p className="mt-1 text-sm text-text-primary">{value}</p>

    </div>

  );

}



