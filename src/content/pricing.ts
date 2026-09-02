/**
 * Copy for /pricing. Every claim here must be representable in
 * `src/lib/product-truth.ts` — if it is not, the copy is wrong.
 */

import { INTEGRATIONS, SECURITY } from "@/lib/product-truth";

export const hero = {
  title: "Priced on the roles you map, not the seats you buy.",
  lede: "A plant with eleven certified roles and a bank with four hundred do not need the same contract. We scope on the number of roles you want mapped and assessed, the HRMS we connect, and what your security team needs to review first.",
  badges: [
    "60-day pilot available",
    "Zero per-seat penalties",
    `${SECURITY.roadmap[0]} on our roadmap`,
  ],
} as const;

/** The scope estimator card in the hero. Illustrative scoping, not a quote. */
export const estimator = {
  title: "Deployment scope estimator",
  chip: "Illustrative",
  scalePrompt: "Workforce scale",
  recommendedLabel: "Recommended model",
  rows: {
    turnaround: "Reporting cadence",
    scope: "Mapping scope",
    authoring: "AI authoring",
    support: "Support",
  },
  cta: "Configure this scope",
} as const;

export const scalePresets = [
  {
    learners: "500",
    label: "500 Learners",
    teamSizeVal: "500 - 1,000",
    recommendedTier: "Enterprise Pilot",
    tierId: "pilot",
    turnaround: "14-day baseline",
    diagnosticScope: "Three departments to start",
    authoringCapacity: "Roadmaps for the pilot roles",
    supportTier: "Named onboarding contact",
  },
  {
    learners: "2,500",
    label: "2,500 Learners",
    teamSizeVal: "1,000 - 5,000",
    recommendedTier: "Global Enterprise",
    tierId: "enterprise",
    turnaround: "Live dashboards",
    diagnosticScope: "Every role, org-wide skill map",
    authoringCapacity: "AI authoring across all roles",
    supportTier: "Named implementation lead",
  },
  {
    learners: "10,000+",
    label: "10,000+ Learners",
    teamSizeVal: "5,000 - 20,000",
    recommendedTier: "Global Enterprise",
    tierId: "enterprise",
    turnaround: "Continuous reporting",
    diagnosticScope: "Multi-site and multi-region roles",
    authoringCapacity: "AI authoring across all roles",
    supportTier: "Named implementation lead",
  },
  {
    learners: "Regulated",
    label: "Regulated / Custom",
    teamSizeVal: "20,000+",
    recommendedTier: "Regulated & Custom",
    tierId: "regulated",
    turnaround: "Scoped with your team",
    diagnosticScope: "Skill taxonomy built with your SMEs",
    authoringCapacity: "Grounded in your SOPs and manuals",
    supportTier: "Security and controls review",
  },
] as const;

export const tiersSection = {
  title: "Start with one department, or with the whole workforce.",
  featuresHeading: "What is included",
  idealScaleLabel: "Ideal scale",
} as const;

export const tiers = [
  {
    id: "pilot",
    badge: "60 days",
    name: "Enterprise Pilot",
    tagline:
      "A baseline diagnostic and skill map for one or two departments, before you commit anything wider.",
    idealFor: "Teams of 100 to 1,000 learners",
    features: [
      "Role definitions and skill mapping for the pilot departments",
      "Scheduled assessments and skill gap identification",
      "Generated revision roadmaps for the concepts each person missed",
      "A 60-day readout on which gaps closed and which did not",
      "Onboarding and configuration support from our team",
    ],
    cta: "Request pilot pricing",
    featured: false,
  },
  {
    id: "enterprise",
    badge: "Full rollout",
    name: "Global Enterprise",
    tagline:
      "Skill mapping, scheduled assessments, generated revision roadmaps, and compliance reporting across the whole workforce.",
    idealFor: "Workforces of 1,000 to 50,000+ learners",
    features: [
      "Org-wide skill map with team heatmaps and role readiness scores",
      "AI-authored roadmaps and assessments grounded in your own documents",
      `HRMS integrations (${INTEGRATIONS.hrms.join(", ")}) plus CSV import`,
      "Compliance journeys with acknowledgement, expiry alerts, and re-enrollment",
      "Named implementation lead and a support SLA agreed in writing",
    ],
    cta: "Talk to enterprise sales",
    featured: true,
  },
  {
    id: "regulated",
    badge: "Design partner",
    name: "Regulated & Custom",
    tagline:
      "For organisations whose security and quality teams review controls, data handling, and deployment before anything ships.",
    idealFor: "Pharma, banking, and public-sector programmes",
    features: [
      SECURITY.current[0],
      "Generation grounded in your SOPs and manuals, never the open internet",
      SECURITY.current[3],
      SECURITY.current[1],
      "Deployment and data-residency requirements scoped with our team",
    ],
    cta: "Contact the solutions team",
    featured: false,
  },
] as const;

