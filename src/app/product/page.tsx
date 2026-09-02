import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ScrollButton from "@/components/ScrollButton";
import { ArrowDown, ArrowRight, CheckCircle2 } from "lucide-react";
import ProductSignalField from "@/components/product/ProductSignalField";
import SampleDataBadge from "@/components/SampleDataBadge";
import MagneticButton from "@/components/motion/MagneticButton";
import {
  meta,
  hero,
  inputs,
  intelligence,
  understand,
  identify,
  prioritize,
  personalize,
  create,
  adapt,
  measure,
  loop,
  scale,
  difference,
  productIndex,
} from "@/content/product/overview";

export const metadata = {
  title: meta.title,
  description: meta.description,
};

/* Style maps keyed by the content module's tone fields, so copy edits in
 * src/content/product/overview.ts never require touching this file. */
const skillTone = {
  good: { dot: "bg-emerald-500", value: "text-emerald-700", row: "bg-surface border-border/60", name: "text-navy" },
  mid: { dot: "bg-sky-500", value: "text-sky-700", row: "bg-surface border-border/60", name: "text-navy" },
  bad: { dot: "bg-rose-500", value: "text-rose-700", row: "bg-rose-50/70 border-rose-200/80", name: "text-rose-900" },
} as const;

const priorityTone = {
  high: { card: "border-rose-200", badge: "text-rose-700", score: "text-rose-700", action: "text-rose-700" },
  medium: { card: "border-amber-200", badge: "text-amber-700", score: "text-amber-700", action: "text-amber-700" },
  low: { card: "border-border", badge: "text-navy-500", score: "text-navy-500", action: "text-navy-500" },
} as const;

const roadmapTone = {
  indigo: { badge: "text-indigo-700 border-indigo-200", dot: "border-indigo-400 bg-indigo-50", gap: "text-rose-700" },
  sky: { badge: "text-sky-700 border-sky-200", dot: "border-sky-400 bg-sky-50", gap: "text-amber-700" },
} as const;

const measureStageTone = [
  { card: "bg-surface-elevated border-border", tag: "text-navy-500", name: "text-navy", desc: "text-navy-500" },
  { card: "bg-surface-elevated border-border", tag: "text-navy-500", name: "text-navy", desc: "text-navy-500" },
  { card: "bg-surface-elevated border-border", tag: "text-navy-500", name: "text-navy", desc: "text-navy-500" },
  { card: "bg-indigo-50 border-indigo-200", tag: "text-indigo-700", name: "text-indigo-950", desc: "text-indigo-800" },
] as const;

