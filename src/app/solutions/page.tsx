import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ScrollButton from "@/components/ScrollButton";
import { ArrowRight } from "lucide-react";
import OrganizationLens from "@/components/solutions/OrganizationLens";
import SolutionsHeroLens from "@/components/solutions/SolutionsHeroLens";
import SampleDataBadge from "@/components/SampleDataBadge";
import MagneticButton from "@/components/motion/MagneticButton";
import {
  meta,
  hero,
  problemSection,
  perspectives,
  connectionSection,
  chapters,
  threadSection,
  threadCards,
  systemSection,
  insightSection,
  indexSection,
  outcomeSection,
} from "@/content/solutions/overview";

export const metadata = {
  title: meta.title,
  description: meta.description,
};

const perspectiveTone = {
  indigo: { rule: "bg-indigo-500", hover: "hover:border-indigo-300" },
  sky: { rule: "bg-sky-500", hover: "hover:border-sky-300" },
  emerald: { rule: "bg-emerald-500", hover: "hover:border-emerald-300" },
  purple: { rule: "bg-purple-500", hover: "hover:border-purple-300" },
} as const;

const chapterTone = {
  indigo: { link: "text-accent hover:text-accent-hover", section: "bg-surface border-t border-border/60", panel: "bg-surface-elevated", inner: "bg-surface border-border/60" },
  sky: { link: "text-sky-700 hover:text-sky-800", section: "", panel: "bg-surface", inner: "bg-surface-elevated border-border" },
  emerald: { link: "text-emerald-700 hover:text-emerald-800", section: "bg-surface border-t border-border/60", panel: "bg-surface-elevated", inner: "bg-surface border-border/60" },
  purple: { link: "text-purple-700 hover:text-purple-800", section: "", panel: "bg-surface", inner: "bg-surface-elevated border-border" },
} as const;

