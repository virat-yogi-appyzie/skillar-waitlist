"use client";

import { useState, useEffect } from "react";
import { Activity, CheckCircle2 } from "lucide-react";

type AlignmentState = "fragmented" | "sensing" | "harmonic";

interface StateConfig {
  key: AlignmentState;
  num: string;
  label: string;
  sublabel: string;
  badge: string;
  badgeColor: string;
  alignmentScore: number;
  frictionScore: number;
}

const states: StateConfig[] = [
  {
    key: "fragmented",
    num: "01",
    label: "Rigid LMS Catalog",
    sublabel: "Static courses force human nuance into arbitrary compliance boxes",
    badge: "HIGH FRICTION · 28% FIT",
    badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    alignmentScore: 28,
    frictionScore: 84,
  },
  {
    key: "sensing",
    num: "02",
    label: "Continuous Sensing",
    sublabel: "AI maps tacit skill signals, velocity, and authentic learner context",
    badge: "CALIBRATING · 68% FIT",
    badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    alignmentScore: 68,
    frictionScore: 32,
  },
  {
    key: "harmonic",
    num: "03",
    label: "Harmonic Understanding",
    sublabel: "Learning adapts to the human in real-time, closing capability gaps",
    badge: "SYSTEMIC RESONANCE · 96% FIT",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    alignmentScore: 96,
    frictionScore: 4,
  },
];