export default function ProductPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="overflow-hidden">
        {/* Opening statement */}
        <section className="pt-40 pb-24 lg:pt-52 lg:pb-36">
          <div className="container max-w-5xl">
            <h1 className="font-serif text-[length:var(--text-hero)] font-normal text-navy leading-[1.04] tracking-[-0.025em] mb-10 max-w-4xl">
              {hero.titleLead}
              <br />
              {hero.titleTail}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-8 border-t border-border/60">
              <div className="md:col-span-8">
                <p className="text-navy-600 text-xl sm:text-2xl leading-relaxed max-w-2xl">
                  {hero.lede}
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <ScrollButton
                  targetId="inputs"
                  offset={80}
                  className="text-sm font-medium text-accent hover:text-accent-hover inline-flex items-center gap-2 transition-colors cursor-pointer group"
                >
                  <span>{hero.scrollCta}</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                </ScrollButton>
              </div>
            </div>
          </div>
        </section>

        {/* The inputs the picture is built from */}
        <section id="inputs" className="py-24 lg:py-36 bg-surface border-y border-border/60">
          <div className="container max-w-5xl">
            <div className="max-w-3xl mb-14 sm:mb-16">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {inputs.title}
              </h2>
              <p className="text-navy-500 text-lg sm:text-xl mt-4 leading-relaxed">
                {inputs.lede}
              </p>
            </div>

            <ProductSignalField />
          </div>
        </section>

        {/* One model */}
        <section className="py-24 lg:py-36">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6">
                <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                  {intelligence.title}
                </h2>
                <p className="text-navy-500 text-base sm:text-lg leading-relaxed">
                  {intelligence.body}
                </p>
              </div>

              <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#0B1424] text-white border border-white/10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-3 flex-wrap pb-4 border-b border-white/10">
                    <span className="text-sm font-semibold text-white/60">{intelligence.card.heading}</span>
                    <SampleDataBadge tone="dark" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {intelligence.card.axes.map((axis) => (
                      <div key={axis.title} className="p-4 rounded-xl border border-white/10">
                        <div className="font-serif text-lg text-white">{axis.title}</div>
                        <div className="font-mono text-xs tabular text-white/60 mt-1">{axis.metric}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 rounded-xl border border-white/10">
                    <div className="text-sm text-white/60 mb-1">{intelligence.card.outputLabel}</div>
                    <div className="font-serif text-xl sm:text-2xl text-white">
                      {intelligence.card.outputValue}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Understand the learner */}
        <section className="py-24 lg:py-36 bg-surface border-t border-border/60">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6 lg:pr-4">
                <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                  {understand.title}
                </h2>
                <p className="text-navy-500 text-base sm:text-lg leading-relaxed">
                  {understand.body}
                </p>
                <div className="pt-2">
                  <Link
                    href={understand.linkHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group"
                  >
                    <span>{understand.linkLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-surface-elevated border border-border space-y-5">
                <div className="flex items-center justify-between gap-3 flex-wrap pb-4 border-b border-border">
                  <div>
                    <span className="text-sm font-semibold text-navy">{understand.card.heading}</span>
                    <div className="text-xs text-navy-500 mt-0.5">{understand.card.subheading}</div>
                  </div>
                  <SampleDataBadge />
                </div>

                <div className="space-y-3">
                  {understand.card.skills.map((skill) => {
                    const tone = skillTone[skill.tone];
                    return (
                      <div key={skill.name} className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${tone.row}`}>
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${tone.dot}`} />
                          <span className={`text-sm ${tone.name}`}>{skill.name}</span>
                        </div>
                        <span className={`font-mono text-xs tabular shrink-0 ${tone.value}`}>{skill.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Find the gaps that matter */}
        <section className="py-24 lg:py-36">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6 lg:pr-4">
                <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                  {identify.title}
                </h2>
                <p className="text-navy-500 text-base sm:text-lg leading-relaxed">
                  {identify.body}
                </p>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-surface-elevated border border-rose-200 space-y-5">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-sm font-semibold text-navy">{identify.card.heading}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-rose-700 border border-rose-200 rounded-full px-2.5 py-0.5">
                      {identify.card.tag}
                    </span>
                    <SampleDataBadge />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-navy-500">{identify.card.scoreLabel}</span>
                    <span className="font-mono tabular text-rose-700">{identify.card.score}% of 100%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface border border-border overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${identify.card.score}%` }} />
                  </div>
                  <div className="flex justify-between gap-3 text-xs">
                    <span className="text-navy-500">{identify.card.thresholdLabel}</span>
                    <span className="text-rose-700">{identify.card.shortfallLabel}</span>
                  </div>
                </div>

                <p className="text-sm text-navy-500 leading-relaxed pt-3 border-t border-border">
                  {identify.card.note}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prioritize */}
        <section className="py-24 lg:py-36 bg-surface border-t border-border/60">
          <div className="container max-w-5xl">
            <div className="max-w-3xl mb-14 sm:mb-16">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {prioritize.title}
              </h2>
              <p className="text-navy-500 text-lg sm:text-xl mt-4 leading-relaxed">
                {prioritize.lede}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {prioritize.cards.map((card) => {
                const tone = priorityTone[card.tone];
                return (
                  <div key={card.title} className={`p-6 sm:p-7 rounded-2xl bg-surface-elevated border flex flex-col justify-between ${tone.card}`}>
                    <div>
                      <div className="flex items-baseline justify-between gap-3 mb-4">
                        <span className={`text-sm font-semibold ${tone.badge}`}>{card.priority}</span>
                        <span className={`font-mono text-sm tabular ${tone.score}`}>{card.score}</span>
                      </div>
                      <h3 className="font-serif text-xl font-normal text-navy mb-2">{card.title}</h3>
                      <p className="text-sm text-navy-500 leading-relaxed">{card.body}</p>
                    </div>
                    <div className={`mt-6 pt-4 border-t border-border text-sm ${tone.action}`}>
                      {card.action}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Personalize */}
        <section className="py-24 lg:py-36">
          <div className="container max-w-5xl">
            <div className="max-w-3xl mb-14 sm:mb-16">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {personalize.title}
              </h2>
              <p className="text-navy-500 text-lg sm:text-xl mt-4 leading-relaxed">
                {personalize.lede}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {personalize.people.map((person) => {
                const tone = roadmapTone[person.tone];
                return (
                  <div key={person.name} className="p-8 rounded-2xl bg-surface border border-border space-y-6">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="font-serif text-2xl font-normal text-navy">{person.name}</h3>
                        <div className="text-sm text-navy-500 mt-0.5">{person.role}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs border rounded-full px-2.5 py-0.5 ${tone.badge}`}>
                          {person.roadmapTag}
                        </span>
                        <SampleDataBadge />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-elevated border border-border/80 text-sm text-navy-600">
                      <span className="font-semibold">{personalize.sharedTargetLabel}</span> {personalize.sharedTarget}
                      <div className={`mt-1 text-xs ${tone.gap}`}>{person.gap}</div>
                    </div>

                    <ol className="space-y-2 text-sm text-navy-600">
                      {person.steps.map((step, i) => (
                        <li key={step} className="p-3 rounded-lg bg-surface-elevated border border-border flex items-center gap-3">
                          {i === 0 ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <span className={`w-4 h-4 rounded-full border shrink-0 ${tone.dot}`} />
                          )}
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Create the learning */}
        <section className="py-24 lg:py-36 bg-surface border-t border-border/60">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6 lg:pr-4">
                <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                  {create.title}
                </h2>
                <p className="font-serif text-xl text-navy leading-snug">
                  {create.pullQuote}
                </p>
                <p className="text-navy-500 text-base sm:text-lg leading-relaxed">
                  {create.body}
                </p>
                <div className="pt-2">
                  <Link
                    href={create.linkHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group"
                  >
                    <span>{create.linkLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-surface-elevated border border-border">
                <div className="flex items-center justify-between gap-3 flex-wrap pb-4 mb-2 border-b border-border">
                  <span className="text-sm font-semibold text-navy-500">
                    {create.pipelineHeading}
                  </span>
                  <SampleDataBadge />
                </div>
                <ol>
                  {create.pipeline.map((item, i) => (
                    <li key={item.step} className="flex items-baseline gap-4 py-3.5 border-b border-border/60 last:border-b-0">
                      <span className="font-mono text-sm tabular text-navy-500 shrink-0">{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-navy">{item.step}</div>
                        <div className="text-sm text-navy-500 mt-0.5">{item.label}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Adapt */}
        <section className="py-24 lg:py-36">
          <div className="container max-w-5xl">
            <div className="max-w-3xl mb-14 sm:mb-16">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {adapt.title}
              </h2>
              <p className="text-navy-500 text-lg sm:text-xl mt-4 leading-relaxed">
                {adapt.lede}
              </p>
            </div>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border border border-border rounded-2xl overflow-hidden">
              {adapt.steps.map((step, i) => (
                <li key={step.label} className="p-5 bg-surface">
                  <span className="font-mono text-sm tabular text-navy-500 block">
                    {i + 1} of {adapt.steps.length}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-navy">{step.label}</span>
                  <span className="mt-1 block text-sm text-navy-500 leading-snug">{step.desc}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Measure */}
        <section className="py-24 lg:py-36 bg-surface border-t border-border/60">
          <div className="container max-w-5xl">
            <div className="max-w-3xl mb-14 sm:mb-16">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {measure.titleLead}
                <br />
                {measure.titleTail}
              </h2>
              <p className="text-navy-500 text-lg sm:text-xl mt-4 leading-relaxed">
                {measure.lede}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {measure.stages.map((stage, i) => {
                const tone = measureStageTone[i % measureStageTone.length];
                return (
                  <div key={stage.tag} className={`p-6 rounded-2xl border ${tone.card}`}>
                    <span className={`font-mono text-xs tabular block mb-2 ${tone.tag}`}>{stage.tag}</span>
                    <div className={`font-serif text-lg ${tone.name}`}>{stage.name}</div>
                    <div className={`text-sm mt-1 leading-snug ${tone.desc}`}>{stage.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* The loop */}
        <section className="section-dark py-24 lg:py-36 bg-navy text-white">
          <div className="container max-w-5xl">
            <div className="max-w-3xl">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal tracking-[-0.025em] leading-tight">
                {loop.title}
              </h2>
              <p className="text-white/70 text-lg sm:text-xl mt-4 leading-relaxed">
                {loop.lede}
              </p>
            </div>

            <ol className="mt-14 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
              {loop.stages.map((step, idx) => (
                <li key={step} className="p-4 bg-navy">
                  <span className="font-mono text-sm tabular text-white/60 block">{idx + 1}</span>
                  <span className="mt-1.5 block text-sm text-white">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Scale */}
        <section className="py-24 lg:py-36 bg-surface border-y border-border/60">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6 lg:pr-4">
                <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                  {scale.title}
                </h2>
                <p className="text-navy-500 text-base sm:text-lg leading-relaxed">
                  {scale.body}
                </p>
                <div className="pt-2">
                  <Link
                    href={scale.linkHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group"
                  >
                    <span>{scale.linkLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-surface-elevated border border-border">
                <div className="flex items-center justify-between gap-3 flex-wrap pb-4 border-b border-border">
                  <span className="text-sm font-semibold text-navy-500">
                    {scale.cardHeading}
                  </span>
                  <SampleDataBadge />
                </div>
                <dl>
                  {scale.levels.map((item) => (
                    <div key={item.level} className="py-4 border-b border-border/60 last:border-b-0">
                      <dt className="text-sm font-semibold text-navy">{item.level}</dt>
                      <dd className="text-sm text-navy-500 leading-relaxed mt-0.5">{item.desc}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* The difference */}
        <section className="py-24 lg:py-36">
          <div className="container max-w-5xl">
            <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight mb-14 max-w-3xl">
              {difference.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {difference.columns.map((col) => (
                <div
                  key={col.label}
                  className={`p-8 rounded-2xl border ${
                    col.highlight ? "bg-indigo-50 border-indigo-200" : "bg-surface border-border"
                  }`}
                >
                  <span
                    className={`text-sm font-semibold block mb-3 ${
                      col.highlight ? "text-indigo-700" : "text-navy-500"
                    }`}
                  >
                    {col.label}
                  </span>
                  <p
                    className={`font-serif text-2xl mb-3 ${
                      col.highlight ? "text-indigo-950" : "text-navy"
                    }`}
                  >
                    {col.claim}
                  </p>
                  <p
                    className={`text-sm leading-relaxed ${
                      col.highlight ? "text-indigo-800" : "text-navy-500"
                    }`}
                  >
                    {col.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Where to go next */}
        <section className="section-dark py-24 lg:py-40 bg-navy text-white">
          <div className="container max-w-5xl">
            <h2 className="font-serif text-[length:var(--text-display)] font-normal tracking-[-0.025em] leading-[1.08] mb-12 max-w-3xl">
              {productIndex.title}
            </h2>

            <div className="max-w-4xl mb-16">
              {productIndex.items.map((item) => (
                <Link
                  key={item.num}
                  href={item.href}
                  className="py-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer hover:border-white/30 transition-colors"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-sm tabular text-white/60 shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white transition-colors shrink-0">
                    {productIndex.exploreLabel}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>

            <MagneticButton
              href="/demo"
              className="btn-primary text-base px-10 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-medium inline-flex items-center justify-center gap-3 transition-all cursor-pointer group"
              strength={0.25}
            >
              <span>{productIndex.ctaLabel}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
