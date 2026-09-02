/**
 * Copy for /product/skill-intelligence.
 *
 * The signals listed here are the only ones Skillar reads: role requirements,
 * assessment results, roadmap progress and HRMS profile data. No code, commit
 * or repository signals: the platform ingests none.
 *
 * Sections carry no eyebrows; the heading states the section.
 */

import { INTEGRATIONS } from "@/lib/product-truth";

export const meta = {
  title: "Skill Intelligence | Skillar",
  description:
    "Map the skills every role is accountable for, assess against them on a schedule, and see exactly which concepts sit below mastery, person by person.",
} as const;

export const hero = {
  title: "See the gaps hiding in your workforce.",
  lede:
    "Define what each role must be able to do, assess against it on a schedule, and read the result at any level — one operator, one shift, one site, the whole organisation.",
} as const;

export const problem = {
  title: "Job titles don't tell you what people can actually do.",
  body:
    "Two branch managers can hold the same title, the same grade and the same annual certification target, and still be short on completely different things. A course catalogue treats them identically; a spreadsheet of completions cannot tell them apart.",
  people: [
    {
      name: "Sarah Chen",
      role: "Branch Ops · Andheri",
      rows: [
        { skill: "Service standards", value: "92% · certified", tone: "good" as const },
        { skill: "Customer due diligence", value: "54% · below mastery", tone: "bad" as const },
      ],
    },
    {
      name: "James Park",
      role: "Branch Ops · Whitefield",
      rows: [
        { skill: "Service standards", value: "58% · below mastery", tone: "bad" as const },
        { skill: "Customer due diligence", value: "88% · certified", tone: "good" as const },
      ],
    },
  ],
} as const;

export const signals = {
  title: "Four inputs, and nothing you have to guess at.",
  lede:
    "Skillar reads what the role requires, what the assessments returned, how far each roadmap has got, and what your HRMS already knows. Self-rated skill surveys are not one of them.",
  items: [
    { name: "Role requirements", desc: "The skills each role is accountable for" },
    { name: "Assessment results", desc: "Scored per concept, on a schedule" },
    { name: "Roadmap progress", desc: "Steps and milestones completed" },
    { name: "Certification status", desc: "Issued, expiring, overdue" },
    { name: "Policy acknowledgements", desc: "Signed, dated, stored" },
    {
      name: "HRMS profile data",
      desc: `${INTEGRATIONS.hrms.join(", ")}, or CSV`,
    },
  ],
  terrainTitle: "Capability across the organisation",
  terrainBody:
    "Contours show where assessed scores cluster high and where a site or role sits below the mastery threshold.",
} as const;

export const atlas = {
  title: "One map, four zoom levels.",
  lede:
    "Switch scope from the whole organisation down to one person, select a skill to see its assessed score against the threshold, and read the revision roadmap Skillar would generate for it.",
} as const;

export const drilldown = {
  title: "From the whole organisation to a single assessed skill.",
  lede:
    "The same result reads four ways: a compliance number for the division, a heatmap for the team, a profile for the person, and a score for one concept.",
} as const;

export const priority = {
  title: "Not every gap earns a roadmap.",
  lede:
    "Skillar weighs each flagged concept against the role that owns it, the number of people below the threshold, and how close the related certification is to expiry.",
  factors: [
    {
      title: "Regulatory exposure",
      body: "Whether a certificate, permit or statutory requirement depends on the skill.",
    },
    {
      title: "People affected",
      body: "How many people in that role came back below the mastery threshold.",
    },
    {
      title: "Expiry pressure",
      body: "How long until the related certification lapses and re-enrollment triggers.",
    },
  ],
} as const;

export const closing = {
  title: "Know the gap. Know what to do about it.",
  cta: "Book a demo",
} as const;

export const nextChapter = {
  statement: "Now close the gap, one concept at a time.",
  label: "Next: Adaptive Learning",
  href: "/product/adaptive-learning",
  cta: "Explore Adaptive Learning",
} as const;
