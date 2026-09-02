import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HumanSystemConvergence from "@/components/visual/HumanSystemConvergence";
import ScrollButton from "@/components/ScrollButton";
import { ArrowRight, ArrowDown } from "lucide-react";
import { meta, hero, theses, closing } from "@/content/about";

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-bg">
        {/* Hero, with the convergence diagram alongside */}
        <section className="pt-36 pb-20 lg:pt-44 lg:pb-28 border-b border-border">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Left Column: Headline & Narrative */}
              <div className="lg:col-span-6 xl:col-span-6 space-y-6">
                <h1 className="font-serif text-[clamp(2.5rem,4.8vw,4.25rem)] font-normal text-navy leading-[1.06] tracking-[-0.025em]">
                  {hero.title}
                </h1>

                <p className="text-sm text-navy-500">{hero.kicker}</p>

                <p className="text-navy-600 text-lg sm:text-xl leading-relaxed max-w-xl">
                  {hero.lede}
                </p>

                {/* Direct Action Anchors */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <ScrollButton
                    targetId="the-theses"
                    offset={90}
                    className="py-3 px-5 rounded-xl bg-navy hover:bg-navy-950 text-white text-xs font-semibold transition-all duration-150 inline-flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>{hero.primaryCta}</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </ScrollButton>
                  <Link
                    href="/demo"
                    className="py-3 px-5 rounded-xl bg-surface hover:bg-surface-elevated border border-border text-navy-800 text-xs font-semibold transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>{hero.secondaryCta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Wide Convergence Architecture Card */}
              <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
                <div className="w-full max-w-[540px] xl:max-w-[580px]">
                  <HumanSystemConvergence className="w-full shadow-2xl" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* The three theses */}
        <section id="the-theses" className="py-24 lg:py-36 bg-surface scroll-mt-20">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <ol className="max-w-4xl mx-auto space-y-28 lg:space-y-36">
              {theses.map((thesis, idx) => (
                <li key={thesis.label} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                  <div className="md:col-span-4">
                    <span className="font-mono text-sm tabular text-navy-500 block">
                      {idx + 1} of {theses.length}
                    </span>
                    <span className="text-sm text-navy-500 block mt-1">
                      {thesis.label}
                    </span>
                  </div>
                  <div className="md:col-span-8 space-y-6">
                    <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-normal text-navy tracking-[-0.025em] leading-tight">
                      {thesis.title}
                    </h2>
                    <div className="text-navy-600 space-y-5 text-lg sm:text-xl leading-relaxed">
                      {thesis.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="section-dark py-24 lg:py-36 bg-navy text-white text-center">
          <div className="w-full max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
            <h2 className="font-serif text-[clamp(2.25rem,4.5vw,4rem)] font-normal text-white tracking-[-0.025em] leading-[1.08] text-balance">
              {closing.title}
            </h2>
            <p className="text-white/70 text-xl sm:text-2xl max-w-2xl mx-auto">
              {closing.lede}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/demo"
                className="py-3.5 px-7 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all duration-150 inline-flex items-center gap-2 shadow-btn hover:shadow-btn-hover"
              >
                <span>{closing.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/skills-gap-diagnostic"
                className="py-3.5 px-7 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold transition-all duration-150 inline-flex items-center gap-2"
              >
                <span>{closing.secondaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
