import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollButton from "@/components/ScrollButton";
import {
  meta,
  hero,
  heroStats,
  loopSection,
  loopStages,
  nextChapter,
} from "@/content/solutions/learning-development";
import {
  Sparkles,
  Layers,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: meta.title,
  description: meta.description,
};

const statIcons = { book: BookOpen, layers: Layers, sparkles: Sparkles } as const;

const statTone: Record<string, string> = {
  book: "text-accent",
  layers: "text-indigo-600",
  sparkles: "text-emerald-600",
};

export default function LearningDevelopmentSolutionsPage() {
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

            {/* What an L&D team actually gets */}
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

        {/* The loop */}
        <section id="loop" className="py-24 lg:py-32 bg-surface scroll-mt-24">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 space-y-12">

            <div className="max-w-3xl space-y-4">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {loopSection.title}
              </h2>
              <p className="text-navy-500 leading-relaxed max-w-prose">
                {loopSection.lede}
              </p>
            </div>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 border-t border-border pt-10">
              {loopStages.map((stage) => (
                <li key={stage.id} className="space-y-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-sm tabular text-navy-500">
                      {stage.step} of {loopStages.length}
                    </span>
                    <span className={`text-sm font-semibold ${stage.color}`}>{stage.label}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-navy leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-navy-500 leading-relaxed">
                    {stage.desc}
                  </p>
                  <p className="text-sm text-navy-500 pt-3 border-t border-border">
                    {stage.footnote}
                  </p>
                </li>
              ))}
            </ol>

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
