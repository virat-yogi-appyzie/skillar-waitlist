"use client";

import { useEffect, useRef, useState } from "react";
import { loopStory } from "@/content/home";

/**
 * The homepage's one authored motion moment: scroll through the five beats of
 * a single skill gap closing. The left panel is pinned and redraws per beat;
 * the beats themselves are ordinary readable text on the right.
 *
 * Everything else on the page is static by design, so this is the only place
 * the visitor's scroll drives a scene. Reduced motion collapses the panel
 * transitions to instant swaps.
 */

const THRESHOLD = 85;
const FIRST_SCORE = 64;
const SECOND_SCORE = 91;

const concepts = [
  { name: "Guard interlock classes", held: true },
  { name: "Lockout procedure ordering", held: false },
  { name: "Stored-energy checks", held: false },
  { name: "Isolation point mapping", held: true },
  { name: "Permit-to-work handover", held: true },
  { name: "Group lockout boxes", held: true },
  { name: "Verification of de-energization", held: true },
  { name: "Re-energization sequence", held: true },
] as const;

const roadmapSteps = [
  { title: "Lockout sequence walkthrough", source: "Lockout SOP, rev 12" },
  { title: "Stored energy: hydraulic and pneumatic", source: "Equipment manual, ch. 4" },
  { title: "Worked examples and quiz", source: "Generated from both documents" },
  { title: "Re-assessment", source: "Two flagged concepts only" },
] as const;

function ScoreScale({ value, tone }: { value: number; tone: "low" | "high" }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-6xl tabular text-white">{value}</span>
        <span className="text-sm text-white/60">threshold {THRESHOLD}</span>
      </div>
      <div className="relative mt-6 h-px bg-white/20">
        <div
          className="absolute -top-1 h-2 w-px bg-white/50"
          style={{ left: `${THRESHOLD}%` }}
        />
        <div
          className={`absolute top-0 left-0 h-px ${tone === "low" ? "bg-rose-400" : "bg-emerald-400"}`}
          style={{ width: `${value}%` }}
        />
        <div
          className={`absolute -top-[3px] h-[7px] w-[7px] rounded-full ${tone === "low" ? "bg-rose-400" : "bg-emerald-400"}`}
          style={{ left: `calc(${value}% - 3px)` }}
        />
      </div>
      <div className="mt-4 flex justify-between text-xs text-white/60 tabular">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
}

function PanelBody({ visual }: { visual: (typeof loopStory.steps)[number]["visual"] }) {
  switch (visual) {
    case "score":
      return (
        <div>
          <p className="text-sm text-white/70 mb-10">Machine safety, quarterly assessment</p>
          <ScoreScale value={FIRST_SCORE} tone="low" />
        </div>
      );
    case "concepts":
      return (
        <ul className="space-y-2.5">
          {concepts.map((c) => (
            <li key={c.name} className="flex items-center justify-between gap-4 text-sm">
              <span className={c.held ? "text-white/60" : "text-white"}>{c.name}</span>
              <span
                className={
                  c.held
                    ? "text-xs text-white/55"
                    : "text-xs text-rose-300 border border-rose-300/40 rounded-full px-2.5 py-0.5"
                }
              >
                {c.held ? "held" : "below mastery"}
              </span>
            </li>
          ))}
        </ul>
      );
    case "roadmap":
      return (
        <ol className="space-y-5">
          {roadmapSteps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="font-mono text-sm tabular text-white/60 pt-0.5">{i + 1}</span>
              <span>
                <span className="block text-white text-sm">{s.title}</span>
                <span className="block text-xs text-white/60 mt-0.5">{s.source}</span>
              </span>
            </li>
          ))}
        </ol>
      );
    case "reassess":
      return (
        <div>
          <p className="text-sm text-white/70 mb-10">Follow-up assessment, flagged concepts only</p>
          <ScoreScale value={SECOND_SCORE} tone="high" />
        </div>
      );
    case "certify":
      return (
        <div className="border border-white/25 rounded-lg p-6">
          <p className="font-serif text-2xl text-white">Machine safety</p>
          <p className="text-sm text-emerald-300 mt-1">Certified</p>
          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between gap-6">
              <dt className="text-white/60">Valid to</dt>
              <dd className="text-white/85 tabular">12 Sep 2027</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-white/60">Evidence</dt>
              <dd className="text-white/85 text-right">
                Assessment, roadmap, re-assessment
              </dd>
            </div>
          </dl>
        </div>
      );
  }
}

export default function LoopStory() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(entry.target as HTMLLIElement);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    for (const el of stepRefs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="loop-story" className="section-dark bg-navy text-white py-20 lg:py-28 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-serif text-[length:var(--text-display)] font-normal tracking-[-0.025em] leading-tight">
            {loopStory.heading}
          </h2>
          <p className="mt-5 text-white/70 text-lg leading-relaxed">{loopStory.lede}</p>
          <p className="mt-3 text-xs uppercase tracking-wide text-white/60">
            {loopStory.personLabel}
          </p>
        </div>

        <div className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Pinned scene (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative border border-white/15 rounded-xl bg-white/[0.03] p-8 min-h-[26rem] flex flex-col justify-center">
                {loopStory.steps.map((step, i) => (
                  <div
                    key={step.title}
                    aria-hidden={active !== i}
                    className="col-start-1 row-start-1 transition-opacity duration-500 motion-reduce:transition-none"
                    style={{
                      opacity: active === i ? 1 : 0,
                      position: active === i ? "relative" : "absolute",
                      inset: active === i ? undefined : "2rem",
                      pointerEvents: active === i ? "auto" : "none",
                    }}
                  >
                    <PanelBody visual={step.visual} />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-1.5" aria-hidden="true">
                {loopStory.steps.map((step, i) => (
                  <span
                    key={step.title}
                    className={`h-px flex-1 transition-colors duration-300 ${i <= active ? "bg-white/70" : "bg-white/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Beats */}
          <ol className="space-y-20 lg:space-y-0">
            {loopStory.steps.map((step, i) => (
              <li
                key={step.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="lg:min-h-[47vh] lg:flex lg:flex-col lg:justify-center"
              >
                <span className="font-mono text-sm tabular text-white/60">
                  {i + 1} of {loopStory.steps.length}
                </span>
                <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-normal text-white leading-snug">
                  {step.title}
                </h3>
                <p className="mt-4 text-white/70 leading-relaxed max-w-md">{step.body}</p>
                {/* Inline scene on mobile, where nothing pins */}
                <div className="mt-6 lg:hidden border border-white/15 rounded-xl bg-white/[0.03] p-6">
                  <PanelBody visual={step.visual} />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 lg:mt-8 max-w-2xl border-t border-white/15 pt-6">
          <p className="text-white/60 leading-relaxed">{loopStory.closing}</p>
          <a
            href={loopStory.cta.href}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors underline underline-offset-4 decoration-cyan-300/40"
          >
            {loopStory.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
