/**
 * Illustrative data for <ProductSignalField />.
 *
 * The signals Skillar actually reads about a person: what their role requires,
 * what their assessments returned, where they are on a roadmap, and what the
 * HRMS says about them. No code, commit or repository signals, Skillar does
 * not read any. Figures are sample data; Skillar is pre-launch.
 */

export interface Signal {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  color: string;
  metric: string;
}

export const productSignals: Signal[] = [
  { id: "1", name: "People", category: "HRMS profile", x: 18, y: 22, color: "#818CF8", metric: "412 roles" },
  { id: "2", name: "Skills", category: "Role requirements", x: 82, y: 22, color: "#38BDF8", metric: "1,240 skills" },
  { id: "3", name: "Roadmaps", category: "Roadmap progress", x: 14, y: 55, color: "#A855F7", metric: "382 active" },
  { id: "4", name: "Assessments", category: "Assessment results", x: 86, y: 55, color: "#34D399", metric: "Scored per concept" },
  { id: "5", name: "Certificates", category: "Certification status", x: 22, y: 84, color: "#F59E0B", metric: "96 expiring" },
  { id: "6", name: "Documents", category: "Your source material", x: 78, y: 84, color: "#EC4899", metric: "480 SOPs and policies" },
  { id: "7", name: "Compliance", category: "Acknowledgements", x: 50, y: 14, color: "#6366F1", metric: "Audit trail" },
];

export const productSignalFieldLabels = {
  title: "Four systems' worth of context, in one place",
  hubName: "Skillar",
  hubSub: "Skill map",
  hint: "Hover a signal to trace where it feeds",
} as const;
