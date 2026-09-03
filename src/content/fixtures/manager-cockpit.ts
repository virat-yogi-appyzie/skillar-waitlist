/**
 * Illustrative team data for the manager view on /solutions/managers.
 *
 * The team is a manufacturing shift: the manager's real job here is knowing who
 * is cleared for the work, whose certificate is about to lapse, and who needs a
 * revision roadmap before the next rotation. Figures are representative; the
 * component renders a SampleDataBadge.
 */

export interface DirectReport {
  id: string;
  name: string;
  role: string;
  initials: string;
  focalSkill: string;
  category: string;
  score: number;
  status: "critical_gap" | "developing" | "mastered";
  readiness: "Not cleared" | "Needs review" | "Cleared";
  assignmentImpact: string;
  revisionRoadmap: string;
  certification: string;
  estDaysToClose: number;
}

export const cockpitLabels = {
  title: "Team skill heatmap and revision roadmaps",
  filters: {
    all: "Whole team",
    gaps: "Below threshold",
    cleared: "Cleared",
  },
  statuses: {
    cleared: "cleared",
    belowThreshold: "below threshold",
    needsReview: "needs review",
    reassessed: "re-assessed",
  },
  teamHeading: "Your team",
  scoreHeading: "Assessed level",
  trackedSkill: "Tracked skill",
  readiness: "Readiness:",
  readinessCleared: "Cleared on re-assessment",
  masteryHeading: "Assessed mastery",
  reassessedNote: "Re-assessment passed. Certificate issued with a renewal date.",
  blocksHeading: "What this blocks",
  blocksCleared: "Gap closed on re-assessment. Cleared for the assignment that was on hold.",
  certificationHeading: "Certification status",
  actionHeading: "What Skillar suggests",
  assignCta: "Assign revision roadmap",
  alreadyCleared: "Already above threshold",
  completedState: "Revision roadmap completed, gap closed on re-assessment",
  reset: "Reset",
  footerLeft: "Assign, then verify on the follow-up assessment",
  footerRight: "Roadmaps drawn from your own documents",
} as const;

export const directReports: DirectReport[] = [
  {
    id: "rohit",
    name: "Rohit Verma",
    role: "Line Operator · Assembly B",
    initials: "RV",
    focalSkill: "Lockout/tagout procedure",
    category: "Machine safety",
    score: 34,
    status: "critical_gap",
    readiness: "Not cleared",
    assignmentImpact: "Cannot be scheduled on Assembly B maintenance until the safety assessment is passed.",
    revisionRoadmap: "Revision roadmap · lockout/tagout, 4 steps drawn from your plant SOPs",
    certification: "Machine safety card lapsed 11 days ago",
    estDaysToClose: 12,
  },
  {
    id: "fatima",
    name: "Fatima Sheikh",
    role: "Quality Inspector",
    initials: "FS",
    focalSkill: "In-process inspection sampling",
    category: "Quality control",
    score: 64,
    status: "developing",
    readiness: "Needs review",
    assignmentImpact: "Sampling plan questions sit below threshold ahead of the external audit window.",
    revisionRoadmap: "Revision roadmap · sampling plans and record entry, 3 steps",
    certification: "Certificate expires in 21 days · renewal roadmap ready",
    estDaysToClose: 6,
  },
  {
    id: "anita",
    name: "Anita Desai",
    role: "Shift Supervisor",
    initials: "AD",
    focalSkill: "Deviation reporting & escalation",
    category: "Compliance",
    score: 96,
    status: "mastered",
    readiness: "Cleared",
    assignmentImpact: "Cleared for shift handover sign-off and for signing off new joiners on the line.",
    revisionRoadmap: "No revision needed · scheduled re-assessment in 90 days",
    certification: "Certificate valid to 12 Sep 2026",
    estDaysToClose: 0,
  },
  {
    id: "karan",
    name: "Karan Mehta",
    role: "Warehouse Team Lead",
    initials: "KM",
    focalSkill: "Forklift operation & load safety",
    category: "Material handling",
    score: 92,
    status: "mastered",
    readiness: "Cleared",
    assignmentImpact: "Cleared for dock operations across all three shift patterns.",
    revisionRoadmap: "No revision needed · scheduled re-assessment in 60 days",
    certification: "Licence valid to 04 Jul 2026",
    estDaysToClose: 0,
  },
  {
    id: "leena",
    name: "Leena Joseph",
    role: "Maintenance Technician",
    initials: "LJ",
    focalSkill: "Permit-to-work compliance",
    category: "Contractor safety",
    score: 88,
    status: "mastered",
    readiness: "Cleared",
    assignmentImpact: "Cleared to raise and close hot-work permits without a counter-signature.",
    revisionRoadmap: "No revision needed · scheduled re-assessment in 90 days",
    certification: "Certificate valid to 28 Feb 2027",
    estDaysToClose: 0,
  },
];
