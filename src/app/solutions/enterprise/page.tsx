import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollButton from "@/components/ScrollButton";
import EnterpriseArchitectureCanvas from "@/components/skillar/EnterpriseArchitectureCanvas";
import SampleDataBadge from "@/components/SampleDataBadge";
import {
  meta,
  hero,
  heroStats,
  rollUpSection,
  competencies,
  architectureSection,
  governanceSection,
  governanceLedger,
  nextChapter,
} from "@/content/solutions/enterprise";
import {
  ShieldCheck,
  Lock,
  Server,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: meta.title,
  description: meta.description,
};

const statIcons = { server: Server, lock: Lock, shield: ShieldCheck } as const;

const statTone: Record<string, string> = {
  server: "text-indigo-600",
  lock: "text-emerald-600",
  shield: "text-accent",
};

const competencyTone = {
  rose: { pill: "text-rose-700 border-rose-300", fill: "bg-rose-600" },
  amber: { pill: "text-amber-700 border-amber-300", fill: "bg-amber-500" },
  emerald: { pill: "text-emerald-700 border-emerald-300", fill: "bg-emerald-500" },
} as const;

export default function EnterpriseSolutionsPage() {
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

            {/* Posture, stated plainly */}
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

        {/* From one person to the whole organisation */}
        <section className="py-24 lg:py-32 bg-surface">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

              <div className="lg:col-span-5 space-y-6">
                <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-[1.1]">
                  {rollUpSection.title}
                </h2>

                <p className="text-navy-500 leading-relaxed">
                  {rollUpSection.lede}
                </p>

                <div className="border-t border-border pt-5 space-y-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold text-navy-500">
                      {rollUpSection.card.heading}
                    </span>
                    <SampleDataBadge />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-full bg-navy-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[87%]" />
                    </div>
                    <span className="font-mono text-sm tabular text-emerald-700 shrink-0">
                      {rollUpSection.card.value}
                    </span>
                  </div>
                  <p className="text-sm text-navy-500 leading-relaxed">
                    {rollUpSection.card.body}
                  </p>
                </div>

                <Link href={rollUpSection.cta.href} className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors group">
                  <span>{rollUpSection.cta.label}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Drill-down panel */}
              <div className="lg:col-span-7 bg-white border border-border rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
                  <span className="font-serif text-xl text-navy">{rollUpSection.panel.title}</span>
                  <SampleDataBadge />
                </div>

                {/* Where in the organisation this record sits */}
                <nav aria-label="Roll-up path" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  {rollUpSection.panel.breadcrumb.map((crumb, i) => {
                    const isLast = i === rollUpSection.panel.breadcrumb.length - 1;
                    return (
                      <span key={crumb} className="flex items-center gap-2">
                        <span className={isLast ? "text-navy font-medium" : "text-navy-500"}>
                          {crumb}
                        </span>
                        {!isLast && (
                          <ArrowRight className="w-3.5 h-3.5 text-navy-300" aria-hidden="true" />
                        )}
                      </span>
                    );
                  })}
                </nav>

                {/* Tracked skills for this person */}
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between gap-3 text-sm text-navy-500 pb-2 border-b border-border">
                    <span>{rollUpSection.panel.columnLeft}</span>
                    <span>{rollUpSection.panel.columnRight}</span>
                  </div>

                  {competencies.map((c) => {
                    const tone = competencyTone[c.tone];
                    return (
                      <div key={c.name} className="space-y-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="text-sm text-navy">{c.name}</span>
                          <span className="flex items-baseline gap-2.5 shrink-0">
                            <span className={`text-xs border rounded-full px-2.5 py-0.5 ${tone.pill}`}>
                              {c.state}
                            </span>
                            <span className="font-mono text-sm tabular text-navy">{c.score}%</span>
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full overflow-hidden bg-navy-100">
                          <div className={`h-full rounded-full ${tone.fill}`} style={{ width: `${c.score}%` }} />
                        </div>
                      </div>
                    );
                  })}

                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-2 pt-4 border-t border-border text-sm text-navy-500">
                  <span>{rollUpSection.panel.footnote}</span>
                  <span>{rollUpSection.panel.footnoteRight}</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Data flow and access */}
        <section id="architecture" className="py-24 lg:py-32 bg-white border-t border-border/80 scroll-mt-24">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 space-y-10">

            <div className="max-w-3xl space-y-4">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {architectureSection.title}
              </h2>
              <p className="text-navy-500 leading-relaxed max-w-prose">
                {architectureSection.lede}
              </p>
            </div>

            <EnterpriseArchitectureCanvas />

          </div>
        </section>

        {/* Security and governance, stated honestly */}
        <section className="py-24 lg:py-32 bg-bg border-t border-border/80">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 space-y-10">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-4">
                <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                  {governanceSection.title}
                </h2>
                <p className="text-navy-500 leading-relaxed max-w-prose">
                  {governanceSection.lede}
                </p>
              </div>
              <Link
                href={governanceSection.cta.href}
                className="shrink-0 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors group"
              >
                <span>{governanceSection.cta.label}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* The control ledger */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[46rem] border-collapse text-left">
                <thead>
                  <tr>
                    <th className="w-[26%] py-3 pr-4 text-sm font-semibold text-navy-500 align-bottom border-b border-navy/20">
                      {governanceSection.columns.control}
                    </th>
                    <th className="w-[40%] py-3 px-4 text-sm font-semibold text-navy-500 align-bottom border-b border-navy/20">
                      {governanceSection.columns.covers}
                    </th>
                    <th className="w-[17%] py-3 px-4 text-sm font-semibold text-navy-500 align-bottom border-b border-navy/20">
                      {governanceSection.columns.status}
                    </th>
                    <th className="w-[17%] py-3 pl-4 text-sm font-semibold text-navy-500 align-bottom border-b border-navy/20 text-right">
                      {governanceSection.columns.scope}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {governanceLedger.map((row) => (
                    <tr key={row.control} className="align-top">
                      <td className="py-5 pr-4 border-b border-border">
                        <span className="text-sm font-medium text-navy leading-snug block">
                          {row.control}
                        </span>
                      </td>
                      <td className="py-5 px-4 border-b border-border">
                        <span className="text-sm text-navy-500 leading-relaxed block">
                          {row.covers}
                        </span>
                      </td>
                      <td className="py-5 px-4 border-b border-border">
                        <span className={`text-xs border rounded-full px-2.5 py-0.5 inline-block whitespace-nowrap ${
                          row.state === "current"
                            ? "text-emerald-700 border-emerald-300"
                            : "text-amber-700 border-amber-300"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-5 pl-4 border-b border-border text-right">
                        <span className="text-sm text-navy-500">{row.scope}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-navy-500 leading-relaxed max-w-3xl">
              {governanceSection.auditNote}
            </p>

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
