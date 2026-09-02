/**
 * Illustrative data for <AuthoringPipeline />.
 *
 * Source documents on the left, the roadmap modules Skillar drafts from them
 * on the right. Only formats a roadmap step can actually hold appear here:
 * text, video, images, code examples, quizzes, SCORM, summaries.
 * Figures are sample data; Skillar is pre-launch.
 */

export interface AuthoringSource {
  id: string;
  title: string;
  format: string;
  tag: string;
  pages: string;
}

export interface AuthoringModule {
  id: string;
  title: string;
  type: string;
  detail: string;
  badge: string;
}

export const authoringSources: AuthoringSource[] = [
  { id: "sop", title: "Machine Safety SOP, Line 3", format: "SOP · PDF", tag: "SOP-114", pages: "34 pages" },
  { id: "policy", title: "AML & Sanctions Policy", format: "Policy · DOCX", tag: "POL-AML-07", pages: "62 pages" },
  { id: "deck", title: "GMP Documentation Practice", format: "Training deck · PPTX", tag: "TRN-GMP-02", pages: "48 slides" },
];

export const authoringModules: AuthoringModule[] = [
  {
    id: "m1",
    title: "Machine Safety Fundamentals",
    type: "Roadmap · 3 milestones",
    detail: "12 steps · text, images, video",
    badge: "quiz included",
  },
  {
    id: "m2",
    title: "AML Refresher",
    type: "Roadmap · 2 milestones",
    detail: "8 steps · text, summaries",
    badge: "reviewer approved",
  },
  {
    id: "m3",
    title: "GMP Documentation Practice",
    type: "Assessment · 20 questions",
    detail: "Mapped to four tracked skills",
    badge: "SCORM export",
  },
];

export const authoringPipelineLabels = {
  title: "Your SOPs, policies and decks, restructured rather than rewritten",
  headerBadge: "reviewed before publish",
  sourceHeading: "Source material",
  sourceActiveSuffix: "selected",
  bridge: "Retrieval-grounded generation",
  outputHeading: "Generated roadmaps",
  footerNote: "Generated from your source material, not the open internet",
  footerRight: "An expert approves before publish",
} as const;
