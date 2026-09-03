/**
 * navigation.ts — every string the site chrome renders.
 *
 * Header mega-menu (links, preview panels) and Footer (link columns, tagline).
 * Icons stay in the components: this module is strings and data only.
 *
 * Claims here must be checkable against `src/lib/product-truth.ts`. The
 * integration list in particular is the one buyers forward to their IT team,
 * so it names only what ships today and marks the rest as roadmap.
 */

import { INTEGRATIONS, PRODUCT_CATEGORY } from "@/lib/product-truth";
import { SITE_CONFIG } from "@/lib/site-config";

/* ─────────────────────────── Header: menu links ─────────────────────────── */

export const productLinks = [
  {
    label: "Skill Intelligence",
    href: "/product/skill-intelligence",
    description: "Map and measure real capability across your organization",
    preview: "intelligence",
  },
  {
    label: "Adaptive Learning",
    href: "/product/adaptive-learning",
    description: "A revision roadmap for the gaps each person has",
    preview: "adaptive",
  },
  {
    label: "AI Authoring",
    href: "/product/ai-authoring",
    description: "Turn your SOPs and manuals into structured learning",
    preview: "authoring",
  },
  {
    label: "Analytics",
    href: "/product/analytics",
    description: "Measure what matters: capability, not completion",
    preview: "analytics",
  },
] as const;

export const solutionLinks = [
  {
    label: "Learning & Development",
    href: "/solutions/learning-development",
    description: "Build capability at scale",
    preview: "ld",
  },
  {
    label: "HR",
    href: "/solutions/hr",
    description: "Understand workforce skills",
    preview: "hr",
  },
  {
    label: "Managers",
    href: "/solutions/managers",
    description: "Develop stronger teams",
    preview: "managers",
  },
  {
    label: "Enterprise",
    href: "/solutions/enterprise",
    description: "Audit-ready reporting across every site",
    preview: "enterprise",
  },
] as const;

export type ProductPreviewKey = (typeof productLinks)[number]["preview"];
export type SolutionPreviewKey = (typeof solutionLinks)[number]["preview"];

export const productMenu = {
  eyebrow: "THE PLATFORM",
  tagline: "One intelligence layer for learning",
} as const;

export const solutionsMenu = {
  eyebrow: "SOLUTIONS OVERVIEW",
  tagline: "One organization · Four capability perspectives",
  cta: "Explore the solutions hub",
} as const;

/* ───────────────────── Header: product preview panels ───────────────────── */

export const capabilityPreview = {
  eyebrow: "CAPABILITY DRILL-DOWN",
  tree: [
    { label: "Organization", sublabel: "All departments", depth: 0, score: 72, color: "#6366F1" },
    { label: "Manufacturing Ops", sublabel: "Four plants", depth: 1, score: 68, color: "#3B82F6" },
    { label: "Line Safety", sublabel: "Shift supervisors", depth: 2, score: 54, color: "#EF4444" },
    { label: "R. Iyer", sublabel: "Shift Supervisor", depth: 3, score: 54, color: "#EF4444" },
  ],
  focusSkill: {
    label: "Lockout / Tagout Procedure",
    score: 54,
    note: "31 pts below mastery · sample data",
  },
} as const;

export const adaptivePreview = {
  eyebrow: "REVISION ROADMAPS",
  learners: [
    {
      name: "R. Iyer",
      role: "Shift Supervisor",
      gap: "Lockout / Tagout",
      score: 54,
      steps: ["Isolation steps", "Verification quiz", "Re-assessment"],
      color: "#EF4444",
    },
    {
      name: "J. Park",
      role: "Branch Operations Lead",
      gap: "AML Reporting",
      score: 58,
      steps: ["Threshold rules", "Filing walkthrough", "Re-assessment"],
      color: "#F59E0B",
    },
  ],
  caption: "Same course, different weak areas",
} as const;

export const authoringPreview = {
  eyebrow: "YOUR DOCUMENTS TO ROADMAPS",
  pipeline: [
    {
      phase: "INPUT",
      items: ["SOPs and policies", "Equipment manuals", "Expert interview"],
      color: "bg-navy-100 text-navy-600 border-navy-200/80",
    },
    {
      phase: "AI ENGINE",
      items: ["Grounded retrieval", "Milestone structuring", "Question generation"],
      color: "bg-accent/8 text-accent border-accent/20",
    },
    {
      phase: "OUTPUT",
      items: ["Learning roadmap", "Assessment quiz", "Step summaries"],
      color: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    },
  ],
} as const;

export const analyticsPreview = {
  eyebrow: "CAPABILITY METRICS",
  domains: [
    { label: "Safety & Compliance", score: 54, target: 85, color: "#EF4444" },
    { label: "Equipment Operation", score: 78, target: 80, color: "#3B82F6" },
    { label: "Quality & GMP", score: 59, target: 85, color: "#F59E0B" },
    { label: "Frontline Leadership", score: 91, target: 90, color: "#10B981" },
  ],
  insight: {
    label: "SAMPLE DATA",
    text: "Two domains sit below their readiness target. Safety & Compliance is the one an auditor will ask about first.",
  },
} as const;

export const loopPreview = {
  eyebrow: "ONE CONTINUOUS LOOP",
  steps: [
    { n: "01", label: "Assess", desc: "Scheduled assessments per role" },
    { n: "02", label: "Pinpoint", desc: "Flag concepts below mastery" },
    { n: "03", label: "Remediate", desc: "Generate a revision roadmap" },
    { n: "04", label: "Verify", desc: "Re-assess, then certify" },
  ],
  hint: "Hover a product for detail",
} as const;

