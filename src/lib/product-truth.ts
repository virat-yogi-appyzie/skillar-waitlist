/**
 * product-truth.ts — the single source of truth for every capability claim
 * on this site.
 *
 * Verified against the platform's business documentation (shyam-skillar /
 * BUSINESS_DOCUMENTATION.md) plus two confirmed shipping capabilities: RAG-
 * grounded generation and BKT revision roadmaps. If marketing copy needs a
 * claim that is not representable here, the claim is wrong — fix the copy,
 * or extend this file only after verifying against the platform.
 *
 * Never claim: executable sandboxes, simulations, chaos labs, micro-labs,
 * micro-sprints, VCS/PR/code-review ingestion, skill-decay detection,
 * real-time adaptive difficulty, certifications we do not hold, or
 * integrations not listed below.
 */

/** What the product is, in one line. */
export const PRODUCT_CATEGORY =
  "Workforce compliance and skill intelligence platform";

/**
 * The product spine. Every "how it works" visual on the site draws from
 * these stages, in this order.
 */
export const PRODUCT_LOOP = [
  {
    id: "assess",
    label: "Assess",
    title: "Measure real capability",
    desc: "Scheduled, AI-generated assessments target the skills each role is accountable for. Results roll up into individual skill scores, team heatmaps, and organisation-wide gap views.",
  },
  {
    id: "pinpoint",
    label: "Pinpoint",
    title: "Find the exact weak areas",
    desc: "Bayesian Knowledge Tracing reads each assessment and flags the specific concepts still below mastery threshold — person by person, not cohort averages.",
  },
  {
    id: "remediate",
    label: "Remediate",
    title: "Generate a targeted revision roadmap",
    desc: "For each person, Skillar generates a revision roadmap that covers only the flagged areas, grounded in your organisation's own source material.",
  },
  {
    id: "verify",
    label: "Verify",
    title: "Re-assess and certify",
    desc: "Follow-up assessment confirms the gap is closed. Certifications are issued with expiry tracking, renewal alerts, and an audit-ready completion trail.",
  },
] as const;

/**
 * Personalization, stated honestly. Post-assessment and targeted — not
 * "real-time adaptive difficulty", which the platform does not do.
 */
export const PERSONALIZATION = {
  short:
    "After each assessment, Skillar pinpoints the concepts still below mastery and generates a revision roadmap that targets exactly those areas.",
  mechanism:
    "Bayesian Knowledge Tracing identifies below-threshold concepts from assessment evidence; a personalized revision roadmap is generated for each learner covering only what they need.",
  grounding:
    "Roadmap and assessment content is generated with retrieval-augmented AI, grounded in your organisation's own documents rather than the open internet.",
} as const;

/** The only content formats a roadmap step can actually contain. */
export const CONTENT_TYPES = [
  "Text lessons",
  "Video",
  "Code examples",
  "Quizzes",
  "Images",
  "SCORM packages",
  "Summaries",
] as const;

/** What the AI actually generates. */
export const AI_CAPABILITIES = [
  "Learning roadmaps (milestones and steps) from a topic and level",
  "Step content grounded in your uploaded source material",
  "Assessment quizzes targeting tracked skills",
  "Journey structures for onboarding and compliance",
  "Summaries and supporting imagery",
] as const;

/** Integrations that exist today, and the ones honestly on the roadmap. */
export const INTEGRATIONS = {
  hrms: ["Zoho People", "Keka", "Darwinbox"],
  hrmsFallback: "CSV import for any other HRMS",
  meetings: "Microsoft Teams",
  contentStandard: "SCORM",
  roadmap: ["SSO via Azure AD and Google Workspace", "Bidirectional HRMS sync"],
} as const;

/** Security posture, stated without fabricated certifications. */
export const SECURITY = {
  current: [
    "Multi-tenant architecture with strict per-organisation data isolation",
    "Role-based access control across employee, manager, and admin views",
    "Encrypted integration credentials",
    "Your data never trains public models",
  ],
  roadmap: ["SOC 2 Type II certification"],
  disclosure:
    "We are pre-launch. SOC 2 Type II is on our roadmap rather than complete, and we walk every design partner through our current controls.",
} as const;

/** The industries the product is actually built for. */
export const INDUSTRIES = [
  "Manufacturing",
  "Banking & financial services",
  "Pharma & healthcare",
  "Logistics",
  "IT & technology",
  "Construction & infrastructure",
  "Hospitality",
] as const;

/** Compliance capabilities — the product's strongest, most under-told story. */
export const COMPLIANCE = {
  journeys:
    "Compliance journeys handle mandatory training with digital policy acknowledgement, deadlines, and automatic re-enrollment when certifications expire.",
  auditTrail:
    "Every completion, acknowledgement, and certificate is recorded in an audit-ready trail — evidence for an auditor is a filtered report, not a week of spreadsheet work.",
  certifications:
    "Certificates are issued on completion and tracked through their whole lifecycle: expiry alerts, renewal workflows, and bulk expiry reports.",
} as const;
