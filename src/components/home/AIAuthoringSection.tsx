import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aiAuthoring } from "@/content/home";

/**
 * Authoring, told as a plain from/to ledger of real document families rather
 * than a synthetic pipeline console: what goes in on the left, the learning
 * that comes out on the right, and the review gate stated underneath.
 */
export default function AIAuthoringSection() {
  return (
    <section className="py-20 lg:py-32 bg-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy leading-tight tracking-[-0.025em] mb-6 text-balance">
              {aiAuthoring.heading}
            </h2>

            <p className="text-navy-600 text-lg leading-relaxed max-w-lg mb-8">
              {aiAuthoring.lede}
            </p>

            <Link
              href="/product/ai-authoring"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group"
            >
              <span>{aiAuthoring.cta}</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <dl className="border-t border-border">
              {aiAuthoring.pipeline.map((row) => (
                <div
                  key={row.from}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-8 py-6 border-b border-border/70"
                >
                  <dt className="text-navy-500 leading-relaxed">
                    <span className="block text-xs font-semibold text-navy-400 uppercase tracking-wide mb-1.5">
                      You upload
                    </span>
                    {row.from}
                  </dt>
                  <dd className="text-navy leading-relaxed sm:flex sm:items-start sm:gap-3">
                    <ArrowRight className="hidden sm:block w-4 h-4 text-accent mt-1 shrink-0" aria-hidden="true" />
                    <span>
                      <span className="block text-xs font-semibold text-accent uppercase tracking-wide mb-1.5 sm:hidden">
                        Skillar drafts
                      </span>
                      {row.to}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-navy-500 leading-relaxed max-w-md">
              {aiAuthoring.reviewNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
