/**
 * Illustrative data for <EnterpriseCapabilityGraph />.
 *
 * Assessed scores per tracked skill, quarter by quarter, against the mastery
 * threshold the role is held to. Figures are sample data; Skillar is
 * pre-launch and has no customer outcome data to report.
 */

export interface TrackData {
  id: string;
  name: string;
  category: string;
  color: string;
  stroke: string;
  points: { q: string; value: number; baseline: number }[];
  improvement: string;
  status: string;
  cadence: string;
  assessed: number;
}

export const capabilityTracks: TrackData[] = [
  {
    id: "machine-safety",
    name: "Machine Safety",
    category: "Safety & Compliance",
    color: "#6366F1",
    stroke: "#4F46E5",
    points: [
      { q: "Q1", value: 48, baseline: 42 },
      { q: "Q2", value: 59, baseline: 46 },
      { q: "Q3", value: 74, baseline: 51 },
      { q: "Q4", value: 88, baseline: 55 },
      { q: "Q1 (proj)", value: 94, baseline: 58 },
    ],
    improvement: "+40 points",
    status: "Above threshold",
    cadence: "Assessed quarterly",
    assessed: 96,
  },
  {
    id: "aml",
    name: "AML & Sanctions",
    category: "Regulatory",
    color: "#38BDF8",
    stroke: "#0284C7",
    points: [
      { q: "Q1", value: 62, baseline: 60 },
      { q: "Q2", value: 68, baseline: 63 },
      { q: "Q3", value: 79, baseline: 67 },
      { q: "Q4", value: 86, baseline: 70 },
      { q: "Q1 (proj)", value: 91, baseline: 72 },
    ],
    improvement: "+24 points",
    status: "On track",
    cadence: "Assessed twice a year",
    assessed: 94,
  },
  {
    id: "data-privacy",
    name: "Data Privacy",
    category: "Regulatory",
    color: "#A855F7",
    stroke: "#7E22CE",
    points: [
      { q: "Q1", value: 52, baseline: 50 },
      { q: "Q2", value: 61, baseline: 53 },
      { q: "Q3", value: 71, baseline: 57 },
      { q: "Q4", value: 82, baseline: 60 },
      { q: "Q1 (proj)", value: 89, baseline: 63 },
    ],
    improvement: "+30 points",
    status: "Above threshold",
    cadence: "Assessed annually",
    assessed: 98,
  },
  {
    id: "gmp",
    name: "GMP Documentation",
    category: "Quality & Operations",
    color: "#10B981",
    stroke: "#059669",
    points: [
      { q: "Q1", value: 58, baseline: 55 },
      { q: "Q2", value: 66, baseline: 59 },
      { q: "Q3", value: 76, baseline: 64 },
      { q: "Q4", value: 84, baseline: 68 },
      { q: "Q1 (proj)", value: 90, baseline: 71 },
    ],
    improvement: "+26 points",
    status: "On track",
    cadence: "Assessed quarterly",
    assessed: 92,
  },
];

export const capabilityGraphLabels = {
  title: "Where each tracked skill actually stands",
  lede: "Assessed scores per quarter, against the score before Skillar and the mastery threshold the role is held to.",
  seriesPrimary: "Assessed score",
  seriesBaseline: "Score before Skillar",
  thresholdToggle: "Mastery threshold (85%)",
  thresholdCaption: "Mastery threshold 85%",
  snapshotSuffix: "snapshot",
  scoreLabel: "Average assessed score",
  vsBaseline: "vs before Skillar",
  rowCadence: "Assessment cadence",
  rowAssessed: "Workforce assessed",
  rowGain: "Change since Q1",
  statusPrefix: "Status:",
  statusNote:
    "Every point on this line is an assessment score, not a completion count.",
} as const;
