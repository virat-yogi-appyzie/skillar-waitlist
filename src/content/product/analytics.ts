/**
 * Copy for /product/analytics.
 *
 * Every claim here must be representable in src/lib/product-truth.ts.
 * Skillar reports on assessments, roadmaps, certificates and
 * acknowledgements, not on delivery velocity or business outcomes.
 *
 * Sections carry no eyebrows; the heading states the section.
 */

import { COMPLIANCE } from "@/lib/product-truth";

export const meta = {
  title: "Analytics and Reporting | Skillar",
  description:
    "Skill heatmaps, certification status, compliance dashboards and audit-ready reports, built from scheduled assessment results rather than course completions.",
} as const;

export const hero = {
  titleLead: "Measure learning as capability.",
  titleTail: "Not completion checkboxes.",
  lede:
    "A traditional LMS reports attendance. Skillar reports the assessed score behind every skill, who is certified today, and which certificates expire next quarter.",
  scrollCta: "See the dashboards",
} as const;

export const maturity = {
  title: "From hours logged to evidence an auditor accepts.",
  lede:
    "Most learning platforms stop at the first two rows. The rest is where compliance reporting actually lives.",
  stages: [
    { stage: "Activity", desc: "Hours logged and modules opened", status: "Traditional LMS" },
    { stage: "Knowledge", desc: "Quiz recall, one score per course", status: "Traditional LMS" },
    { stage: "Skill", desc: "Assessment scored per concept", status: "Skillar" },
    { stage: "Certification", desc: "Certificate issued, expiry tracked", status: "Skillar" },
    { stage: "Evidence", desc: "Audit-ready report on demand", status: "Skillar" },
  ],
} as const;

export const metricShift = {
  title: "Replace activity counts with assessment evidence.",
  lede:
    "The numbers below are the ones a compliance officer is actually asked for, and the ones a spreadsheet takes a week to assemble.",
  oldHeading: "Traditional LMS reporting",
  oldTag: "activity counts",
  newHeading: "Skillar reporting",
  newTag: "assessment evidence",
  oldMetrics: [
    { name: "Courses completed", reason: "Counts seat time, not whether the skill was acquired" },
    { name: "Hours watched", reason: "Rewards leaving a video playing" },
    { name: "One score per course", reason: "Hides which concept the person actually missed" },
    { name: "Catalogue enrolments", reason: "Says nothing about whether anyone is certified" },
  ],
  newMetrics: [
    { name: "Assessed skill score", reason: "Scored per concept by the scheduled assessment, not per course" },
    { name: "Concepts below mastery", reason: "Named by Bayesian Knowledge Tracing, person by person" },
    { name: "Certification currency", reason: "Who is certified, who is overdue, whose certificate expires next" },
    { name: "Acknowledgement coverage", reason: "Which policies each person has read and signed, with dates" },
  ],
} as const;

export const trajectory = {
  title: "Every point on the line is an assessment.",
  lede:
    "Pick a tracked skill to see its assessed score quarter by quarter, against the score before Skillar and the mastery threshold the role is held to.",
} as const;

export const closure = {
  title: "Where a group sat, and where it sat on re-assessment.",
  lede:
    "Each row is a group of people who took the same scheduled assessment, the concept most of them missed, and the score after the revision roadmap.",
} as const;

export const stakeholders = {
  title: "One set of evidence, three ways to read it.",
  lede:
    "An operator checking which certificate expires next, a supervisor covering a shift, and a compliance officer assembling the quarterly report all read the same underlying results.",
} as const;

export const auditTrail = COMPLIANCE.auditTrail;

export const nextChapter = {
  statement: "See the same evidence through the eyes of each role.",
  label: "Explore by role",
  href: "/solutions",
  cta: "View solutions by role",
} as const;

export const finalCta = {
  title: "Walk through the compliance dashboard with us.",
  body:
    "We will use your own roles and certifications, and show you exactly what an auditor would be handed. Skillar is pre-launch, so you will be talking to the people building it.",
  buttonLabel: "Book a demo",
} as const;
