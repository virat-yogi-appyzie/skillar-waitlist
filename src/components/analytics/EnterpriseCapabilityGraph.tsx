"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SampleDataBadge from "@/components/SampleDataBadge";
import {
  capabilityTracks as tracks,
  capabilityGraphLabels as copy,
} from "@/content/fixtures/enterprise-capability-graph";

export default function EnterpriseCapabilityGraph() {
  const [selectedTrackId, setSelectedTrackId] = useState<string>(tracks[0].id);
  const [hoveredQuarterIndex, setHoveredQuarterIndex] = useState<number | null>(null);
  const [showBenchmark, setShowBenchmark] = useState<boolean>(true);

  const selectedTrack = tracks.find((t) => t.id === selectedTrackId) || tracks[0];

  // SVG coordinate transformation
  const width = 600;
  const height = 280;
  const padding = { top: 30, right: 30, bottom: 40, left: 45 };

  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const getY = (val: number) => padding.top + graphHeight - ((val - 30) / 70) * graphHeight;
  const getX = (idx: number) => padding.left + (idx / (selectedTrack.points.length - 1)) * graphWidth;

  // Build bezier curve path for primary series
  const generateBezier = (pointsArray: { value: number }[]) => {
    return pointsArray.reduce((acc, curr, i, arr) => {
      if (i === 0) return `M ${getX(i)} ${getY(curr.value)}`;
      const prev = arr[i - 1];
      const prevX = getX(i - 1);
      const prevY = getY(prev.value);
      const currX = getX(i);
      const currY = getY(curr.value);
      const cpx1 = prevX + (currX - prevX) * 0.45;
      const cpy1 = prevY;
      const cpx2 = prevX + (currX - prevX) * 0.55;
      const cpy2 = currY;
      return `${acc} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${currX} ${currY}`;
    }, "");
  };

  const linePath = generateBezier(selectedTrack.points);
  const areaPath = `${linePath} L ${getX(selectedTrack.points.length - 1)} ${padding.top + graphHeight} L ${getX(0)} ${padding.top + graphHeight} Z`;

  // Baseline traditional curve
  const baselinePoints = selectedTrack.points.map((p) => ({ value: p.baseline }));
  const baselinePath = generateBezier(baselinePoints);

  const activeQuarter = hoveredQuarterIndex !== null ? selectedTrack.points[hoveredQuarterIndex] : selectedTrack.points[selectedTrack.points.length - 2]; // default Q4
  const activeQuarterIdx = hoveredQuarterIndex !== null ? hoveredQuarterIndex : selectedTrack.points.length - 2;

  return (
    <div className="rounded-2xl bg-surface-elevated border border-border overflow-hidden">
      {/* Top controls */}
      <div className="p-6 sm:p-8 border-b border-border/80 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-navy tracking-[-0.025em]">
            {copy.title}
          </h3>
          <p className="text-navy-500 text-sm mt-2 max-w-md leading-relaxed">
            {copy.lede}
          </p>
          <div className="mt-2">
            <SampleDataBadge />
          </div>
        </div>

        {/* Track selector */}
        <div className="flex flex-wrap items-center gap-2">
          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => {
                setSelectedTrackId(track.id);
                setHoveredQuarterIndex(null);
              }}
              aria-pressed={selectedTrackId === track.id}
              className={`px-3.5 py-2 rounded-full text-sm transition-colors cursor-pointer flex items-center gap-2 border ${
                selectedTrackId === track.id
                  ? "bg-navy text-white border-navy"
                  : "bg-surface text-navy-500 hover:text-navy border-border"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: track.color }} />
              <span>{track.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph Stage */}
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* SVG Graph Canvas */}
          <div className="lg:col-span-8 relative">
            {/* Quick Toggle Overlays */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-sm text-navy">
                  <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: selectedTrack.color }} />
                  {copy.seriesPrimary}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-navy-500">
                  <span className="w-3 h-0.5 rounded-full bg-navy-300" />
                  {copy.seriesBaseline}
                </span>
              </div>

              <button
                onClick={() => setShowBenchmark(!showBenchmark)}
                aria-pressed={showBenchmark}
                className={`text-sm px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                  showBenchmark
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-surface text-navy-500 border-border"
                }`}
              >
                {copy.thresholdToggle}
              </button>
            </div>

            {/* The chart */}
            <div className="w-full bg-surface rounded-xl border border-border/70 p-2 sm:p-4 relative">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                <defs>
                  <linearGradient id={`grad-${selectedTrack.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={selectedTrack.color} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={selectedTrack.color} stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y-Axis Grid Lines & Labels */}
                {[30, 50, 70, 85, 100].map((val) => {
                  const yPos = getY(val);
                  return (
                    <g key={val}>
                      <line
                        x1={padding.left}
                        y1={yPos}
                        x2={width - padding.right}
                        y2={yPos}
                        stroke={val === 85 && showBenchmark ? "rgba(245, 158, 11, 0.5)" : "rgba(15, 23, 41, 0.08)"}
                        strokeWidth={val === 85 && showBenchmark ? 1.5 : 1}
                        strokeDasharray={val === 85 && showBenchmark ? "4 4" : "none"}
                      />
                      <text
                        x={padding.left - 10}
                        y={yPos + 4}
                        fill={val === 85 && showBenchmark ? "#B45309" : "#475569"}
                        fontSize="10.5"
                        fontFamily="var(--font-mono)"
                        fontWeight={val === 85 && showBenchmark ? "600" : "400"}
                        textAnchor="end"
                      >
                        {val}%
                      </text>
                    </g>
                  );
                })}

                {/* Benchmark Label */}
                {showBenchmark && (
                  <text
                    x={width - padding.right}
                    y={getY(85) - 6}
                    fill="#B45309"
                    fontSize="9.5"
                    fontFamily="var(--font-mono)"
                    textAnchor="end"
                  >
                    {copy.thresholdCaption}
                  </text>
                )}

                {/* Traditional Baseline Path */}
                <path
                  d={baselinePath}
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="1.75"
                  strokeDasharray="4 4"
                  className="transition-all duration-500"
                />

                {/* Area Fill */}
                <path
                  d={areaPath}
                  fill={`url(#grad-${selectedTrack.id})`}
                  className="transition-all duration-500"
                />

                {/* Skillar Primary Curve */}
                <path
                  d={linePath}
                  fill="none"
                  stroke={selectedTrack.stroke}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />

                {/* Interactive Points on Skillar Curve */}
                {selectedTrack.points.map((p, idx) => {
                  const cx = getX(idx);
                  const cy = getY(p.value);
                  const isHovered = activeQuarterIdx === idx;

                  return (
                    <g key={p.q} className="cursor-pointer" onMouseEnter={() => setHoveredQuarterIndex(idx)}>
                      {/* Vertical highlight line on active hover */}
                      {isHovered && (
                        <line
                          x1={cx}
                          y1={padding.top}
                          x2={cx}
                          y2={padding.top + graphHeight}
                          stroke={selectedTrack.color}
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                      )}

                      {/* Point marker */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHovered ? "7" : "5"}
                        fill="#FFFFFF"
                        stroke={selectedTrack.stroke}
                        strokeWidth={isHovered ? "3" : "2"}
                        className="transition-all duration-200"
                      />

                      {/* X-Axis Labels */}
                      <text
                        x={cx}
                        y={height - 12}
                        fill={isHovered ? "#0F172A" : "#475569"}
                        fontSize="11"
                        fontFamily="var(--font-mono)"
                        fontWeight={isHovered ? "600" : "400"}
                        textAnchor="middle"
                      >
                        {p.q}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Snapshot for the active quarter */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-xl bg-surface border border-border space-y-5">
              <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-border">
                <span className="text-sm font-semibold text-navy">
                  {activeQuarter.q} {copy.snapshotSuffix}
                </span>
                <span className="text-xs text-navy-500 shrink-0">
                  {selectedTrack.category}
                </span>
              </div>

              <div>
                <div className="text-sm text-navy-500">{copy.scoreLabel}</div>
                <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                  <span className="font-mono text-4xl tabular text-navy">
                    {activeQuarter.value}%
                  </span>
                  <span className="text-sm text-emerald-700 flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    {activeQuarter.value - activeQuarter.baseline} points {copy.vsBaseline}
                  </span>
                </div>
              </div>

              <dl className="pt-2 border-t border-border text-sm">
                <div className="flex justify-between gap-3 py-1.5">
                  <dt className="text-navy-500">{copy.rowCadence}</dt>
                  <dd className="text-navy shrink-0">{selectedTrack.cadence}</dd>
                </div>
                <div className="flex justify-between gap-3 py-1.5">
                  <dt className="text-navy-500">{copy.rowAssessed}</dt>
                  <dd className="font-mono tabular text-emerald-700 shrink-0">{selectedTrack.assessed}%</dd>
                </div>
                <div className="flex justify-between gap-3 py-1.5">
                  <dt className="text-navy-500">{copy.rowGain}</dt>
                  <dd className="font-mono tabular text-navy shrink-0">{selectedTrack.improvement}</dd>
                </div>
              </dl>

              <p className="pt-3 border-t border-border text-sm text-navy-500 leading-relaxed">
                <span className="font-semibold">{copy.statusPrefix}</span> {selectedTrack.status}. {copy.statusNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
