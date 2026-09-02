/**
 * The three planes of the Skillar deployment, as they actually exist.
 *
 * No SSO federation, no data-warehouse or log-forwarding connectors, no edge
 * compute claims: what is here is per-organisation isolation, role-based access,
 * HRMS or CSV import, SCORM, Microsoft Teams, and the reporting roll-up.
 * Roadmap items are labelled as roadmap. The example records are illustrative,
 * which is why the component renders a SampleDataBadge beside them.
 */

import { INTEGRATIONS, SECURITY } from "@/lib/product-truth";

export interface PlaneDetail {
  id: string;
  number: string;
  name: string;
  category: string;
  mechanism: string;
  state: string;
  description: string;
  note: string;
  sources: string[];
  recordPreview: string;
}

export const canvasChrome = {
  title: "How Skillar fits your stack",
  hint: "Select a layer to see what it holds",
  selectedLabel: "Selected layer",
  sourcesLabel: "What connects here",
  recordLabel: "Example record",
} as const;

export const planes: Record<string, PlaneDetail> = {
  people: {
    id: "people",
    number: "01",
    name: "People and access",
    category: "Roles and isolation",
    mechanism: "Role-based access control",
    state: "Employee, manager, admin",
    description:
      "Each organisation's data sits in its own tenant. Employees, managers and admins see only the records their role allows, and credentials for connected systems are stored encrypted.",
    note: `${INTEGRATIONS.roadmap[0]} is on our roadmap`,
    sources: ["Employee view", "Manager view", "Admin view", "Per-organisation tenant"],
    recordPreview: `{
  "organisation": "org_northline_foods",
  "tenant_isolation": "per_organisation",
  "viewer_role": "manager",
  "visible_scope": ["team:assembly_b"],
  "hidden_from_this_role": ["other_departments", "admin_settings"],
  "single_sign_on": "roadmap"
}`
  },
  records: {
    id: "records",
    number: "02",
    name: "Employee records and content",
    category: "Import and enrollment",
    mechanism: "HRMS sync · CSV import · SCORM",
    state: "Scheduled employee import",
    description:
      "Employees, departments and reporting lines come in from your HRMS, or from a CSV export if you run something else. New joiners are enrolled automatically on the journeys their role and department require, and existing SCORM packages stay usable.",
    note: `Direct sync with ${INTEGRATIONS.hrms.join(", ")} · ${INTEGRATIONS.hrmsFallback}`,
    sources: [...INTEGRATIONS.hrms, "CSV import", INTEGRATIONS.contentStandard, INTEGRATIONS.meetings],
    recordPreview: `{
  "source": "keka",
  "operation": "employees.import",
  "records": 142,
  "new_joiners": 6,
  "auto_enrolled": [
    "Journey: Induction · plant safety",
    "Journey: Code of conduct · acknowledgement"
  ],
  "stored_credentials": "encrypted"
}`
  },
  evidence: {
    id: "evidence",
    number: "03",
    name: "Assessment and compliance evidence",
    category: "Reporting and audit",
    mechanism: "Assessments · mastery tracing · reports",
    state: "Roll-up by site, department, role",
    description:
      "Assessment results roll up into individual skill scores, team heatmaps and organisation-wide completion views. Certificates, acknowledgements and expiry dates are recorded, so an audit request is a filtered report rather than a week of spreadsheet work.",
    note: `${SECURITY.roadmap[0]} is on our roadmap · ${SECURITY.current[3]}`,
    sources: ["Assessment results", "Roadmap progress", "Certificates & expiry", "Policy acknowledgements"],
    recordPreview: `{
  "assessment": "GMP documentation · Q1 recheck",
  "cohort": "Quality assurance",
  "completed": 42,
  "below_mastery": ["batch_record_correction", "deviation_logging"],
  "revision_roadmaps_generated": 9,
  "certificates_expiring_90d": 4
}`
  }
};
