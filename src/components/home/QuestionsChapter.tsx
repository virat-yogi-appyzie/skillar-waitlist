"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { problem } from "@/content/home";
import { heatScene, roleScene, reviseScene } from "@/content/fixtures/questions-chapter";

/**
 * Chapter two of three: the questions leadership cannot answer, told in the
 * LoopStory idiom on the brand's light ground. The dark panel pins on the
 * left and redraws per question; the questions scroll past on the right.
 * Below lg nothing pins and each beat carries its scene inline.
 */

function HeatScene() {
  return (
    <div>
      <p className="text-sm text-white/70 mb-6">{heatScene.caption}</p>
      <table className="w-full border-separate border-spacing-1">
        <thead>
          <tr>
            <th aria-hidden="true" className="w-24" />
            {heatScene.skills.map((s) => (
              <th key={s} className="text-xs font-normal text-white/60 pb-1 font-sans">
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {heatScene.rows.map((r) => (
            <tr key={r.name}>
              <th scope="row" className="text-left text-xs font-normal text-white/80 pr-2 font-sans whitespace-nowrap">
                {r.name}
              </th>
              {r.cells.map((v, i) => (
                <td key={heatScene.skills[i]} className="p-0">
                  <div
                    className="h-9 rounded-md flex items-center justify-center font-mono text-xs tabular text-white/90"
                    style={{
                      backgroundColor:
                        v < 70
                          ? "rgba(244, 63, 94, 0.5)"
                          : v < heatScene.threshold
                            ? "rgba(245, 158, 11, 0.4)"
                            : "rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    {v}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RoleScene() {
  return (
    <div>
      <p className="text-sm text-white/70 mb-6">{roleScene.caption}</p>
      <ul className="space-y-3">
        {roleScene.requirements.map((r) => (
          <li key={r.skill} className="flex items-baseline justify-between gap-4 pb-3 border-b border-white/10 last:border-b-0">
            <span>
              <span className="block text-sm text-white">{r.skill}</span>
              <span className="block text-xs text-white/60 mt-0.5">{r.due}</span>
            </span>
            <span className="font-mono text-sm tabular text-white/80 shrink-0">{r.target} required</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReviseScene() {
  return (
    <div>
      <p className="text-sm text-white/70 mb-6">{reviseScene.caption}</p>
      <ul className="space-y-2 mb-5">
        {reviseScene.flagged.map((f) => (
          <li key={f} className="flex items-center justify-between gap-4 text-sm">
            <span className="text-white">{f}</span>
            <span className="text-xs text-rose-300 border border-rose-300/40 rounded-full px-2.5 py-0.5 shrink-0">
              below mastery
            </span>
          </li>
        ))}
      </ul>
      <ol className="space-y-2.5 border-t border-white/10 pt-4">
        {reviseScene.steps.map((s, i) => (
          <li key={s} className="flex gap-3 text-sm">
            <span className="font-mono tabular text-white/60">{i + 1}</span>
            <span className="text-white/85">{s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-white/60">{reviseScene.spared}</p>
    </div>
  );
}

const scenes = [HeatScene, RoleScene, ReviseScene];

export default function QuestionsChapter() {
  const [active, setActive] = useState(0);
  const beatRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = beatRefs.current.indexOf(entry.target as HTMLLIElement);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    for (const el of beatRefs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-surface-warm border-y border-border-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
            {problem.heading}
          </h2>
          <p className="mt-5 text-navy-600 text-lg leading-relaxed">{problem.lede}</p>
        </div>

        <div className="mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Pinned scene (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative rounded-2xl bg-[#0B1424] border border-white/10 shadow-2xl shadow-navy/30 text-white p-8 min-h-[24rem] flex flex-col justify-center">
                {scenes.map((Scene, i) => (
                  <div
                    key={problem.questions[i].q}
                    aria-hidden={active !== i}
                    className="transition-opacity duration-500 motion-reduce:transition-none"
                    style={{
                      opacity: active === i ? 1 : 0,
                      position: active === i ? "relative" : "absolute",
                      inset: active === i ? undefined : "2rem",
                      pointerEvents: active === i ? "auto" : "none",
                    }}
                  >
                    <Scene />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-1.5" aria-hidden="true">
                {scenes.map((_, i) => (
                  <span
                    key={problem.questions[i].q}
                    className={`h-px flex-1 transition-colors duration-300 ${i <= active ? "bg-navy/60" : "bg-navy/15"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Beats */}
          <ol className="space-y-16 lg:space-y-0">
            {problem.questions.map((item, i) => {
              const Scene = scenes[i];
              return (
                <li
                  key={item.q}
                  ref={(el) => {
                    beatRefs.current[i] = el;
                  }}
                  className="lg:min-h-[44vh] lg:flex lg:flex-col lg:justify-center"
                >
                  <span className="font-mono text-sm tabular text-navy-500">
                    {i + 1} of {problem.questions.length}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-normal text-navy leading-snug text-balance">
                    {item.q}
                  </h3>
                  <p className="mt-4 text-navy-500 leading-relaxed max-w-md">{item.a}</p>
                  {/* Inline scene below lg, where nothing pins */}
                  <div className="mt-6 lg:hidden rounded-2xl bg-[#0B1424] border border-white/10 text-white p-6">
                    <Scene />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-16 lg:mt-6 max-w-2xl border-t border-border-warm pt-6">
          <p className="text-sm text-navy-500 leading-relaxed">{problem.footnote}</p>
          <Link
            href="/about"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors group"
          >
            {problem.aboutLink}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
