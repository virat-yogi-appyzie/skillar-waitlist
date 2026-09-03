"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroField from "@/components/home/HeroField";
import { hero } from "@/content/home";

/**
 * Chapter one of three pinned chapters. The editorial lockup opens the page;
 * the field below pins while the visitor's scroll performs the assessment:
 * scattered, unmeasured marks spring into scored columns as you scroll
 * through the chapter, then the page releases. The manual toggle still
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

  return (
    <section className="relative bg-bg text-navy pt-36 pb-8 lg:pt-44 lg:pb-12 overflow-x-hidden [overflow-x:clip]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl">
          <h1 className="font-serif font-normal text-navy tracking-[-0.028em] leading-[1.02] text-[clamp(2.6rem,7.5vw,6.25rem)] max-w-5xl">
            {hero.headingLines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  className="block hero-line"
                  style={{ animationDelay: `${120 + i * 110}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-10 lg:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-border-warm pt-8 hero-below">
            <div className="md:col-span-7 lg:col-span-5">
              <p className="text-lg sm:text-xl text-navy-600 leading-relaxed">
                {hero.lede}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/skills-gap-diagnostic" className="btn-primary group">
                  <span>{hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link href="/demo" className="btn-secondary group">
                  <span>{hero.secondaryCta}</span>
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 md:col-start-8 lg:col-start-9 lg:col-span-4">
              <p className="text-sm text-navy-500 leading-relaxed max-w-xs">
                {hero.smallPrint}
              </p>
            </div>
          </div>
        </div>

        {/* Scrub chapter: tall on desktop so the pinned field plays the
            assessment as the visitor scrolls through it. */}
        <div ref={scrubRef} className="mt-12 lg:mt-16 lg:h-[112vh]">
          <div className="lg:sticky lg:top-24 hero-console">
            <HeroField assessed={assessed} onAssessedChange={setAssessed} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-line {
          animation: heroRise 700ms var(--ease-premium) both;
        }
        .hero-below {
          animation: heroFade 600ms var(--ease-premium) 420ms both;
        }
        .hero-console {
          animation: heroFade 700ms var(--ease-premium) 650ms both;
        }
        @keyframes heroRise {
          from {
            opacity: 0;
            transform: translateY(105%);
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
          .hero-line,
          .hero-below,
          .hero-console {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
