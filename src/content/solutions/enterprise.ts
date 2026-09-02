/**
 * Copy for /solutions/enterprise.
 *
 * The governance ledger is built from SECURITY.current and SECURITY.roadmap, so
 * the page can never claim a certification we do not hold. Nothing here asserts
 * ISO 27001, FedRAMP, FIPS, regional hubs, or a latency figure.
 */

import { SECURITY, COMPLIANCE } from "@/lib/product-truth";

export const meta = {
  title: "For enterprise: compliance evidence across every site | Skillar",
  description:
    "Per-organisation data isolation, role-based access, and audit-ready completion evidence rolled up by site, department and role. SOC 2 Type II is on our roadmap.",
} as const;

export const hero = {
  title: "Turn training records into evidence you can hand an auditor.",
  audience: "For enterprise organisations",
  lede:
    "Compliance training tracked across spreadsheets and a generic LMS does not survive an audit. Skillar records every assessment, acknowledgement and certificate against the employee, and rolls them up by site, department and role.",
  primaryCta: { label: "Book an enterprise walkthrough", href: "/demo" },
  secondaryCta: { label: "See how it connects", targetId: "architecture" },
} as const;

export const heroStats = [
  {
    value: "Per org",
    label: "Tenant isolation",
    sub: "Each organisation's data separated from every other tenant",
    icon: "server",
  },
  {
    value: "Role-based",
    label: "Access control",
    sub: "Employee, manager and admin views scoped separately",
    icon: "lock",
  },
  {
    value: "Roadmap",
    label: "SOC 2 Type II",
    sub: "Not yet audited. We walk every design partner through our current controls",
    icon: "shield",
  },
] as const;

export const rollUpSection = {
  title: "One assessment result, read at four altitudes.",
  lede:
    "The same record that tells a supervisor whether one operator is cleared also tells the board how many sites are behind on a mandatory refresher. Nothing is re-entered along the way.",
  card: {
    heading: "AML refresher, completion",
    value: "87%",
    body: "Rolled up by site, department and role. Filter it to the branch an auditor asks about.",
  },
  cta: { label: "Book an enterprise walkthrough", href: "/demo" },
  panel: {
    title: "Drill into any level",
    breadcrumb: ["Global operations", "Pune plant · Quality assurance", "Ananya Rao"],
    columnLeft: "Tracked skills (Ananya Rao)",
    columnRight: "Assessed mastery",
    footnote: "One person's assessment rolls into the site, department and organisation view",
    footnoteRight: "Assessment results",
  },
} as const;

export const competencies = [
  { name: "Batch record documentation (GMP)", score: 54, state: "below threshold", tone: "rose" },
  { name: "Deviation logging and CAPA", score: 72, state: "on roadmap", tone: "amber" },
  { name: "Cleanroom gowning procedure", score: 92, state: "above threshold", tone: "emerald" },
] as const;

export const architectureSection = {
  title: "Where your data comes from, and who can see it.",
  lede:
    "Skillar imports employee records from your HRMS, keeps each organisation's data in its own tenant, and scopes what every role can see. Explore each layer below.",
} as const;

export const governanceSection = {
  title: "What is built, and what is not yet.",
  lede: SECURITY.disclosure,
  auditNote: COMPLIANCE.auditTrail,
  cta: { label: "Ask us about our controls", href: "/demo" },
  columns: {
    control: "Control",
    covers: "What it covers",
    status: "Status",
    scope: "Scope",
  },
} as const;

export interface GovernanceRow {
  control: string;
  covers: string;
  status: string;
  scope: string;
  state: "current" | "roadmap";
}

export const governanceLedger: GovernanceRow[] = [
  {
    control: "Multi-tenant isolation",
    covers: SECURITY.current[0],
    status: "Built in",
    scope: "Every organisation",
    state: "current",
  },
  {
    control: "Role-based access control",
    covers: SECURITY.current[1],
    status: "Built in",
    scope: "All views",
    state: "current",
  },
  {
    control: "Integration credentials",
    covers: SECURITY.current[2],
    status: "Built in",
    scope: "HRMS and meetings",
    state: "current",
  },
  {
    control: "Model training boundary",
    covers: SECURITY.current[3],
    status: "Built in",
    scope: "All content and results",
    state: "current",
  },
  {
    control: "Audit trail",
    covers: COMPLIANCE.certifications,
    status: "Built in",
    scope: "Completions and certificates",
    state: "current",
  },
  {
    control: SECURITY.roadmap[0],
    covers: "Independent audit of our security controls",
    status: "On our roadmap",
    scope: "Pre-launch",
    state: "roadmap",
  },
  {
    control: "SSO: Azure AD and Google Workspace",
    covers: "Federated sign-in and provisioning",
    status: "On our roadmap",
    scope: "Pre-launch",
    state: "roadmap",
  },
];

export const nextChapter = {
  statement: "See how Skillar works for your organisation.",
  label: "Next: an enterprise walkthrough",
  href: "/demo",
  cta: "Book a demo",
} as const;