export const standardsSection = {
  title: "What holds up under a procurement review.",
} as const;

/** Icon choice stays in the component; only the words live here. */
export const valuePillars = [
  {
    id: "seats",
    title: "No idle seats",
    description:
      "Agreements sized to the people actually working through a roadmap, not to a headcount number you negotiated last year.",
  },
  {
    id: "privacy",
    title: "Your documents stay yours",
    description: `${SECURITY.current[0]}, encrypted integration credentials, and a hard rule that your SOPs and manuals never train public models. ${SECURITY.roadmap[0]} is on our roadmap, not complete, and we say so in procurement.`,
  },
  {
    id: "integrations",
    title: "Connects to the HRMS you run",
    description: `Employees, roles, and departments flow in from ${INTEGRATIONS.hrms.join(", ")}, or from a CSV for anything else. ${INTEGRATIONS.contentStandard} packages you already own import and run as roadmap steps. Bidirectional sync is on our roadmap.`,
  },
  {
    id: "reporting",
    title: "Reporting an auditor accepts",
    description:
      "Role readiness scores, certification status, acknowledgements, and expiry dates in one filtered report: the evidence an auditor asks for, without the week of spreadsheet work.",
  },
] as const;

export const quoteForm = {
  title: "Request a custom pricing proposal for your workforce.",
  lede: "Tell us your workforce size, the roles that carry certification or compliance obligations, and what you run today. We will come back with a scoped deployment and a written proposal.",
  nextHeading: "What happens next",
  nextSteps: [
    "A 20-minute call about your roles, certifications, and current HRMS.",
    "Custom pilot or enterprise scoping document.",
    "Clear, transparent commercial proposal with zero hidden fees.",
  ],
  formTitle: "Get in touch for custom pricing",
  submit: "Submit pricing inquiry",
  submitting: "Submitting…",
  footnote: "Guaranteed privacy. We will never share your information.",
  successTitle: "Inquiry received",
  successBody:
    "Thank you. Someone from our team will read through what you sent and email you within 24 hours.",
  errorFallback: "Please check your inputs and try again.",
  errorNetwork:
    "Unable to submit inquiry. Please try again or email hello@skillar.ai directly.",
  fields: {
    firstName: "First name",
    lastName: "Last name",
    email: "Work email",
    company: "Company / organisation",
    workforceSize: "Workforce size",
    deployment: "Deployment interest",
  },
  placeholders: {
    firstName: "Sarah",
    lastName: "Connor",
    email: "sconnor@company.com",
    company: "Meridian Pharma",
  },
} as const;

export const workforceOptions = [
  { value: "100 - 500", label: "100 – 500 learners" },
  { value: "500 - 1,000", label: "500 – 1,000 learners" },
  { value: "1,000 - 5,000", label: "1,000 – 5,000 learners" },
  { value: "5,000 - 20,000", label: "5,000 – 20,000 learners" },
  { value: "20,000+", label: "20,000+ learners" },
] as const;

export const tierOptions = [
  { value: "Enterprise Pilot", label: "Enterprise Pilot (60 days)" },
  { value: "Global Enterprise", label: "Global Enterprise rollout" },
  { value: "Regulated & Custom", label: "Regulated / custom deployment" },
] as const;

export const faqSection = {
  title: "Everything you need to know about pricing.",
  description:
    "How we scope a contract, what a pilot covers, and where our security posture stands today.",
} as const;

export const faqs = [
  {
    question: "How is Skillar pricing calculated for enterprises?",
    answer:
      "Pricing follows workforce scale, how many roles you want mapped and assessed, and which HRMS we connect. There is no per-seat penalty for people who never open a roadmap. We are pre-launch, so early agreements are negotiated directly with our team rather than picked off a rate card.",
  },
  {
    question: "Can we start with a proof-of-concept pilot before global rollout?",
    answer:
      "Yes, and we prefer it. A 60-day pilot covers one division or one critical role family: role definitions, skill mapping, a first round of assessments, and the revision roadmaps that follow. At the end you have a readout on which gaps closed before you decide anything wider.",
  },
  {
    question: "Does Skillar replace our existing Learning Management System (LMS)?",
    answer:
      "Usually, yes. Skillar is built to replace the spreadsheet-and-generic-LMS stack as the system of record for learning, assessment, certification, and compliance. The course library you already paid for is not wasted: SCORM packages import and run as steps inside Skillar roadmaps.",
  },
  {
    question: "What security, encryption, and compliance standards does Skillar support?",
    answer: `${SECURITY.current[0]}, encryption in transit and at rest, ${SECURITY.current[1].toLowerCase()}, and ${SECURITY.current[2].toLowerCase()}. ${INTEGRATIONS.roadmap[0]} is on our roadmap. ${SECURITY.disclosure}`,
  },
] as const;
