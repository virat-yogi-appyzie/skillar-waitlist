"use client";

import { useState } from "react";
import { CheckCircle2, RefreshCw } from "lucide-react";
import SampleDataBadge from "@/components/SampleDataBadge";
import { adaptivePathProfiles, adaptivePathLabels } from "@/content/fixtures/adaptive-path";

interface AdaptivePathProps {
  variant?: "sarah" | "james";
  className?: string;
}

/**
 * One person's roadmap, and what the roadmap does when a concept comes back
 * below mastery. The branch is drawn only after the visitor asks for it.
 */
export default function AdaptivePath({
  variant = "sarah",
  className = "",
}: AdaptivePathProps) {
  const profile = adaptivePathProfiles[variant];
  const [hasBranch, setHasBranch] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);

  const toggleBranch = () => {
    setIsBuilding(true);
    setTimeout(() => {
      setIsBuilding(false);
      setHasBranch(!hasBranch);
    }, 400);
  };

  return (
    <div className={`p-6 sm:p-8 bg-[#0B1424] text-white border border-white/10 rounded-2xl flex flex-col justify-between ${className}`}>

      <div>
        {/* Learner and current standing */}
        <div className="flex items-start justify-between gap-3 flex-wrap pb-4 mb-5 border-b border-white/10">
          <div>
            <span className="text-sm font-medium text-white block">
              {profile.name}
            </span>
            <span className="text-sm text-white/60">
              {profile.role} · {profile.focus}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-rose-300 border border-rose-300/40 rounded-full px-2.5 py-0.5 shrink-0">
              {adaptivePathLabels.belowMastery} {profile.originElevation}
            </span>
            <SampleDataBadge tone="dark" />
          </div>
        </div>

        {/* Assessed score across the roadmap's checkpoints */}
        <div className="relative w-full h-[150px] my-3 select-none">
          <svg viewBox="0 0 440 140" className="w-full h-full" fill="none">
            <line x1="20" y1="30" x2="420" y2="30" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1="20" y1="70" x2="420" y2="70" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1="20" y1="110" x2="420" y2="110" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {/* The roadmap as originally scheduled */}
            <path
              d="M 40 100 L 160 80 L 380 30"
              stroke={hasBranch ? "rgba(255,255,255,0.2)" : "#38BDF8"}
              strokeWidth={hasBranch ? "1" : "2"}
              strokeDasharray={hasBranch ? "4 4" : "none"}
            />

            {/* The revision branch, once it has been generated */}
            {hasBranch && (
              <path
                d="M 160 80 C 210 120, 270 120, 310 70 L 380 30"
                stroke="#F43F5E"
                strokeWidth="2"
              />
            )}

            {/* First concept, passed */}
            <circle cx="40" cy="100" r="4" fill="#34D399" />
            <text x="40" y="122" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="var(--font-mono)">
              {profile.waypoints[0].elev}
            </text>

            {/* The concept that came back below mastery */}
            <circle cx="160" cy="80" r="4.5" fill={hasBranch ? "#FB7185" : "#38BDF8"} />
            <text x="160" y="66" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9" fontFamily="var(--font-mono)">
              {profile.waypoints[1].elev}
            </text>

            {/* Revision branch marker */}
            {hasBranch && (
              <>
                <circle cx="270" cy="108" r="5" fill="#F43F5E" />
                <text x="270" y="128" textAnchor="middle" fill="#FB7185" fontSize="9" fontFamily="var(--font-interface)">
                  {adaptivePathLabels.chartRevision}
                </text>
              </>
            )}

            {/* Re-assessment target */}
            <circle cx="380" cy="30" r="5" fill="#818CF8" />
            <text x="380" y="18" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9" fontFamily="var(--font-mono)">
              {profile.targetElevation}
            </text>
          </svg>
        </div>

        {/* Concepts */}
        <ul className="space-y-2.5 mb-4">
          <li className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-2.5 min-w-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-white/60 truncate">{profile.waypoints[0].name}</span>
            </span>
            <span className="text-xs text-white/60 shrink-0">{adaptivePathLabels.waypointCleared}</span>
          </li>

          <li className="flex items-center justify-between gap-4 text-sm">
            <span className="text-white truncate">{profile.waypoints[1].name}</span>
            <span
              className={`text-xs border rounded-full px-2.5 py-0.5 shrink-0 ${
                hasBranch ? "text-rose-300 border-rose-300/40" : "text-sky-300 border-sky-300/40"
              }`}
            >
              {hasBranch ? adaptivePathLabels.conceptBelow : adaptivePathLabels.conceptInProgress}
            </span>
          </li>
        </ul>

        {/* The revision roadmap Skillar generates */}
        {hasBranch && (
          <div className="p-4 rounded-xl border border-white/15 space-y-1">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white/60">
                {adaptivePathLabels.branchHeading}
              </span>
              <span className="text-xs text-white/60 shrink-0">{adaptivePathLabels.branchBadge}</span>
            </div>
            <span className="text-sm text-white block">{profile.waypoints[2].name}</span>
            <p className="text-sm text-white/70 leading-snug">
              {adaptivePathLabels.branchNoteLead} {profile.source} {adaptivePathLabels.branchNoteTail}
            </p>
          </div>
        )}
      </div>

      {/* Branch demonstration trigger */}
      <div className="pt-4 mt-4 border-t border-white/10">
        <button
          onClick={toggleBranch}
          disabled={isBuilding}
          aria-pressed={hasBranch}
          className={`w-full py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
            hasBranch
              ? "bg-white/[0.06] hover:bg-white/[0.1] text-white/80 border border-white/10"
              : "bg-accent hover:bg-accent-hover text-white"
          }`}
        >
          {isBuilding ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>{adaptivePathLabels.buttonBusy}</span>
            </>
          ) : hasBranch ? (
            <span>{adaptivePathLabels.buttonApplied}</span>
          ) : (
            <span>{adaptivePathLabels.buttonIdle}</span>
          )}
        </button>
      </div>

    </div>
  );
}
