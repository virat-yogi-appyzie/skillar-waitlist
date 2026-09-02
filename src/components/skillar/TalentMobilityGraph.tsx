"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import SampleDataBadge from "@/components/SampleDataBadge";
import {
  mobilityTrajectories,
  mobilityLabels,
  type MobilityTrajectory,
} from "@/content/fixtures/talent-mobility-graph";

/**
 * Pick an internal candidate and read the skills the target role requires
 * against what their assessments actually verified. The selection is the
 * interaction; nothing moves on its own.
 */
export default function TalentMobilityGraph() {
  const [selectedTrajectory, setSelectedTrajectory] = useState<MobilityTrajectory>(mobilityTrajectories[0]);
  const verifiedSkills = selectedTrajectory.keySkills.filter((s) => s.status === "verified").length;

  return (
    <div className="w-full bg-[#0B1424] text-white rounded-2xl p-6 sm:p-10 border border-white/10 space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white tracking-[-0.025em]">
            {mobilityLabels.title}
          </h3>
          <div className="mt-1">
            <SampleDataBadge tone="dark" />
          </div>
        </div>

        <div className="shrink-0">
          <span className="block text-sm text-white/60">{mobilityLabels.matchedLabel}</span>
          <span className="block font-serif text-xl font-normal text-emerald-300 tabular">
            {mobilityTrajectories.length} employees
          </span>
        </div>
      </div>

      {/* Candidates on the left, the role's requirements on the right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        <div className="md:col-span-5 space-y-3">
          <h4 className="text-sm font-semibold text-white/60">
            {mobilityLabels.candidatesLabel}
          </h4>
          <div className="space-y-2">
            {mobilityTrajectories.map((t) => {
              const isSelected = selectedTrajectory.id === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTrajectory(t)}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-4 rounded-xl border transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-white/10 border-white/30"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <span className="text-sm font-medium text-white">{t.name}</span>
                    <span className="font-mono text-sm tabular text-emerald-300 shrink-0">
                      {t.matchScore}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white/60">
                    <span className="truncate">{t.currentRole}</span>
                    <ArrowRight className="w-3 h-3 text-white/40 shrink-0" aria-hidden="true" />
                    <span className="text-white/85 truncate">{t.targetRole}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-white/50">{mobilityLabels.matchSuffix}</p>
        </div>

        <div className="md:col-span-7 rounded-xl p-6 sm:p-7 border border-white/10 bg-white/[0.02] space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="block text-sm text-white/60">{mobilityLabels.readinessLabel}</span>
              <h4 className="font-serif text-2xl font-normal text-white">{selectedTrajectory.targetRole}</h4>
            </div>
            <span className="font-mono text-sm tabular text-emerald-300">
              {verifiedSkills} of {selectedTrajectory.keySkills.length} verified
            </span>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-white/60">
              {mobilityLabels.requiredSkillsLabel}
            </h5>
            <ul className="space-y-2.5">
              {selectedTrajectory.keySkills.map((skill) => {
                const isComplete = skill.status === "verified";
                const isProgress = skill.status === "in_progress";
                return (
                  <li key={skill.name} className="flex items-center justify-between gap-4 text-sm pb-2.5 border-b border-white/10 last:border-b-0">
                    <span className="text-white/85">{skill.name}</span>
                    <span className="flex items-baseline gap-2.5 shrink-0">
                      <span
                        className={`text-xs border rounded-full px-2.5 py-0.5 ${
                          isComplete
                            ? "text-emerald-300 border-emerald-300/40"
                            : isProgress
                              ? "text-amber-300 border-amber-300/40"
                              : "text-white/60 border-white/20"
                        }`}
                      >
                        {isComplete
                          ? mobilityLabels.skillStates.verified
                          : isProgress
                            ? mobilityLabels.skillStates.inProgress
                            : mobilityLabels.skillStates.notAssessed}
                      </span>
                      <span className="font-mono text-sm tabular text-white/70">{skill.score}%</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-wrap items-baseline justify-between gap-3 text-sm">
            <span className="text-white/60">{mobilityLabels.stepsLeftLabel}</span>
            <span className="text-white/85 text-right">
              {selectedTrajectory.remainingSteps === 0
                ? mobilityLabels.stepsNone
                : `${selectedTrajectory.remainingSteps} before re-assessment`}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
