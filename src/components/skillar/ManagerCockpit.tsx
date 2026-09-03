"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import SampleDataBadge from "@/components/SampleDataBadge";
import { directReports, cockpitLabels } from "@/content/fixtures/manager-cockpit";

const gapCount = directReports.filter((r) => r.status !== "mastered").length;
const clearedCount = directReports.filter((r) => r.status === "mastered").length;

/**
 * The manager's working view: pick a person, read what the assessment found,
 * assign the revision roadmap, and watch the score move when they re-assess.
 * All of that is real interaction the visitor drives, so it stays; the surface
 * around it is the quiet panel idiom.
 */
export default function ManagerCockpit() {
  const [selectedId, setSelectedId] = useState<string>(directReports[0].id);
  const [filter, setFilter] = useState<"all" | "gaps" | "cleared">("all");
  const [completedRoadmaps, setCompletedRoadmaps] = useState<Record<string, boolean>>({});

  const filteredReports = directReports.filter((r) => {
    if (filter === "gaps") return r.status === "critical_gap" || r.status === "developing";
    if (filter === "cleared") return r.status === "mastered";
    return true;
  });

  const activeMember = directReports.find((r) => r.id === selectedId) || directReports[0];
  const isRoadmapComplete = !!completedRoadmaps[activeMember.id];

  const handleAssign = () => {
    setCompletedRoadmaps((prev) => ({ ...prev, [activeMember.id]: true }));
  };

  const handleReset = () => {
    setCompletedRoadmaps((prev) => ({ ...prev, [activeMember.id]: false }));
  };

  const displayScore = isRoadmapComplete ? Math.min(100, activeMember.score + 58) : activeMember.score;

  return (
    <div className="w-full bg-white border border-border rounded-2xl overflow-hidden">

      {/* Panel header and filters */}
      <div className="px-6 sm:px-8 py-5 border-b border-border flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-normal text-navy tracking-[-0.025em]">
            {cockpitLabels.title}
          </h3>
          <div className="mt-1">
            <SampleDataBadge />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
            className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${
              filter === "all" ? "bg-navy text-white border-navy" : "text-navy-500 border-border hover:text-navy"
            }`}
          >
            {cockpitLabels.filters.all} ({directReports.length})
          </button>
          <button
            onClick={() => setFilter("gaps")}
            aria-pressed={filter === "gaps"}
            className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${
              filter === "gaps" ? "bg-rose-700 text-white border-rose-700" : "text-navy-500 border-border hover:text-rose-700"
            }`}
          >
            {cockpitLabels.filters.gaps} ({gapCount})
          </button>
          <button
            onClick={() => setFilter("cleared")}
            aria-pressed={filter === "cleared"}
            className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${
              filter === "cleared" ? "bg-emerald-700 text-white border-emerald-700" : "text-navy-500 border-border hover:text-emerald-700"
            }`}
          >
            {cockpitLabels.filters.cleared} ({clearedCount})
          </button>
        </div>
      </div>

      {/* Team on the left, the selected person on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">

        {/* Team selector */}
        <div className="lg:col-span-5 p-6 sm:p-7 bg-surface/40 space-y-3">
          <div className="flex items-baseline justify-between text-sm text-navy-500 pb-1">
            <span>{cockpitLabels.teamHeading} ({filteredReports.length})</span>
            <span>{cockpitLabels.scoreHeading}</span>
          </div>

          <div className="space-y-2.5">
            {filteredReports.map((member) => {
              const isSelected = member.id === activeMember.id;
              const memberReassessed = !!completedRoadmaps[member.id];
              const scoreToShow = memberReassessed ? Math.min(100, member.score + 58) : member.score;

              let statusPill = "text-emerald-700 border-emerald-300";
              let statusText: string = cockpitLabels.statuses.cleared;

              if (scoreToShow < 60) {
                statusPill = "text-rose-700 border-rose-300";
                statusText = cockpitLabels.statuses.belowThreshold;
              } else if (scoreToShow < 85) {
                statusPill = "text-amber-700 border-amber-300";
                statusText = cockpitLabels.statuses.needsReview;
              }

              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setSelectedId(member.id)}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-4 rounded-xl border transition-colors duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? "border-accent bg-white"
                      : "border-border bg-white hover:border-navy-300"
                  }`}
                >
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-navy block truncate">
                      {member.name}
                    </span>
                    <span className="text-sm text-navy-500 block truncate">
                      {member.role}
                    </span>
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    <span className="font-mono text-sm tabular text-navy block">
                      {scoreToShow}%
                    </span>
                    <span className={`text-xs border rounded-full px-2.5 py-0.5 inline-block ${statusPill}`}>
                      {memberReassessed ? cockpitLabels.statuses.reassessed : statusText}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Person detail */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-white flex flex-col justify-between gap-6">
          <div className="space-y-6">

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-border pb-4 gap-2">
              <div>
                <h4 className="font-serif text-2xl text-navy font-normal">
                  {activeMember.name}
                </h4>
                <p className="mt-1 text-sm text-navy-500">
                  {cockpitLabels.trackedSkill}: {activeMember.focalSkill}
                </p>
              </div>
              <div className="inline-flex items-baseline gap-2 shrink-0">
                <span className="text-sm text-navy-500">{cockpitLabels.readiness}</span>
                <span className={`text-xs border rounded-full px-2.5 py-0.5 ${
                  isRoadmapComplete || activeMember.readiness === "Cleared"
                    ? "text-emerald-700 border-emerald-300"
                    : activeMember.readiness === "Needs review"
                    ? "text-amber-700 border-amber-300"
                    : "text-rose-700 border-rose-300"
                }`}>
                  {isRoadmapComplete ? cockpitLabels.readinessCleared : activeMember.readiness}
                </span>
              </div>
            </div>

            {/* Mastery meter */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-navy-500">{cockpitLabels.masteryHeading}</span>
                <span className="font-mono text-sm tabular text-navy">{displayScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-navy-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    displayScore < 60
                      ? "bg-rose-500"
                      : displayScore < 85
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${displayScore}%` }}
                />
              </div>
              {isRoadmapComplete && (
                <p className="flex items-start gap-2 text-sm text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{cockpitLabels.reassessedNote}</span>
                </p>
              )}
            </div>

            {/* What is blocked, and where the certificate stands */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-border pt-5">
              <div>
                <dt className="text-sm font-semibold text-navy-500">
                  {cockpitLabels.blocksHeading}
                </dt>
                <dd className="mt-1 text-sm text-navy-500 leading-relaxed">
                  {isRoadmapComplete ? cockpitLabels.blocksCleared : activeMember.assignmentImpact}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold text-navy-500">
                  {cockpitLabels.certificationHeading}
                </dt>
                <dd className="mt-1 text-sm text-navy leading-relaxed flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-navy-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{activeMember.certification}</span>
                </dd>
              </div>
            </dl>

            {/* What Skillar suggests, and the action that runs it */}
            <div className="p-6 bg-[#0B1424] text-white rounded-2xl border border-white/10 space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-white/10 pb-3">
                <span className="text-sm font-semibold text-white/60">
                  {cockpitLabels.actionHeading}
                </span>
                {activeMember.estDaysToClose > 0 && !isRoadmapComplete && (
                  <span className="text-sm text-white/60 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>About {activeMember.estDaysToClose} days to re-assessment</span>
                  </span>
                )}
              </div>

              <p className="text-sm text-white/80 leading-relaxed">
                {activeMember.revisionRoadmap}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                {!isRoadmapComplete ? (
                  <button
                    onClick={handleAssign}
                    disabled={activeMember.status === "mastered"}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      activeMember.status === "mastered"
                        ? "bg-white/10 text-white/50 cursor-not-allowed"
                        : "bg-accent text-white hover:bg-accent-hover"
                    }`}
                  >
                    {activeMember.status === "mastered"
                      ? cockpitLabels.alreadyCleared
                      : cockpitLabels.assignCta}
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-emerald-300 text-sm border border-emerald-300/40 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span>{cockpitLabels.completedState}</span>
                    </span>
                    <button
                      onClick={handleReset}
                      className="px-3 py-1.5 rounded-full text-white/60 hover:text-white text-sm transition-colors cursor-pointer border border-white/15"
                    >
                      <RotateCcw className="w-3.5 h-3.5 inline mr-1.5" aria-hidden="true" />
                      <span>{cockpitLabels.reset}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className="pt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-border text-sm text-navy-500">
            <span>{cockpitLabels.footerLeft}</span>
            <span>{cockpitLabels.footerRight}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
