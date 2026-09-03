"use client";

import { useState } from "react";

interface TopographicTerrainProps {
  className?: string;
}

// 3 Core Capability Landmarks with exact percentage coordinates
const landmarks = [
  {
    id: "technical",
    label: "Technical Architecture",
    metric: "87%",
    status: "Strong Readiness",
    left: "20%",
    top: "32%",
    color: "#2563EB",
    dotBg: "bg-blue-500",
    badgeBorder: "border-blue-200/80 shadow-blue-500/10",
    badgeBg: "bg-white/95 backdrop-blur-md",
    textColor: "text-blue-700",
    badgeType: "optimal",
  },
  {
    id: "gap",
    label: "Critical Competency Valley",
    metric: "42%",
    status: "31pt Deficit Gap",
    left: "50%",
    top: "68%",
    color: "#EF4444",
    dotBg: "bg-rose-500",
    badgeBorder: "border-rose-200/90 shadow-rose-500/15",
    badgeBg: "bg-white/95 backdrop-blur-md",
    textColor: "text-rose-700",
    badgeType: "urgent",
  },
  {
    id: "ai",
    label: "AI & Intelligence Frontier",
    metric: "61%",
    status: "Active Acceleration",
    left: "78%",
    top: "16%",
    color: "#7C3AED",
    dotBg: "bg-violet-500",
    badgeBorder: "border-violet-200/80 shadow-violet-500/10",
    badgeBg: "bg-white/95 backdrop-blur-md",
    textColor: "text-violet-700",
    badgeType: "strategic",
  },
];

