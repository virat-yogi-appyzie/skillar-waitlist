/**
 * Copy for /product - the overview of the whole loop.
 *
 * The spine comes from src/lib/product-truth.ts: assess, pinpoint,
 * remediate, verify. Mockup figures are illustrative and always rendered
 * behind <SampleDataBadge />.
 *
 * No section eyebrows live here. The page states its sections with headings
 * alone, matching the homepage.
 */

import { PRODUCT_LOOP } from "@/lib/product-truth";

export const meta = {
  title: "Product Architecture | Skillar",
  description:
    "How Skillar joins role requirements, skill maps, roadmaps, scheduled assessments and certification into one loop.",
} as const;

export const hero = {
  titleLead: "The intelligence layer",
  titleTail: "behind every learning decision.",
  lede:
    "Skillar connects people, skills, content, goals, and performance to determine what should happen next for every learner and every organization.",
  scrollCta: "Enter the system",
} as const;

export const inputs = {
  title: "Learning doesn't happen in isolation.",
  lede:
    "Every employee carries signals that normally sit in different systems: the requirements of their role, their HRMS record, the roadmaps they have worked through, and the result of every assessment they have taken. Skillar keeps them in one place.",
} as const;

export const intelligence = {
  title: "All those signals become one living model.",
  body:
    "Instead of a spreadsheet and a static course catalogue, Skillar keeps one current map of who is certified, who is mid-roadmap, and whose assessment falls due next. Every completed assessment updates it.",
  card: {
    heading: "What the map holds",
    axes: [
      { title: "People and skills", metric: "1,240 mapped skills" },
      { title: "Roles and requirements", metric: "412 role profiles" },
    ],
    outputLabel: "What the map answers",
    outputValue: "Who is certified, who is due, who is short",
  },
} as const;

export const understand = {
  title: "First, understand the learner.",
  body:
    "Skillar builds a picture of what each person has been assessed on, which concepts came back below mastery, and which of their certifications is closest to expiry.",
  linkLabel: "Read about Skill Intelligence",
  linkHref: "/product/skill-intelligence",
  card: {
    heading: "Learner skill profile",
    subheading: "Updated after the 14 March assessment",
    skills: [
      { name: "Machine guarding and lockout/tagout", value: "92% certified", tone: "good" as const },
      { name: "Hazardous materials handling", value: "84% roadmap in progress", tone: "mid" as const },
      { name: "Confined space entry permits", value: "48% below mastery", tone: "bad" as const },
    ],
  },
} as const;

export const identify = {
  title: "Then find the gaps that matter.",
  body:
    "Not every gap carries the same risk. Skillar separates the concepts an auditor or a shift supervisor would ask about from the ones that can wait for the next cycle.",
  card: {
    heading: "Confined space entry permits",
    tag: "statutory",
    scoreLabel: "Average assessed score",
    score: 48,
    thresholdLabel: "Mastery threshold: 85%",
    shortfallLabel: "37 points short",
    note: "142 operators across three shifts. Their permit-to-work certification comes up for renewal in Q4.",
  },
} as const;

export const prioritize = {
  title: "Not every gap matters equally.",
  lede:
    "Skillar ranks each flagged concept by how many people it affects, which roles are accountable for it, and how close the related certification is to expiry.",
  cards: [
    {
      priority: "High priority",
      score: "9.4",
      title: "Confined space entry",
      body: "Statutory requirement. 142 operators below threshold, permits due for renewal in Q4.",
      action: "Revision roadmap issued now",
      tone: "high" as const,
    },
    {
      priority: "Medium priority",
      score: "6.2",
      title: "Deviation reporting",
      body: "28 quality analysts below threshold on root-cause write-ups. No expiry pressure yet.",
      action: "Scheduled for the next cycle",
      tone: "medium" as const,
    },
    {
      priority: "Low priority",
      score: "2.1",
      title: "Presentation skills",
      body: "No regulatory exposure and no certification attached. Useful, not urgent.",
      action: "Left in the self-serve library",
      tone: "low" as const,
    },
  ],
  scoreLabel: "Ranking score",
  actionLabel: "Action",
} as const;

export const personalize = {
  title: "The same goal can require a different path.",
  lede:
    "Two people can hold the same role and the same annual certification target and still need entirely different revision roadmaps, because their assessments came back different.",
  sharedTargetLabel: "Shared target:",
  sharedTarget: "Annual AML recertification",
  people: [
    {
      name: "Sarah Chen",
      role: "Branch Operations Manager · Andheri",
      roadmapTag: "Roadmap A",
      gap: "Below mastery · Customer due diligence thresholds",
      tone: "indigo" as const,
      steps: [
        "Revision steps on CDD thresholds and PEP screening",
        "Re-assessment, then certificate reissued",
      ],
    },
    {
      name: "James Park",
      role: "Branch Operations Manager · Whitefield",
      roadmapTag: "Roadmap B",
      gap: "Below mastery · Sanctions hit escalation",
      tone: "sky" as const,
      steps: [
        "Revision steps on escalation and STR filing",
        "Re-assessment, then certificate reissued",
      ],
    },
  ],
} as const;

