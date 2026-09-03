import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollButton from "@/components/ScrollButton";
import TalentMobilityGraph from "@/components/skillar/TalentMobilityGraph";
import {
  meta,
  hero,
  heroStats,
  mobilitySection,
  visibilitySection,
  comparison,
  nextChapter,
} from "@/content/solutions/hr";
import {
  Users,
  ArrowRight,
  CheckCircle2,
  Layers,
  X,
} from "lucide-react";

export const metadata = {
  title: meta.title,
  description: meta.description,
};

const statIcons = { users: Users, layers: Layers, check: CheckCircle2 } as const;

const statTone: Record<string, string> = {
  users: "text-emerald-600",
  layers: "text-indigo-600",
  check: "text-accent",
};

export default function HRSolutionsPage() {
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

            {/* What HR actually gets */}
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

        {/* Internal mobility */}
        <section id="mobility" className="py-24 lg:py-32 bg-surface scroll-mt-24">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 space-y-10">

            <div className="max-w-3xl space-y-4">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {mobilitySection.title}
              </h2>
              <p className="text-navy-500 leading-relaxed max-w-prose">
                {mobilitySection.lede}
              </p>
            </div>

            <TalentMobilityGraph />

          </div>
        </section>

        {/* The visibility gap */}
        <section className="py-24 lg:py-32 bg-white border-t border-border/80">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

              <div className="lg:col-span-5 space-y-6">
                <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-[1.1]">
                  {visibilitySection.title}
                </h2>

                <p className="text-navy-500 leading-relaxed">
                  {visibilitySection.lede}
                </p>

                <div className="border-t border-border pt-5 space-y-2">
                  <span className="block text-sm font-semibold text-navy-500">
                    {visibilitySection.note.heading}
                  </span>
                  <p className="text-sm text-navy-500 leading-relaxed">
                    {visibilitySection.note.body}
                  </p>
                  <span className="inline-block text-xs text-navy-500 border border-border rounded-full px-2.5 py-0.5">
                    {visibilitySection.note.tag}
                  </span>
                </div>

                <Link href={visibilitySection.cta.href} className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors group">
                  <span>{visibilitySection.cta.label}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Before and after, side by side */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div className="p-8 rounded-2xl bg-surface border border-border flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <span className="inline-block text-xs text-rose-700 border border-rose-300 rounded-full px-2.5 py-0.5">
                      {comparison.before.badge}
                    </span>
                    <h3 className="font-serif text-xl text-navy font-normal">
                      {comparison.before.title}
                    </h3>
                    <ul className="space-y-2.5 text-sm text-navy-500">
                      {comparison.before.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-sm text-navy-500 pt-4 border-t border-border">
                    {comparison.before.footnote}
                  </div>
                </div>

                <div className="p-8 rounded-2xl bg-white border border-accent/40 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <span className="inline-block text-xs text-emerald-700 border border-emerald-300 rounded-full px-2.5 py-0.5">
                      {comparison.after.badge}
                    </span>
                    <h3 className="font-serif text-xl text-navy font-normal">
                      {comparison.after.title}
                    </h3>
                    <ul className="space-y-2.5 text-sm text-navy-500">
                      {comparison.after.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-sm text-emerald-700 pt-4 border-t border-border">
                    {comparison.after.footnote}
                  </div>
                </div>

              </div>

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
