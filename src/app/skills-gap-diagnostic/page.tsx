 "use client";

 import { useMemo, useState } from "react";
 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { cn } from "@/lib/utils";
 import { generateSkillsGapReport, saveSkillsGapAssessment } from "@/lib/actions";

 const INDUSTRIES = [
   "Heavy Manufacturing",
   "Technology",
   "Healthcare",
   "Financial Services",
   "Retail & E‑commerce",
 ];

 const ROLES_BY_INDUSTRY: Record<string, string[]> = {
   "Heavy Manufacturing": [
     "Chief Learning Officer",
     "L&D Director",
     "Plant HR Manager",
     "Operations Excellence Lead",
   ],
   Technology: [
     "Chief Learning Officer",
     "L&D Director",
     "Engineering Enablement Lead",
     "HR Business Partner",
   ],
   Healthcare: [
     "Chief Learning Officer",
     "L&D Director",
     "Clinical Training Manager",
     "HR Manager",
   ],
   "Financial Services": [
     "Chief Learning Officer",
     "L&D Director",
     "Risk & Compliance Training Lead",
     "HR Manager",
   ],
   "Retail & E‑commerce": [
     "Chief Learning Officer",
     "L&D Director",
     "Store Operations Training Lead",
     "HR Manager",
   ],
 };

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

const SKILLS_BY_INDUSTRY_ROLE: Record<string, string[]> = {
   "Heavy Manufacturing|Chief Learning Officer": [
     "Frontline safety & compliance",
     "Lean manufacturing fundamentals",
     "Maintenance troubleshooting",
     "Supervisor coaching skills",
   ],
   "Heavy Manufacturing|L&D Director": [
     "Digital work instructions",
     "On-the-job assessment design",
     "Technical onboarding programs",
     "Shift supervisor development",
   ],
   "Heavy Manufacturing|Plant HR Manager": [
     "New hire ramp-up",
     "Attendance & performance coaching",
     "Union relations basics",
     "Workforce planning analytics",
   ],
   "Technology|Chief Learning Officer": [
     "Cloud architecture fundamentals",
     "Secure coding practices",
     "AI & data literacy",
     "Product management excellence",
   ],
   "Technology|L&D Director": [
     "Engineering onboarding",
     "Manager as coach",
     "Agile delivery practices",
     "Customer success excellence",
   ],
   "Technology|Engineering Enablement Lead": [
     "Code review best practices",
     "DevOps & CI/CD",
     "Platform reliability",
     "Technical leadership",
   ],
   "Healthcare|Clinical Training Manager": [
     "Clinical protocol updates",
     "Patient safety procedures",
     "Electronic health record usage",
     "Interdisciplinary communication",
   ],
   "Healthcare|HR Manager": [
     "Workforce wellbeing",
     "Onboarding clinical & non-clinical",
     "Compliance & privacy (HIPAA/GDPR)",
     "Supervisor conversations",
   ],
   "Financial Services|Risk & Compliance Training Lead": [
     "Regulatory updates",
     "Anti‑money laundering (AML)",
     "KYC & onboarding",
     "Conduct risk & ethics",
   ],
  "Retail & E‑commerce|Store Operations Training Lead": [
    "Store leadership",
    "Omnichannel operations",
    "Customer experience",
    "Loss prevention & shrink",
  ],
};

const DEFAULT_SKILLS_BY_INDUSTRY: Record<string, string[]> = {
  "Heavy Manufacturing": [
    "Frontline safety & compliance",
    "Lean operations & continuous improvement",
    "Supervisor coaching & feedback",
    "Technical onboarding & cross‑skilling",
  ],
  Technology: [
    "Cloud & architecture fundamentals",
    "Secure engineering practices",
    "AI & data literacy across teams",
    "Product & customer success excellence",
  ],
  Healthcare: [
    "Clinical protocol adherence",
    "Patient safety & quality",
    "EHR workflows & adoption",
    "Interdisciplinary communication",
  ],
  "Financial Services": [
    "Regulatory & compliance essentials",
    "Risk culture & ethics",
    "Customer onboarding & KYC",
    "Data privacy & security awareness",
  ],
  "Retail & E‑commerce": [
    "Store & frontline leadership",
    "Omnichannel customer journeys",
    "Sales conversion & upsell",
    "Loss prevention & shrink reduction",
  ],
};

