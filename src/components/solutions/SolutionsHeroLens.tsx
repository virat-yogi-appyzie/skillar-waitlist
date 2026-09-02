"use client";

import { useState, useEffect } from "react";
import SampleDataBadge from "@/components/SampleDataBadge";
import { heroLenses, lensPanelLabels } from "@/content/fixtures/solutions-hero-lens";

export default function SolutionsHeroLens() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % heroLenses.length);
        setVisible(true);
      }, 250);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const lens = heroLenses[activeIdx];

  return (
    <div className="relative w-full max-w-sm">
      {/* Lens indicator dots */}
      <div className="flex items-center gap-1.5 mb-4">
        {heroLenses.map((l, i) => (
          <button
            key={l.id}
            onClick={() => {
              setVisible(false);
              setTimeout(() => { setActiveIdx(i); setVisible(true); }, 200);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIdx ? `w-6 ${l.dotColor}` : "w-1.5 bg-navy-200 hover:bg-navy-300"
            }`}
            aria-label={`View ${l.label}`}
          />
        ))}
        <SampleDataBadge className="ml-2" />
      </div>

      {/* Main signal card */}
      <div
        className={`rounded-2xl border border-border border-t-2 ${lens.borderColor} bg-white p-5`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 250ms ease, transform 250ms ease",
        }}
      >
        {/* Lens label */}
        <div className="flex items-baseline justify-between gap-3 mb-4 pb-3 border-b border-border/70">
          <span className={`text-sm font-semibold ${lens.textColor}`}>
            {lens.label}
          </span>
          <span className="text-sm text-navy-500">{lens.role}</span>
        </div>

        {/* Signal */}
        <div className="mb-3">
          <div className="text-sm text-navy-500 mb-1">{lensPanelLabels.signal}</div>
          <p className="text-sm font-medium text-navy-900 leading-snug">{lens.signal}</p>
        </div>

        {/* Action */}
        <div className="mb-4">
          <div className="text-sm text-navy-500 mb-1">{lensPanelLabels.action}</div>
          <p className="text-sm text-navy-600 leading-snug">{lens.action}</p>
        </div>

        {/* Bar */}
        <div className="mb-4">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-sm text-navy-500">{lensPanelLabels.mastery}</span>
            <span className="font-mono text-sm tabular" style={{ color: lens.color }}>{lens.bar}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-navy-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${lens.bar}%`, backgroundColor: lens.color }}
            />
          </div>
        </div>

        {/* Metric */}
        <div className="flex items-baseline justify-between gap-3 pt-3 border-t border-border/70">
          <span className="text-sm text-navy-500">{lens.metricLabel}</span>
          <span className="font-mono text-base tabular" style={{ color: lens.color }}>{lens.metric}</span>
        </div>
      </div>
    </div>
  );
}
