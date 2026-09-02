/**
 * Illustrative data for <CapabilityAtlasConsole />.
 *
 * Skills a compliance-heavy workforce is actually tracked on, the assessment
 * evidence behind each score, and the revision roadmap Skillar generates when
 * a concept lands below the mastery threshold.
 * Figures are sample data; Skillar is pre-launch.
 */

export type ScopeLevel = "enterprise" | "department" | "team" | "individual";

export type SkillCategory =
  | "Safety & Compliance"
  | "Quality & Operations"
  | "Regulatory"
  | "Leadership";

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  x: number;
  y: number;
  currentScore: number;
  projectedScore: number;
  targetScore: number;
  status: "gap" | "developing" | "mastered";
  urgency: "CRITICAL" | "HIGH" | "OPTIMAL";
  peopleAffected: number;
  connectedTo: string[];
  description: string;
  roadmap: {
    title: string;
    step1: string;
    step2: string;
    step3: string;
    outcome: string;
  };
}

export const skillCategories: readonly ("All" | SkillCategory)[] = [
  "All",
  "Safety & Compliance",
  "Quality & Operations",
  "Regulatory",
  "Leadership",
] as const;

export const atlasSkills: SkillNode[] = [
  {
    id: "machine-safety",
    name: "Machine Safety & Lockout",
    category: "Safety & Compliance",
    x: 48,
    y: 18,
    currentScore: 54,
    projectedScore: 88,
    targetScore: 85,
    status: "gap",
    urgency: "CRITICAL",
    peopleAffected: 142,
    connectedTo: ["permit-work", "shift-handover", "deviation-reporting"],
    description:
      "Isolating energy sources, applying and verifying locks, and signing off before a guard is opened.",
    roadmap: {
      title: "Revision roadmap · Machine safety",
      step1: "Assessment flags the lockout sequence and verification step",
      step2: "Revision steps drawn from SOP-114 and the plant safety manual",
      step3: "Re-assessment, then the safety certificate is reissued",
      outcome: "Certificates tracked to expiry, with renewal alerts 30 days out",
    },
  },
  {
    id: "deviation-reporting",
    name: "Deviation Reporting",
    category: "Quality & Operations",
    x: 24,
    y: 36,
    currentScore: 72,
    projectedScore: 84,
    targetScore: 80,
    status: "developing",
    urgency: "HIGH",
    peopleAffected: 89,
    connectedTo: ["gmp-docs"],
    description:
      "Recording a deviation, writing the root cause clearly, and routing it to the right approver.",
    roadmap: {
      title: "Revision roadmap · Deviation write-ups",
      step1: "Assessment flags root-cause wording and approver routing",
      step2: "Revision steps drawn from the quality manual and past CAPA records",
      step3: "Re-assessment against the same tracked skill",
      outcome: "Progress visible on the team heatmap as steps complete",
    },
  },
  {
    id: "gmp-docs",
    name: "GMP Documentation",
    category: "Quality & Operations",
    x: 76,
    y: 30,
    currentScore: 88,
    projectedScore: 94,
    targetScore: 90,
    status: "mastered",
    urgency: "OPTIMAL",
    peopleAffected: 64,
    connectedTo: ["data-privacy", "permit-work"],
    description:
      "Good documentation practice: contemporaneous entries, correct corrections, complete batch records.",
    roadmap: {
      title: "Maintenance roadmap · GMP records",
      step1: "Annual assessment confirms mastery is holding",
      step2: "Short refresher steps on the sections that drifted",
      step3: "Certificate renewed ahead of its expiry date",
      outcome: "Auto re-enrollment when the certificate approaches expiry",
    },
  },
  {
    id: "permit-work",
    name: "Permit to Work",
    category: "Safety & Compliance",
    x: 60,
    y: 54,
    currentScore: 48,
    projectedScore: 86,
    targetScore: 82,
    status: "gap",
    urgency: "CRITICAL",
    peopleAffected: 210,
    connectedTo: ["machine-safety", "gmp-docs"],
    description:
      "Raising, authorising and closing permits for confined space, hot work and work at height.",
    roadmap: {
      title: "Revision roadmap · Permit to work",
      step1: "Assessment flags confined-space entry and gas-test intervals",
      step2: "Revision steps drawn from the permit SOP and the incident log",
      step3: "Re-assessment before the permit authority is restored",
      outcome: "Acknowledgement and completion recorded in the audit trail",
    },
  },
  {
    id: "data-privacy",
    name: "Data Privacy & Consent",
    category: "Regulatory",
    x: 82,
    y: 60,
    currentScore: 68,
    projectedScore: 82,
    targetScore: 78,
    status: "developing",
    urgency: "HIGH",
    peopleAffected: 45,
    connectedTo: ["service-standards"],
    description:
      "Handling customer data lawfully: consent capture, retention limits, and breach escalation.",
    roadmap: {
      title: "Revision roadmap · Data privacy",
      step1: "Assessment flags retention limits and breach escalation timing",
      step2: "Revision steps drawn from your privacy policy and internal circulars",
      step3: "Re-assessment, with acknowledgement captured on completion",
      outcome: "Policy acknowledgement stored against each employee record",
    },
  },
  {
    id: "service-standards",
    name: "Service Standards",
    category: "Quality & Operations",
    x: 72,
    y: 80,
    currentScore: 91,
    projectedScore: 95,
    targetScore: 90,
    status: "mastered",
    urgency: "OPTIMAL",
    peopleAffected: 38,
    connectedTo: ["frontline-coaching"],
    description:
      "The service protocol a customer-facing role is measured against, front desk through to escalation.",
    roadmap: {
      title: "Maintenance roadmap · Service standards",
      step1: "Quarterly assessment confirms the standard is being held",
      step2: "Refresher steps on the two scenarios scoring lowest",
      step3: "Re-assessment folded into the next scheduled cycle",
      outcome: "Readiness score published to the manager dashboard",
    },
  },
  {
    id: "frontline-coaching",
    name: "Frontline Coaching",
    category: "Leadership",
    x: 34,
    y: 74,
    currentScore: 59,
    projectedScore: 88,
    targetScore: 85,
    status: "gap",
    urgency: "HIGH",
    peopleAffected: 95,
    connectedTo: ["deviation-reporting"],
    description:
      "Running a toolbox talk, correcting an unsafe act on the floor, and recording the conversation.",
    roadmap: {
      title: "Revision roadmap · Frontline coaching",
      step1: "Assessment flags on-the-spot correction and record keeping",
      step2: "Revision steps drawn from your supervisor handbook",
      step3: "Re-assessment before the supervisor sign-off is granted",
      outcome: "Supervisors enrolled automatically when they change role",
    },
  },
  {
    id: "shift-handover",
    name: "Shift Handover",
    category: "Quality & Operations",
    x: 16,
    y: 56,
    currentScore: 76,
    projectedScore: 85,
    targetScore: 80,
    status: "developing",
    urgency: "HIGH",
    peopleAffected: 52,
    connectedTo: [],
    description:
      "Passing open jobs, isolations and abnormalities to the next shift without loss of detail.",
    roadmap: {
      title: "Revision roadmap · Shift handover",
      step1: "Assessment flags isolation status and open-job wording",
      step2: "Revision steps drawn from the handover SOP and past logs",
      step3: "Re-assessment at the end of the roadmap",
      outcome: "Completion recorded against the operator's skill profile",
    },
  },
];

