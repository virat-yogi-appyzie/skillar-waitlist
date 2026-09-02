/**
 * Copy for /product/ai-authoring.
 *
 * A roadmap step can hold text, video, code examples, quizzes, images, SCORM
 * packages and summaries, nothing else. Generation is retrieval-grounded in
 * the organisation's own documents, and an expert approves before publish.
 *
 * Sections carry no eyebrows; the heading states the section.
 */

import { CONTENT_TYPES, PERSONALIZATION } from "@/lib/product-truth";

export const meta = {
  title: "AI Authoring | Skillar",
  description:
    "Turn your SOPs, policies and training decks into structured roadmaps: milestones, steps, quizzes and SCORM, generated from your own source material.",
} as const;

export const hero = {
  title: "Turn organizational knowledge into learning.",
  lede:
    "Your experts already hold the knowledge. Skillar drafts the roadmap from their documents so they review rather than write.",
} as const;

export const transformation = {
  title: "A policy PDF becomes a roadmap someone can work through.",
  lede: `Documents, policies, recorded sessions and expert notes are organised into milestones and steps, with a quiz at the end of each milestone. ${PERSONALIZATION.grounding}`,
  contentTypes: CONTENT_TYPES,
  contentTypesLabel: "What a step can hold",
} as const;

export const workflow = {
  title: "Six steps, and a human signs off on the last one.",
  steps: [
    { step: "Source", description: "The SOPs, policies, decks, videos and expert notes you already have" },
    { step: "Structure", description: "AI reads them and proposes milestones and steps for the topic and level" },
    { step: "Draft", description: "Each step is written as text, video, images, code examples or a summary" },
    { step: "Quiz", description: "Assessment questions are generated against the skills the role is tracked on" },
    { step: "Review", description: "A subject expert edits and approves before anything is published" },
    { step: "Enroll", description: "The roadmap goes live and the right roles are enrolled automatically" },
  ],
} as const;

export const humanControl = {
  title: "AI drafts. The expert who owns the SOP approves.",
  body:
    "Nothing reaches a learner unreviewed. Retrieval keeps every step tied to the document it came from, so a reviewer can check a claim against the source rather than trusting a model.",
  cta: "Book a demo",
} as const;

export const nextChapter = {
  statement: "Measure whether the learning actually changed anything.",
  label: "Next: Analytics",
  href: "/product/analytics",
  cta: "Explore Analytics",
} as const;
