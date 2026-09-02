/**
 * Panel visuals for the homepage's second pinned chapter: one drawn scene
 * per unanswerable question. Same sample world as the rest of the page
 * (Night shift, Line 3). Illustrative values; the mechanism is the real one.
 */

/** Scene 1: where are we weak — a team heat strip, assessed not surveyed. */
export const heatScene = {
  caption: "Assessed scores, not survey answers",
  skills: ["Lockout", "Guarding", "Hazmat", "Incident"],
  rows: [
    { name: "R. Iyer", cells: [61, 88, 84, 91] },
    { name: "R. Verma", cells: [64, 90, 81, 84] },
    { name: "F. Sheikh", cells: [88, 92, 86, 89] },
    { name: "M. Iyengar", cells: [68, 72, 77, 81] },
  ],
  threshold: 85,
} as const;

/** Scene 2: what must each role hold — the requirement, written down. */
export const roleScene = {
  caption: "Role requirements, Shift Supervisor",
  requirements: [
    { skill: "Lockout / Tagout", target: 85, due: "Certification renews Q4" },
    { skill: "Machine guarding", target: 85, due: "Held, re-checked quarterly" },
    { skill: "Permit-to-work handover", target: 85, due: "New requirement next quarter" },
    { skill: "Incident reporting", target: 80, due: "Held, re-checked quarterly" },
  ],
} as const;

/** Scene 3: what exactly to revise — only the flagged concepts. */
export const reviseScene = {
  caption: "R. Iyer, after the last assessment",
  flagged: ["Lockout procedure ordering", "Stored-energy checks"],
  spared: "Six other concepts at mastery. Nothing assigned for them.",
  steps: [
    "Lockout sequence walkthrough",
    "Stored energy: hydraulic and pneumatic",
    "Re-assessment on the two concepts",
  ],
} as const;