export const scopeProfiles: Record<
  ScopeLevel,
  { title: string; count: string; coverage: string; criticalGaps: number; activeRoadmaps: number }
> = {
  enterprise: {
    title: "All sites and branches",
    count: "10,400 people",
    coverage: "96.4%",
    criticalGaps: 3,
    activeRoadmaps: 382,
  },
  department: {
    title: "Plant Operations",
    count: "1,840 people",
    coverage: "98.1%",
    criticalGaps: 2,
    activeRoadmaps: 124,
  },
  team: {
    title: "Line 3 · Assembly, Pune",
    count: "48 people",
    coverage: "100%",
    criticalGaps: 1,
    activeRoadmaps: 18,
  },
  individual: {
    title: "Marcus Vance, Shift Lead, Line 3",
    count: "Operator grade 4",
    coverage: "100%",
    criticalGaps: 1,
    activeRoadmaps: 2,
  },
};

/** The signals Skillar actually reads. No code, no commit history, no VCS. */
export const atlasSignals = [
  {
    icon: "assessment",
    label: "Assessment results",
    detail: "Machine safety assessment closed for Line 3",
    count: "84 operators",
    time: "8m ago",
  },
  {
    icon: "roadmap",
    label: "Roadmap progress",
    detail: "Permit-to-work revision roadmap · 6 of 12 steps done",
    count: "38 in progress",
    time: "22m ago",
  },
  {
    icon: "certification",
    label: "Certification status",
    detail: "Permits expiring inside 60 days, renewal alerts sent",
    count: "12 due",
    time: "1h ago",
  },
  {
    icon: "hrms",
    label: "HRMS profile data",
    detail: "Role, grade and department synced from Zoho People",
    count: "4 roles updated",
    time: "3h ago",
  },
] as const;

export const atlasLabels = {
  signalsHeading: "Signals Skillar reads",
  domainHeading: "Skill area",
  criticalGaps: "Below mastery",
  activeRoadmaps: "Active roadmaps",
  tabs: {
    map: "Skill map",
    signals: "Signals",
    roadmap: "Roadmap",
  },
  legend: {
    gap: "Below mastery",
    developing: "In progress",
    mastered: "Certified",
  },
  status: {
    gap: "below mastery",
    developing: "in progress",
    mastered: "certified",
  },
  scopeLabels: {
    enterprise: "Organisation",
    department: "Department",
    team: "Team",
    individual: "Person",
  },
  mapCaption: "Skills and the roles that share them",
  mapHint: "Select a skill to see its revision roadmap",
  diagnosticHeading: "Assessment result",
  scoreLabel: "Assessed / threshold",
  projectButton: "Project impact of the revision roadmap",
  projectBusy: "Projecting…",
  projectedNote: "Projected after roadmap completion",
  resetButton: "Reset to current baseline",
  coverageSuffix: "assessed",
} as const;
