/**
 * Copy for the skills-gap diagnostic page: sidebar, mockup labels, and the
 * result-panel strings only. The form state machine, step definitions, and
 * server-action wiring stay in the page component.
 *
 * Every claim here must be representable in `src/lib/product-truth.ts`.
 */

import { PERSONALIZATION } from "@/lib/product-truth";

/** Right-hand summary rail that fills in as the questionnaire progresses. */
export const sidebar = {
  heading: "Diagnostic summary",
  emptyValue: "Not selected yet",
  fields: {
    industry: "Industry",
    roles: "Focus roles",
    skills: "Skills assessed",
    timeToBuild: "Time to build internally",
  },
  model: {
    title: "How Skillar closes a gap",
    body: PERSONALIZATION.short,
  },
} as const;

/** Shown while the questionnaire hands off to report generation. */
export const processing = {
  title: "Preparing your report",
  detail: (skillCount: number) =>
    `Scoring ${skillCount} ${skillCount === 1 ? "skill" : "skills"} · Building your summary`,
} as const;

/** Email-capture step between the questionnaire and the on-screen report. */
export const leadCapture = {
  badge: "Diagnosis ready",
  title: "Where should we send your report?",
  subtitle: (company: string) =>
    `On-screen findings now, and a PDF for ${company} in your inbox.`,
} as const;

/** The on-screen report. */
export const results = {
  titlePrefix: "Audit for",
  metaIndustryLabel: "Industry",
  metaRoleLabel: "Role",
  dispatched: "PDF sent",
  criticalTitlePrefix: "Highest-risk gap:",
  criticalBody: (timeToBuild: string, businessImpact: string) =>
    `You put internal build time at ${timeToBuild} and the business impact at ${businessImpact}. On that arithmetic the gap stays open for most of a year before any training reaches the people carrying it.`,
  metrics: {
    skills: "Skills assessed",
    timeToBuild: "Time to build internally",
    lowest: "Lowest score",
  },
  lowestFallback: "Not yet scored",
  breakdownHeading: "Your scores, skill by skill",
  cta: {
    title: "Ready to close these gaps?",
    body: "See how revision roadmaps, re-assessment, and certification tracking work in practice.",
    button: "Book a 30-minute walkthrough",
  },
} as const;
