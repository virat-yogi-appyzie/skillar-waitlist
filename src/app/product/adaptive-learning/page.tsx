import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextChapter from "@/components/NextChapter";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AdaptivePath from "@/components/skillar/AdaptivePath";
import {
  meta,
  hero,
  paths,
  branching,
  closing,
  nextChapter,
} from "@/content/product/adaptive-learning";

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function AdaptiveLearningPage() {
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

        {/* One roadmap each */}
        <section className="py-16 lg:py-24 bg-surface">
          <div className="container max-w-5xl">
            <div className="max-w-3xl mb-12">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {paths.title}
              </h2>
              <p className="text-navy-500 text-lg mt-4 leading-relaxed">
                {paths.lede}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdaptivePath variant="sarah" />
              <AdaptivePath variant="james" />
            </div>
          </div>
        </section>

        {/* What happens after a failed concept */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy mb-10 tracking-[-0.025em] leading-tight max-w-2xl">
              {branching.title}
            </h2>

            <ol className="border-t border-border">
              {branching.steps.map((step, i) => (
                <li key={step} className="flex items-baseline gap-5 py-5 border-b border-border/70">
                  <span className="font-mono text-sm tabular text-navy-500 shrink-0">
                    {i + 1} of {branching.steps.length}
                  </span>
                  <span className="text-navy leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>

            <p className="text-navy-500 leading-relaxed mt-8 max-w-2xl">
              {branching.mechanism}
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="py-16 lg:py-24 bg-surface">
          <div className="container max-w-3xl">
            <p className="font-serif text-2xl sm:text-3xl text-navy leading-snug mb-8 max-w-xl text-balance">
              {closing.statement}
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group"
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
