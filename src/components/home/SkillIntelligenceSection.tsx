import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CapabilityMap from "@/components/skillar/CapabilityMap";
import { skillIntelligence } from "@/content/home";

/**
 * The one place on the page where product UI appears: the interactive
 * capability map. Everything around it stays quiet so the map is the event.
 */
export default function SkillIntelligenceSection() {
  return (
    <section className="py-20 lg:py-32 bg-bg border-t border-border/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Statement & Value Props */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy leading-tight tracking-[-0.025em] mb-6 text-balance">
              {skillIntelligence.heading}
            </h2>

            <p className="text-navy-600 text-lg leading-relaxed max-w-lg mb-8">
              {skillIntelligence.lede}
            </p>

            <dl className="space-y-5 mb-8 border-t border-border pt-6 max-w-lg">
              {skillIntelligence.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="font-medium text-navy">{h.label}</dt>
                  <dd className="text-navy-500 leading-relaxed mt-1">{h.body}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/product/skill-intelligence"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group"
            >
              <span>{skillIntelligence.cta}</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </div>

          {/* Right: Capability Map Drill-Down */}
          <div className="lg:col-span-7">
            <CapabilityMap />
          </div>
        </div>
      </div>
    </section>
  );
}
