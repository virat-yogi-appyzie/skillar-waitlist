/**
 * Shared constants for the event intake funnel — importable from both the
 * client form and the server action (a "use server" module may export only
 * async functions, so these live here).
 */

export const RATING_AREAS = [
  {
    title: "Problem & market clarity",
    desc: "How clearly can you articulate the problem, who it affects, and how big the opportunity is?",
  },
  {
    title: "Solution & differentiation",
    desc: "How clearly does your deck show what you’ve built and why it beats existing alternatives?",
  },
  {
    title: "Business model & revenue clarity",
    desc: "How clearly can you explain how you make money, your pricing, and your unit economics?",
  },
  {
    title: "Traction & validation",
    desc: "How strong is your evidence that this is working: pilots, users, revenue, partnerships?",
  },
  {
    title: "Narrative & storytelling",
    desc: "Does your deck flow as a compelling story, or read like a checklist of disconnected facts?",
  },
  {
    title: "Pitch delivery & Q&A readiness",
    desc: "How confident are you presenting live and handling tough investor questions on the spot?",
  },
] as const;

export const RATING_DESCS = [
  "Not started",
  "Rough sketch",
  "Taking shape",
  "Nearly there",
  "Investor-ready",
] as const;

export const STAGES = [
  { value: "Idea", label: "Idea", sub: "Concept on paper" },
  { value: "Early pilot", label: "Early pilot", sub: "In users' hands" },
  { value: "Revenue-generating", label: "Revenue", sub: "Paying customers" },
] as const;

export const NEEDS = [
  { value: "Pitch deck", label: "Pitch deck", sub: "Story & slides", icon: "deck" },
  { value: "Financial modeling", label: "Financial modeling", sub: "Numbers & unit economics", icon: "chart" },
  { value: "Investor Q&A", label: "Investor Q&A", sub: "Tough questions", icon: "mic" },
  { value: "Positioning", label: "Positioning", sub: "Why you, why now", icon: "compass" },
] as const;

export const SECTORS = [
  "BFSI & Fintech",
  "Healthcare & Pharma",
  "Energy & Climate",
  "Logistics & Supply Chain",
  "Manufacturing & Industrial",
  "Agri & Food",
  "B2B SaaS & Deep Tech",
  "Education & Skills",
  "Consumer & Retail",
  "Other",
] as const;

/** Score (0-100) -> self-assessment snapshot label. Plain words, no
 *  credit-rating cosplay: this is the founder's own read, not a verdict. */
export function snapshotLabel(score: number): string {
  if (score >= 88) return "Investor-ready";
  if (score >= 76) return "Nearly there";
  if (score >= 64) return "Promising";
  if (score >= 52) return "Foundation stage";
  if (score >= 40) return "Early draft";
  return "Idea notebook";
}
