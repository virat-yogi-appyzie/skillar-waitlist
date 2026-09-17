"use client";

import { useEffect, useRef, useState } from "react";
import { loopStory } from "@/content/home";

/**
 * The homepage's one authored motion moment: five beats of a single skill gap
 * closing.
 *
 * Iteration 08 pins the card and its text together. Previously the card was
 * sticky on its own while five text beats scrolled past it, which meant two
 * beats were often on screen beside one card and nobody could tell which text
 * the card belonged to. Now a scroll track advances one step at a time and
 * both halves are vertically centred in the viewport, so exactly one pair is
 * ever readable.
 *
 * Iteration 09 keeps that scrub untouched, by explicit user preference, and
 * adds only a beat rail above the stage: the five beats named, the passed
 * ones marked, the active one filling with scroll progress, and each one
 * clickable to jump the scroll to that beat. Orientation and control were
 * the strengths of the tab-tour pattern; the scroll driver stays ours.
 *
 * The transition is a circular entrance: each half travels an arc around a
 * pivot far below the stage, the card orbiting clockwise into place and the
 * text anti-clockwise, each fading through the curve. An inner element
 * counter-rotates so the content stays upright while it rides the arc. Both
 * are defined as `.story-orbit` / `.story-card` / `.story-text` in
 * globals.css and flatten to a plain cross-fade under prefers-reduced-motion.
 *
 * Below lg nothing pins: each beat renders its own card inline, in order.
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

const cardShell =
  "border border-white/15 rounded-xl bg-white/[0.03] p-6 sm:p-8 flex flex-col justify-center";

export default function LoopStory() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const [active, setActive] = useState(0);
  const stepCount = loopStory.steps.length;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const next = Math.min(stepCount - 1, Math.floor(progress * stepCount));
      setActive((current) => (current === next ? current : next));

      // The active beat's underline fills with scroll progress through that
      // beat, written straight to the element so scrolling never re-renders.
      if (fillRef.current) {
        const frac = Math.min(1, Math.max(0, progress * stepCount - next));
        fillRef.current.style.transform = `scaleX(${frac})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [stepCount]);

  /** Jump the scroll to the middle of beat i's stretch of the track. */
  const jumpTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const top =
      el.getBoundingClientRect().top +
      window.scrollY +
      ((i + 0.5) / stepCount) * scrollable;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  const stateOf = (i: number) => (i === active ? "active" : i < active ? "prev" : "next");

  return (
    <section id="loop-story" className="section-dark bg-navy text-white scroll-mt-20">
      {/* One track, one heading. Below lg the track has no forced height and
          nothing pins, so this same header renders as an ordinary section
          opener above the stacked beats. */}
      <div
        ref={trackRef}
        className="story-track relative pt-20 lg:pt-0"
        style={{ ["--story-track-h" as string]: `${stepCount * 100}vh` }}
      >
        <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* A plain left-aligned opener, like every other section header on
                the page. The portrait that used to sit opposite restated what
                the lede already says, and justify-between stranded it at the
                far edge of a ~1470px row while the text ran to 672px. The
                beats name Rohit throughout, so nothing here needs a face. */}
            <div className="max-w-3xl mb-10 lg:mb-12">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal tracking-[-0.025em] leading-tight">
                {loopStory.heading}
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">{loopStory.lede}</p>
            </div>

            {/* The beat rail, desktop only: where the story is, and a way to
                jump. The scroll still drives; these only steer it. */}
            <nav aria-label="Story beats" className="hidden lg:block mb-10">
              <ol className="flex gap-1.5 border-b border-white/15">
                {loopStory.steps.map((step, i) => (
                  <li key={step.title} className="flex-1">
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-current={i === active ? "step" : undefined}
                      className={`relative w-full pb-3.5 pt-2 px-1 text-left cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded-sm ${
                        i === active
                          ? "text-white"
                          : i < active
                            ? "text-white/65 hover:text-white"
                            : "text-white/45 hover:text-white/80"
                      }`}
                    >
                      <span className="block font-mono text-xs tabular text-white/45">
                        {i + 1}
                      </span>
                      <span className="block mt-1 text-sm font-medium">{step.tab}</span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-px h-0.5 overflow-hidden"
                      >
                        {i < active ? (
                          <span className="block h-full w-full bg-cyan-300/50" />
                        ) : i === active ? (
                          <span
                            ref={fillRef}
                            className="block h-full w-full bg-cyan-300/90 origin-left"
                            style={{ transform: "scaleX(0)" }}
                          />
                        ) : null}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            {/* The animated pair, desktop only. */}
            <div className="hidden lg:grid grid-cols-2 gap-16 items-center">
              <div className="relative h-[22rem] xl:h-[24rem]">
                {loopStory.steps.map((step, i) => (
                  <div
                    key={step.title}
                    data-state={stateOf(i)}
                    aria-hidden={i !== active}
                    className={`story-orbit story-card absolute inset-0 ${
                      i === active ? "" : "pointer-events-none"
                    }`}
                  >
                    <div className={`story-orbit-inner h-full ${cardShell}`}>
                      <PanelBody visual={step.visual} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative h-[22rem] xl:h-[24rem]">
                {loopStory.steps.map((step, i) => (
                  <div
                    key={step.title}
                    data-state={stateOf(i)}
                    aria-hidden={i !== active}
                    className={`story-orbit story-text absolute inset-0 ${
                      i === active ? "" : "pointer-events-none"
                    }`}
                  >
                    <div className="story-orbit-inner h-full flex flex-col justify-center">
                      <span className="font-mono text-sm tabular text-white/60">
                        {i + 1} of {stepCount}
                      </span>
                      <h3 className="mt-3 font-serif text-3xl xl:text-4xl font-normal text-white leading-snug">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-white/70 text-lg leading-relaxed max-w-md">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Below lg: no pinning, each beat carries its own card in order. */}
      <div className="lg:hidden container mx-auto px-4 sm:px-6 pt-14">
        <ol className="space-y-16">
          {loopStory.steps.map((step, i) => (
            <li key={step.title}>
              <span className="font-mono text-sm tabular text-white/60">
                {i + 1} of {stepCount}
              </span>
              <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-normal text-white leading-snug">
                {step.title}
              </h3>
              <p className="mt-4 text-white/70 leading-relaxed">{step.body}</p>
              <div className={`mt-6 ${cardShell}`}>
                <PanelBody visual={step.visual} />
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="mt-16 lg:mt-0 max-w-2xl border-t border-white/15 pt-6">
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
