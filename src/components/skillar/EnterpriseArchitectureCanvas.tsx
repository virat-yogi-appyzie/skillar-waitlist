"use client";

import React, { useState } from "react";
import {
  Users,
  ShieldCheck,
  Database,
  Copy,
  Check
} from "lucide-react";
import SampleDataBadge from "@/components/SampleDataBadge";
import { planes, canvasChrome } from "@/content/fixtures/enterprise-architecture-canvas";

/**
 * Three layers of the deployment, each with the record it actually holds.
 * Selecting a layer swaps the specification and the example record; the copy
 * button hands the record over. Both stay.
 */
export default function EnterpriseArchitectureCanvas() {
  const [activePlane, setActivePlane] = useState<string>("records");
  const [copied, setCopied] = useState<boolean>(false);
  const current = planes[activePlane];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.recordPreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full bg-[#0B1424] text-white rounded-2xl p-6 sm:p-10 border border-white/10 space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white tracking-[-0.025em]">
          {canvasChrome.title}
        </h3>
        <span className="text-sm text-white/60 shrink-0">{canvasChrome.hint}</span>
      </div>

      {/* The three layers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { id: "people", plane: planes.people, icon: Users },
          { id: "records", plane: planes.records, icon: Database },
          { id: "evidence", plane: planes.evidence, icon: ShieldCheck },
        ].map(({ id, plane, icon: Icon }) => {
          const isActive = activePlane === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActivePlane(id)}
              aria-pressed={isActive}
              className={`text-left p-5 rounded-xl border transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "bg-white/10 border-white/30"
                  : "bg-white/[0.02] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <span className="font-mono text-sm tabular text-white/60">
                  {plane.number}
                </span>
                <span className="text-xs text-white/60 text-right">{plane.category}</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${isActive ? "text-white" : "text-white/60"}`} aria-hidden="true" />
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-white">{plane.name}</h4>
                  <span className="text-sm text-white/60 block">{plane.state}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Layer specification and the record it holds */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">

        <div className="lg:col-span-6 space-y-5">
          <div className="border-b border-white/10 pb-3 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <span className="block text-sm text-white/60">{canvasChrome.selectedLabel}</span>
              <h4 className="font-serif text-xl text-white font-normal">{current.name}</h4>
            </div>
            <span className="text-sm text-white/70">
              {current.mechanism}
            </span>
          </div>

          <p className="text-sm text-white/70 leading-relaxed">
            {current.description}
          </p>

          <div className="space-y-2.5">
            <h5 className="text-sm font-semibold text-white/60">
              {canvasChrome.sourcesLabel}
            </h5>
            <ul className="flex flex-wrap gap-1.5">
              {current.sources.map((source) => (
                <li key={source} className="px-2.5 py-0.5 rounded-full border border-white/20 text-xs text-white/70">
                  {source}
                </li>
              ))}
            </ul>
          </div>

          <p className="pt-2 text-sm text-emerald-300">{current.note}</p>
        </div>

        {/* Illustrative record */}
        <div className="lg:col-span-6 rounded-xl overflow-hidden border border-white/10 bg-black/30">
          <div className="flex items-baseline justify-between gap-3 text-sm text-white/60 px-4 py-2.5 border-b border-white/10">
            <span className="truncate">{canvasChrome.recordLabel}: {current.name}</span>
            <div className="flex items-center gap-3 shrink-0">
              <SampleDataBadge tone="dark" />
              <button
                onClick={handleCopy}
                className="p-1 rounded text-white/60 hover:text-white transition-colors cursor-pointer"
                title="Copy the example record"
                aria-label="Copy the example record"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <pre className="p-4 text-xs font-mono text-white/80 overflow-x-auto leading-relaxed max-h-72">
            <code>{current.recordPreview}</code>
          </pre>
        </div>

      </div>

    </div>
  );
}
