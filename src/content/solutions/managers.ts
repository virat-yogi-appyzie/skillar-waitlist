/**
 * Copy for /solutions/managers.
 *
 * Audience: frontline and team managers in compliance-heavy industries, such as
 * manufacturing shift leads, bank branch managers and pharma QA leads. Their job
 * is knowing who is qualified for the work they are about to assign, and catching
 * a certification before it lapses. Every claim traces to src/lib/product-truth.ts.
 */

import { CONTENT_TYPES } from "@/lib/product-truth";

export const meta = {
  title: "For managers: know who on your team is ready | Skillar",
  description:
    "See each person's assessed skill level, get warned before a certification lapses, and assign a revision roadmap to whoever is below threshold.",
} as const;

export const hero = {
  title: "Know who is ready, and who is about to lapse.",
  audience: "For frontline and team managers",
  lede:
    "Shift leads, branch managers and QA leads carry the compliance risk for their teams, usually on a spreadsheet someone updates by hand. Skillar shows each person's assessed skill level, warns you before a certification expires, and assigns a revision roadmap to whoever sits below threshold.",
  primaryCta: { label: "Book a manager walkthrough", href: "/demo" },
  secondaryCta: { label: "Open the team view", targetId: "team-view" },
} as const;

export const heroStats = [
  {
    value: "Heatmap",
    label: "Team skill view",
    sub: "Every tracked skill, per person, from scheduled assessment results",
    icon: "users",
  },
  {
    value: "Before expiry",
    label: "Certification alerts",
    sub: "Renewal reminders and automatic re-enrollment when a certificate lapses",
    icon: "clock",
  },
  {
    value: "Per gap",
    label: "Revision roadmaps",
    sub: "Generated for the concepts below mastery, then verified on re-assessment",
    icon: "target",
  },
] as const;

export const teamViewSection = {
  title: "Open one person and see what the assessment actually found.",
  lede:
    "Select a team member to see their assessed skill level, certification status, and the revision roadmap Skillar would put in front of them.",
} as const;

export const loopSection = {
  title: "Measure, close the gap, then check that it closed.",
  lede:
    "A completion report tells you someone attended. Skillar tells you which concepts they have not mastered, generates a revision roadmap covering exactly those, and re-assesses to confirm the gap is closed.",
  note: {
    heading: "Roadmap step formats",
    value: `${CONTENT_TYPES.length}`,
    body: `${CONTENT_TYPES.join(", ")}. These are the formats a roadmap step can hold.`,
  },
  cta: { label: "Book a manager walkthrough", href: "/demo" },
  ledgerLabel: "How the loop runs, phase by phase",
} as const;

export const loopPhases = [
  {
    phase: "Assess",
    marker: "Scheduled",
    title: "Scheduled assessments, not self-reported surveys",
    body:
      "Assessments target the skills a role is accountable for and run on a schedule, so a skill someone passed a year ago gets re-checked rather than assumed.",
    chipLeft: "Quarterly safety re-check, line B",
    chipRight: "3 below threshold",
    tone: "alert",
  },
  {
    phase: "Pinpoint",
    marker: "Per person",
    title: "A roadmap for the concepts still below mastery",
    body:
      "Bayesian Knowledge Tracing reads the assessment and flags the specific concepts below threshold. The roadmap Skillar generates covers only those, grounded in your own SOPs and policy documents rather than the open internet.",
    chipLeft: "Assigned: lockout/tagout revision, 4 steps",
    chipRight: "Rohit Verma",
    tone: "neutral",
  },
  {
    phase: "Verify",
    marker: "Audit trail",
    title: "Re-assessment, then a certificate with an expiry date",
    body:
      "A follow-up assessment confirms the gap closed. The certificate that follows carries an expiry date, a renewal alert, and a record of who acknowledged what: the evidence an auditor asks for.",
    chipLeft: "Re-assessed: above threshold",
    chipRight: "Certificate valid to 12 Sep 2026",
    tone: "positive",
  },
] as const;

export const capabilitiesSection = {
  title: "Three things a spreadsheet cannot do.",
  lede:
    "Skillar replaces the tracker your team maintains by hand and the generic course catalogue nobody finishes.",
} as const;

export const capabilities = [
  {
    icon: "users",
    title: "Every skill, every person",
    body:
      "See which skills your team holds, which are thin, and who is carrying a gap into work you are about to assign.",
    footnote: "Built from scheduled assessment results",
    palette: "indigo",
  },
  {
    icon: "clock",
    title: "Warned before it lapses",
    body:
      "Certificates are tracked through their whole lifecycle. Skillar alerts you ahead of the expiry date and re-enrolls the person on the renewal automatically.",
    footnote: "Expiry alerts and bulk renewal reports",
    palette: "emerald",
  },
  {
    icon: "target",
    title: "Assign only what is missing",
    body:
      "Instead of a 40-hour course for the whole team, assign a roadmap covering the concepts one person has not mastered, then re-assess to confirm it worked.",
    footnote: "Grounded in your own documents",
    palette: "purple",
  },
] as const;

export const nextChapter = {
  statement: "Roll team readiness up into organisation-wide compliance evidence.",
  label: "Next: Skillar for enterprise",
  href: "/solutions/enterprise",
  cta: "Read the enterprise page",
} as const;
