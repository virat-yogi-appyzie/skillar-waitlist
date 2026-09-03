import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { finalCta } from "@/content/home";

/**
 * Quiet close. The heading deliberately bookends the hero's promise; nothing
 * decorative competes with the two buttons.
 */
export default function FinalCTA() {
  return (
    <section className="section-dark bg-navy py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-serif text-[clamp(2.4rem,5.5vw,4.25rem)] font-normal leading-[1.05] tracking-[-0.028em] text-white text-balance">
            {finalCta.heading}
          </h2>

          <p className="mt-6 text-lg sm:text-xl max-w-xl text-white/70 leading-relaxed">
            {finalCta.lede}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/skills-gap-diagnostic" className="btn-primary group">
              <span>{finalCta.primaryCta}</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
            <Link
              href="/demo"
              className="px-7 py-3 rounded-full text-sm font-medium text-white/90 bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-white/35 transition-colors duration-200 inline-flex items-center gap-2 group"
            >
              <span>{finalCta.secondaryCta}</span>
              <ArrowRight className="w-4 h-4 text-white/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
