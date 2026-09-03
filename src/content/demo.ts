/**
 * Copy for /demo. Every claim here must be representable in
 * `src/lib/product-truth.ts` — if it is not, the copy is wrong.
 */

import { PRODUCT_LOOP } from "@/lib/product-truth";

export const hero = {
  title: "See what your workforce can actually prove.",
  lede: "Thirty minutes, walked through by a person: how a role becomes a skill map, how a scheduled assessment finds the gaps, and how the revision roadmap and the certificate that follow hold up in front of an auditor.",
  trustSignals: [
    "30-minute focused agenda",
    "Zero obligation",
    "Built around your roles",
  ],
} as const;

/**
 * The three beats of the walkthrough. Ordinal, so the numbering carries
 * information. Mirrors PRODUCT_LOOP: assess, pinpoint, remediate and verify.
 */
export const walkthroughSteps = [
  {
    title: "Roles, skills, and the first assessment",
    description: PRODUCT_LOOP[0].desc,
  },
  {
    title: "Where mastery is still short",
    description: PRODUCT_LOOP[1].desc,
  },
  {
    title: "Revision roadmap, re-assessment, certificate",
    description: `${PRODUCT_LOOP[2].desc} ${PRODUCT_LOOP[3].desc}`,
  },
] as const;

export const form = {
  title: "Book a live walkthrough",
  subtitle: "Thirty minutes, screen-shared, configured for your industry and roles.",
  submit: "Schedule live walkthrough",
  submitting: "Booking…",
  footnote: "No commitment required. We typically respond within 24 hours.",
  successTitle: "Walkthrough requested",
  successBody:
    "Thank you. Someone from our team will email you within 24 hours to agree a time and send the calendar invitation.",
  errorFallback: "Please verify your input and try again.",
  errorNetwork:
    "Unable to submit demo request. Please try again or email hello@skillar.ai directly.",
  fields: {
    firstName: "First name",
    lastName: "Last name",
    email: "Work email",
    company: "Organisation name",
    teamSize: "Workforce scale",
    focus: "What you want to fix first",
  },
  placeholders: {
    firstName: "Elena",
    lastName: "Rostova",
    email: "elena@company.com",
    company: "Vantage Logistics",
  },
} as const;

export const teamSizeOptions = [
  { value: "100 - 500", label: "100 – 500 employees" },
  { value: "500 - 1,000", label: "500 – 1,000 employees" },
  { value: "1,000 - 5,000", label: "1,000 – 5,000 employees" },
  { value: "5,000 - 20,000", label: "5,000 – 20,000 employees" },
  { value: "20,000+", label: "20,000+ employees" },
] as const;

export const focusOptions = [
  { value: "Compliance & Certification", label: "Compliance training and certification tracking" },
  { value: "Closing Skill Gaps", label: "Closing skill gaps in specific roles" },
  { value: "Replacing Spreadsheets & Legacy LMS", label: "Replacing spreadsheets and a legacy LMS" },
  { value: "AI Course & Assessment Authoring", label: "AI course and assessment authoring" },
  { value: "Onboarding & Role Readiness", label: "Onboarding and role readiness" },
] as const;

export const faqSection = {
  title: "What to expect from your session.",
  description:
    "What the 30 minutes covers, who should be in the room, and what we need from you beforehand.",
} as const;

export const faqs = [
  {
    question: "Who should attend the 30-minute demonstration?",
    answer:
      "Heads of L&D, HR and people operations leads, compliance and quality managers, and the plant, branch, or site leaders who sign off on certification for their teams. Most sessions are booked by manufacturing, banking, pharma, and logistics organisations.",
  },
  {
    question: "Do we need to upload proprietary data beforehand?",
    answer:
      "No preparation is required. The walkthrough runs on a sample organisation we configure for your industry and the roles you care about. If you want to see the platform working on your own SOPs and manuals, we set that up on a follow-up session.",
  },
  {
    question: "What is the agenda for the session?",
    answer:
      "Ten minutes on role definitions, skill mapping, and assessment results. Ten minutes on how below-mastery concepts turn into a generated revision roadmap. Ten minutes on certification, expiry alerts, and audit-ready reporting, and then your questions.",
  },
  {
    question: "Does Skillar replace our existing Learning Management System (LMS)?",
    answer:
      "Usually, yes. Skillar is built to replace the spreadsheet-and-generic-LMS stack as the system of record for learning, assessment, certification, and compliance. The course library you already paid for is not wasted: SCORM packages import and run as steps inside Skillar roadmaps.",
  },
] as const;
