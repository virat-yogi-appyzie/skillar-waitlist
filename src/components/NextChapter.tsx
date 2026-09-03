import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NextChapterProps {
  statement: string;
  label: string;
  href: string;
  cta: string;
}

/**
 * The bridge between two chapters. The label used to sit above the heading as
 * a mono kicker; it now reads as a plain line below it, so the heading is the
 * first thing on the page.
 */
export default function NextChapter({
  statement,
  label,
  href,
  cta,
}: NextChapterProps) {
  return (
    <section className="py-20 lg:py-32 border-t border-border/80 bg-surface/50">
      <div className="container max-w-4xl">
        <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy leading-[1.08] tracking-[-0.025em] mb-4 max-w-2xl text-balance">
          {statement}
        </h2>
        <p className="text-sm text-navy-500 mb-8">{label}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group cursor-pointer"
        >
          <span>{cta}</span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </Link>
      </div>
    </section>
  );
}
