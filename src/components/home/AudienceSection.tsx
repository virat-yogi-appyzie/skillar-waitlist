import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { audiences } from "@/content/home";

/**
 * Who the evidence serves: one row per chair at the table, each with the one
 * sentence that chair cares about and the door to its solutions page.
 *
 * The photography sits as a full-width pair rather than beside the heading:
 * a two-column grid strands a short heading next to a tall image, so the
 * heading keeps its own measure and the images share one band beneath it.
 * The heatmap chip is abstract on purpose; no fabricated numbers.
 */
export default function AudienceSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface-elevated border-y border-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy leading-tight tracking-[-0.025em] text-balance">
            {audiences.heading}
          </h2>
          <p className="mt-5 text-lg text-navy-600 leading-relaxed max-w-2xl">
            {audiences.lede}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative sm:col-span-2 aspect-[16/10] overflow-hidden rounded-2xl shadow-card">
            <Image
              src="/photos/home/team.jpg"
              alt="A team lead talking with technicians beside a production line"
              fill
              sizes="(min-width: 640px) 62vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="chip-float absolute bottom-4 left-4 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-[0_2px_6px_rgba(7,17,31,0.16),0_14px_30px_-10px_rgba(7,17,31,0.4)]"
            >
              <span className="flex gap-1">
                <span className="h-2.5 w-2.5 rounded-[3px] bg-emerald-500" />
                <span className="h-2.5 w-2.5 rounded-[3px] bg-emerald-500" />
                <span className="h-2.5 w-2.5 rounded-[3px] bg-amber-500" />
                <span className="h-2.5 w-2.5 rounded-[3px] bg-rose-500" />
                <span className="h-2.5 w-2.5 rounded-[3px] bg-emerald-500" />
              </span>
              <span className="text-[13px] font-medium text-navy">Team heatmap</span>
            </div>
          </div>

          <div className="relative aspect-[16/10] sm:aspect-auto overflow-hidden rounded-2xl shadow-card">
            <Image
              src="/photos/home/compliance.jpg"
              alt="A banking compliance professional in a modern office"
              fill
              sizes="(min-width: 640px) 31vw, 100vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {audiences.rows.map((row) => (
            <div
              key={row.href}
              className="border-t border-border-warm py-8 flex flex-col gap-3"
            >
              <h3 className="font-serif text-xl text-navy">{row.label}</h3>
              <p className="text-navy-600 leading-relaxed max-w-md">{row.body}</p>
              <Link
                href={row.href}
                className="mt-1 inline-flex w-fit items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors group"
              >
                {row.linkLabel}
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
