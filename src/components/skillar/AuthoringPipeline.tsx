"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import SampleDataBadge from "@/components/SampleDataBadge";
import {
  authoringSources,
  authoringModules,
  authoringPipelineLabels as copy,
} from "@/content/fixtures/authoring-pipeline";

interface AuthoringPipelineProps {
  className?: string;
}

/**
 * Pick a source document, see the roadmap Skillar drafts from it. Two tiers
 * with the generation step named between them.
 */
export default function AuthoringPipeline({ className = "" }: AuthoringPipelineProps) {
  const [selectedSourceId, setSelectedSourceId] = useState<string>(authoringSources[0].id);

  const activeSource =
    authoringSources.find((s) => s.id === selectedSourceId) || authoringSources[0];

  return (
    <div className={`p-6 sm:p-8 bg-[#0B1424] text-white border border-white/10 rounded-2xl ${className}`}>

      {/* Title */}
      <div className="flex items-start justify-between gap-4 flex-wrap pb-4 mb-6 border-b border-white/10">
        <h4 className="font-serif text-lg sm:text-xl font-normal text-white max-w-md">
          {copy.title}
        </h4>
        <div className="flex items-center gap-3">
          <span className="text-xs text-emerald-300 border border-emerald-300/40 rounded-full px-2.5 py-0.5 shrink-0">
            {copy.headerBadge}
          </span>
          <SampleDataBadge tone="dark" />
        </div>
      </div>

      {/* Source documents */}
      <div className="mb-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-sm font-semibold text-white/60">
            {copy.sourceHeading}
          </span>
          <span className="text-xs font-mono tabular text-white/60 shrink-0">
            {activeSource.tag} {copy.sourceActiveSuffix}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {authoringSources.map((source) => {
            const isSelected = selectedSourceId === source.id;
            return (
              <div
                key={source.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Use ${source.title} as the source document`}
                onClick={() => setSelectedSourceId(source.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedSourceId(source.id);
                  }
                }}
                className={`p-3.5 rounded-xl border transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isSelected
                    ? "bg-white/[0.08] border-white/30"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <FileText className={`w-4 h-4 ${isSelected ? "text-white" : "text-white/50"}`} />
                  <span className="text-xs font-mono tabular text-white/60">{source.pages}</span>
                </div>
                <span className="text-sm text-white block line-clamp-1">
                  {source.title}
                </span>
                <span className="text-xs text-white/60 block mt-0.5">
                  {source.format}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* The generation step */}
      <p className="my-5 py-3 border-y border-white/10 text-sm text-white/60">
        {copy.bridge}
      </p>

      {/* Generated roadmaps */}
      <div className="mb-5">
        <span className="text-sm font-semibold text-white/60 block mb-3">
          {copy.outputHeading}
        </span>
        <ul>
          {authoringModules.map((module) => (
            <li
              key={module.id}
              className="py-3.5 border-b border-white/10 last:border-b-0 flex items-start justify-between gap-4"
            >
              <div className="min-w-0">
                <span className="text-sm text-white block truncate">
                  {module.title}
                </span>
                <span className="text-sm text-white/60 block mt-0.5">
                  {module.type} · {module.detail}
                </span>
              </div>
              <span className="text-xs text-white/60 border border-white/15 rounded-full px-2.5 py-0.5 shrink-0">
                {module.badge}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 text-sm text-white/60">
        <span>{copy.footerNote}</span>
        <span className="hidden sm:inline shrink-0">{copy.footerRight}</span>
      </div>

    </div>
  );
}