export default function TopographicTerrain({ className = "" }: TopographicTerrainProps) {
  const [hoveredLandmark, setHoveredLandmark] = useState<string | null>(null);

  return (
    <div className={`relative w-full h-[220px] sm:h-[240px] rounded-2xl bg-gradient-to-b from-surface/40 via-surface/80 to-surface border border-border/70 overflow-hidden select-none ${className}`}>
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-72 h-40 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-40 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-48 h-32 bg-rose-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* SVG Undulating Contours & Terrain Strata */}
      <svg
        viewBox="0 0 1000 240"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="terrain-grad-base" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#3B82F6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="terrain-grad-mid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#6366F1" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="terrain-grad-peak" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="terrain-grad-gap" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.16" />
            <stop offset="50%" stopColor="#EF4444" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Contour Grid Ticks */}
        <g opacity="0.4">
          <line x1="200" y1="20" x2="200" y2="220" stroke="#3B82F6" strokeWidth="0.8" strokeDasharray="3 4" />
          <line x1="500" y1="40" x2="500" y2="220" stroke="#EF4444" strokeWidth="0.8" strokeDasharray="3 4" />
          <line x1="780" y1="10" x2="780" y2="220" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="3 4" />
        </g>

        {/* 1. Base Layer (Foundation) */}
        <g className="animate-terrain-wave-1">
          <path
            d="M0,170 C160,170 240,135 360,120 C480,105 560,145 640,132 C720,120 840,95 1000,85 L1000,240 L0,240 Z"
            fill="url(#terrain-grad-base)"
          />
          <path
            d="M0,170 C160,170 240,135 360,120 C480,105 560,145 640,132 C720,120 840,95 1000,85"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
        </g>

        {/* 2. Mid Layer (Technical Skills) */}
        <g className="animate-terrain-wave-2">
          <path
            d="M0,145 C120,140 200,110 320,102 C440,94 520,132 620,115 C720,98 800,72 1000,68 L1000,240 L0,240 Z"
            fill="url(#terrain-grad-mid)"
          />
          <path
            d="M0,145 C120,140 200,110 320,102 C440,94 520,132 620,115 C720,98 800,72 1000,68"
            fill="none"
            stroke="#6366F1"
            strokeWidth="1.4"
            strokeOpacity="0.5"
          />
        </g>

        {/* 3. Peak Layer (AI & Frontier) */}
        <g className="animate-terrain-wave-3">
          <path
            d="M0,120 C100,115 180,85 280,90 C380,95 460,125 560,105 C660,85 760,52 1000,48 L1000,240 L0,240 Z"
            fill="url(#terrain-grad-peak)"
          />
          <path
            d="M0,120 C100,115 180,85 280,90 C380,95 460,125 560,105 C660,85 760,52 1000,48"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="1.6"
            strokeOpacity="0.6"
          />
        </g>

        {/* 4. The Gap Valley Layer */}
        <g className="animate-terrain-gap">
          <path
            d="M320,102 C360,102 400,158 500,172 C600,186 640,155 680,125 L680,240 L320,240 Z"
            fill="url(#terrain-grad-gap)"
          />
          <path
            d="M320,102 C360,102 400,158 500,172 C600,186 640,155 680,125"
            fill="none"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            strokeOpacity="0.75"
          />
        </g>
      </svg>

      {/* Floating High-Clarity HTML Glass Pill Badges */}
      {landmarks.map((mark) => {
        const isHovered = hoveredLandmark === mark.id;

        return (
          <div
            key={mark.id}
            style={{ left: mark.left, top: mark.top }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            onMouseEnter={() => setHoveredLandmark(mark.id)}
            onMouseLeave={() => setHoveredLandmark(null)}
          >
            {/* Pulsing Beacon Ring */}
            <div className="relative flex items-center justify-center">
              <span
                className={`absolute w-7 h-7 rounded-full opacity-30 animate-ping`}
                style={{ backgroundColor: mark.color }}
              />
              <span
                className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-125 ${mark.dotBg}`}
              />
            </div>

            {/* Crisp, Legible Glass Info Badge */}
            <div
              className={`mt-2 -translate-x-1/2 left-1/2 absolute whitespace-nowrap px-3.5 py-1.5 rounded-xl border shadow-lg transition-all duration-300 ${mark.badgeBg} ${mark.badgeBorder} ${
                isHovered ? "scale-105 shadow-xl" : "scale-100 opacity-95"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold ${mark.textColor}`}>
                  {mark.metric}
                </span>
                <span className="w-1 h-1 rounded-full bg-navy-200" />
                <span className="text-[11px] font-semibold text-navy tracking-tight">
                  {mark.label}
                </span>
              </div>
              <div className="text-[9.5px] font-mono text-navy-400 tracking-wide mt-0.5">
                {mark.status}
              </div>
            </div>
          </div>
        );
      })}

      {/* Subtle Bottom Axis Telemetry Bar */}
      <div className="absolute bottom-2 inset-x-0 px-6 flex items-center justify-between text-[9px] font-mono text-navy-400 uppercase tracking-wider pointer-events-none">
        <span>STRATUM 01: FOUNDATION</span>
        <span className="hidden sm:inline">ORGANIZATIONAL CAPABILITY ELEVATION</span>
        <span>STRATUM 03: AI FRONTIER</span>
      </div>

      {/* Fluid Undulating Wave Animations */}
      <style jsx>{`
        @keyframes terrainWave1 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        @keyframes terrainWave2 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(5px);
          }
        }
        @keyframes terrainWave3 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes terrainGap {
          0%, 100% {
            transform: scaleY(1);
            opacity: 0.85;
          }
          50% {
            transform: scaleY(1.05);
            opacity: 1;
          }
        }
        .animate-terrain-wave-1 {
          animation: terrainWave1 8s ease-in-out infinite;
        }
        .animate-terrain-wave-2 {
          animation: terrainWave2 6.5s ease-in-out infinite;
        }
        .animate-terrain-wave-3 {
          animation: terrainWave3 9s ease-in-out infinite;
        }
        .animate-terrain-gap {
          animation: terrainGap 4s ease-in-out infinite;
          transform-origin: bottom center;
        }
      `}</style>
    </div>
  );
}