export default function HumanSystemConvergence({
  className = "",
  autoCycle = true,
  cycleInterval = 4500,
}: {
  className?: string;
  autoCycle?: boolean;
  cycleInterval?: number;
}) {
  const [activeState, setActiveState] = useState<AlignmentState>("harmonic");
  const [isHovered, setIsHovered] = useState(false);
  const [tick, setTick] = useState(0);

  // Auto-cycle through states unless hovered
  useEffect(() => {
    if (!autoCycle || isHovered) return;
    const interval = setInterval(() => {
      setActiveState((prev) => {
        if (prev === "fragmented") return "sensing";
        if (prev === "sensing") return "harmonic";
        return "fragmented";
      });
    }, cycleInterval);
    return () => clearInterval(interval);
  }, [autoCycle, isHovered, cycleInterval]);

  // Subtle continuous wave animation
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setTick((t) => (t + 0.02) % (Math.PI * 200));
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const currentConfig = states.find((s) => s.key === activeState)!;

  // Compute organic curves based on state and tick
  const getOrganicPath = (offset: number, amplitudeMult = 1) => {
    const points: [number, number][] = [];
    const steps = 24;
    const w = 400;
    const h = 260;

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * w;
      let y = h / 2 + offset;

      if (activeState === "fragmented") {
        // Chaotic, out of phase, jagged dissonance
        y += Math.sin(i * 0.8 + tick * 1.8 + offset) * 30 * amplitudeMult;
        y += Math.cos(i * 1.4 - tick * 1.2) * 16 * amplitudeMult;
      } else if (activeState === "sensing") {
        // Converging towards center line with structured pulses
        y += Math.sin(i * 0.5 + tick * 1.2 + offset * 0.5) * 15 * amplitudeMult;
        y += Math.sin(i * 1.2 + tick * 2) * 6;
      } else {
        // Harmonic golden sine wave in phase resonance
        const envelope = Math.sin((i / steps) * Math.PI); // tapering ends
        y += Math.sin(i * 0.4 + tick * 0.8) * 18 * envelope * amplitudeMult;
      }
      points.push([x, y]);
    }

    return points.reduce((acc, [x, y], idx) => {
      if (idx === 0) return `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      return `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }, "");
  };

  // Crystalline lattice nodes on the right/system hemisphere
  const latticeNodes = [
    { id: "1", x: 260, y: 70, label: "ROLE CONTEXT", score: activeState === "harmonic" ? 94 : 52 },
    { id: "2", x: 340, y: 110, label: "VELOCITY", score: activeState === "harmonic" ? 98 : 40 },
    { id: "3", x: 290, y: 160, label: "TACIT INTEL", score: activeState === "harmonic" ? 91 : 34 },
    { id: "4", x: 360, y: 190, label: "CAPABILITY", score: activeState === "harmonic" ? 96 : 60 },
  ];

  return (
    <div
      className={`relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0B132B] via-[#0F172A] to-[#090D1A] border border-white/10 shadow-2xl p-6 sm:p-7 text-white font-sans ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient background glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Telemetry */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-wider uppercase text-white/50">
              Convergence Architecture
            </div>
            <div className="text-sm font-medium text-white/90">
              Human Potential ↔ System Intelligence
            </div>
          </div>
        </div>

        {/* Live Status Badge */}
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium border transition-colors duration-300 ${currentConfig.badgeColor}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
          {currentConfig.badge}
        </span>
      </div>

      {/* Main Interactive Stage / Visual Canvas */}
      <div className="relative z-10 my-4 h-[230px] sm:h-[250px] w-full rounded-2xl bg-navy-950/60 border border-white/[0.06] overflow-hidden flex items-center justify-center">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* SVG Living Wave & Lattice */}
        <svg
          viewBox="0 0 400 260"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="humanWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="systemWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central Resonance Axis */}
          <line
            x1="20"
            y1="130"
            x2="380"
            y2="130"
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="4 4"
            strokeWidth="1"
          />

          {/* Background Ambient Wave Layers */}
          <path
            d={getOrganicPath(-22, 0.7)}
            stroke="url(#systemWaveGrad)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray={activeState === "fragmented" ? "3 6" : "none"}
            className="transition-all duration-700"
          />
          <path
            d={getOrganicPath(22, 0.7)}
            stroke="rgba(99, 102, 241, 0.35)"
            strokeWidth="1.5"
            fill="none"
            className="transition-all duration-700"
          />

          {/* Primary Harmonic / Dissonance Wave */}
          <path
            d={getOrganicPath(0, 1.1)}
            stroke="url(#humanWaveGrad)"
            strokeWidth={activeState === "harmonic" ? "2.5" : "2"}
            filter="url(#glow)"
            fill="none"
            className="transition-all duration-700"
          />

          {/* Dynamic Intersection Particle Rings */}
          {activeState === "harmonic" && (
            <>
              <circle cx="200" cy="130" r="26" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3" className="animate-ping" style={{ transformOrigin: "200px 130px", animationDuration: "3s" }} />
              <circle cx="200" cy="130" r="12" stroke="#34D399" strokeWidth="1.5" strokeOpacity="0.6" />
              <circle cx="200" cy="130" r="3.5" fill="#FFFFFF" />
            </>
          )}

          {/* Lattice Structure & Connecting Lines */}
          <g className="transition-all duration-700">
            {latticeNodes.map((node) => (
              <g key={node.id} className="transition-transform duration-500">
                {/* Connecting lines to central axis */}
                <line
                  x1={node.x}
                  y1={node.y}
                  x2="200"
                  y2="130"
                  stroke={activeState === "harmonic" ? "rgba(56, 189, 248, 0.45)" : "rgba(255, 255, 255, 0.15)"}
                  strokeWidth={activeState === "harmonic" ? "1.5" : "1"}
                  strokeDasharray={activeState === "harmonic" ? "none" : "2 4"}
                />
                
                {/* Node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={activeState === "harmonic" ? "6" : "4.5"}
                  fill={activeState === "harmonic" ? "#38BDF8" : "#64748B"}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  filter={activeState === "harmonic" ? "url(#glow)" : undefined}
                />

                {/* Node high-contrast label badges */}
                <g>
                  <rect
                    x={node.x + 8}
                    y={node.y - 7}
                    width="84"
                    height="14"
                    rx="3"
                    fill="#091328"
                    stroke={activeState === "harmonic" ? "rgba(56, 189, 248, 0.4)" : "rgba(255, 255, 255, 0.12)"}
                    strokeWidth="1"
                  />
                  <text
                    x={node.x + 12}
                    y={node.y + 3}
                    fill="#FFFFFF"
                    fontSize="7.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    letterSpacing="0.05em"
                  >
                    {node.label} {node.score}%
                  </text>
                </g>
              </g>
            ))}
          </g>

          {/* Left / Right Semantic Markers */}
          <text x="24" y="28" fill="rgba(255,255,255,0.7)" fontSize="8.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.08em">
            [HUMAN COGNITIVE SIGNAL]
          </text>
          <text x="250" y="28" fill="rgba(255,255,255,0.7)" fontSize="8.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.08em">
            [ORGANIZATIONAL LATTICE]
          </text>
        </svg>

        {/* Live Overlay Metric Pills inside canvas */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="bg-navy-950/90 backdrop-blur-md px-3 py-1 rounded-md border border-white/15 text-[10px] font-mono text-white flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Alignment: <strong className="text-cyan-300 font-bold">{currentConfig.alignmentScore}%</strong></span>
          </div>
          <div className="bg-navy-950/90 backdrop-blur-md px-3 py-1 rounded-md border border-white/15 text-[10px] font-mono text-white flex items-center gap-1.5 shadow-sm">
            <span>Friction: <strong className="text-rose-300 font-bold">{currentConfig.frictionScore}%</strong></span>
          </div>
        </div>
      </div>

      {/* Dynamic Narrative Summary */}
      <div className="relative z-10 my-2.5">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          <span>{currentConfig.label}</span>
          <span className="text-white/40">·</span>
          <span className="text-xs font-semibold text-cyan-300 font-mono">Stage {currentConfig.num}</span>
        </h4>
        <p className="text-xs text-white/80 leading-relaxed mt-1 font-light">
          {currentConfig.sublabel}
        </p>
      </div>

      {/* Interactive Phase Controller Tabs */}
      <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
        {states.map((s) => {
          const isActive = s.key === activeState;
          return (
            <button
              key={s.key}
              onClick={() => setActiveState(s.key)}
              type="button"
              className={`py-2 px-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col gap-0.5 border ${
                isActive
                  ? "bg-white/20 border-white/35 shadow-sm text-white"
                  : "bg-white/[0.04] border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-[10px] text-white/60 font-semibold">{s.num}</span>
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
              </div>
              <span className="text-[11px] font-semibold leading-tight truncate">
                {s.key === "fragmented" ? "01. Disconnected" : s.key === "sensing" ? "02. Sensing" : "03. Harmonic"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
