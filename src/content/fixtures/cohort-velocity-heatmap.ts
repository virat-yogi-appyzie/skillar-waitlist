/**
 * Illustrative data for <CohortVelocityHeatmap />.
 *
 * Groups of people who sat the same assessment, the concept most of them
 * missed, and the score on re-assessment after the revision roadmap.
 * Figures are sample data — Skillar is pre-launch and has no customer
 * outcome data to report.
 */

export interface Cohort {
  id: string;
  name: string;
  headcount: number;
  criticalSkill: string;
  preAssessment: number;
  postAssessment: number;
  cycleLength: string;
  status: "Certified" | "Re-assessment due" | "In progress";
}

export const cohorts: Cohort[] = [
  {
    id: "line-3",
    name: "Line 3 · Assembly, Pune",
    headcount: 34,
    criticalSkill: "Machine guarding & lockout",
    preAssessment: 42,
    postAssessment: 89,
    cycleLength: "One assessment cycle",
    status: "Certified",
  },
  {
    id: "branch-west",
    name: "Branch Operations · West",
    headcount: 26,
    criticalSkill: "Sanctions hit escalation",
    preAssessment: 38,
    postAssessment: 92,
    cycleLength: "One assessment cycle",
    status: "Certified",
  },
  {
    id: "sterile-fill",
    name: "Sterile Fill & Finish",
    headcount: 42,
    criticalSkill: "GMP documentation practice",
    preAssessment: 51,
    postAssessment: 86,
    cycleLength: "Two assessment cycles",
    status: "In progress",
  },
  {
    id: "warehouse",
    name: "Warehouse & Despatch",
    headcount: 18,
    criticalSkill: "Forklift and yard safety",
    preAssessment: 46,
    postAssessment: 94,
    cycleLength: "One assessment cycle",
    status: "Certified",
  },
  {
    id: "front-desk",
    name: "Front Desk · Hospitality",
    headcount: 68,
    criticalSkill: "Guest data handling & consent",
    preAssessment: 55,
    postAssessment: 87,
    cycleLength: "One assessment cycle",
    status: "Re-assessment due",
  },
];

export const cohortHeatmapLabels = {
  eyebrow: "Before and after the revision roadmap",
  title: "Where a group sat, and where it sat on re-assessment",
  lede: "Each row is a group of people who took the same scheduled assessment.",
  summaryLeftLabel: "Groups tracked",
  summaryRightLabel: "Re-assessed",
  selectHeading: "Select a group",
  peopleSuffix: "people",
  deltaSuffix: "pts",
  drilldownEyebrow: "Group detail",
  preLabel: "First assessment",
  preNote: "Below mastery threshold",
  postLabel: "Re-assessment after the revision roadmap",
  postNote: "Above threshold",
  metaCycle: "Time to re-assess",
  metaEvidence: "Audit trail",
  metaEvidenceValue: "Complete",
  caption:
    "Illustrative figures. Skillar is pre-launch, so these numbers show what the report looks like, not results from a customer.",
} as const;
