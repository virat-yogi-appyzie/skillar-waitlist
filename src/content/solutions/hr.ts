/**
 * Copy for /solutions/hr.
 *
 * The true HR story: employee records imported from the HRMS, auto-enrollment by
 * role and department, compliance completion visibility, and internal mobility
 * built on assessed skills. No cost-avoidance or time-to-hire claims, because
 * Skillar does not measure those.
 */

import { INTEGRATIONS } from "@/lib/product-truth";

export const meta = {
  title: "For human resources: enrollment, compliance, mobility | Skillar",
  description:
    "Import your employee records, enroll new joiners by role and department automatically, and keep the completion evidence an auditor asks for.",
} as const;

export const hero = {
  title: "Understand the capabilities your workforce needs next.",
  audience: "For HR and people teams",
  lede:
    "Most HR teams run onboarding, mandatory training and internal moves out of a spreadsheet and a generic LMS. Skillar imports your employee records, enrolls people on the journeys their role requires, and keeps the completion evidence an auditor will ask for.",
  primaryCta: { label: "Book an HR walkthrough", href: "/demo" },
  secondaryCta: { label: "See the mobility view", targetId: "mobility" },
} as const;

export const heroStats = [
  {
    value: "By role",
    label: "Automatic enrollment",
    sub: "New joiners placed on the induction and compliance journeys their department requires",
    icon: "users",
  },
  {
    value: `${INTEGRATIONS.hrms.length} + CSV`,
    label: "HRMS connectors",
    sub: `${INTEGRATIONS.hrms.join(", ")}, or a CSV export from any other HRMS`,
    icon: "layers",
  },
  {
    value: "One report",
    label: "Compliance evidence",
    sub: "Completions, policy acknowledgements and certificate expiry in a single filter",
    icon: "check",
  },
] as const;

export const mobilitySection = {
  title: "See who already holds the skills an open role needs.",
  lede:
    "Skillar records assessed skills against each employee, so an internal shortlist comes from evidence rather than job titles and a manager's memory.",
} as const;

export const visibilitySection = {
  title: "Job titles say what someone was hired for. Assessments say what they can do.",
  lede:
    "A completion checkbox does not tell you whether someone can follow the procedure. Skillar assesses the skills each role is accountable for, flags the concepts still below mastery, and generates a revision roadmap grounded in your own documents.",
  note: {
    heading: "What imports from your HRMS",
    body: `Employees, departments and reporting lines from ${INTEGRATIONS.hrms.join(", ")}. ${INTEGRATIONS.hrmsFallback} keeps everyone else in scope.`,
    tag: `${INTEGRATIONS.roadmap[1]} is on our roadmap`,
  },
  cta: { label: "Book an HR walkthrough", href: "/demo" },
} as const;

export const comparison = {
  before: {
    badge: "Spreadsheets and a generic LMS",
    title: "Static and retrospective",
    points: [
      "Self-reported skill surveys, refreshed once a year",
      "Job titles that mask what someone can actually do",
      "Completion checkboxes with no evidence of mastery",
    ],
    footnote: "Evidence for an audit: rebuilt by hand",
  },
  after: {
    badge: "Skillar",
    title: "Assessed and recorded",
    points: [
      "Scheduled assessments scored per tracked skill",
      "Auto-enrollment by role and department",
      "Certificate expiry tracked with renewal alerts",
    ],
    footnote: "Evidence for an audit: a filtered report",
  },
} as const;

export const nextChapter = {
  statement: "Give managers a view of their own team's readiness.",
  label: "Next: Skillar for managers",
  href: "/solutions/managers",
  cta: "Read the managers page",
} as const;
