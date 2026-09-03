import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextChapter from "@/components/NextChapter";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AuthoringPipeline from "@/components/skillar/AuthoringPipeline";
import {
  meta,
  hero,
  transformation,
  workflow,
  humanControl,
  nextChapter,
} from "@/content/product/ai-authoring";

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function AIAuthoringPage() {
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

        {/* From document to roadmap */}
        <section className="py-16 lg:py-24 bg-surface">
          <div className="container max-w-5xl">
            <div className="max-w-3xl mb-12">
              <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
                {transformation.title}
              </h2>
              <p className="text-navy-500 text-lg mt-4 leading-relaxed">
                {transformation.lede}
              </p>

              <div className="mt-6">
                <span className="text-sm font-semibold text-navy-500 block mb-2">
                  {transformation.contentTypesLabel}
                </span>
                <div className="flex flex-wrap gap-2">
                  {transformation.contentTypes.map((type) => (
                    <span
                      key={type}
                      className="px-2.5 py-1 rounded-full bg-white border border-border text-xs text-navy-600"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <AuthoringPipeline />
          </div>
        </section>

        {/* The creation workflow */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy mb-10 tracking-[-0.025em] leading-tight max-w-2xl">
              {workflow.title}
            </h2>
            <ol className="border-t border-border">
              {workflow.steps.map((item, i) => (
                <li
                  key={item.step}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 py-5 border-b border-border/70"
                >
                  <div className="sm:col-span-4 flex items-baseline gap-3">
                    <span className="font-mono text-sm tabular text-navy-500 shrink-0">
                      {i + 1} of {workflow.steps.length}
                    </span>
                    <h3 className="font-medium text-navy">{item.step}</h3>
                  </div>
                  <p className="sm:col-span-8 text-navy-500 leading-relaxed">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Human control */}
        <section className="py-16 lg:py-24 bg-surface">
          <div className="container max-w-3xl">
            <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy mb-6 tracking-[-0.025em] leading-tight">
              {humanControl.title}
            </h2>
            <p className="text-navy-500 text-lg leading-relaxed max-w-2xl mb-8">
              {humanControl.body}
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group"
            >
              {humanControl.cta}
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
