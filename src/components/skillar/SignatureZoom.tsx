"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import SampleDataBadge from "@/components/SampleDataBadge";
import { orgTree, signatureZoomLabels as copy } from "@/content/fixtures/signature-zoom";

const statusTone = {
  gap: { chip: "text-rose-700 border-rose-200", bar: "bg-rose-500", row: "bg-rose-50/60 border-rose-200" },
  developing: { chip: "text-amber-700 border-amber-200", bar: "bg-amber-400", row: "bg-surface-elevated border-border" },
  mastered: { chip: "text-emerald-700 border-emerald-200", bar: "bg-emerald-500", row: "bg-surface-elevated border-border" },
} as const;

export default function SignatureZoom() {
  const [selectedDept, setSelectedDept] = useState<string>("dept-retail");
  const [selectedPerson, setSelectedPerson] = useState<string>("person-sarah");

  const dept = orgTree.children?.find((d) => d.id === selectedDept) || orgTree.children![0];
  const team = dept.children![0];
  const person = team.children?.find((p) => p.id === selectedPerson) || team.children![0];
  const skills = person.children || [];

  return (
    <div className="p-6 sm:p-8 bg-white border border-border rounded-2xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap pb-4 mb-5 border-b border-border">
        <div>
          <h4 className="font-serif text-xl font-normal text-navy">
            {copy.title}
          </h4>
          <p className="text-sm text-navy-500 mt-0.5">{copy.caption}</p>
        </div>
        <SampleDataBadge />
      </div>

      {/* Hierarchy navigation */}
      <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
        <span className="font-medium text-navy shrink-0">{copy.rootCrumb}</span>
        <ChevronRight className="w-4 h-4 text-navy-400 shrink-0" />

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          aria-label="Select department"
          className="bg-white border border-border rounded-lg px-2.5 py-1 font-medium text-navy text-sm cursor-pointer focus:outline-none focus:border-accent"
        >
          {orgTree.children?.map((d) => (
            <option key={d.id} value={d.id}>{d.label}</option>
          ))}
        </select>

        <ChevronRight className="w-4 h-4 text-navy-400 shrink-0" />

        <select
          value={selectedPerson}
          onChange={(e) => setSelectedPerson(e.target.value)}
          aria-label="Select individual"
          className="bg-white border border-accent rounded-lg px-2.5 py-1 font-medium text-accent text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          {team.children?.map((p) => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* The selected person's assessed skills */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between gap-3 text-sm font-semibold text-navy-500">
          <span>{copy.tableSkillHeading}, {person.label}</span>
          <span>{copy.tableScoreHeading}</span>
        </div>

        {skills.map((skill) => {
          const tone = statusTone[skill.status ?? "developing"];

          return (
            <div key={skill.id} className={`p-3.5 rounded-xl border ${tone.row}`}>
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-sm font-medium text-navy">{skill.label}</span>
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className={`text-xs border rounded-full px-2.5 py-0.5 ${tone.chip}`}>
                    {skill.tag}
                  </span>
                  <span className="font-mono text-sm tabular text-navy">{skill.score}%</span>
                </div>
              </div>

              <div className="w-full h-1 rounded-full bg-border/80 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${tone.bar}`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Roll-up note */}
      <p className="pt-3.5 border-t border-border text-sm text-navy-500">
        {copy.footerNote}
      </p>
    </div>
  );
}
