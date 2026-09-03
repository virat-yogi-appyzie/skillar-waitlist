"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SampleDataBadge from "@/components/SampleDataBadge";
import {
  organizationLenses,
  lensChrome,
  type LensType,
} from "@/content/fixtures/organization-lens";

export type { LensType };

/**
 * Four desks, one record set. The lens buttons swap which pipeline and which
 * topology edge is drawn; nothing here animates on its own.
 */
export default function OrganizationLens({ className = "" }: { className?: string }) {
  const [activeLens, setActiveLens] = useState<LensType>("ld");
  const [animKey, setAnimKey] = useState(0);

  const current = organizationLenses.find((l) => l.id === activeLens)!;

  return (
    <div className={`rounded-2xl bg-[#0B1424] border border-white/10 p-6 sm:p-10 lg:p-12 text-white ${className}`}>
      {/* Header and lens selector */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-[-0.025em] leading-snug">
            {lensChrome.title}
          </h3>
          <div className="mt-2">
            <SampleDataBadge tone="dark" />
          </div>
        </div>

        {/* Lens switcher */}
        <div className="flex items-stretch gap-2 overflow-x-auto shrink-0 scrollbar-none">
          {organizationLenses.map((lens, idx) => {
            const isActive = lens.id === activeLens;
            return (
              <button
                key={lens.id}
                onClick={() => { setAnimKey(k => k + 1); setActiveLens(lens.id); }}
                type="button"
                aria-pressed={isActive}
                className={`px-4 py-3 rounded-xl text-sm transition-colors duration-200 cursor-pointer flex flex-col items-start text-left gap-1 border shrink-0 min-w-[92px] ${
                  isActive
                    ? "bg-white/10 border-white/30 text-white"
                    : "border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <span className="font-mono text-sm tabular text-white/50">
                  {idx + 1}
                </span>
                <span className="font-medium leading-tight whitespace-nowrap">{lensChrome.shortLabels[lens.id]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The question this desk asks */}
      <div className="py-8 border-b border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-white leading-snug font-normal">
            &ldquo;{current.question}&rdquo;
          </p>
          <p className="text-sm text-white/60">
            {current.role}. {current.stake}.
          </p>
        </div>

        <Link
          href={current.href}
          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors shrink-0 w-fit group underline underline-offset-4 decoration-cyan-300/40"
        >
          <span>Read the {current.title} page</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* What happens next, and where it lands */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-10 items-start">
        {/* Left: the pipeline for this lens */}
        <div key={animKey} className="lg:col-span-7 space-y-4" style={{ animation: 'lensContentIn 300ms ease-out' }}>
          <h4 className="text-sm font-semibold text-white/60">
            {lensChrome.flowLabel}, {current.title.toLowerCase()}
          </h4>

          <ol className="space-y-3">
            {current.pipeline.map((item, index) => (
              <li
                key={item.step}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-4"
              >
                <span className="font-mono text-sm tabular text-white/50 shrink-0 pt-0.5">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-medium text-white">
                      {item.step}
                    </span>
                    {item.status && (
                      <span className="text-xs text-white/60 border border-white/20 rounded-full px-2.5 py-0.5">
                        {item.status}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/70 mt-1.5 leading-relaxed break-words">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Right: which edge of the record set this desk reads */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="h-[280px] sm:h-[300px] w-full rounded-xl bg-black/30 border border-white/10 relative overflow-hidden flex items-center justify-center p-4">
            <svg viewBox="0 0 300 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`${current.title} reads the shared record set`}>

              {/* Layer 1: connecting edges, drawn behind the nodes */}
              <g>
                <line x1="150" y1="110" x2="60"  y2="50"  stroke={activeLens === "ld"         ? current.accentColor : "rgba(255,255,255,0.18)"} strokeWidth={activeLens === "ld"         ? 2.5 : 1} strokeDasharray={activeLens === "ld"         ? undefined : "3 3"} />
                <line x1="150" y1="110" x2="240" y2="50"  stroke={activeLens === "hr"         ? current.accentColor : "rgba(255,255,255,0.18)"} strokeWidth={activeLens === "hr"         ? 2.5 : 1} strokeDasharray={activeLens === "hr"         ? undefined : "3 3"} />
                <line x1="150" y1="110" x2="60"  y2="170" stroke={activeLens === "managers"   ? current.accentColor : "rgba(255,255,255,0.18)"} strokeWidth={activeLens === "managers"   ? 2.5 : 1} strokeDasharray={activeLens === "managers"   ? undefined : "3 3"} />
                <line x1="150" y1="110" x2="240" y2="170" stroke={activeLens === "enterprise" ? current.accentColor : "rgba(255,255,255,0.18)"} strokeWidth={activeLens === "enterprise" ? 2.5 : 1} strokeDasharray={activeLens === "enterprise" ? undefined : "3 3"} />
              </g>

              {/* Layer 2: the shared record set at the centre */}
              <circle cx="150" cy="110" r="34" fill="#0F172A" stroke={current.accentColor} strokeWidth="1.5" />
              <circle cx="150" cy="110" r="26" fill="#1E293B" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
              <text x="150" y="108" fill="#FFFFFF" fontSize="8.5" fontFamily="sans-serif" textAnchor="middle">Skillar</text>
              <text x="150" y="119" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="sans-serif" textAnchor="middle">skill records</text>

              {/* Layer 3: the four desks, drawn on top of the edges */}
              <circle cx="60"  cy="50"  r={activeLens === "ld"         ? 20 : 15} fill={activeLens === "ld"         ? "#6366F1" : "#1E293B"} stroke={activeLens === "ld"         ? "#FFFFFF" : "rgba(255,255,255,0.45)"} strokeWidth={activeLens === "ld"         ? 1.5 : 1} />
              <text   x="60"  y="54"   fill="#FFFFFF" fontSize={activeLens === "ld"         ? 8.5 : 7} fontFamily="sans-serif" textAnchor="middle">L&amp;D</text>

              <circle cx="240" cy="50"  r={activeLens === "hr"         ? 20 : 15} fill={activeLens === "hr"         ? "#38BDF8" : "#1E293B"} stroke={activeLens === "hr"         ? "#FFFFFF" : "rgba(255,255,255,0.45)"} strokeWidth={activeLens === "hr"         ? 1.5 : 1} />
              <text   x="240" y="54"   fill="#FFFFFF" fontSize={activeLens === "hr"         ? 8.5 : 7} fontFamily="sans-serif" textAnchor="middle">HR</text>

              <circle cx="60"  cy="170" r={activeLens === "managers"   ? 20 : 15} fill={activeLens === "managers"   ? "#34D399" : "#1E293B"} stroke={activeLens === "managers"   ? "#FFFFFF" : "rgba(255,255,255,0.45)"} strokeWidth={activeLens === "managers"   ? 1.5 : 1} />
              <text   x="60"  y="174"  fill="#FFFFFF" fontSize={activeLens === "managers"   ? 8   : 6.5} fontFamily="sans-serif" textAnchor="middle">Teams</text>

              <circle cx="240" cy="170" r={activeLens === "enterprise" ? 20 : 15} fill={activeLens === "enterprise" ? "#A855F7" : "#1E293B"} stroke={activeLens === "enterprise" ? "#FFFFFF" : "rgba(255,255,255,0.45)"} strokeWidth={activeLens === "enterprise" ? 1.5 : 1} />
              <text   x="240" y="174"  fill="#FFFFFF" fontSize={activeLens === "enterprise" ? 7.5 : 6} fontFamily="sans-serif" textAnchor="middle">Enterprise</text>

            </svg>
          </div>

          {/* Status strip for the selected lens */}
          <div className="flex items-baseline justify-between gap-3 py-2 border-b border-white/10">
            <span className="text-sm text-white/60">{current.statusStrip.label}</span>
            <span className={`text-sm text-right ${current.statusStrip.className}`}>
              {current.statusStrip.value}
            </span>
          </div>

          {/* Three facts this lens turns on */}
          <dl className="grid grid-cols-3 gap-4">
            {current.summary.map((t) => (
              <div key={t.label}>
                <dt className="text-xs text-white/60 leading-tight break-words">{t.label}</dt>
                <dd className="mt-1 text-sm font-medium text-white tracking-tight">{t.value}</dd>
              </div>
            ))}
          </dl>

        </div>
      </div>
    </div>
  );
}
