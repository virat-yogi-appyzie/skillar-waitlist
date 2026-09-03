"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, ChevronRight, Brain, BarChart3, Layers, Sparkles, Users, Building, Shield, GraduationCap } from "lucide-react";

import {
  productLinks,
  solutionLinks,
  productMenu,
  solutionsMenu,
  capabilityPreview,
  adaptivePreview,
  authoringPreview,
  analyticsPreview,
  loopPreview,
  solutionsOverviewPreview,
  ldPreview,
  hrPreview,
  managersPreview,
  enterprisePreview,
  megaFooter,
  type ProductPreviewKey,
  type SolutionPreviewKey,
} from "@/content/navigation";

// Icons stay here: the content module is strings and data only.
const productIcons: Record<ProductPreviewKey, React.ReactNode> = {
  intelligence: <Brain className="w-4 h-4" />,
  adaptive: <Sparkles className="w-4 h-4" />,
  authoring: <Layers className="w-4 h-4" />,
  analytics: <BarChart3 className="w-4 h-4" />,
};

const solutionIcons: Record<SolutionPreviewKey, React.ReactNode> = {
  ld: <GraduationCap className="w-4 h-4" />,
  hr: <Users className="w-4 h-4" />,
  managers: <Building className="w-4 h-4" />,
  enterprise: <Shield className="w-4 h-4" />,
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<"product" | "solutions" | null>(
    null
  );
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [activeSolutionPreview, setActiveSolutionPreview] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname() ?? "/";
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const productTriggerRef = useRef<HTMLButtonElement>(null);
  const solutionsTriggerRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);

  // The nav is a floating pill that sits over the page, so anything it covers is
  // unreadable. Retract it while the reader scrolls down; bring it straight back
  // the moment they scroll up (or reach the top).
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 100);

      const delta = y - lastScrollY.current;
      if (Math.abs(delta) > 6) {
        setHidden(y > 220 && delta > 0);
        lastScrollY.current = y;
      }
    };
    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Never retract while a menu is open — the close control must stay reachable.
  const isRetracted = hidden && !isOpen && activeMega === null;

  useEffect(() => {
    setIsOpen(false);
    setActiveMega(null);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const cancelMegaClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleMegaEnter = (mega: "product" | "solutions") => {
    cancelMegaClose();
    setActiveMega(mega);
  };

  const handleMegaLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 150);
  };

  const handleMegaToggle = (mega: "product" | "solutions") => (e: React.MouseEvent) => {
    cancelMegaClose();
    if (e.detail === 0) {
      setActiveMega((cur) => (cur === mega ? null : mega));
    } else {
      setActiveMega(mega);
    }
  };

  const closeMega = (mega: "product" | "solutions") => {
    cancelMegaClose();
    setActiveMega(null);
    (mega === "product" ? productTriggerRef : solutionsTriggerRef).current?.focus();
  };

  const isProductActive = pathname.startsWith("/product");
  const isSolutionsActive = pathname.startsWith("/solutions");

  return (
    <>
      <header
        // rounded-full matters: shadow-nav is painted on this element, and a
        // box-shadow follows the border-box. Without a radius here the shadow
        // renders as a rectangular halo with visible corners around the pill.
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-max rounded-full transition-all duration-300 ease-premium motion-reduce:transition-none focus-within:translate-y-0 focus-within:opacity-100 ${
          scrolled ? "shadow-nav" : ""
        } ${isRetracted ? "-translate-y-[180%] opacity-0" : "translate-y-0 opacity-100"}`}
      >
        {scrolled && (
          <div className="absolute -inset-px rounded-full bg-white/40 blur-sm pointer-events-none" />
        )}

        <nav className="relative flex items-center gap-2 pl-5 pr-3 py-2 bg-white/95 backdrop-blur-xl border border-navy-200 rounded-full">
          <Link href="/" className="relative z-10 flex items-center shrink-0 mr-4">
            <Image
              src="/skillar-logo.svg"
              alt="Skillar"
              width={1170}
              height={263}
              className="h-7 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 relative z-10">
            {/* Product mega-menu trigger */}
            <div
              onMouseEnter={() => handleMegaEnter("product")}
              onMouseLeave={handleMegaLeave}
              onFocus={cancelMegaClose}
              onBlur={handleMegaLeave}
              onKeyDown={(e) => {
                if (e.key === "Escape") closeMega("product");
              }}
            >
              <button
                type="button"
                ref={productTriggerRef}
                onClick={handleMegaToggle("product")}
                onFocus={(e) => {
                  if (e.currentTarget.matches(":focus-visible")) handleMegaEnter("product");
                }}
                aria-expanded={activeMega === "product"}
                aria-haspopup="true"
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full inline-flex items-center gap-1 ${
                  isProductActive
                    ? "text-navy bg-navy-100"
                    : "text-navy-600 hover:text-navy hover:bg-navy-50"
                }`}
              >
                Product
              </button>

              {/* ═══════════════════════════════════════════════
                  PRODUCT MEGA MENU — Premium Preview Panels
              ═══════════════════════════════════════════════ */}
              {activeMega === "product" && (
                <div className="absolute top-full left-0 mt-2 w-[800px] bg-white backdrop-blur-2xl border border-navy-200/80 rounded-2xl shadow-xl shadow-navy/8 overflow-hidden">
                  <div className="flex">
                    {/* Links Column */}
                    <div className="p-6 flex-1 min-w-0">
                      <Link href="/product" className="block group mb-3">
                        <span className="label-mono text-[10px] text-accent mb-0.5 block tracking-[0.12em]">{productMenu.eyebrow}</span>
                        <span className="text-[13px] text-navy-400 group-hover:text-navy transition-colors">
                          {productMenu.tagline}
                        </span>
                      </Link>
                      <div className="w-full h-px bg-border/60 mb-2" />

                      <div className="space-y-0.5">
                        {productLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-navy-50/80 transition-all group"
                            onMouseEnter={() => setActivePreview(link.preview)}
                            onFocus={() => setActivePreview(link.preview)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-surface border border-border/80 flex items-center justify-center text-navy-400 group-hover:text-accent group-hover:border-accent/30 group-hover:bg-accent/5 transition-all shrink-0">
                              {productIcons[link.preview]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[13px] font-medium text-navy group-hover:text-accent transition-colors block">
                                {link.label}
                              </span>
                              <span className="text-[12px] text-navy-400 block leading-snug">
                                {link.description}
                              </span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-navy-200 shrink-0 group-hover:text-accent/60 transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Preview Panel */}
                    <div className="w-[340px] border-l border-border/60 bg-surface/30 p-6 flex flex-col justify-center">

                      {/* ── Skill Intelligence Preview ── */}
                      {activePreview === "intelligence" && (
                        <div style={{ animation: 'megaPreviewIn 180ms ease-out' }}>
                          <span className="label-mono text-[10px] text-accent tracking-[0.1em] block mb-3">{capabilityPreview.eyebrow}</span>

                          {/* Mini org-tree with proficiency rings */}
                          <div className="space-y-1.5 mb-4">
                            {capabilityPreview.tree.map((item) => (
                              <div key={item.label} className="flex items-center gap-2.5" style={{ paddingLeft: `${item.depth * 14}px` }}>
                                {/* Tiny proficiency ring */}
                                <div className="relative w-5 h-5 shrink-0">
                                  <svg viewBox="0 0 20 20" className="w-5 h-5">
                                    <circle cx="10" cy="10" r="8" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
                                    <circle
                                      cx="10" cy="10" r="8" fill="none"
                                      stroke={item.color}
                                      strokeWidth="1.8"
                                      strokeDasharray={`${(item.score / 100) * 50.3} 50.3`}
                                      strokeLinecap="round"
                                      transform="rotate(-90 10 10)"
                                    />
                                  </svg>
                                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-navy-600">
                                    {item.score}
                                  </span>
                                </div>
                                <div className="min-w-0">
                                  <span className="text-[11px] font-medium text-navy block leading-tight truncate">{item.label}</span>
                                  <span className="text-[10px] text-navy-400 leading-none">{item.sublabel}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Skill leaf node */}
                          <div className="p-2.5 rounded-lg bg-rose-50/80 border border-rose-200/60">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-medium text-navy">{capabilityPreview.focusSkill.label}</span>
                              <span className="text-[10px] font-mono font-bold text-rose-600">{capabilityPreview.focusSkill.score}%</span>
                            </div>
                            <div className="w-full h-1 rounded-full bg-rose-100 overflow-hidden">
                              <div className="h-full rounded-full bg-rose-500" style={{ width: `${capabilityPreview.focusSkill.score}%` }} />
                            </div>
                            <span className="text-[12px] text-rose-600 font-mono mt-1 block">{capabilityPreview.focusSkill.note}</span>
                          </div>
                        </div>
                      )}

                      {/* ── Adaptive Learning Preview ── */}
                      {activePreview === "adaptive" && (
                        <div style={{ animation: 'megaPreviewIn 180ms ease-out' }}>
                          <span className="label-mono text-[10px] text-accent tracking-[0.1em] block mb-3">{adaptivePreview.eyebrow}</span>

                          {/* Two contrasting learner cards */}
                          <div className="space-y-2.5">
                            {adaptivePreview.learners.map((person) => (
                              <div key={person.name} className="p-2.5 rounded-lg bg-white border border-border/80 shadow-xs">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                    <span className="text-[10px] font-semibold text-accent">{person.name[0]}</span>
                                  </div>
                                  <div className="min-w-0">
                                    <span className="text-[10px] font-medium text-navy block truncate">{person.name}</span>
                                    <span className="text-[10px] text-navy-400">{person.role}</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] text-navy-500">{person.gap}</span>
                                  <span className="text-[10px] font-mono font-bold" style={{ color: person.color }}>{person.score}%</span>
                                </div>
                                <div className="flex gap-1">
                                  {person.steps.map((step, i) => (
                                    <div key={step} className="flex-1 text-center p-1 rounded bg-surface/80 border border-border/40">
                                      <span className="text-[10px] font-mono text-navy-300 block">0{i + 1}</span>
                                      <span className="text-[12px] text-navy-500 leading-tight block">{step}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          <span className="text-[12px] text-navy-400 mt-2.5 block text-center font-mono">{adaptivePreview.caption}</span>
                        </div>
                      )}

                      {/* ── AI Authoring Preview ── */}
                      {activePreview === "authoring" && (
                        <div style={{ animation: 'megaPreviewIn 180ms ease-out' }}>
                          <span className="label-mono text-[10px] text-accent tracking-[0.1em] block mb-3">{authoringPreview.eyebrow}</span>

                          {/* Authoring pipeline flow */}
                          <div className="space-y-2 mb-3">
                            {authoringPreview.pipeline.map((section, si) => (
                              <div key={section.phase}>
                                <div className={`px-2 py-1.5 rounded-lg border ${section.color}`}>
                                  <span className="text-[10px] font-mono font-bold tracking-wider block mb-1">{section.phase}</span>
                                  <div className="space-y-0.5">
                                    {section.items.map((item) => (
                                      <span key={item} className="text-[10px] block leading-snug opacity-80">{item}</span>
                                    ))}
                                  </div>
                                </div>
                                {si < 2 && (
                                  <div className="flex justify-center my-1">
                                    <ChevronRight className="w-3 h-3 text-navy-200 rotate-90" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ── Analytics Preview ── */}
                      {activePreview === "analytics" && (
                        <div style={{ animation: 'megaPreviewIn 180ms ease-out' }}>
                          <span className="label-mono text-[10px] text-accent tracking-[0.1em] block mb-3">{analyticsPreview.eyebrow}</span>

                          {/* Mini bar chart with assessed scores */}
                          <div className="space-y-2.5 mb-4">
                            {analyticsPreview.domains.map((item) => (
                              <div key={item.label}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] font-medium text-navy">{item.label}</span>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-mono font-bold" style={{ color: item.color }}>{item.score}%</span>
                                    <span className="text-[10px] text-navy-300">/</span>
                                    <span className="text-[10px] font-mono text-navy-400">{item.target}%</span>
                                  </div>
                                </div>
                                <div className="w-full h-1.5 bg-navy-100/80 rounded-full overflow-hidden relative">
                                  <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${item.score}%`, backgroundColor: item.color }}
                                  />
                                  <div className="absolute top-0 bottom-0 w-px bg-navy-400/50" style={{ left: `${item.target}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Quick insight */}
                          <div className="p-2 rounded-lg bg-surface border border-border/60">
                            <span className="text-[10px] font-mono text-navy-400 block mb-0.5">{analyticsPreview.insight.label}</span>
                            <span className="text-[12px] text-navy leading-snug block">
                              {analyticsPreview.insight.text}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Default state. This pane is 42% of the panel, so an
                          empty "hover to preview" prompt wasted most of the menu
                          on open. Show what the four products add up to instead. */}
                      {!activePreview && (
                        <div style={{ animation: "megaPreviewIn 180ms ease-out" }}>
                          <span className="label-mono text-[10px] text-accent tracking-[0.1em] block mb-3">
                            {loopPreview.eyebrow}
                          </span>
                          <div className="space-y-1.5 mb-3">
                            {loopPreview.steps.map((s) => (
                              <div
                                key={s.n}
                                className="flex items-baseline gap-2.5 p-2 rounded-lg bg-white/70 border border-border/60"
                              >
                                <span className="text-[10px] font-mono font-bold text-navy-300 shrink-0">
                                  {s.n}
                                </span>
                                <div className="min-w-0">
                                  <span className="text-[11px] font-medium text-navy block leading-tight">
                                    {s.label}
                                  </span>
                                  <span className="text-[10px] text-navy-400 block leading-snug">
                                    {s.desc}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <span className="text-[10px] text-navy-400 block text-center font-mono">
                            {loopPreview.hint}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Utility bar */}
                  <div className="border-t border-border/60 bg-surface/40 px-6 py-3 flex items-center justify-between gap-4">
                    <span className="text-[12px] text-navy-500">{megaFooter.prompt}</span>
                    <div className="flex items-center gap-5">
                      <Link
                        href={megaFooter.primary.href}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-accent-hover transition-colors group"
                      >
                        {megaFooter.primary.label}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                      <Link
                        href={megaFooter.secondary.href}
                        className="text-[13px] font-medium text-navy-600 hover:text-navy transition-colors"
                      >
                        {megaFooter.secondary.label}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions mega-menu trigger */}
            <div
              onMouseEnter={() => handleMegaEnter("solutions")}
              onMouseLeave={handleMegaLeave}
              onFocus={cancelMegaClose}
              onBlur={handleMegaLeave}
              onKeyDown={(e) => {
                if (e.key === "Escape") closeMega("solutions");
              }}
            >
              <button
                type="button"
                ref={solutionsTriggerRef}
                onClick={handleMegaToggle("solutions")}
                onFocus={(e) => {
                  if (e.currentTarget.matches(":focus-visible")) handleMegaEnter("solutions");
                }}
                aria-expanded={activeMega === "solutions"}
                aria-haspopup="true"
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full inline-flex items-center gap-1 ${
                  isSolutionsActive
                    ? "text-navy bg-navy-100"
                    : "text-navy-600 hover:text-navy hover:bg-navy-50"
                }`}
              >
                Solutions
              </button>

              {/* ═══════════════════════════════════════════════
                  SOLUTIONS MEGA MENU — Premium Preview Panels
              ═══════════════════════════════════════════════ */}
              {activeMega === "solutions" && (
                <div className="absolute top-full left-0 mt-2 w-[800px] bg-white backdrop-blur-2xl border border-navy-200/80 rounded-2xl shadow-xl shadow-navy/8 overflow-hidden">
                  <div className="flex">
                    {/* Links Column */}
                    <div className="p-6 flex-1 min-w-0">
                      <Link 
                        href="/solutions" 
                        className="block group mb-3 p-2 -mx-2 rounded-xl hover:bg-navy-50/80 transition-all"
                        onMouseEnter={() => setActiveSolutionPreview("overview")}
                        onFocus={() => setActiveSolutionPreview("overview")}
                      >
                        <span className="label-mono text-[10px] text-accent mb-0.5 block tracking-[0.12em] font-bold">{solutionsMenu.eyebrow}</span>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-navy-600 group-hover:text-accent font-medium transition-colors">
                            {solutionsMenu.tagline}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-navy-400 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                      <div className="w-full h-px bg-border/60 mb-2" />

                      <div className="space-y-0.5">
                        {solutionLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-navy-50/80 transition-all group"
                            onMouseEnter={() => setActiveSolutionPreview(link.preview)}
                            onFocus={() => setActiveSolutionPreview(link.preview)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-surface border border-border/80 flex items-center justify-center text-navy-400 group-hover:text-accent group-hover:border-accent/30 group-hover:bg-accent/5 transition-all shrink-0">
                              {solutionIcons[link.preview]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[13px] font-medium text-navy group-hover:text-accent transition-colors block">
                                {link.label}
                              </span>
                              <span className="text-[12px] text-navy-400 block leading-snug">
                                {link.description}
                              </span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-navy-200 shrink-0 group-hover:text-accent/60 transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Preview Panel */}
                    <div className="w-[340px] border-l border-border/60 bg-surface/30 p-6 flex flex-col justify-center">

                      {/* ── Overview Preview ── */}
                      {(activeSolutionPreview === "overview" || !activeSolutionPreview) && (
                        <div style={{ animation: 'megaPreviewIn 180ms ease-out' }}>
                          <span className="label-mono text-[10px] text-accent tracking-[0.1em] block mb-3 font-bold">{solutionsOverviewPreview.eyebrow}</span>
                          <div className="space-y-1.5 mb-3">
                            {solutionsOverviewPreview.perspectives.map((p) => (
                              <div key={p.label} className="flex items-center justify-between p-2 rounded-lg bg-white/70 border border-border/60 text-xs">
                                <span className="font-medium text-navy-950 font-sans">{p.label}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${p.color}`}>{p.role}</span>
                              </div>
                            ))}
                          </div>
                          <Link 
                            href="/solutions"
                            className="w-full py-2 px-3 rounded-xl bg-accent text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-glow-accent hover:bg-accent-hover transition-all"
                          >
                            <span>{solutionsMenu.cta}</span>
                          </Link>
                        </div>
                      )}

                      {/* ── L&D Preview ── */}
                      {activeSolutionPreview === "ld" && (
                        <div style={{ animation: 'megaPreviewIn 180ms ease-out' }}>
                          <span className="label-mono text-[10px] text-accent tracking-[0.1em] block mb-3">{ldPreview.eyebrow}</span>
                          <div className="space-y-1">
                            {ldPreview.steps.map((item) => (
                              <div key={item.num} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/60 transition-colors">
                                <span className="text-[10px] font-mono font-bold text-navy-300 w-4 shrink-0">{item.num}</span>
                                <span className="text-[12px] text-navy flex-1">{item.step}</span>
                                <span className={`text-[10px] font-mono ${item.color} uppercase`}>{item.status}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 p-2 rounded-lg bg-accent/5 border border-accent/15 text-center">
                            <span className="text-[12px] text-accent font-medium">{ldPreview.footnote}</span>
                          </div>
                        </div>
                      )}

                      {/* ── HR Preview ── */}
                      {activeSolutionPreview === "hr" && (
                        <div style={{ animation: 'megaPreviewIn 180ms ease-out' }}>
                          <span className="label-mono text-[10px] text-accent tracking-[0.1em] block mb-3">{hrPreview.eyebrow}</span>
                          <div className="space-y-2.5">
                            {hrPreview.items.map((item) => (
                              <div key={item.label} className="p-2 rounded-lg border border-border/40 bg-white/50">
                                <span className="text-[10px] font-medium text-navy block mb-0.5">{item.label}</span>
                                <span className="text-[12px] text-navy-400 leading-snug block">{item.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ── Managers Preview ── */}
                      {activeSolutionPreview === "managers" && (
                        <div style={{ animation: 'megaPreviewIn 180ms ease-out' }}>
                          <span className="label-mono text-[10px] text-accent tracking-[0.1em] block mb-3">{managersPreview.eyebrow}</span>
                          <div className="space-y-1.5 mb-3">
                            {managersPreview.members.map((m) => (
                              <div key={m.name} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/50 transition-colors">
                                <div className="w-5 h-5 rounded-full bg-surface border border-border/80 flex items-center justify-center shrink-0">
                                  <span className="text-[10px] font-semibold text-navy">{m.name[0]}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-[10px] font-medium text-navy block truncate">{m.name}</span>
                                  <span className="text-[10px] text-navy-400 truncate block">{m.skill}</span>
                                </div>
                                <span className={`text-[10px] font-mono font-bold ${
                                  m.status === "gap" ? "text-rose-500" : m.status === "developing" ? "text-sky-500" : "text-emerald-500"
                                }`}>
                                  {m.score}%
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="p-2 rounded-lg bg-surface border border-border/60 text-center">
                            <span className="text-[12px] text-navy-400 font-mono">{managersPreview.footnote}</span>
                          </div>
                        </div>
                      )}

                      {/* ── Enterprise Preview ── */}
                      {activeSolutionPreview === "enterprise" && (
                        <div style={{ animation: 'megaPreviewIn 180ms ease-out' }}>
                          <span className="label-mono text-[10px] text-accent tracking-[0.1em] block mb-3">{enterprisePreview.eyebrow}</span>
                          <div className="space-y-1.5 mb-3">
                            {enterprisePreview.items.map((item) => (
                              <div key={item.label} className="flex items-start gap-2.5 p-1.5">
                                <span
                                  className={`text-[10px] mt-0.5 shrink-0 ${item.live ? "text-emerald-500" : "text-navy-300"}`}
                                  aria-hidden="true"
                                >
                                  {item.live ? "✓" : "○"}
                                </span>
                                <div className="min-w-0">
                                  <span className="text-[10px] font-medium text-navy block">{item.label}</span>
                                  <span className="text-[10px] text-navy-400 block">{item.desc}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-2 rounded-lg bg-surface border border-border/60 text-center">
                            <span className="text-[12px] text-navy-500 font-medium">{enterprisePreview.legend}</span>
                          </div>
                        </div>
                      )}

                      {/* Default empty state */}
                      {!activeSolutionPreview && (
                        <div className="text-center py-6">
                          <div className="w-10 h-10 rounded-xl bg-surface border border-border/60 flex items-center justify-center mx-auto mb-2">
                            <Users className="w-5 h-5 text-navy-300" />
                          </div>
                          <span className="text-[12px] text-navy-400 block">{enterprisePreview.emptyState}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Utility bar */}
                  <div className="border-t border-border/60 bg-surface/40 px-6 py-3 flex items-center justify-between gap-4">
                    <span className="text-[12px] text-navy-500">{megaFooter.prompt}</span>
                    <div className="flex items-center gap-5">
                      <Link
                        href={megaFooter.primary.href}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-accent-hover transition-colors group"
                      >
                        {megaFooter.primary.label}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                      <Link
                        href={megaFooter.secondary.href}
                        className="text-[13px] font-medium text-navy-600 hover:text-navy transition-colors"
                      >
                        {megaFooter.secondary.label}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                pathname === "/about"
                  ? "text-navy bg-navy-100"
                  : "text-navy-600 hover:text-navy hover:bg-navy-50"
              }`}
            >
              About
            </Link>
          </div>

          <Link
            href="/demo"
            className="hidden lg:inline-flex relative z-10 items-center gap-2 pl-5 pr-2 py-2 bg-accent text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-accent-hover hover:shadow-btn-hover hover:scale-[1.02] active:scale-[0.98] group ml-2"
          >
            Book a demo
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 transition-transform duration-300 group-hover:bg-white/30 group-hover:rotate-12">
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-10 flex items-center justify-center w-10 h-10 rounded-full hover:bg-navy-50 transition-colors duration-200"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-navy" />
            ) : (
              <Menu className="w-5 h-5 text-navy" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl transition-all duration-400 ease-premium lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-8 pb-8 overflow-y-auto">
          {/* Product section */}
          <div className="mb-8">
            <span className="label-mono text-accent mb-4 block">Product</span>
            <div className="space-y-1">
              <Link
                href="/product"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-lg font-medium text-navy hover:text-accent transition-colors"
              >
                Overview
              </Link>
              {productLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-lg font-medium text-navy hover:text-accent transition-colors"
                  style={{
                    transitionDelay: isOpen ? `${i * 40 + 100}ms` : "0ms",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(1rem)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-border mb-8" />

          {/* Solutions section */}
          <div className="mb-8">
            <span className="label-mono text-accent mb-4 block">
              Solutions
            </span>
            <div className="space-y-1">
              <Link
                href="/solutions"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-lg font-medium text-navy hover:text-accent transition-colors"
              >
                Overview
              </Link>
              {solutionLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-lg font-medium text-navy hover:text-accent transition-colors"
                  style={{
                    transitionDelay: isOpen
                      ? `${i * 40 + 300}ms`
                      : "0ms",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(1rem)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-border mb-8" />

          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-lg font-medium text-navy hover:text-accent transition-colors mb-4"
          >
            About
          </Link>

          {/* Pinned to the bottom of the panel rather than the end of the scroll.
              The menu content is taller than a phone viewport, so a CTA at the end
              of the flow sat below the fold and needed a scroll to reach.
              Also carries the diagnostic, which is the site's primary action. */}
          <div className="mt-auto sticky bottom-0 -mx-8 px-8 pt-4 pb-2 bg-white/95 backdrop-blur-xl border-t border-border space-y-2.5">
            <Link
              href="/skills-gap-diagnostic"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full justify-center py-3.5 text-base"
            >
              Run the free diagnostic
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link
              href="/demo"
              onClick={() => setIsOpen(false)}
              className="w-full justify-center py-3.5 text-base inline-flex items-center gap-2 rounded-full font-medium text-navy border border-border hover:border-navy-300 hover:bg-navy-50 transition-colors"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