export const create = {
  title: "When the learning doesn't exist, create it.",
  pullQuote: "Authoring isn't a separate AI tool. It is downstream of assessment.",
  body:
    "Instead of a course-build cycle measured in quarters, Skillar drafts the roadmap, milestones, steps and quizzes, from the documents you already have, and routes it to a reviewer before anyone sees it.",
  linkLabel: "Read about AI Authoring",
  linkHref: "/product/ai-authoring",
  pipelineHeading: "How a roadmap gets built",
  pipeline: [
    { step: "Gap flagged", label: "Sanctions escalation below mastery for 26 people" },
    { step: "Milestones", label: "Drawn from the skills the role is accountable for" },
    { step: "Source material", label: "Your AML policy, SOPs and circulars" },
    { step: "Draft generated", label: "Text steps, video, images and a quiz per milestone" },
    { step: "Review and publish", label: "Compliance officer approves, then it auto-enrolls" },
  ],
} as const;

export const adapt = {
  title: "Learning doesn't end when the lesson does.",
  lede:
    "A certificate is a date, not a finish line. Assessments come round again on a schedule, and each round shows where mastery has slipped since the last one.",
  steps: [
    { label: "Assess", desc: "The scheduled assessment runs" },
    { label: "Pinpoint", desc: "BKT flags concepts below mastery" },
    { label: "Revise", desc: "A roadmap covering only those" },
    { label: "Re-assess", desc: "Confirm the gap has closed" },
    { label: "Certify", desc: "Certificate issued, expiry tracked" },
  ],
} as const;

export const measure = {
  titleLead: "The output isn't completion.",
  titleTail: "It's capability.",
  lede:
    "A traditional LMS reports who finished the course. Skillar reports who passed the assessment, who is certified, and whose certificate expires next quarter.",
  stages: [
    { tag: "Stage 1", name: "Activity", desc: "Clicks and view time" },
    { tag: "Stage 2", name: "Knowledge", desc: "Quiz recall" },
    { tag: "Stage 3", name: "Skill", desc: "Applied practice steps" },
    { tag: "Stage 4", name: "Capability", desc: "Re-assessed, then certified" },
  ],
} as const;

export const loop = {
  title: "Every cycle starts where the last one ended.",
  lede: "Eight steps in one system, not eight tools stitched together with spreadsheets.",
  stages: [
    "Understand",
    "Identify",
    "Prioritize",
    "Personalize",
    "Create",
    "Learn",
    "Measure",
    "Re-assess",
  ],
  spine: PRODUCT_LOOP,
} as const;

export const scale = {
  title: "One learner becomes organizational intelligence.",
  body:
    "The same assessment results roll up four ways: a person's own skill profile, a manager's team heatmap, an HR skill inventory by role, and a compliance dashboard the auditor can be shown.",
  linkLabel: "Explore solutions by role",
  linkHref: "/solutions",
  cardHeading: "What each level sees",
  levels: [
    { level: "Individual", desc: "Skill scores, the current roadmap, and certificate status" },
    { level: "Team", desc: "A skill heatmap across direct reports, plus readiness scores" },
    { level: "Department", desc: "Skill inventory by role, and which certifications expire next" },
    { level: "Organization", desc: "Compliance dashboards and one-click audit-ready reports" },
  ],
} as const;

export const difference = {
  title: "The fundamental shift.",
  columns: [
    {
      label: "Traditional LMS",
      claim: "Starts with content.",
      body: "Buys a video catalogue and leaves people to navigate it.",
      highlight: false,
    },
    {
      label: "Adaptive platforms",
      claim: "Start with the learner.",
      body: "Adjusts playback speed and quiz questions based on clicks.",
      highlight: false,
    },
    {
      label: "Skillar",
      claim: "Starts with the assessment.",
      body:
        "Assesses what people can actually do, pinpoints the concepts below mastery, and builds the revision roadmap from your own documents.",
      highlight: true,
    },
  ],
} as const;

export const productIndex = {
  title: "One intelligence layer, every learning decision connected.",
  items: [
    {
      num: "1",
      title: "Skill Intelligence",
      desc: "Map the skills each role is accountable for, and see who sits below the bar.",
      href: "/product/skill-intelligence",
    },
    {
      num: "2",
      title: "Adaptive Learning",
      desc: "Revision roadmaps built per person from what their assessment actually showed.",
      href: "/product/adaptive-learning",
    },
    {
      num: "3",
      title: "AI Authoring",
      desc: "Turn your SOPs, policies and decks into roadmaps, steps and quizzes.",
      href: "/product/ai-authoring",
    },
    {
      num: "4",
      title: "Analytics and Governance",
      desc: "Skill heatmaps, certification status, and audit-ready compliance reports.",
      href: "/product/analytics",
    },
  ],
  exploreLabel: "Explore",
  ctaLabel: "Book a demo",
} as const;
