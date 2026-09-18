import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { problem } from "@/content/home";
import Reveal from "@/components/home/Reveal";

/**
 * The problem, said in three questions a visitor already recognizes, closed
 * by a full-bleed band.
 *
 * Iteration 08 replaces the pinned QuestionsChapter: user testing read the
 * dark data panels as "research paper". The hero field directly above already
 * shows unmeasured-versus-measured, so this section repeats nothing visual
 * and spends its space on three big plain questions instead.
 *
 * The band is the page's rhythm break. Eight container-width sections in a
 * row is what made the page read as one long document, so this one escapes
 * the container entirely and carries the auditor line, which was previously
 * an orphaned footnote sitting in dead space.
 *
 * Band photograph: Unsplash, https://images.unsplash.com/photo-1748256086767-8974ee677f77
 * (a technician checking written procedure against the actual plant, which is
 * the auditor's question in one picture).
 */
export default function ProblemSection() {
  return (
    <section className="bg-bg-stone border-t border-border-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Split header: the heading owns the left, the lede answers it from
            the right, and the row's whole width works. A single max-w-3xl
            block left the right half of the band empty. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-end">
          <h2 className="lg:col-span-7 font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight text-balance">
            {problem.heading}
          </h2>
          <p className="lg:col-span-5 text-navy-600 text-lg leading-relaxed lg:pb-2">
            {problem.lede}
          </p>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
          {problem.questions.map((item, i) => (
            <Reveal key={item.q} delay={i * 110}>
              <div className="border-t border-navy/20 pt-6">
                <h3 className="font-serif text-2xl sm:text-[1.7rem] font-normal text-navy leading-snug text-balance">
                  {item.q}
                </h3>
                <p className="mt-3 text-navy-500 leading-relaxed">{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Full-bleed band: paperwork coming off a machine, which is the
          section's argument in one picture. */}
      <Reveal>
        <div className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/photos/home/procedure-check.jpg"
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className="band-img object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#07111F]/95 via-[#07111F]/85 to-[#07111F]/55"
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-5xl">
              <p className="font-serif text-[clamp(1.6rem,3.6vw,3rem)] font-normal text-white leading-[1.2] tracking-[-0.02em] text-balance">
                {problem.footnote}
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors group underline underline-offset-4 decoration-white/30 hover:decoration-white/70"
              >
                {problem.aboutLink}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