/* ──────────────────── Header: solutions preview panels ──────────────────── */

export const solutionsOverviewPreview = {
  eyebrow: "FOUR PERSPECTIVES",
  perspectives: [
    { label: "Learning & Development", role: "Capability Engine", color: "text-indigo-600 bg-indigo-50" },
    // 700, not 600: at 10px on their own tints these two measured 3.84:1 and
    // 3.58:1, under the 4.5:1 minimum.
    { label: "Human Resources", role: "Workforce Intelligence", color: "text-sky-700 bg-sky-50" },
    { label: "Frontline Managers", role: "Team Readiness", color: "text-emerald-700 bg-emerald-50" },
    { label: "Enterprise Scale", role: "Audit & Governance", color: "text-purple-600 bg-purple-50" },
  ],
} as const;

export const ldPreview = {
  eyebrow: "L&D INTELLIGENCE LOOP",
  steps: [
    { num: "01", step: "Map the skills each role owns", status: "defined", color: "text-emerald-600" },
    { num: "02", step: "Assess on a schedule", status: "recurring", color: "text-accent" },
    { num: "03", step: "Generate revision roadmaps", status: "targeted", color: "text-accent" },
    { num: "04", step: "Re-assess and certify", status: "verified", color: "text-emerald-600" },
    { num: "05", step: "Export audit-ready reports", status: "on demand", color: "text-violet-600" },
  ],
  footnote: "End-to-end, no separate tools needed",
} as const;

export const hrPreview = {
  eyebrow: "WORKFORCE INTELLIGENCE",
  items: [
    {
      label: "Capability visibility",
      desc: "Assessed skills across every team, not self-reported guesses",
    },
    {
      label: "Skills-based decisions",
      desc: "Promote, rotate, and hire on demonstrated competence",
    },
    {
      label: "Certification lifecycle",
      desc: "Expiry alerts and automatic re-enrollment before the deadline",
    },
    {
      label: "HRMS in sync",
      desc: `${INTEGRATIONS.hrms.join(", ")}, or a CSV import`,
    },
  ],
} as const;

export const managersPreview = {
  eyebrow: "TEAM CAPABILITY VIEW",
  members: [
    { name: "R. Iyer", skill: "Lockout / Tagout", score: 54, status: "gap" },
    { name: "J. Park", skill: "AML Reporting", score: 58, status: "gap" },
    { name: "M. Lin", skill: "Cold Chain Handling", score: 76, status: "developing" },
    { name: "M. Vega", skill: "Forklift Operation", score: 94, status: "proficient" },
  ],
  footnote: "Sample data · assessed scores, not surveys",
} as const;

/**
 * The one panel a buyer forwards to IT. `live: false` renders a hollow marker,
 * so nothing on our roadmap is dressed up as shipping.
 */
export const enterprisePreview = {
  eyebrow: "ENTERPRISE READY",
  items: [
    { label: "HRMS sync", desc: INTEGRATIONS.hrms.join(", "), live: true },
    { label: "Microsoft Teams", desc: "Meetings and check-ins", live: true },
    { label: "SCORM packages", desc: "Your existing courses stay usable", live: true },
    { label: "Custom skill taxonomy", desc: "Map to your competency framework", live: true },
    { label: "Enterprise-grade security", desc: "SOC 2 alignment on our roadmap", live: false },
    { label: "SSO", desc: "Azure AD and Google Workspace, on our roadmap", live: false },
  ],
  legend: "Available today, or marked as on our roadmap",
  emptyState: "Hover or focus a solution to preview",
} as const;

/** Bottom utility bar shared by both mega panels. */
export const megaFooter = {
  prompt: "Not sure where to start?",
  primary: { label: "Run the free diagnostic", href: "/skills-gap-diagnostic" },
  secondary: { label: "Book a demo", href: "/demo" },
} as const;

/* ──────────────────────────────── Footer ─────────────────────────────────── */

export const footerTagline = `${PRODUCT_CATEGORY}. Map the skills each role owns, assess them on a schedule, and close the gaps the results expose.`;

export const footerProductLinks = [
  { label: "Platform Overview", href: "/product" },
  { label: "Skill Intelligence", href: "/product/skill-intelligence" },
  { label: "Adaptive Learning", href: "/product/adaptive-learning" },
  { label: "AI Authoring", href: "/product/ai-authoring" },
  { label: "Analytics & Reporting", href: "/product/analytics" },
  { label: "Skills Gap Diagnostic", href: "/skills-gap-diagnostic" },
] as const;

export const footerSolutionLinks = [
  { label: "Solutions Overview", href: "/solutions" },
  { label: "Learning & Development", href: "/solutions/learning-development" },
  { label: "Human Resources", href: "/solutions/hr" },
  { label: "Direct Managers", href: "/solutions/managers" },
  { label: "Enterprise Architecture", href: "/solutions/enterprise" },
] as const;

export const footerCompanyLinks = [
  { label: "The Manifesto", href: "/about", external: false },
  { label: "Pricing & Plans", href: "/pricing", external: false },
  { label: "Book a Demo", href: "/demo", external: false },
  { label: "Sign In", href: SITE_CONFIG.appUrl, external: true },
] as const;

export const footerGovernanceLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Enterprise Security", href: "/solutions/enterprise" },
] as const;

export const footerSocialLinks = [
  { label: "LinkedIn", href: SITE_CONFIG.social.linkedin },
  { label: "Twitter", href: SITE_CONFIG.social.twitter },
  { label: "Instagram", href: SITE_CONFIG.social.instagram },
] as const;