const GENERIC_SKILLS = [
  "Manager coaching & feedback",
  "Digital & AI fluency",
  "Onboarding & ramp‑up effectiveness",
  "Customer experience & service quality",
];

 type QuestionnairePhase = "questionnaire" | "processing" | "leadCapture" | "results";

 type FormState = {
   industry: string;
   role: string;
   selectedSkills: string[];
   proficiencyBySkill: Record<string, number>;
   timeToBuild: string;
   businessImpact: string;
   primaryBusinessGoal: string;
   companySize: string;
   name: string;
   workEmail: string;
 };

 const INITIAL_FORM_STATE: FormState = {
   industry: "",
   role: "",
   selectedSkills: [],
   proficiencyBySkill: {},
   timeToBuild: "",
   businessImpact: "",
   primaryBusinessGoal: "",
   companySize: "",
   name: "",
   workEmail: "",
 };

 export default function SkillsGapDiagnosticPage() {
   const [phase, setPhase] = useState<QuestionnairePhase>("questionnaire");
   const [step, setStep] = useState(1);
   const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
   const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiReport, setAiReport] = useState<string>("");
  const [aiReportError, setAiReportError] = useState<string>("");

   const availableRoles = useMemo(
     () => (form.industry ? ROLES_BY_INDUSTRY[form.industry] ?? [] : []),
     [form.industry]
   );

  const availableSkills = useMemo(() => {
    if (!form.industry || !form.role) return [];
    const key = `${form.industry}|${form.role}`;
    return (
      SKILLS_BY_INDUSTRY_ROLE[key] ??
      DEFAULT_SKILLS_BY_INDUSTRY[form.industry] ??
      GENERIC_SKILLS
    );
  }, [form.industry, form.role]);

   const lowestScoringSkill = useMemo(() => {
     if (!form.selectedSkills.length) return null;
     let lowest: { skill: string; score: number } | null = null;
     for (const skill of form.selectedSkills) {
       const score = form.proficiencyBySkill[skill] ?? 3;
       if (!lowest || score < lowest.score) {
         lowest = { skill, score };
       }
     }
     return lowest;
   }, [form.selectedSkills, form.proficiencyBySkill]);

   const hasCriticalVulnerability = useMemo(() => {
     if (!form.selectedSkills.length || !form.timeToBuild) return false;
     const timeIndex = TIME_TO_BUILD_OPTIONS.indexOf(form.timeToBuild);
     const isSlowBuild = timeIndex >= 2; // 3-6 months or longer

     const anyLow = form.selectedSkills.some((skill) => {
       const score = form.proficiencyBySkill[skill] ?? 3;
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

   const toggleSkill = (skill: string) => {
     setForm((prev) => {
       const isSelected = prev.selectedSkills.includes(skill);
       const selectedSkills = isSelected
         ? prev.selectedSkills.filter((s) => s !== skill)
         : [...prev.selectedSkills, skill];
       const proficiencyBySkill = { ...prev.proficiencyBySkill };
       if (!isSelected && proficiencyBySkill[skill] == null) {
         proficiencyBySkill[skill] = 3;
       }
       if (isSelected) {
         delete proficiencyBySkill[skill];
       }
       return {
         ...prev,
         selectedSkills,
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
    if (!form.workEmail || !form.name) {
      return;
    }

    setIsSubmitting(true);
    setAiReport("");
    setAiReportError("");

    try {
      await saveSkillsGapAssessment({
        name: form.name,
        email: form.workEmail,
        industryName: form.industry,
        roleName: form.role,
        userGoal: form.primaryBusinessGoal,
        selectedSkills: form.selectedSkills.map((skill) => ({
          name: skill,
          proficiency: form.proficiencyBySkill[skill] ?? 3,
        })),
        timeToBuildLabel: form.timeToBuild,
        businessImpact: form.businessImpact,
        companySize: form.companySize,
        criticalFlag: hasCriticalVulnerability,
      });

      const lowestSkillName = lowestScoringSkill?.skill || form.selectedSkills[0] || "Unknown skill";
      const lowestSkillScore = lowestScoringSkill?.score ?? (form.proficiencyBySkill[lowestSkillName] ?? 3);

      const reportResult = await generateSkillsGapReport({
        userGoal: form.primaryBusinessGoal,
        userIndustry: form.industry,
        userRole: form.role,
        lowestScoringSkill: lowestSkillName,
        skillScore: lowestSkillScore,
        timeToBuild: form.timeToBuild,
        businessImpact: form.businessImpact,
        companySize: form.companySize,
      });

      if (reportResult.success && reportResult.report) {
        setAiReport(reportResult.report);
      } else {
        setAiReportError(reportResult.error || "Failed to generate report.");
      }

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
                  availableRoles={availableRoles}
                  availableSkills={availableSkills}
                  onUpdate={updateForm}
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
                  <Card className="bg-background-secondary/80 border-border/70 shadow-lg shadow-black/40 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="text-lg md:text-xl">
                        AI report draft (Gemini)
                      </CardTitle>
                      <CardDescription>
                        This is the raw output from the prompt you provided.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {aiReportError ? (
                        <p className="text-sm text-error">{aiReportError}</p>
                      ) : aiReport ? (
                        <div className="whitespace-pre-wrap break-words text-sm text-text-secondary">
                          {aiReport}
                        </div>
                      ) : (
                        <p className="text-sm text-text-secondary">
                          Report not generated yet.
                        </p>
                      )}
                    </CardContent>
                  </Card>

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
    </div>
  );
 }

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
   availableRoles: string[];
   availableSkills: string[];
   onUpdate: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
   onToggleSkill: (skill: string) => void;
   onUpdateProficiency: (skill: string, value: number) => void;
   onNext: () => void;
   onBack: () => void;
 };

 function QuestionnaireStep({
   step,
   form,
   availableRoles,
   availableSkills,
   onUpdate,
   onToggleSkill,
   onUpdateProficiency,
   onNext,
   onBack,
 }: QuestionnaireStepProps) {
   const canGoBack = step > 1;

   return (
     <Card className="bg-background-secondary/80 border-border/70 shadow-lg shadow-black/40 backdrop-blur">
       <CardHeader>
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
                 value={form.industry}
                 onChange={(e) => {
                   onUpdate("industry", e.target.value);
                   onUpdate("role", "");
                   onUpdate("selectedSkills", []);
                   onUpdate("proficiencyBySkill", {});
                 }}
               >
                 <option value="">Select industry</option>
                 {INDUSTRIES.map((industry) => (
                   <option key={industry} value={industry}>
                     {industry}
                   </option>
                 ))}
               </select>
               <p className="mt-2 text-xs text-text-secondary">
                 This helps us benchmark you against similar organizations.
               </p>
             </div>
           </div>
         )}

         {step === 2 && (
           <div className="space-y-4">
             <div>
               <Label htmlFor="role">Your role</Label>
               <select
                 id="role"
                 className="mt-2 h-9 w-full rounded-md border border-border bg-background-secondary px-3 text-sm outline-none focus-visible:border-primary-300 focus-visible:ring-2 focus-visible:ring-primary-300/40"
                 value={form.role}
                 onChange={(e) => {
                   onUpdate("role", e.target.value);
                   onUpdate("selectedSkills", []);
                   onUpdate("proficiencyBySkill", {});
                 }}
                 disabled={!form.industry}
               >
                 <option value="">
                   {form.industry ? "Select role" : "Select an industry first"}
                 </option>
                 {availableRoles.map((role) => (
                   <option key={role} value={role}>
                     {role}
                   </option>
                 ))}
               </select>
             </div>
           </div>
         )}

         {step === 3 && (
           <div className="space-y-4">
             <p className="text-sm text-text-secondary">
               Based on your industry and role, which strategic skill areas are you
               most concerned about in the next 6–12 months?
             </p>

             {!form.industry || !form.role ? (
               <p className="rounded-md border border-dashed border-border px-3 py-2 text-xs text-text-secondary">
                 Select an industry and role first to see tailored skill suggestions.
               </p>
             ) : (
               <div className="grid gap-3 md:grid-cols-2">
                 {availableSkills.map((skill) => {
                   const checked = form.selectedSkills.includes(skill);
                   return (
                     <button
                       key={skill}
                       type="button"
                       onClick={() => onToggleSkill(skill)}
                       className={cn(
                         "flex items-start gap-2 rounded-lg border px-3 py-2 text-left text-xs transition-all md:text-sm",
                         checked
                           ? "border-primary-300 bg-primary-300/10 text-primary-50 shadow-[0_0_0_1px_rgba(50,184,198,0.5)]"
                           : "border-border/70 bg-background-secondary hover:border-primary-300/60 hover:bg-primary-300/5"
                       )}
                     >
                       <span className="mt-[2px] inline-flex size-3 shrink-0 rounded-sm border border-border bg-background-secondary">
                         {checked && (
                           <span className="block size-full rounded-[3px] bg-primary-300" />
                         )}
                       </span>
                       <span>{skill}</span>
                     </button>
                   );
                 })}
               </div>
             )}

             <p className="text-xs text-text-secondary">
               You can pick multiple skills. We&apos;ll focus on the most exposed ones.
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
                   {form.selectedSkills.map((skill) => {
                     const value = form.proficiencyBySkill[skill] ?? 3;
                     return (
                       <div
                         key={skill}
                         className="rounded-lg border border-border/70 bg-background-secondary px-3 py-3"
                       >
                         <div className="flex items-center justify-between gap-3">
                           <p className="text-sm font-medium">{skill}</p>
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
                                 onClick={() => onUpdateProficiency(skill, score)}
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
       return !!form.industry;
     case 2:
       return !!form.role;
     case 3:
       return form.selectedSkills.length > 0;
     case 4:
       return form.selectedSkills.length > 0;
     case 5:
       return !!form.timeToBuild;
     case 6:
       return !!form.businessImpact;
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

