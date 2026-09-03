/**
 * Hierarchy for `components/skillar/CapabilityMap` — an interactive
 * drill-down from the whole organisation to one flagged skill.
 *
 * The same sample world as the hero heatmap and LoopStory: Manufacturing
 * Ops, Night shift Line 3, R. Iyer's lockout gap. Numbers are illustrative;
 * the mechanism (assessed scores rolled up level by level) is the real one.
 */

export interface MapNode {
  id: string;
  label: string;
  sublabel: string;
  /** Assessed readiness, 0-100, rolled up from children. */
  score: number;
  /** Mastery target at this node. */
  target: number;
  /** What the count on the right of the row says. */
  countLabel: string;
  flagged?: boolean;
  children?: MapNode[];
  /** Leaf only: what happens next. */
  action?: string;
}

export const mapCopy = {
  title: "One capability map, five depths",
  hint: "Select a row to go deeper",
  backLabel: "Up one level",
  levels: ["Organisation", "Department", "Team", "Person", "Skill"],
  rootBreadcrumb: "Sample organisation",
} as const;

export const tree: MapNode = {
  id: "org",
  label: "Sample organisation",
  sublabel: "Readiness across every site",
  score: 82,
  target: 85,
  countLabel: "4 departments",
  children: [
    {
      id: "mfg",
      label: "Manufacturing Ops",
      sublabel: "Production, maintenance, quality",
      score: 74,
      target: 85,
      countLabel: "4 teams",
      flagged: true,
      children: [
        {
          id: "day1",
          label: "Day shift, Line 1",
          sublabel: "Assembly and packaging",
          score: 86,
          target: 85,
          countLabel: "9 people",
        },
        {
          id: "night3",
          label: "Night shift, Line 3",
          sublabel: "Assembly and changeover",
          score: 71,
          target: 85,
          countLabel: "8 people",
          flagged: true,
          children: [
            {
              id: "iyer",
              label: "R. Iyer",
              sublabel: "Shift Supervisor",
              score: 78,
              target: 85,
              countLabel: "6 tracked skills",
              flagged: true,
              children: [
                {
                  id: "lockout",
                  label: "Lockout / Tagout",
                  sublabel: "Energy isolation and verification",
                  score: 61,
                  target: 85,
                  countLabel: "Below mastery",
                  flagged: true,
                  action:
                    "Flagged by the last assessment. The generated revision roadmap covers the isolation and verification concepts only, drawn from the plant's lockout SOP.",
                },
                {
                  id: "guarding",
                  label: "Machine guarding",
                  sublabel: "Interlocks and inspection",
                  score: 88,
                  target: 85,
                  countLabel: "At mastery",
                  action: "At mastery. Re-checked on the next scheduled round; nothing assigned.",
                },
                {
                  id: "permits",
                  label: "Permit-to-work handover",
                  sublabel: "Shift handover records",
                  score: 78,
                  target: 85,
                  countLabel: "Below mastery",
                  flagged: true,
                  action:
                    "Seven points short. Queued behind the lockout roadmap so revision stays one sitting at a time.",
                },
              ],
            },
            {
              id: "verma",
              label: "Rohit Verma",
              sublabel: "Line Operator",
              score: 81,
              target: 85,
              countLabel: "6 tracked skills",
            },
            {
              id: "iyengar",
              label: "Meera Iyengar",
              sublabel: "Trainee Operator",
              score: 74,
              target: 80,
              countLabel: "5 tracked skills",
              flagged: true,
            },
          ],
        },
        {
          id: "maint",
          label: "Maintenance",
          sublabel: "Electrical and mechanical",
          score: 79,
          target: 85,
          countLabel: "6 people",
        },
        {
          id: "quality",
          label: "Quality",
          sublabel: "Inspection and deviation handling",
          score: 84,
          target: 85,
          countLabel: "5 people",
        },
      ],
    },
    {
      id: "logistics",
      label: "Logistics",
      sublabel: "Warehouse and dispatch",
      score: 85,
      target: 85,
      countLabel: "3 teams",
    },
    {
      id: "corporate",
      label: "Corporate",
      sublabel: "Finance, HR, compliance",
      score: 88,
      target: 85,
      countLabel: "5 teams",
    },
    {
      id: "rnd",
      label: "R&D",
      sublabel: "Process engineering",
      score: 90,
      target: 85,
      countLabel: "2 teams",
    },
  ],
};

/** Path preopened on load so the story is one click from its ending. */
export const defaultPath: string[] = [];
