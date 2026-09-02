import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextChapter from "@/components/NextChapter";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CapabilityAtlasConsole from "@/components/skillar/CapabilityAtlasConsole";
import SignatureZoom from "@/components/skillar/SignatureZoom";
import TopographicTerrain from "@/components/visual/TopographicTerrain";
import SampleDataBadge from "@/components/SampleDataBadge";
import {
  meta,
  hero,
  problem,
  signals,
  atlas,
  drilldown,
  priority,
  closing,
  nextChapter,
} from "@/content/product/skill-intelligence";

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function SkillIntelligencePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="pt-40 pb-20 lg:pt-48 lg:pb-28">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-7">
                <h1 className="font-serif text-[length:var(--text-hero)] font-normal text-navy leading-[1.04] tracking-[-0.025em]">
                  {hero.title}
                </h1>
              </div>
              <div className="lg:col-span-5">
                <p className="text-navy-500 text-xl leading-relaxed">
                  {hero.lede}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The problem */}
        <section className="py-16 lg:py-24 bg-surface">
          <div className="container max-w-4xl">
            <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy mb-6 tracking-[-0.025em] leading-tight">
              {problem.title}
            </h2>
            <p className="text-navy-500 text-lg leading-relaxed mb-10">
              {problem.body}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {problem.people.map((person) => (
                <div key={person.name} className="p-6 bg-white border border-border rounded-xl">
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-navy block">{person.name}</span>
                    <span className="text-sm text-navy-500">{person.role}</span>
                  </div>
                  <dl className="space-y-2 text-sm">
                    {person.rows.map((row) => (
                      <div key={row.skill} className="flex justify-between gap-3">
                        <dt className="text-navy-500">{row.skill}</dt>
                        <dd
                          className={`font-mono text-xs tabular shrink-0 pt-0.5 ${
                            row.tone === "good" ? "text-emerald-700" : "text-rose-700"
                          }`}
                        >
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-4 pt-3 border-t border-border/70 flex justify-end">
                    <SampleDataBadge />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What the map is built from */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-5xl">
            <div className="max-w-3xl mb-12">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {signals.title}
              </h2>
              <p className="text-navy-500 text-lg mt-4 leading-relaxed">
                {signals.lede}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden mb-12">
              {signals.items.map((signal) => (
                <div key={signal.name} className="p-5 bg-surface">
                  <span className="text-sm font-semibold text-navy block mb-1">{signal.name}</span>
                  <span className="text-sm text-navy-500 leading-snug">{signal.desc}</span>
                </div>
              ))}
            </div>

            {/* Terrain figure */}
            <div className="p-8 bg-surface-elevated border border-border rounded-2xl">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <span className="text-sm font-semibold text-navy block mb-1">{signals.terrainTitle}</span>
                  <p className="text-sm text-navy-500 max-w-md leading-relaxed">
                    {signals.terrainBody}
                  </p>
                </div>
                <SampleDataBadge />
              </div>
              <TopographicTerrain className="w-full h-[180px]" />
            </div>
          </div>
        </section>

        {/* Capability atlas */}
        <section className="section-dark py-20 lg:py-32 bg-navy">
          <div className="container max-w-6xl">
            <div className="max-w-3xl mb-14">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-white tracking-[-0.025em] leading-tight">
                {atlas.title}
              </h2>
              <p className="text-white/70 text-lg mt-4 leading-relaxed">
                {atlas.lede}
              </p>
            </div>

            <CapabilityAtlasConsole />
          </div>
        </section>

        {/* Drill down */}
        <section className="py-16 lg:py-24 bg-surface">
          <div className="container max-w-5xl">
            <div className="max-w-3xl mb-12">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {drilldown.title}
              </h2>
              <p className="text-navy-500 text-lg mt-4 leading-relaxed">
                {drilldown.lede}
              </p>
            </div>

            <SignatureZoom />
          </div>
        </section>

        {/* What gets acted on first */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy mb-6 tracking-[-0.025em] leading-tight">
              {priority.title}
            </h2>
            <p className="text-navy-500 text-lg leading-relaxed max-w-2xl mb-12">
              {priority.lede}
            </p>

            <dl className="border-t border-border">
              {priority.factors.map((factor) => (
                <div
                  key={factor.title}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 py-5 border-b border-border/70"
                >
                  <dt className="sm:col-span-4 font-medium text-navy">{factor.title}</dt>
                  <dd className="sm:col-span-8 text-navy-500 leading-relaxed">{factor.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Closing */}
        <section className="py-16 lg:py-24 bg-surface">
          <div className="container max-w-3xl">
            <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy mb-8 tracking-[-0.025em] leading-tight">
              {closing.title}
            </h2>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 text-base font-semibold text-accent hover:text-accent-hover transition-colors group"
            >
              {closing.cta}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
            </Link>
          </div>
        </section>

        <NextChapter
          statement={nextChapter.statement}
          label={nextChapter.label}
          href={nextChapter.href}
          cta={nextChapter.cta}
        />
      </main>
      <Footer />
    </>
  );
}
