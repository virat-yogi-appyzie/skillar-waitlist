"use client";

import { useState } from "react";
import SampleDataBadge from "@/components/SampleDataBadge";
import { productSignals as rawSignals, productSignalFieldLabels as copy } from "@/content/fixtures/product-signal-field";

/**
 * The seven signals Skillar joins, drawn as one figure. Hovering a node (or its
 * card below) traces the line back to the skill map. Nothing animates on a
 * timer: the only motion is the visitor's own hover.
 */
export default function ProductSignalField({ className = "" }: { className?: string }) {
  const [activeSignal, setActiveSignal] = useState<string | null>(null);

  return (
    <div className={`rounded-2xl bg-[#0B1424] border border-white/10 p-6 sm:p-10 text-white ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
          {copy.title}
        </h3>
        <SampleDataBadge tone="dark" />
      </div>

      {/* Signal figure */}
      <div className="my-8 h-[340px] sm:h-[380px] w-full rounded-xl border border-white/10 overflow-hidden flex items-center justify-center p-4">
        <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Skill map hub */}
          <circle cx="200" cy="150" r="38" fill="#0B1424" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />

          <text x="200" y="146" fill="#FFFFFF" fontSize="10" fontFamily="var(--font-display)" textAnchor="middle">{copy.hubName}</text>
          <text x="200" y="159" fill="rgba(255,255,255,0.6)" fontSize="7.5" fontFamily="var(--font-interface)" textAnchor="middle">{copy.hubSub}</text>

          {rawSignals.map((sig) => {
            const isSelected = activeSignal === sig.id;
            const targetX = (sig.x / 100) * 400;
            const targetY = (sig.y / 100) * 300;

            return (
              <g key={sig.id}>
                {/* Line back to the skill map */}
                <line
                  x1="200"
                  y1="150"
                  x2={targetX}
                  y2={targetY}
                  stroke={isSelected ? sig.color : "rgba(255, 255, 255, 0.16)"}
                  strokeWidth={isSelected ? 1.6 : 0.8}
                />

                {/* Signal node */}
                <circle
                  cx={targetX}
                  cy={targetY}
                  r={isSelected ? "9" : "6"}
                  fill="#0B1424"
                  stroke={sig.color}
                  strokeWidth={isSelected ? "2" : "1.2"}
                  className="cursor-pointer"
                  style={{ transition: "r 200ms ease" }}
                  onMouseEnter={() => setActiveSignal(sig.id)}
                  onMouseLeave={() => setActiveSignal(null)}
                />
                <circle cx={targetX} cy={targetY} r="2.5" fill={sig.color} />

                <g pointerEvents="none">
                  <text
                    x={targetX}
                    y={targetY > 150 ? targetY + 22 : targetY - 16}
                    fill="rgba(255, 255, 255, 0.9)"
                    fontSize="8.5"
                    fontFamily="var(--font-interface)"
                    textAnchor="middle"
                  >
                    {sig.name}
                  </text>
                  <text
                    x={targetX}
                    y={targetY > 150 ? targetY + 32 : targetY - 6}
                    fill="rgba(255, 255, 255, 0.6)"
                    fontSize="7"
                    fontFamily="var(--font-mono)"
                    textAnchor="middle"
                  >
                    {sig.metric}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="text-sm text-white/60 mb-5">{copy.hint}</p>

      {/* Signal breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {rawSignals.map((sig) => {
          const isSelected = activeSignal === sig.id;
          return (
            <div
              key={sig.id}
              onMouseEnter={() => setActiveSignal(sig.id)}
              onMouseLeave={() => setActiveSignal(null)}
              className={`p-3 rounded-xl border transition-colors duration-200 cursor-pointer ${
                isSelected
                  ? "bg-white/[0.08] border-white/30"
                  : "bg-transparent border-white/10 hover:border-white/25"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: sig.color }} />
                <span className="text-xs text-white/60 truncate">{sig.category}</span>
              </div>
              <div className="text-sm text-white truncate">{sig.name}</div>
              <div className="text-xs font-mono tabular text-white/60 mt-0.5">{sig.metric}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
