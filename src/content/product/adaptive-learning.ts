/**
 * Copy for /product/adaptive-learning.
 *
 * Personalization here is post-assessment and targeted: Bayesian Knowledge
 * Tracing names the concepts below mastery, and a revision roadmap covers
 * exactly those. Not real-time adaptive difficulty; the platform does not
 * do that.
 *
 * Sections carry no eyebrows; the heading states the section.
 */

import { PERSONALIZATION } from "@/lib/product-truth";

export const meta = {
  title: "Adaptive Learning | Skillar",
  description:
    "After each assessment, Bayesian Knowledge Tracing flags the concepts still below mastery and Skillar generates a revision roadmap covering only those.",
} as const;

export const hero = {
  title: "The path changes after the assessment.",
  lede:
    "Each assessment names the concepts a person has not mastered. The revision roadmap that follows covers those, and nothing else.",
} as const;

export const paths = {
  title: "Two people with the same title take different routes to the same certificate.",
  lede:
    "Sarah and James sat the same AML assessment. Different concepts came back below mastery, so each gets a revision roadmap covering only their own.",
} as const;

export const branching = {
  title: "A missed concept branches the roadmap, not the whole course.",
  steps: [
    "A scheduled assessment returns a score per concept, not one overall mark",
    "Bayesian Knowledge Tracing flags the concepts still below the mastery threshold",
    "Skillar generates a revision roadmap covering only those concepts",
    "Its steps are drawn from your own SOPs and policies, with a quiz at the end",
    "Re-assessment confirms the gap is closed, and the certificate is issued",
  ],
  mechanism: PERSONALIZATION.mechanism,
} as const;

export const closing = {
  statement: "Nobody should re-sit a module they already passed to fix the one they didn't.",
  cta: "Book a demo",
} as const;

export const nextChapter = {
  statement: "Turn your experts' documents into the roadmap itself.",
  label: "Next: AI Authoring",
  href: "/product/ai-authoring",
  cta: "Explore AI Authoring",
} as const;