export default function SolutionsLandingPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="overflow-hidden">
        {/* Opening: editorial left, lens panel right */}
        <section className="pt-40 pb-24 lg:pt-52 lg:pb-36">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <h1 className="font-serif text-[length:var(--text-hero)] font-normal text-navy leading-[1.05] tracking-[-0.025em] max-w-4xl">
                  {hero.title}
                </h1>

                <div className="mt-10 pt-8 border-t border-border/60">
                  <p className="text-navy-500 text-xl sm:text-2xl leading-relaxed max-w-xl mb-8">
                    {hero.lede}
                  </p>
                  <ScrollButton
                    targetId="perspectives"
                    offset={80}
                    className="text-sm font-medium text-accent hover:text-accent-hover inline-flex items-center gap-2 transition-colors cursor-pointer underline underline-offset-4 decoration-accent/40"
                  >
                    {hero.scrollCta}
                  </ScrollButton>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <SolutionsHeroLens />
              </div>
            </div>
          </div>
        </section>

        {/* The problem: everyone sees a different gap */}
        <section id="perspectives" className="py-24 lg:py-36 bg-surface border-y border-border/60">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="max-w-3xl mb-16">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {problemSection.title}
              </h2>
              <p className="text-navy-500 text-lg sm:text-xl mt-5 leading-relaxed">
                {problemSection.lede}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {perspectives.map((p) => {
                const tone = perspectiveTone[p.palette];
                return (
                  <div
                    key={p.id}
                    className={`rounded-2xl bg-surface-elevated border border-border ${tone.hover} transition-colors flex flex-col justify-between h-full overflow-hidden`}
                  >
                    <div className={`h-1 w-full ${tone.rule}`} />
                    <div className="p-8 sm:p-10 flex flex-col flex-1">
                      <div>
                        <p className="font-serif text-2xl sm:text-3xl text-navy font-normal leading-snug">
                          &ldquo;{p.quote}&rdquo;
                        </p>
                        <p className="mt-3 text-sm text-navy-500">{p.audience}</p>
                      </div>
                      <div className="mt-8 pt-6 border-t border-border/60 space-y-4">
                        <p className="text-navy-500 text-sm sm:text-base leading-relaxed">
                          {p.body}
                        </p>
                        <div className="flex items-baseline justify-between gap-4 pt-1 border-t border-border/50">
                          <span className="text-sm text-navy-500 pt-3">{p.chipLabel}</span>
                          <span className="text-sm font-medium text-navy pt-3">{p.chipValue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* The connection: organization lens */}
        <section className="py-24 lg:py-36">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="max-w-3xl mb-14 sm:mb-16">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {connectionSection.title}
              </h2>
              <p className="text-navy-500 text-lg sm:text-xl mt-5 leading-relaxed">
                {connectionSection.lede}
              </p>
            </div>

            <OrganizationLens />
          </div>
        </section>

        {/* One chapter per audience */}
        {chapters.map((chapter) => {
          const tone = chapterTone[chapter.palette];
          return (
            <section key={chapter.id} className={`py-24 lg:py-36 ${tone.section}`}>
              <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  <div className="lg:col-span-5 space-y-5 lg:pr-4">
                    <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                      {chapter.title}
                    </h2>
                    <p className="text-sm text-navy-500">{chapter.audience}</p>
                    <p className="font-serif text-xl sm:text-2xl text-navy leading-snug">
                      {chapter.deck}
                    </p>
                    <p className="text-navy-500 text-base sm:text-lg leading-relaxed">
                      {chapter.body}
                    </p>

                    <div className="pt-4">
                      <Link
                        href={chapter.href}
                        className={`inline-flex items-center gap-2 text-sm font-medium transition-colors group ${tone.link}`}
                      >
                        <span>{chapter.linkLabel}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Sequence panel */}
                  <div className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-border ${tone.panel}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-3 pb-4 border-b border-border/60">
                      <span className="text-sm font-semibold text-navy-500">
                        {chapter.sequenceTitle}
                      </span>
                      <SampleDataBadge />
                    </div>
                    <div className="mt-5 space-y-3.5">
                      {chapter.steps.map((item, i) => (
                        <div key={item.step} className={`flex items-start gap-4 p-4 rounded-xl border ${tone.inner}`}>
                          <span className="font-mono text-sm tabular text-navy-500 shrink-0 pt-0.5">
                            {i + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-navy">{item.step}</div>
                            <div className="text-sm text-navy-500 leading-relaxed mt-1 break-words">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* The common thread */}
        <section className="section-dark py-24 lg:py-36 bg-navy text-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="max-w-3xl mb-16">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal leading-tight tracking-[-0.025em]">
                {threadSection.title}
              </h2>
              <p className="text-white/70 text-lg sm:text-xl mt-5 leading-relaxed">
                {threadSection.lede}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {threadCards.map((card) => (
                <div key={card.label} className="p-6 sm:p-7 rounded-2xl bg-[#0B1424] border border-white/10 flex flex-col justify-between h-full">
                  <div>
                    <div className="font-serif text-lg text-white mb-2 leading-snug">{card.title}</div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-white/10 space-y-1">
                    <span className="block text-sm text-white/60">{card.label}</span>
                    <span className="block text-sm text-white/60">{card.when}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The system, as an ordered cycle */}
        <section className="py-24 lg:py-36 bg-surface border-b border-border/60">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="max-w-3xl mb-14">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em]">
                {systemSection.title}
              </h2>
              <p className="text-navy-500 text-lg sm:text-xl mt-5 leading-relaxed">
                {systemSection.lede}
              </p>
            </div>

            <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
              {systemSection.steps.map((step, idx) => (
                <li key={step} className="p-5 rounded-2xl bg-surface-elevated border border-border">
                  <span className="font-mono text-sm tabular text-navy-500 block">
                    {idx + 1} of {systemSection.steps.length}
                  </span>
                  <span className="mt-2 block text-sm font-medium text-navy leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* The key insight */}
        <section className="py-36 lg:py-52 bg-[#FAFAF8]">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="max-w-4xl space-y-6">
              <p className="font-serif text-[length:var(--text-display)] font-normal text-navy-400 tracking-[-0.025em] leading-tight">
                {insightSection.kicker}
              </p>
              <h2 className="font-serif text-[length:var(--text-hero)] font-normal text-navy tracking-[-0.025em] leading-[1.04]">
                {insightSection.title}
              </h2>
              <p className="text-navy-500 text-xl sm:text-2xl max-w-2xl pt-2 leading-relaxed">
                {insightSection.lede}
              </p>
            </div>
          </div>
        </section>

        {/* Solution index */}
        <section className="py-24 lg:py-36 bg-surface border-y border-border/60">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em]">
                {indexSection.title}
              </h2>
              <p className="font-mono text-sm tabular text-navy-500">
                {indexSection.count}
              </p>
            </div>

            <div className="border-t border-border">
              {indexSection.rows.map((item) => (
                <Link
                  key={item.num}
                  href={item.href}
                  className="py-6 sm:py-7 border-b border-border/70 hover:border-accent/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-sm tabular text-navy-500 shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-navy group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-navy-500 text-sm sm:text-base mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-navy-500 group-hover:text-accent transition-colors shrink-0">
                    <span>Read this page</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Outcome and closing call to action */}
        <section className="section-dark py-28 lg:py-44 bg-navy text-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <h2 className="font-serif text-[length:var(--text-hero)] font-normal tracking-[-0.025em] leading-[1.05] mb-12 max-w-3xl">
              {outcomeSection.title}
            </h2>

            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 max-w-4xl mb-16 border-t border-white/15 pt-8">
              {outcomeSection.cards.map((card) => (
                <div key={card.label}>
                  <dt className="text-sm text-white/60">{card.label}</dt>
                  <dd className="mt-1 font-serif text-xl text-white leading-snug">{card.line}</dd>
                </div>
              ))}
            </dl>

            <MagneticButton
              href={outcomeSection.cta.href}
              className="btn-primary text-base px-10 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-medium inline-flex items-center justify-center gap-3 transition-colors cursor-pointer group"
              strength={0.25}
            >
              <span>{outcomeSection.cta.label}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
