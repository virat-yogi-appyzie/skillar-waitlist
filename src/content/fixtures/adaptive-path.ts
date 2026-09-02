/**
 * Illustrative data for <AdaptivePath />.
 *
 * Two people hold the same role and sit the same scheduled assessment.
 * Different concepts come back below the mastery threshold, so each gets a
 * revision roadmap covering only their own. Figures are sample data;
 * Skillar is pre-launch.
 */

export interface AdaptiveWaypoint {
  id: string;
  code: string;
  name: string;
  status: "cleared" | "friction" | "branched" | "pending";
  elev: string;
}

export interface AdaptiveProfile {
  name: string;
  initial: string;
  role: string;
  focus: string;
  gap: string;
  gapDetail: string;
  originElevation: string;
  targetElevation: string;
  /** The document the revision steps are grounded in. */
  source: string;
  waypoints: AdaptiveWaypoint[];
}

export const adaptivePathProfiles: Record<"sarah" | "james", AdaptiveProfile> = {
  sarah: {
    name: "Sarah Chen",
    initial: "SC",
    role: "Branch Operations Manager",
    focus: "AML recertification",
    gap: "Customer due diligence thresholds",
    gapDetail: "Two of eleven concepts came back below the mastery threshold",
    originElevation: "54%",
    targetElevation: "88%",
    source: "your AML policy and the current KYC circular",
    waypoints: [
      { id: "wp1", code: "WP-01", name: "Customer risk categories", status: "cleared", elev: "60%" },
      { id: "wp2", code: "WP-02", name: "Enhanced due diligence triggers", status: "friction", elev: "68%" },
      { id: "wp-branch", code: "WP-REMED", name: "Revision steps: CDD thresholds and PEP screening", status: "branched", elev: "82%" },
      { id: "wp3", code: "WP-03", name: "Re-assessment, AML certificate", status: "pending", elev: "88%" },
    ],
  },
  james: {
    name: "James Park",
    initial: "JP",
    role: "Branch Operations Manager",
    focus: "AML recertification",
    gap: "Sanctions hit escalation",
    gapDetail: "One of eleven concepts came back below the mastery threshold",
    originElevation: "62%",
    targetElevation: "86%",
    source: "your sanctions escalation SOP",
    waypoints: [
      { id: "wp1", code: "WP-01", name: "Screening alert triage", status: "cleared", elev: "68%" },
      { id: "wp2", code: "WP-02", name: "True match confirmation", status: "friction", elev: "74%" },
      { id: "wp-branch", code: "WP-REMED", name: "Revision steps: escalation and STR filing", status: "branched", elev: "81%" },
      { id: "wp3", code: "WP-03", name: "Re-assessment, AML certificate", status: "pending", elev: "86%" },
    ],
  },
};

export const adaptivePathLabels = {
  belowMastery: "below mastery",
  waypointCleared: "passed",
  conceptBelow: "below mastery",
  conceptInProgress: "in progress",
  branchHeading: "Revision roadmap added",
  branchBadge: "Targeted",
  branchNoteLead: "Steps generated from",
  branchNoteTail: "and nothing else.",
  chartFirst: "First concept",
  chartFlagged: "Flagged concept",
  chartRevision: "Revision",
  chartTarget: "Re-assessment target",
  buttonIdle: "Show what happens after a failed concept",
  buttonBusy: "Building the revision roadmap",
  buttonApplied: "Revision roadmap added. Reset",
} as const;
