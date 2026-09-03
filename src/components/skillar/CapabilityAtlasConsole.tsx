"use client";

import { useState, useId } from "react";
import { ArrowRight, RotateCcw, Target, BookOpen, ShieldCheck, GraduationCap } from "lucide-react";
import SampleDataBadge from "@/components/SampleDataBadge";
import {
  atlasSkills,
  atlasSignals,
  atlasLabels as copy,
  scopeProfiles,
  skillCategories,
  type ScopeLevel,
  type SkillNode,
} from "@/content/fixtures/capability-atlas-console";

const DEFAULT_SKILL_ID = atlasSkills[0].id;

const signalIcons: Record<string, React.ReactNode> = {
  assessment: <Target className="w-3.5 h-3.5 text-sky-400" />,
  roadmap: <BookOpen className="w-3.5 h-3.5 text-amber-400" />,
  certification: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
  hrms: <GraduationCap className="w-3.5 h-3.5 text-violet-400" />,
};

export default function CapabilityAtlasConsole({ className = "" }: { className?: string }) {
  const [scope, setScope] = useState<ScopeLevel>("enterprise");
  const [selectedSkillId, setSelectedSkillId] = useState<string>(DEFAULT_SKILL_ID);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"map" | "signals" | "diagnostic">("map");
  const [isProjecting, setIsProjecting] = useState(false);
  const [projectionApplied, setProjectionApplied] = useState(false);

  const gradientId = useId();
  const filterId = useId();

  const selectedSkill = atlasSkills.find((s) => s.id === selectedSkillId) || atlasSkills[0];
  const activeHoverSkill = atlasSkills.find((s) => s.id === hoveredSkillId);
  const currentSkill = activeHoverSkill || selectedSkill;

  const handleCategorySelect = (cat: string) => {
    setCategoryFilter(cat);
    setProjectionApplied(false);
    if (cat === "All") {
      setSelectedSkillId(DEFAULT_SKILL_ID);
    } else {
      const matching = atlasSkills.find((s) => s.category === cat);
      if (matching) setSelectedSkillId(matching.id);
    }
  };

  const handleProject = () => {
    setIsProjecting(true);
    setTimeout(() => {
      setIsProjecting(false);
      setProjectionApplied(true);
    }, 1200);
  };

  const handleResetProjection = () => {
    setProjectionApplied(false);
  };

  // Connected nodes
  const connectedNodeIds = new Set<string>();
  if (currentSkill) {
    connectedNodeIds.add(currentSkill.id);
    currentSkill.connectedTo.forEach((id) => connectedNodeIds.add(id));
    atlasSkills.forEach((s) => {
      if (s.connectedTo.includes(currentSkill.id)) connectedNodeIds.add(s.id);
    });
  }

  const getEffectiveScore = (skill: SkillNode) =>
    projectionApplied && skill.id === currentSkill.id ? skill.projectedScore : skill.currentScore;

  const getEffectiveStatus = (skill: SkillNode): SkillNode["status"] =>
    projectionApplied && skill.id === currentSkill.id ? "mastered" : skill.status;

  const statusColors: Record<SkillNode["status"], { stroke: string; text: string; chip: string }> = {
    gap: { stroke: "#F43F5E", text: "text-rose-300", chip: "text-rose-300 border-rose-300/40" },
    developing: { stroke: "#38BDF8", text: "text-sky-300", chip: "text-sky-300 border-sky-300/40" },
    mastered: { stroke: "#10B981", text: "text-emerald-300", chip: "text-emerald-300 border-emerald-300/40" },
  };

  const getStatusColor = (status: SkillNode["status"]) => statusColors[status];

  const profile = scopeProfiles[scope];

  return (
    <div className={`w-full rounded-2xl bg-[#0B1424] border border-white/10 overflow-hidden text-white ${className}`}>

      {/* Scope selector */}
      <div className="border-b border-white/10 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          {(["enterprise", "department", "team", "individual"] as ScopeLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => { setScope(level); setProjectionApplied(false); }}
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors duration-200 cursor-pointer ${
                scope === level
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {copy.scopeLabels[level]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm text-white/60">
          <span className="hidden md:inline">{profile.title}</span>
          <span className="font-mono tabular text-white/70">{profile.count}</span>
          <span className="font-mono tabular text-emerald-300">{profile.coverage} {copy.coverageSuffix}</span>
          <SampleDataBadge tone="dark" />
        </div>
      </div>

      {/* Mobile tab switcher */}
      <div className="lg:hidden flex border-b border-white/10">
        {[
          { key: "map" as const, label: copy.tabs.map },
          { key: "signals" as const, label: copy.tabs.signals },
          { key: "diagnostic" as const, label: copy.tabs.roadmap },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 text-sm text-center border-b-2 transition-colors ${
              activeTab === tab.key ? "border-white/60 text-white font-medium" : "border-transparent text-white/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Three panes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">

        {/* Left: signal feed and skill-area filter */}
        <div className={`lg:col-span-3 border-r border-white/10 p-5 flex flex-col ${activeTab !== "signals" ? "hidden lg:flex" : "flex"}`}>

          <div className="mb-6">
            <span className="text-sm font-semibold text-white/60 block mb-3">
              {copy.signalsHeading}
            </span>
            <ul className="space-y-3">
              {atlasSignals.map((signal, i) => (
                <li key={i} className="pb-3 border-b border-white/10 last:border-b-0">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <span className="flex items-center gap-1.5 text-sm text-white/70">
                      {signalIcons[signal.icon]}
                      {signal.label}
                    </span>
                    <span className="text-xs font-mono tabular text-white/60 shrink-0">{signal.time}</span>
                  </div>
                  <p className="text-sm text-white/70 leading-snug">{signal.detail}</p>
                  <span className="text-xs font-mono tabular text-white/60 mt-1 block">{signal.count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skill-area filter */}
          <div className="pt-4 border-t border-white/10">
            <span className="text-sm font-semibold text-white/60 block mb-2.5">
              {copy.domainHeading}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {skillCategories.map((cat) => {
                const count = cat === "All" ? atlasSkills.length : atlasSkills.filter((s) => s.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    aria-pressed={categoryFilter === cat}
                    className={`px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer flex items-center gap-1.5 border ${
                      categoryFilter === cat
                        ? "bg-white/10 text-white border-white/25"
                        : "text-white/60 hover:text-white border-white/10"
                    }`}
                  >
                    {cat}
                    <span className="font-mono tabular text-white/50">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <dl className="mt-auto pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
            <div>
              <dd className="block font-mono text-2xl tabular text-rose-300">
                {projectionApplied ? 0 : profile.criticalGaps}
              </dd>
              <dt className="text-xs text-white/60 mt-0.5">{copy.criticalGaps}</dt>
            </div>
            <div>
              <dd className="block font-mono text-2xl tabular text-white/85">
                {profile.activeRoadmaps}
              </dd>
              <dt className="text-xs text-white/60 mt-0.5">{copy.activeRoadmaps}</dt>
            </div>
          </dl>
        </div>

        {/* Centre: the skill map */}
        <div className={`lg:col-span-6 relative p-4 sm:p-6 flex-col items-center justify-center overflow-hidden min-h-[460px] ${activeTab !== "map" ? "hidden lg:flex" : "flex"}`}>

          {/* Legend */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-4 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> {copy.legend.gap}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> {copy.legend.developing}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {copy.legend.mastered}
            </span>
          </div>

          <div className="relative w-full aspect-square max-w-[500px] my-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full select-none">
              <defs>
                <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1E3A5F" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0B1424" stopOpacity="0" />
                </radialGradient>
                <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <ellipse cx="50" cy="50" rx="44" ry="44" fill={`url(#${gradientId})`} />

              {/* Shared-role connections */}
              {atlasSkills.map((source) =>
                source.connectedTo.map((targetId) => {
                  const target = atlasSkills.find((s) => s.id === targetId);
                  if (!target) return null;

                  const isSourceMatch = categoryFilter === "All" || source.category === categoryFilter;
                  const isTargetMatch = categoryFilter === "All" || target.category === categoryFilter;

                  const isActive =
                    (currentSkill.id === source.id && connectedNodeIds.has(target.id)) ||
                    (currentSkill.id === target.id && connectedNodeIds.has(source.id));

                  const bothMatch = isSourceMatch && isTargetMatch;
                  const neitherMatch = !isSourceMatch && !isTargetMatch;

                  return (
                    <line
                      key={`${source.id}-${target.id}`}
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={isActive ? "rgba(255,255,255,0.35)" : bothMatch ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)"}
                      strokeWidth={isActive ? 0.6 : 0.3}
                      opacity={neitherMatch ? 0.3 : 1}
                      style={{ transition: "all 350ms ease" }}
                    />
                  );
                })
              )}

              {/* Skill nodes */}
              {atlasSkills.map((skill) => {
                const matchesFilter = categoryFilter === "All" || skill.category === categoryFilter;
                const isSelected = selectedSkillId === skill.id;
                const isHovered = hoveredSkillId === skill.id;
                const isConnected = connectedNodeIds.has(skill.id);

                const effectiveScore = getEffectiveScore(skill);
                const effectiveStatus = getEffectiveStatus(skill);
                const colors = getStatusColor(effectiveStatus);

                const isDimmed = !matchesFilter || (!isConnected && !isSelected && (hoveredSkillId !== null));
                const nodeRadius = isSelected || isHovered ? 4.2 : matchesFilter ? 3.2 : 2.4;
                const circumference = 2 * Math.PI * (nodeRadius + 1.5);

                return (
                  <g
                    key={skill.id}
                    className="cursor-pointer"
                    opacity={isDimmed ? 0.25 : 1}
                    style={{ transition: "opacity 300ms ease" }}
                    onMouseEnter={() => setHoveredSkillId(skill.id)}
                    onMouseLeave={() => setHoveredSkillId(null)}
                    onClick={() => { setSelectedSkillId(skill.id); setProjectionApplied(false); }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${skill.name}, ${effectiveScore}%, ${copy.status[effectiveStatus]}`}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { setSelectedSkillId(skill.id); setProjectionApplied(false); } }}
                  >
                    {/* Focus glow on the selected or hovered node */}
                    {(isSelected || isHovered) && (
                      <circle cx={skill.x} cy={skill.y} r={nodeRadius * 2.8} fill={colors.stroke} opacity="0.08" filter={`url(#${filterId})`} />
                    )}

                    {/* Assessed-score ring */}
                    <circle cx={skill.x} cy={skill.y} r={nodeRadius + 1.5} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                    <circle
                      cx={skill.x}
                      cy={skill.y}
                      r={nodeRadius + 1.5}
                      fill="none"
                      stroke={colors.stroke}
                      strokeWidth={isSelected ? 0.8 : 0.5}
                      strokeDasharray={`${(effectiveScore / 100) * circumference} ${circumference}`}
                      strokeLinecap="round"
                      transform={`rotate(-90 ${skill.x} ${skill.y})`}
                      style={{ transition: "stroke-dasharray 700ms ease" }}
                    />

                    <circle
                      cx={skill.x}
                      cy={skill.y}
                      r={nodeRadius}
                      fill="#0B1424"
                      stroke={colors.stroke}
                      strokeWidth={isSelected ? 1 : 0.6}
                      style={{ transition: "stroke-width 200ms ease" }}
                    />

                    <circle
                      cx={skill.x}
                      cy={skill.y}
                      r={nodeRadius * 0.5}
                      fill={colors.stroke}
                      opacity={matchesFilter ? 0.9 : 0.3}
                    />

                    <text
                      x={skill.x}
                      y={skill.y + nodeRadius + 3.8}
                      textAnchor="middle"
                      fill={matchesFilter ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"}
                      fontSize="2.4"
                      fontWeight={isSelected || isHovered ? "600" : "400"}
                      fontFamily="var(--font-interface)"
                      style={{ transition: "fill 300ms ease" }}
                    >
                      {skill.name}
                    </text>

                    {(isSelected || isHovered || (matchesFilter && categoryFilter !== "All")) && (
                      <text
                        x={skill.x}
                        y={skill.y - nodeRadius - 2.2}
                        textAnchor="middle"
                        fill={colors.stroke}
                        fontSize="2.2"
                        fontFamily="var(--font-mono)"
                      >
                        {effectiveScore}%
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="w-full pt-3 flex items-center justify-between gap-4 text-xs text-white/60">
            <span>{copy.mapCaption}</span>
            <span className="hidden sm:inline">{copy.mapHint}</span>
          </div>
        </div>

        {/* Right: assessment result and revision roadmap */}
        <div className={`lg:col-span-3 border-l border-white/10 p-5 flex-col ${activeTab !== "diagnostic" ? "hidden lg:flex" : "flex"}`}>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-sm font-semibold text-white/60">
                {copy.diagnosticHeading}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs border shrink-0 ${getStatusColor(getEffectiveStatus(currentSkill)).chip}`}>
                {copy.status[getEffectiveStatus(currentSkill)]}
              </span>
            </div>

            <div className="mb-5">
              <h4 className="font-serif text-lg font-normal text-white leading-tight">{currentSkill.name}</h4>
              <span className="text-sm text-white/60">{currentSkill.category}</span>
            </div>

            {/* Score */}
            <div className="pb-4 mb-4 border-b border-white/10">
              <div className="flex justify-between items-baseline gap-3 mb-2.5 text-sm">
                <span className="text-white/60">{copy.scoreLabel}</span>
                <span className="font-mono tabular shrink-0">
                  <span className={getStatusColor(getEffectiveStatus(currentSkill)).text}>
                    {getEffectiveScore(currentSkill)}%
                  </span>
                  <span className="text-white/40 mx-1">/</span>
                  <span className="text-white/70">{currentSkill.targetScore}%</span>
                </span>
              </div>

              <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${getEffectiveScore(currentSkill)}%`,
                    backgroundColor: getStatusColor(getEffectiveStatus(currentSkill)).stroke,
                  }}
                />
                <div className="absolute top-0 bottom-0 w-px bg-white/40" style={{ left: `${currentSkill.targetScore}%` }} />
              </div>

              <div className="flex justify-between gap-3 text-xs text-white/60 mt-2">
                <span>
                  {projectionApplied && currentSkill.id === selectedSkillId ? (
                    <span className="text-emerald-300">{copy.projectedNote}, plus {currentSkill.projectedScore - currentSkill.currentScore} points</span>
                  ) : currentSkill.targetScore - currentSkill.currentScore > 0 ? (
                    `${currentSkill.targetScore - currentSkill.currentScore} points below threshold`
                  ) : (
                    "At or above threshold"
                  )}
                </span>
                <span className="shrink-0 font-mono tabular">{currentSkill.peopleAffected} people</span>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed mb-5">{currentSkill.description}</p>

            {/* Revision roadmap */}
            <div>
              <span className="text-sm font-semibold text-white/60 block mb-2.5">
                {currentSkill.roadmap.title}
              </span>
              <ol className="space-y-2 text-sm text-white/70">
                {[currentSkill.roadmap.step1, currentSkill.roadmap.step2, currentSkill.roadmap.step3].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-white/50 font-mono text-xs tabular mt-0.5 shrink-0">{i + 1}</span>
                    <span className="leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 pt-3 border-t border-white/10 text-xs text-emerald-300">
                {currentSkill.roadmap.outcome}
              </p>
            </div>
          </div>

          {/* Projection control */}
          <div className="mt-4 pt-3 border-t border-white/10">
            {projectionApplied ? (
              <button
                onClick={handleResetProjection}
                className="w-full py-2.5 px-4 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-sm flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-white/60" />
                {copy.resetButton}
              </button>
            ) : (
              <button
                onClick={handleProject}
                disabled={isProjecting}
                className="w-full py-2.5 px-4 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white text-sm flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer group disabled:opacity-50"
              >
                {isProjecting ? (
                  <>
                    <span className="w-3 h-3 rounded-full border-2 border-white/20 border-t-white/70 animate-spin" />
                    {copy.projectBusy}
                  </>
                ) : (
                  <>
                    {copy.projectButton}
                    <ArrowRight className="w-3.5 h-3.5 text-white/60 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
