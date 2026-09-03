/**
 * Illustrative data for the four-perspective lens selector on /solutions.
 *
 * Each pipeline traces the same real spine (assess, pinpoint, remediate,
 * verify) read from a different desk. Figures are representative, which is why
 * the component renders a SampleDataBadge.
 */

import { CONTENT_TYPES, INTEGRATIONS } from "@/lib/product-truth";

export type LensType = "ld" | "hr" | "managers" | "enterprise";

export interface LensConfig {
  id: LensType;
  title: string;
  role: string;
  stake: string;
  question: string;
  focus: string;
  badgeColor: string;
  accentColor: string;
  href: string;
  pipeline: { step: string; detail: string; status?: string }[];
  summary: { label: string; value: string }[];
  /** Small status strip under the topology graphic. */
  statusStrip: { label: string; value: string; className: string };
}

export const lensChrome = {
  title: "One record set. Four ways to read it.",
  flowLabel: "What happens next",
  shortLabels: {
    ld: "L&D",
    hr: "Human Resources",
    managers: "Team Managers",
    enterprise: "Enterprise",
  },
} as const;

export const organizationLenses: LensConfig[] = [
  {
    id: "ld",
    title: "Learning & Development",
    role: "The roadmap builders",
    stake: "Roadmaps & assessments",
    question: "What should this team learn next, and where does the content come from?",
    focus: "Assessment results turned into roadmaps grounded in your own documents",
    badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    accentColor: "#6366F1",
    href: "/solutions/learning-development",
    pipeline: [
      { step: "Assessment closed", detail: "GMP documentation quiz completed by 42 of 44 production staff", status: "Scored" },
      { step: "Concepts below mastery", detail: "Batch record corrections and deviation logging flagged for revision", status: "Pinpointed" },
      { step: "Roadmap generated", detail: "Four milestones drafted from your SOP library, not the open internet", status: "Drafted" },
      { step: "Published to learners", detail: "Text, video and quiz steps released with a re-assessment date attached", status: "Live" },
    ],
    summary: [
      { label: "Source material", value: "Your SOPs" },
      { label: "Roadmap shape", value: "Milestones" },
      { label: "Step formats", value: `${CONTENT_TYPES.length} types` },
    ],
    statusStrip: { label: "Latest roadmap", value: "GMP batch records · 4 milestones", className: "text-indigo-300" },
  },
  {
    id: "hr",
    title: "Human Resources",
    role: "The workforce owners",
    stake: "Onboarding & mobility",
    question: "Who is enrolled, who is qualified, and who could move into this role?",
    focus: "HRMS records turned into automatic enrollment and evidence for internal moves",
    badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    accentColor: "#38BDF8",
    href: "/solutions/hr",
    pipeline: [
      { step: "HRMS sync", detail: "142 employee records imported from Keka across four departments", status: "Imported" },
      { step: "Auto-enrollment", detail: "New joiners placed on the induction journey their role requires", status: "Enrolled" },
      { step: "Compliance view", detail: "AML refresher tracked per branch with policy acknowledgements recorded", status: "Tracked" },
      { step: "Mobility shortlist", detail: "Employees with verified adjacent skills surfaced for the open role", status: "Shortlisted" },
    ],
    summary: [
      { label: "Direct HRMS sync", value: `${INTEGRATIONS.hrms.length} systems` },
      { label: "Any other HRMS", value: "CSV import" },
      { label: "Enrollment", value: "By role" },
    ],
    statusStrip: { label: "Onboarding", value: "6 new joiners · enrolled by role", className: "text-sky-300" },
  },
  {
    id: "managers",
    title: "Team Managers",
    role: "The frontline leaders",
    stake: "Team readiness",
    question: "Is my shift qualified for the work I am about to assign?",
    focus: "Team heatmaps, certification expiry, and revision roadmaps for whoever sits below threshold",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    accentColor: "#34D399",
    href: "/solutions/managers",
    pipeline: [
      { step: "Team heatmap", detail: "Line B (14 operators): machine guarding strong, lockout/tagout thin", status: "Assessed" },
      { step: "Expiry alert", detail: "Two forklift certifications lapse before the next shift rotation", status: "21 days" },
      { step: "Roadmap assigned", detail: "Revision roadmap covering only the flagged lockout/tagout concepts", status: "Assigned" },
      { step: "Re-assessment", detail: "Follow-up quiz confirms the gap closed before on-site work resumes", status: "Verified" },
    ],
    summary: [
      { label: "Team view", value: "Skill heatmap" },
      { label: "Renewal alerts", value: "Before expiry" },
      { label: "Spreadsheets", value: "None" },
    ],
    statusStrip: { label: "Certifications", value: "2 renewals due in 21 days", className: "text-emerald-300" },
  },
  {
    id: "enterprise",
    title: "Enterprise Leadership",
    role: "The accountable executives",
    stake: "Compliance & governance",
    question: "If an auditor walked in tomorrow, could we produce the evidence?",
    focus: "Completion, acknowledgement and certification evidence across every site, in one filtered report",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    accentColor: "#A855F7",
    href: "/solutions/enterprise",
    pipeline: [
      { step: "Organisation roll-up", detail: "Completion and mastery aggregated by site, department and role", status: "Aggregated" },
      { step: "Risk surfaced", detail: "Three branches below threshold on the AML refresher deadline", status: "Flagged" },
      { step: "Access boundaries", detail: "Role-based access keeps employee, manager and admin views separate", status: "Enforced" },
      { step: "Audit pack", detail: "Filtered report exported with the acknowledgement and certificate trail", status: "Export ready" },
    ],
    summary: [
      { label: "Tenant isolation", value: "Per org" },
      { label: "Access model", value: "Role-based" },
      { label: "SOC 2 Type II", value: "On roadmap" },
    ],
    statusStrip: { label: "Access control", value: "Role-based access · enforced", className: "text-purple-300" },
  },
];
