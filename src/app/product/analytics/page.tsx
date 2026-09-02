import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextChapter from "@/components/NextChapter";
import ScrollButton from "@/components/ScrollButton";
import { ArrowDown, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import EnterpriseCapabilityGraph from "@/components/analytics/EnterpriseCapabilityGraph";
import CohortVelocityHeatmap from "@/components/analytics/CohortVelocityHeatmap";
import StakeholderTelemetryExplorer from "@/components/analytics/StakeholderTelemetryExplorer";
import MagneticButton from "@/components/motion/MagneticButton";
import {
  meta,
  hero,
  maturity,
  metricShift,
  trajectory,
  closure,
  stakeholders,
  auditTrail,
  nextChapter,
  finalCta,
} from "@/content/product/analytics";

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function AnalyticsPage() {
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
                  targetId="evolution"
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

        {/* What gets measured */}
        <section className="py-24 lg:py-36 bg-surface border-y border-border/60">
          <div className="container max-w-5xl">
            <div className="max-w-3xl mb-14 sm:mb-16">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {maturity.title}
              </h2>
              <p className="text-navy-500 text-lg sm:text-xl mt-4 leading-relaxed">
                {maturity.lede}
              </p>
            </div>

            <ol className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-border border border-border rounded-2xl overflow-hidden">
              {maturity.stages.map((item, i) => (
                <li
                  key={item.stage}
                  className={`p-5 flex flex-col justify-between h-full ${
                    i >= 2 ? "bg-surface-elevated" : "bg-surface"
                  }`}
                >
                  <div>
                    <span className="font-mono text-sm tabular text-navy-500 block">
                      {i + 1} of {maturity.stages.length}
                    </span>
                    <h3 className="font-serif text-lg font-normal text-navy mt-2">{item.stage}</h3>
                    <p className="text-sm text-navy-500 mt-1 leading-snug">{item.desc}</p>
                  </div>
                  <p className="text-sm text-navy-500 mt-4 pt-3 border-t border-border/60">
                    {item.status}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What to report instead */}
        <section className="py-24 lg:py-36">
          <div className="container max-w-5xl">
            <div className="max-w-3xl mb-14 sm:mb-16">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {metricShift.title}
              </h2>
              <p className="text-navy-500 text-lg sm:text-xl mt-4 leading-relaxed">
                {metricShift.lede}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 sm:p-10 rounded-2xl bg-surface border border-border">
                <div className="flex items-baseline justify-between gap-3 pb-4 mb-6 border-b border-border">
                  <span className="text-sm font-semibold text-rose-700">
                    {metricShift.oldHeading}
                  </span>
                  <span className="text-xs text-navy-500 shrink-0">{metricShift.oldTag}</span>
                </div>

                <ul className="space-y-5">
                  {metricShift.oldMetrics.map((m) => (
                    <li key={m.name}>
                      <div className="flex items-center gap-2.5 text-navy-500 text-sm">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span className="line-through">{m.name}</span>
                      </div>
                      <p className="text-sm text-navy-500 mt-1 pl-6 leading-relaxed">{m.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 sm:p-10 rounded-2xl bg-surface-elevated border border-accent/30">
                <div className="flex items-baseline justify-between gap-3 pb-4 mb-6 border-b border-border">
                  <span className="text-sm font-semibold text-accent">
                    {metricShift.newHeading}
                  </span>
                  <span className="text-xs text-navy-500 shrink-0">
                    {metricShift.newTag}
                  </span>
                </div>

                <ul className="space-y-5">
                  {metricShift.newMetrics.map((m) => (
                    <li key={m.name}>
                      <div className="flex items-center gap-2.5 text-navy font-medium text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{m.name}</span>
                      </div>
                      <p className="text-sm text-navy-500 mt-1 pl-6 leading-relaxed">{m.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-navy-500 leading-relaxed max-w-2xl mt-10">
              {auditTrail}
            </p>
          </div>
        </section>

        {/* Assessed scores over time */}
        <section id="evolution" className="py-24 lg:py-36 bg-surface border-y border-border/60">
          <div className="container max-w-6xl">
            <div className="max-w-3xl mb-14 sm:mb-16">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {trajectory.title}
              </h2>
              <p className="text-navy-500 text-lg sm:text-xl mt-4 leading-relaxed">
                {trajectory.lede}
              </p>
            </div>

            <EnterpriseCapabilityGraph />
          </div>
        </section>

        {/* Before and after */}
        <section className="py-24 lg:py-36">
          <div className="container max-w-6xl">
            <div className="max-w-3xl mb-14 sm:mb-16">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {closure.title}
              </h2>
              <p className="text-navy-500 text-lg sm:text-xl mt-4 leading-relaxed">
                {closure.lede}
              </p>
            </div>

            <CohortVelocityHeatmap />
          </div>
        </section>

        {/* Three views */}
        <section className="py-24 lg:py-36 bg-surface border-y border-border/60">
          <div className="container max-w-6xl">
            <div className="max-w-3xl mb-14 sm:mb-16">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {stakeholders.title}
              </h2>
              <p className="text-navy-500 text-lg sm:text-xl mt-4 leading-relaxed">
                {stakeholders.lede}
              </p>
            </div>

            <StakeholderTelemetryExplorer />
          </div>
        </section>

        <NextChapter
          statement={nextChapter.statement}
          label={nextChapter.label}
          href={nextChapter.href}
          cta={nextChapter.cta}
        />

        {/* Closing */}
        <section className="section-dark py-24 lg:py-36 bg-navy text-white">
          <div className="container max-w-4xl">
            <h2 className="font-serif text-[length:var(--text-display)] font-normal tracking-[-0.025em] leading-[1.08] mb-8 max-w-2xl">
              {finalCta.title}
            </h2>
            <p className="text-white/70 text-lg sm:text-xl max-w-xl mb-12 leading-relaxed">
              {finalCta.body}
            </p>
            <MagneticButton
              href="/demo"
              className="btn-primary text-base px-10 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-medium inline-flex items-center justify-center gap-3 transition-all cursor-pointer group"
              strength={0.25}
            >
              <span>{finalCta.buttonLabel}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
