/**
 * Illustrative internal-mobility candidates for the HR solutions page.
 *
 * The match is built from assessed skills against the skills the target role is
 * accountable for. No salary, cost-avoidance, or time-to-hire claims, which the
 * platform does not measure. Figures are representative; the component renders a
 * SampleDataBadge.
 */

export interface MobilityTrajectory {
  id: string;
  name: string;
  currentRole: string;
  targetRole: string;
  matchScore: number;
  remainingSteps: number;
  keySkills: { name: string; status: "verified" | "in_progress" | "ready"; score: number }[];
}

export const mobilityLabels = {
  title: "See who already holds the skills an open role needs",
  matchedLabel: "Matched on assessed skills",
  candidatesLabel: "Internal candidates, assessed",
  readinessLabel: "Readiness for",
  requiredSkillsLabel: "Skills required by the role",
  matchSuffix: "match on assessed skills",
  stepsLeftLabel: "Roadmap steps left",
  stepsNone: "None, ready for re-assessment",
  skillStates: {
    verified: "verified",
    inProgress: "on roadmap",
    notAssessed: "not yet assessed",
  },
} as const;

export const mobilityTrajectories: MobilityTrajectory[] = [
  {
    id: "priya",
    name: "Priya Nair",
    currentRole: "Quality Analyst",
    targetRole: "Quality Assurance Lead",
    matchScore: 94,
    remainingSteps: 3,
    keySkills: [
      { name: "Batch record review", status: "verified", score: 100 },
      { name: "Deviation & CAPA handling", status: "in_progress", score: 84 },
      { name: "Internal audit preparation", status: "ready", score: 92 }
    ]
  },
  {
    id: "daniel",
    name: "Daniel Okoye",
    currentRole: "Branch Operations Officer",
    targetRole: "Branch Manager",
    matchScore: 88,
    remainingSteps: 6,
    keySkills: [
      { name: "KYC & customer onboarding", status: "verified", score: 100 },
      { name: "AML case escalation", status: "in_progress", score: 78 },
      { name: "Branch audit readiness", status: "ready", score: 86 }
    ]
  },
  {
    id: "meera",
    name: "Meera Iyer",
    currentRole: "Production Line Operator",
    targetRole: "Shift Supervisor",
    matchScore: 96,
    remainingSteps: 0,
    keySkills: [
      { name: "Lockout/tagout procedure", status: "verified", score: 100 },
      { name: "Machine guarding standards", status: "verified", score: 98 },
      { name: "Shift handover reporting", status: "verified", score: 94 }
    ]
  }
];
