import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollButton from "@/components/ScrollButton";
import ManagerCockpit from "@/components/skillar/ManagerCockpit";
import SampleDataBadge from "@/components/SampleDataBadge";
import {
  meta,
  hero,
  heroStats,
  teamViewSection,
  loopSection,
  loopPhases,
  capabilitiesSection,
  capabilities,
  nextChapter,
} from "@/content/solutions/managers";
import {
  ArrowRight,
  Target,
  Users,
  Clock,
} from "lucide-react";

export const metadata = {
  title: meta.title,
  description: meta.description,
};

const statIcons = { users: Users, clock: Clock, target: Target } as const;

const statTone: Record<string, string> = {
  users: "text-indigo-600",
  clock: "text-emerald-600",
  target: "text-accent",
};

const phaseChip = {
  alert: "text-rose-700 border-rose-300",
  neutral: "text-navy-500 border-border",
  positive: "text-emerald-700 border-emerald-300",
} as const;

const capabilityTone = {
  indigo: "text-indigo-600",
  emerald: "text-emerald-700",
  purple: "text-purple-700",
} as const;

export default function ManagersSolutionsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-bg">

        {/* Hero */}
        <section className="pt-40 pb-16 lg:pt-48 lg:pb-24 border-b border-border">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 space-y-12">

            <div className="space-y-6 max-w-4xl">
              <h1 className="font-serif text-[length:var(--text-hero)] font-normal text-navy tracking-[-0.025em] leading-[1.04]">
                {hero.title}
              </h1>

              <p className="text-sm text-navy-500">{hero.audience}</p>

              <p className="text-lg sm:text-xl text-navy-600 max-w-2xl leading-relaxed">
                {hero.lede}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link href={hero.primaryCta.href} className="btn-primary group">
                  <span>{hero.primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <ScrollButton targetId={hero.secondaryCta.targetId} offset={80} className="btn-secondary">
                  {hero.secondaryCta.label}
                </ScrollButton>
              </div>
            </div>

            {/* What a manager actually gets */}
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 pt-6 border-t border-border">
              {heroStats.map((stat) => {
                const Icon = statIcons[stat.icon];
                return (
                  <div key={stat.label}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-serif text-2xl sm:text-3xl font-normal text-navy tracking-[-0.025em]">
                        {stat.value}
                      </span>
                      <Icon className={`w-5 h-5 shrink-0 ${statTone[stat.icon]}`} aria-hidden="true" />
                    </div>
                    <dt className="mt-3 text-sm font-semibold text-navy-500">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 text-sm text-navy-500 leading-relaxed">
                      {stat.sub}
                    </dd>
                  </div>
                );
              })}
            </dl>

          </div>
        </section>

        {/* The team view */}
        <section id="team-view" className="py-24 lg:py-32 bg-surface scroll-mt-24">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 space-y-10">

            <div className="max-w-3xl space-y-4">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {teamViewSection.title}
              </h2>
              <p className="text-navy-500 leading-relaxed max-w-prose">
                {teamViewSection.lede}
              </p>
            </div>

            <ManagerCockpit />

          </div>
        </section>

        {/* The loop a manager runs */}
        <section className="py-24 lg:py-32 bg-white border-t border-border/80">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

              {/* Left: sticky editorial lead */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
                <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-[1.1]">
                  {loopSection.title}
                </h2>

                <p className="text-navy-500 leading-relaxed">
                  {loopSection.lede}
                </p>

                <div className="border-t border-border pt-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold text-navy-500">{loopSection.note.heading}</span>
                    <span className="font-mono text-sm tabular text-navy">{loopSection.note.value}</span>
                  </div>
                  <p className="mt-2 text-sm text-navy-500 leading-relaxed">
                    {loopSection.note.body}
                  </p>
                </div>

                <Link href={loopSection.cta.href} className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors group">
                  <span>{loopSection.cta.label}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Right: the three phases */}
              <div className="lg:col-span-8 border border-border rounded-2xl bg-white divide-y divide-border/70 overflow-hidden">

                <div className="px-8 sm:px-10 py-4 flex flex-wrap items-baseline justify-between gap-3 bg-surface/60">
                  <span className="text-sm font-semibold text-navy-500">{loopSection.ledgerLabel}</span>
                  <SampleDataBadge />
                </div>

                <ol>
                  {loopPhases.map((phase, i) => (
                    <li key={phase.phase} className="p-8 sm:p-10 space-y-4 border-b border-border/70 last:border-b-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-mono text-sm tabular text-navy-500">
                          {i + 1} of {loopPhases.length}
                        </span>
                        <span className="text-sm text-navy-500">{phase.marker}</span>
                      </div>
                      <h3 className="font-serif text-[length:var(--text-subsection)] font-normal text-navy leading-snug">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-navy-500 leading-relaxed">
                        {phase.body}
                      </p>
                      <div className={`flex flex-wrap items-baseline justify-between gap-2 pt-3 border-t text-sm ${phaseChip[phase.tone]}`}>
                        <span>{phase.chipLeft}</span>
                        <span className="font-medium">{phase.chipRight}</span>
                      </div>
                    </li>
                  ))}
                </ol>

              </div>

            </div>

          </div>
        </section>

        {/* What a manager gets */}
        <section className="py-24 lg:py-32 bg-surface-warm border-t border-border-warm">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 space-y-12">

            <div className="max-w-3xl space-y-4">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {capabilitiesSection.title}
              </h2>
              <p className="text-navy-500 leading-relaxed max-w-prose">
                {capabilitiesSection.lede}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 border-t border-border-warm pt-10">
              {capabilities.map((card) => {
                const Icon = statIcons[card.icon];
                return (
                  <div key={card.title} className="space-y-4">
                    <Icon className={`w-6 h-6 ${capabilityTone[card.palette]}`} aria-hidden="true" />
                    <h3 className="font-serif text-2xl font-normal text-navy leading-snug">{card.title}</h3>
                    <p className="text-sm text-navy-500 leading-relaxed">
                      {card.body}
                    </p>
                    <p className="text-sm text-navy-500 pt-3 border-t border-border-warm">
                      {card.footnote}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Where to go next */}
        <section className="py-20 lg:py-32 border-t border-border/80 bg-surface/50">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="max-w-2xl">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy leading-[1.08] tracking-[-0.025em] text-balance">
                {nextChapter.statement}
              </h2>
              <p className="mt-4 text-sm text-navy-500">{nextChapter.label}</p>
              <Link
                href={nextChapter.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors group cursor-pointer"
              >
                <span>{nextChapter.cta}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
