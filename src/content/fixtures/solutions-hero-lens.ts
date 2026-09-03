/**
 * Illustrative data for the auto-cycling lens panel in the /solutions hero.
 *
 * Skillar is pre-launch: every figure here is a representative example, which is
 * why the panel renders a SampleDataBadge. Each lens shows one real mechanism:
 * an assessment result, an HRMS import, a certification expiry, a filtered
 * compliance report. Never a capability the platform does not have.
 */

export const lensPanelLabels = {
  signal: "What the data shows",
  action: "What Skillar does next",
  mastery: "Assessed mastery",
} as const;

export interface HeroLens {
  id: string;
  label: string;
  role: string;
  signal: string;
  action: string;
  metric: string;
  metricLabel: string;
  /** Used for the progress fill and metric type; must clear 4.5:1 on `bgColor`. */
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  dotColor: string;
  bar: number;
}

export const heroLenses: HeroLens[] = [
  {
    id: "ld",
    label: "Learning and development",
    role: "Roadmaps and content",
    signal: "GMP documentation · 48% mastery on the Q1 assessment",
    action: "Revision roadmap drafted from your own SOPs",
    metric: "4 steps",
    metricLabel: "Roadmap drafted",
    // indigo-600 measured 4.04:1 on indigo-50; indigo-700 clears 4.5:1.
    color: "#4338CA",
    borderColor: "border-indigo-400",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    dotColor: "bg-indigo-400",
    bar: 48,
  },
  {
    id: "hr",
    label: "Human resources",
    role: "Records and enrollment",
    signal: "142 employee records imported from Keka",
    action: "New joiners auto-enrolled by role and department",
    metric: "142",
    metricLabel: "Records synced",
    // 700-weight text and a darker metric: sky-600 measured 3.84:1 on sky-50 and
    // the #0EA5E9 metric 2.6:1, both under the 4.5:1 minimum.
    color: "#0369A1",
    borderColor: "border-sky-400",
    bgColor: "bg-sky-50",
    textColor: "text-sky-700",
    dotColor: "bg-sky-400",
    bar: 62,
  },
  {
    id: "managers",
    label: "Managers",
    role: "Team readiness",
    signal: "Two forklift certifications lapse before the next rotation",
    action: "Renewal roadmap assigned · re-assessment booked",
    metric: "21 days",
    metricLabel: "Renewal window",
    color: "#047857",
    borderColor: "border-emerald-400",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    dotColor: "bg-emerald-400",
    bar: 76,
  },
  {
    id: "enterprise",
    label: "Enterprise",
    role: "Compliance evidence",
    signal: "AML refresher · 3 branches below the completion threshold",
    action: "Audit-ready report filtered by site and role",
    metric: "3",
    metricLabel: "Branches flagged",
    // purple-600 sits right on 4.5:1 against purple-50; purple-700 keeps headroom.
    color: "#7E22CE",
    borderColor: "border-purple-400",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    dotColor: "bg-purple-400",
    bar: 91,
  },
];
