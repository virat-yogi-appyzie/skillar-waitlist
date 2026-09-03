/**
 * Copy for /about, the manifesto.
 *
 * A manifesto is allowed ambition, but its mechanism claims still have to be
 * true: assessment-led capability mapping, BKT pinpointing, generated revision
 * roadmaps. No "autonomous", no "real-time", no "instantly".
 */

export const meta = {
  title: "The Skillar manifesto | Learning systems should understand people",
  description:
    "Why we believe learning systems should start with understanding people, not with a catalog of courses.",
} as const;

export const hero = {
  title: "Learning systems should understand people.",
  kicker: "The Skillar manifesto.",
  lede:
    "Not the other way around. For decades, enterprise software has forced human potential to adapt to rigid catalogs. The paradigm is finally flipping.",
  primaryCta: "Read the three theses",
  secondaryCta: "Book a demo",
} as const;

export const theses = [
  {
    label: "The flaw",
    title: "We have been measuring the wrong thing.",
    paragraphs: [
      "The enterprise learning industry is built on a fundamental misunderstanding: it assumes that delivering content is the same as developing capability.",
      "We buy courses. We assign them. We track completion rates. But completion is a metric of compliance, not competence. The system knows what a person has clicked, but it has absolutely no idea what they can actually do. The learner is an afterthought.",
    ],
  },
  {
    label: "The foundation",
    title: "Assessment precedes instruction.",
    paragraphs: [
      "Before you can teach someone, you need to know what they can already do. Which concepts they hold securely, and which ones came back below mastery the last time anyone checked.",
      "Without that evidence, training is just broadcasting. With it, learning becomes a precise, targeted intervention: a revision roadmap that covers what this person is missing, and nothing they are not.",
    ],
  },
  {
    label: "The future",
    title: "We are abandoning the catalog.",
    paragraphs: [
      "We are not building another digital filing cabinet for static videos, with a completion report on top.",
      "We are building an intelligence layer for workforce capability: a system that assesses what people can actually do, pinpoints the concepts each person is missing, generates the revision roadmap that closes the gap from your organisation's own material, and then re-assesses to prove it closed. That is the product we are building, and the standard we hold every release to.",
    ],
  },
] as const;

export const closing = {
  title: "Stop tracking consumption. Start managing capability.",
  lede: "The paradigm is shifting. See how Skillar measures and builds workforce capability.",
  primaryCta: "Book a demo",
  secondaryCta: "Run the free diagnostic",
} as const;
