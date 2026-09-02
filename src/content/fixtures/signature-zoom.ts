/**
 * Illustrative org tree for <SignatureZoom />.
 *
 * Organisation, division, team, person, assessed skill. Scores come from
 * scheduled assessments; the tags say whether a concept sits below the mastery
 * threshold. Figures are sample data; Skillar is pre-launch.
 */

export interface ZoomLevel {
  id: string;
  label: string;
  sublabel: string;
  tag?: string;
  score?: number;
  status?: "gap" | "developing" | "mastered";
  children?: ZoomLevel[];
}

export const orgTree: ZoomLevel = {
  id: "org",
  label: "Whole organisation",
  sublabel: "Every role, every site",
  tag: "4 divisions",
  children: [
    {
      id: "dept-retail",
      label: "Retail Banking",
      sublabel: "Branch network",
      tag: "12 regions",
      children: [
        {
          id: "team-branch-west",
          label: "Branch Operations, West",
          sublabel: "Andheri, Whitefield, Koregaon",
          tag: "3 branches",
          children: [
            {
              id: "person-sarah",
              label: "Sarah Chen",
              sublabel: "Branch Operations Manager · Andheri",
              tag: "AML certified until Nov",
              children: [
                {
                  id: "skill-cdd",
                  label: "Customer due diligence",
                  sublabel: "Thresholds and PEP screening",
                  tag: "below mastery",
                  score: 54,
                  status: "gap",
                },
                {
                  id: "skill-privacy",
                  label: "Data privacy & consent",
                  sublabel: "Revision roadmap in progress",
                  tag: "in progress",
                  score: 72,
                  status: "developing",
                },
                {
                  id: "skill-service",
                  label: "Service standards",
                  sublabel: "Re-assessed in March",
                  tag: "certified",
                  score: 92,
                  status: "mastered",
                },
              ],
            },
            {
              id: "person-james",
              label: "James Park",
              sublabel: "Branch Operations Manager · Whitefield",
              tag: "AML certified until Nov",
              children: [
                {
                  id: "skill-sanctions",
                  label: "Sanctions hit escalation",
                  sublabel: "Escalation timing and STR filing",
                  tag: "below mastery",
                  score: 58,
                  status: "gap",
                },
                {
                  id: "skill-cdd-james",
                  label: "Customer due diligence",
                  sublabel: "Re-assessed in February",
                  tag: "certified",
                  score: 88,
                  status: "mastered",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "dept-plant",
      label: "Plant Operations",
      sublabel: "Manufacturing sites",
      tag: "6 sites",
      children: [
        {
          id: "team-line-3",
          label: "Line 3 · Assembly, Pune",
          sublabel: "Three shifts",
          tag: "48 operators",
          children: [
            {
              id: "person-marcus",
              label: "Marcus Vance",
              sublabel: "Shift Lead · Line 3",
              tag: "Permit expires in 41 days",
              children: [
                {
                  id: "skill-permit",
                  label: "Permit to work",
                  sublabel: "Confined space entry and gas testing",
                  tag: "below mastery",
                  score: 48,
                  status: "gap",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const signatureZoomLabels = {
  title: "Organisation, team, person, skill",
  caption: "The same data at four zoom levels",
  rootCrumb: "Whole organisation",
  tableSkillHeading: "Assessed skills",
  tableScoreHeading: "Latest score",
  footerNote: "One person's assessment result is also the department's compliance number",
} as const;
