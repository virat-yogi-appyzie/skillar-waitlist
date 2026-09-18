"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroField from "@/components/home/HeroField";
import { hero } from "@/content/home";

/**
 * Chapter one. Iteration 09 rebuilds the lockup as a centered composition:
 * word-masked headline with the claim set apart in accent italic, lede and
 * CTA pair on the same axis, and a three-fact strip whose every claim is
 * made elsewhere on the site. The old left lockup ran the heading against
 * a mostly empty right half and stranded its small print in a far column.
 *
 * The field below is untouched, by explicit user preference: it pins while
 * the visitor's scroll performs the assessment, scattered marks springing
 * into scored columns, then the page releases. The manual toggle still
 * works; crossing the scrub boundary takes over again.
 *
 * On screens without the pin (below lg) the field flips as it enters the
 * viewport, so the same story tells itself untethered.
 */
export default function HeroSection() {
  const scrubRef = useRef<HTMLDivElement | null>(null);
  const [assessed, setAssessed] = useState(false);
  const lastAuto = useRef(false);

  useEffect(() => {
    const el = scrubRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress through the scrub container: 0 when its top hits the
      // viewport bottom, 1 when its bottom leaves the viewport top.
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      const next = p > 0.42;
      if (next !== lastAuto.current) {
        lastAuto.current = next;
        setAssessed(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const plainWords = hero.heading.plain.split(" ");

  return (
    <section className="relative bg-bg text-navy pt-32 pb-8 lg:pt-40 lg:pb-12 overflow-x-hidden [overflow-x:clip]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif font-normal text-navy tracking-[-0.028em] leading-[1.04] text-[clamp(2.5rem,6.8vw,5.5rem)] text-balance">
            {plainWords.map((word, i) => (
              <Fragment key={word + i}>
                <span className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
                  <span
                    className="inline-block hero-word"
                    style={{ animationDelay: `${100 + i * 70}ms` }}
                  >
                    {word}
                  </span>
                </span>{' '}
              </Fragment>
            ))}
            <span className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
              <span
                className="inline-block hero-word font-serif italic text-accent"
                style={{ animationDelay: `${100 + plainWords.length * 70 + 60}ms` }}
              >
                {hero.heading.accent}
              </span>
            </span>
          </h1>

          <div className="hero-below">
            <p className="mt-7 text-lg sm:text-xl text-navy-600 leading-relaxed max-w-2xl mx-auto">
              {hero.lede}
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/skills-gap-diagnostic" className="btn-primary group">
                <span>{hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/demo" className="btn-secondary group">
                <span>{hero.secondaryCta}</span>
              </Link>
            </div>

            <p className="mt-4 text-sm text-navy-500">{hero.smallPrint}</p>

            <dl className="mt-10 grid grid-cols-3 divide-x divide-border-warm max-w-2xl mx-auto">
              {hero.facts.map((fact) => (
                <div key={fact.label} className="px-3 sm:px-6 text-center">
                  <dd className="font-serif text-3xl sm:text-4xl text-navy leading-none">
                    {fact.value}
                    {fact.unit && (
                      <span className="ml-1 font-sans text-base font-semibold text-accent align-baseline">
                        {fact.unit}
                      </span>
                    )}
                  </dd>
                  <dt className="mt-2 text-[13px] text-navy-500 leading-snug">
                    {fact.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Scrub chapter: tall on desktop so the pinned field plays the
            assessment as the visitor scrolls through it. 106vh rather than a
            rounder number: the last few percent of the old 112vh track were
            dead scroll after the columns had already settled. */}
        <div ref={scrubRef} className="mt-12 lg:mt-16 lg:h-[106vh]">
          <div className="lg:sticky lg:top-24 hero-console">
            <HeroField assessed={assessed} onAssessedChange={setAssessed} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-word {
          animation: heroRise 800ms var(--ease-premium) both;
          will-change: transform;
        }
        .hero-below {
          animation: heroFade 700ms var(--ease-premium) 520ms both;
        }
        .hero-console {
          animation: heroFade 700ms var(--ease-premium) 700ms both;
        }
        @keyframes heroRise {
          from {
            opacity: 0;
            transform: translateY(110%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-word,
          .hero-below,
          .hero-console {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
