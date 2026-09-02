/**
 * Copy for /solutions/learning-development.
 *
 * The loop section is derived from PRODUCT_LOOP so the four stages can never
 * drift from the truth model. Footnotes name the mechanism behind each stage.
 */

import { PRODUCT_LOOP, CONTENT_TYPES, PERSONALIZATION } from "@/lib/product-truth";

export const meta = {
  title: "For learning and development: roadmaps from your own material | Skillar",
  description:
    "Generate roadmaps and assessments from your own documents, find the concepts below mastery, and verify the gap closed on re-assessment.",
} as const;

export const hero = {
  audience: "For learning and development teams",
  title: "Author from your own material, not a generic catalogue.",
  lede:
    "Six months of course authoring produces a library people click through and forget. Skillar generates roadmaps and assessments from the documents you already have, then uses each assessment result to decide what a learner revises next.",
  primaryCta: { label: "Book an L&D walkthrough", href: "/demo" },
  secondaryCta: { label: "See the loop", targetId: "loop" },
} as const;

export const heroStats = [
  {
    value: "Your docs",
    label: "Grounded generation",
    sub: PERSONALIZATION.grounding,
    icon: "book",
  },
  {
    value: `${CONTENT_TYPES.length} formats`,
    label: "Roadmap step types",
    sub: CONTENT_TYPES.join(", "),
    icon: "layers",
  },
  {
    value: "Per learner",
    label: "Revision roadmaps",
    sub: "Generated for the concepts an assessment found below mastery",
    icon: "sparkles",
  },
] as const;

export const loopSection = {
  title: "From a course catalogue to a loop that checks itself.",
  lede:
    "How an assessment result becomes a roadmap, and how that roadmap gets verified.",
} as const;

/** Footnote per PRODUCT_LOOP stage, in the same order. */
const loopFootnotes = [
  "Scheduled, not self-reported",
  "Bayesian Knowledge Tracing",
  "Grounded in your documents",
  "Certificate with expiry tracking",
] as const;

const loopPalettes = ["text-indigo-600", "text-accent", "text-sky-700", "text-emerald-700"] as const;

export const loopStages = PRODUCT_LOOP.map((stage, i) => ({
  id: stage.id,
  step: i + 1,
  label: stage.label,
  title: stage.title,
  desc: stage.desc,
  footnote: loopFootnotes[i],
  color: loopPalettes[i],
}));

export const nextChapter = {
  statement: "See the same skill data from an HR desk.",
  label: "Next: Skillar for HR",
  href: "/solutions/hr",
  cta: "Read the HR page",
} as const;
