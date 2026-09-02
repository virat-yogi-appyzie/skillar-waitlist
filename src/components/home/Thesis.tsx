import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Stands where testimonials would normally sit.
 *
 * Skillar is pre-launch, so there are no customers to quote. Leaving the hole
 * empty is worse than filling it honestly: a stated point of view is content no
 * competitor can copy, and it is the one place on the page that sounds like a
 * person rather than a product.
 */
export default function Thesis() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface-warm border-y border-border-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <blockquote className="space-y-6">
            <p className="font-serif text-[clamp(1.5rem,3.2vw,2.3rem)] font-normal text-navy leading-[1.28] tracking-[-0.015em]">
              Corporate learning measures the one thing it can count easily, which is
              hours, and calls it progress. Nobody believes it. L&amp;D teams know their
              completion dashboards do not answer whether anyone got better.
            </p>

            <p className="text-navy-600 text-lg leading-relaxed">
              We think the order is simply backwards. Content is not the hard part and has
              not been for a decade. The hard part is knowing, specifically and per person,
              what is missing, and being honest that a survey cannot tell you.
            </p>

            <p className="text-navy-600 text-lg leading-relaxed">
              So we started at the diagnosis instead of the catalogue. Everything else in
              the product follows from that one decision.
            </p>
          </blockquote>

          <div className="mt-10 pt-8 border-t border-border-warm flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <p className="text-sm text-navy-500 max-w-md leading-relaxed">
              We are pre-launch and onboarding design partners. If this matches something you
              have been arguing internally, we would like to talk.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 shrink-0">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors group"
              >
                Talk to us about a pilot
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-navy-500 hover:text-navy transition-colors underline underline-offset-4"
              >
                Read the full argument
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
