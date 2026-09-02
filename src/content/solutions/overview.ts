/**
 * Copy for the /solutions landing page.
 *
 * Four audiences, one set of records. Every sequence below traces the real
 * spine in src/lib/product-truth.ts: assess, pinpoint, remediate, verify, plus
 * the compliance and certification work that hangs off it.
 */

import { PRODUCT_LOOP } from "@/lib/product-truth";

/** The four stages every sequence on this page is a retelling of. */
export const productLoop = PRODUCT_LOOP;

export const meta = {
  title: "Solutions: one organization, four perspectives | Skillar",
  description:
    "How Skillar connects L&D, HR, frontline managers and enterprise leadership through one set of skill and compliance records.",
} as const;

export const hero = {
  title: "One organization. Four perspectives on capability.",
  lede:
    "Learning programs, workforce records, team readiness and compliance evidence usually live in four different systems. Skillar keeps them on one set of records.",
  scrollCta: "See the four perspectives",
} as const;

export const problemSection = {
  title: "Everyone sees a different gap.",
  lede:
    "When skill and compliance data sits in separate systems, four teams solve the same problem from four disconnected angles, and none of them can show their working.",
} as const;

export const perspectives = [
  {
    id: "ld",
    audience: "Learning and development",
    quote: "We need to know what people should learn next.",
    body:
      "L&D teams maintain course catalogues that go stale, with no evidence of who actually mastered what.",
    chipLabel: "Roadmap format",
    chipValue: "Milestones and steps",
    palette: "indigo",
  },
  {
    id: "hr",
    audience: "Human resources",
    quote: "We need to know who is enrolled and who is qualified.",
    body:
      "Onboarding, mandatory training and internal moves run on spreadsheets nobody trusts by audit season.",
    chipLabel: "Enrollment",
    chipValue: "By role and department",
    palette: "sky",
  },
  {
    id: "managers",
    audience: "Frontline and team managers",
    quote: "We need to know if this team is cleared for the work.",
    body:
      "A shift lead cannot send half the line on a 40-hour course to fix one procedure gap that shows up tomorrow.",
    chipLabel: "Team view",
    chipValue: "Skill heatmap",
    palette: "emerald",
  },
  {
    id: "enterprise",
    audience: "Enterprise leadership",
    quote: "We need to prove the whole organization is compliant.",
    body:
      "Leadership needs completion, acknowledgement and certification evidence across every site, in one filter.",
    chipLabel: "Access",
    chipValue: "Role-based",
    palette: "purple",
  },
] as const;

export const connectionSection = {
  title: "The records are shared. The decisions are not.",
  lede:
    "Pick a perspective below to see which part of the same record set each team works from.",
} as const;

export const chapters = [
  {
    id: "ld",
    audience: "Learning and development",
    title: "For the people building learning.",
    deck: "Build capability, not course libraries.",
    body:
      "Stop authoring courses that are stale before launch. Skillar assesses what people can do, then generates a roadmap targeting the concepts the assessment found below mastery, grounded in your own source material.",
    linkLabel: "Read the learning and development page",
    href: "/solutions/learning-development",
    sequenceTitle: "How a gap becomes a roadmap",
    palette: "indigo",
    steps: [
      { step: "Assess", desc: "A scheduled quiz covers the skills the role is accountable for" },
      { step: "Pinpoint", desc: "Concepts still below mastery are flagged person by person" },
      { step: "Generate", desc: "A revision roadmap is drafted from your uploaded source material" },
      { step: "Publish", desc: "Milestones and steps go out as text, video, quizzes or SCORM" },
      { step: "Verify", desc: "A follow-up assessment confirms the concept is now above threshold" },
    ],
  },
  {
    id: "hr",
    audience: "Human resources",
    title: "For the people shaping the workforce.",
    deck: "Enrollment, evidence, and a shortlist you can defend.",
    body:
      "Move from tracking completion checkboxes to holding real records. Employee data imports from your HRMS, new joiners enroll by role and department, and compliance evidence is a filter rather than a fortnight.",
    linkLabel: "Read the HR page",
    href: "/solutions/hr",
    sequenceTitle: "From HRMS record to compliance evidence",
    palette: "sky",
    steps: [
      { step: "Import", desc: "Employees, departments and reporting lines sync from your HRMS" },
      { step: "Enroll", desc: "New joiners are placed on the journeys their role requires" },
      { step: "Acknowledge", desc: "Policy acknowledgements and deadlines are recorded per person" },
      { step: "Renew", desc: "Certificates near expiry trigger alerts and automatic re-enrollment" },
      { step: "Report", desc: "Completion evidence filtered by department, site or role" },
    ],
  },
  {
    id: "managers",
    audience: "Frontline and team managers",
    title: "For the people closest to the work.",
    deck: "Know who is cleared before the shift starts.",
    body:
      "Give shift leads, branch managers and QA leads a plain view of who holds which skill, whose certificate is about to lapse, and who needs a revision roadmap before the next rotation.",
    linkLabel: "Read the managers page",
    href: "/solutions/managers",
    sequenceTitle: "From team view to cleared for work",
    palette: "emerald",
    steps: [
      { step: "Team", desc: "A shift or branch team, scored on the skills their work depends on" },
      { step: "Heatmap", desc: "The view shows which skills are thin before work is assigned" },
      { step: "Person", desc: "One operator sits below threshold on lockout and tagout" },
      { step: "Roadmap", desc: "A revision roadmap covering only the flagged concepts is assigned" },
      { step: "Re-assess", desc: "The follow-up assessment clears them for the shift" },
    ],
  },
  {
    id: "enterprise",
    audience: "Enterprise leadership",
    title: "For the people responsible for the whole system.",
    deck: "Evidence you can hand an auditor.",
    body:
      "The same record that clears one operator tells the board which sites are behind on a mandatory refresher. Each organisation's data stays in its own tenant, and role-based access decides who sees what.",
    linkLabel: "Read the enterprise page",
    href: "/solutions/enterprise",
    sequenceTitle: "One record, four altitudes",
    palette: "purple",
    steps: [
      { step: "Person", desc: "Assessment results and certificates recorded against the employee" },
      { step: "Team", desc: "Team heatmaps and readiness for the manager who assigns the work" },
      { step: "Department", desc: "Completion and mastery aggregated by department" },
      { step: "Site", desc: "Sites compared on the same mandatory refresher deadline" },
      { step: "Organisation", desc: "One filtered report carrying the full acknowledgement trail" },
    ],
  },
] as const;

