/**
 * Illustrative data for <StakeholderTelemetryExplorer /> — the employee,
 * manager and admin views of the same assessment evidence.
 * Figures are sample data — Skillar is pre-launch.
 */

export const stakeholderHeader = {
  eyebrow: "Three views of the same evidence",
  title: "Employee, manager, admin",
  tabs: [
    { id: "learner", label: "01 · Employee" },
    { id: "manager", label: "02 · Manager" },
    { id: "executive", label: "03 · Admin" },
  ],
} as const;

export const learnerView = {
  badge: "Employee view",
  title: "Know what you passed, and what comes back next.",
  body:
    "Each person sees their own skill scores, the revision roadmap generated from their last assessment, and when each certificate expires. Results are private to them and their manager.",
  points: [
    "Skill scores across the competencies the role is tracked on",
    "A revision roadmap covering only the concepts below mastery",
  ],
  panelTitle: "Sarah Chen · Skill profile",
  panelBadge: "AML certified until Nov",
  skills: [
    { skill: "Service standards", score: 94, status: "Certified", color: "bg-emerald-500" },
    { skill: "Data privacy & consent", score: 88, status: "Certified", color: "bg-indigo-500" },
    { skill: "Transaction monitoring", score: 82, status: "Roadmap in progress", color: "bg-sky-500" },
    { skill: "Customer due diligence", score: 54, status: "Below mastery", color: "bg-rose-500" },
  ],
} as const;

export const managerView = {
  badge: "Manager view",
  title: "See who on the team is short, before the audit does.",
  body:
    "Managers get a skill heatmap across their direct reports, a readiness score for the team, and the list of certificates falling due. Assigning a revision roadmap is one action.",
  points: [
    "Skill heatmap across 14 direct reports, refreshed each assessment cycle",
    "Certificate expiry list with automatic re-enrollment",
  ],
  panelTitle: "Branch operations · West (12 people)",
  panelBadge: "Readiness 86%",
  stats: [
    { label: "Team readiness", value: "86.4%", note: "Above the 80% threshold" },
    { label: "Certificates due", value: "3", note: "Inside the next 60 days" },
  ],
  alertLead: "Below mastery:",
  alertBody: "3 people on sanctions hit escalation.",
  alertAction: "Assign roadmap",
} as const;

export const adminView = {
  badge: "Admin view",
  title: "The compliance picture, and the report that proves it.",
  body:
    "Admins see coverage across the whole organisation: who is certified, who is overdue, and which policies have been acknowledged. Filter it, and it becomes the report an auditor asked for.",
  points: [
    "Compliance dashboard by department, role and certification",
    "Audit-ready report of completions, acknowledgements and certificates",
  ],
  panelTitle: "Compliance dashboard",
  panelBadge: "Q4 reporting period",
  stats: [
    { label: "People tracked", value: "4,280", note: "Across 6 sites" },
    { label: "Certified & current", value: "88.2%", note: "+19 pts since Q1" },
    { label: "Overdue", value: "62", note: "Auto re-enrolled" },
  ],
  rowLabel: "Mandatory training · Fire & emergency response",
  rowValue: "94% acknowledged",
} as const;
