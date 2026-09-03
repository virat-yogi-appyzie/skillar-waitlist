"use client";

import { useState } from "react";
import SampleDataBadge from "@/components/SampleDataBadge";
import {
  cohorts,
  cohortHeatmapLabels as copy,
  type Cohort,
} from "@/content/fixtures/cohort-velocity-heatmap";

export default function CohortVelocityHeatmap() {
  const [selectedCohort, setSelectedCohort] = useState<Cohort>(cohorts[0]);

  const reassessed = cohorts.filter((c) => c.status !== "Re-assessment due").length;

  return (
    <div className="rounded-3xl bg-navy text-white p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="text-sm text-white/60">
              {copy.eyebrow}
            </span>
            <SampleDataBadge tone="dark" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white">
            {copy.title}
          </h3>
          <p className="text-white/70 text-sm mt-1">
            {copy.lede}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-center">
            <span className="text-[10px] font-mono text-white/60 block">{copy.summaryLeftLabel}</span>
            <span className="text-sm font-mono font-bold text-cyan-300">{cohorts.length}</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-center">
            <span className="text-[10px] font-mono text-white/60 block">{copy.summaryRightLabel}</span>
            <span className="text-sm font-mono font-bold text-emerald-400">
              {reassessed} of {cohorts.length}
            </span>
          </div>
        </div>
      </div>

      {/* Group list and detail */}
      <div className="relative z-10 my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left list */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-white/60 mb-3">
            {copy.selectHeading}
          </div>
          {cohorts.map((cohort) => {
            const isSelected = selectedCohort.id === cohort.id;
            const delta = cohort.postAssessment - cohort.preAssessment;

            return (
              <div
                key={cohort.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Show detail for ${cohort.name}`}
                onClick={() => setSelectedCohort(cohort)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedCohort(cohort);
                  }
                }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isSelected
                    ? "bg-white/20 border-white/45 shadow-lg scale-[1.01]"
                    : "bg-white/[0.04] border-white/12 hover:bg-white/[0.08] hover:border-white/25"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-serif text-base sm:text-lg font-medium text-white">
                      {cohort.name}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/10 text-white font-medium border border-white/15">
                      {cohort.headcount} {copy.peopleSuffix}
                    </span>
                  </div>
                  <div className="text-xs text-white/80 mt-1 font-mono">
                    {cohort.criticalSkill}
                  </div>
                </div>

                {/* Score comparison */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-mono text-white/70 font-medium">
                      {cohort.preAssessment}% → <span className="text-white font-bold">{cohort.postAssessment}%</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      +{delta} {copy.deltaSuffix}
                    </span>
                  </div>
                  <div className="w-24 h-2.5 bg-white/15 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
                      style={{ width: `${cohort.postAssessment}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right detail card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white/[0.07] border border-white/20 shadow-xl space-y-6">
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/15">
            <div>
              <span className="text-xs text-white/60 block">
                {copy.drilldownEyebrow}
              </span>
              <h4 className="font-serif text-xl font-medium text-white mt-0.5">
                {selectedCohort.name}
              </h4>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/25 text-emerald-200 border border-emerald-500/40 shrink-0">
              {selectedCohort.status}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2 gap-3">
                <span className="text-white/80 font-medium">{copy.preLabel}</span>
                <span className="text-rose-300 font-bold shrink-0">
                  {selectedCohort.preAssessment}% · {copy.preNote}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/15 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${selectedCohort.preAssessment}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-2 gap-3">
                <span className="text-white/80 font-medium">{copy.postLabel}</span>
                <span className="text-emerald-300 font-bold shrink-0">
                  {selectedCohort.postAssessment}% · {copy.postNote}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/15 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${selectedCohort.postAssessment}%` }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white/[0.06] border border-white/15">
              <span className="text-[10px] font-mono text-white/70 font-semibold block">{copy.metaCycle}</span>
              <span className="text-sm font-mono font-bold text-white mt-0.5 block">
                {selectedCohort.cycleLength}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.06] border border-white/15">
              <span className="text-[10px] font-mono text-white/70 font-semibold block">{copy.metaEvidence}</span>
              <span className="text-sm font-mono font-bold text-cyan-300 mt-0.5 block">
                {copy.metaEvidenceValue}
              </span>
            </div>
          </div>

          <p className="text-xs text-white/70 leading-relaxed font-light pt-2 border-t border-white/15">
            {copy.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