export const threadSection = {
  title: "Different decisions. The same records underneath.",
  lede:
    "One assessment result does different work at every level of the organization. None of it is re-entered along the way.",
} as const;

export const threadCards = [
  {
    label: "Learning and development",
    title: "Revision roadmap generated",
    body: "The concepts below mastery become roadmap steps drawn from your own documents.",
    when: "After the assessment closes",
    palette: "indigo",
  },
  {
    label: "Managers",
    title: "Team view updates",
    body: "The supervisor sees who is below threshold before assigning the next shift.",
    when: "Same day",
    palette: "emerald",
  },
  {
    label: "Human resources",
    title: "Enrollment adjusts",
    body: "The person is re-enrolled on the journey their role requires, deadline recorded.",
    when: "On the schedule you set",
    palette: "sky",
  },
  {
    label: "Enterprise",
    title: "Evidence recorded",
    body: "The completion, acknowledgement and certificate join the audit trail.",
    when: "On completion",
    palette: "purple",
  },
] as const;

export const systemSection = {
  title: "Define once. Verify every cycle.",
  lede:
    "One continuous cycle: define what a role is accountable for, measure it, close what is missing, and prove it closed.",
  steps: [
    "Define role",
    "Map skills",
    "Build roadmap",
    "Assess",
    "Pinpoint",
    "Revise",
    "Certify",
  ],
} as const;

export const insightSection = {
  kicker: "Learning doesn’t live in L&D.",
  title: "Capability lives across the organization.",
  lede:
    "Skillar gives every team its own view of the same skill and compliance records.",
} as const;

export const indexSection = {
  title: "Choose your point of view",
  count: "4 solutions",
  rows: [
    {
      num: "1",
      title: "Learning & Development",
      desc: "Generate roadmaps and assessments from your own documents",
      href: "/solutions/learning-development",
    },
    {
      num: "2",
      title: "Human Resources",
      desc: "Import employee records, enroll by role, prove compliance",
      href: "/solutions/hr",
    },
    {
      num: "3",
      title: "Team Managers",
      desc: "Team heatmaps, certification expiry, and targeted revision",
      href: "/solutions/managers",
    },
    {
      num: "4",
      title: "Enterprise Leadership",
      desc: "Per-organisation isolation, role-based access, audit-ready reports",
      href: "/solutions/enterprise",
    },
  ],
} as const;

export const outcomeSection = {
  title: "Everyone reads the same records. Everyone knows what to do next.",
  cards: [
    { label: "Learning and development", line: "Know what to build.", palette: "indigo" },
    { label: "Human resources", line: "Know who is enrolled.", palette: "sky" },
    { label: "Managers", line: "Know who is cleared.", palette: "emerald" },
    { label: "Enterprise", line: "Know what you can prove.", palette: "purple" },
  ],
  cta: { label: "Book a demo", href: "/demo" },
} as const;
