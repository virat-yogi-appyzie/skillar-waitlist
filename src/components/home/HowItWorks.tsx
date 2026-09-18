import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { howItWorks } from "@/content/home";
import Reveal from "@/components/home/Reveal";

/**
 * The product in four steps, each one showing what it actually produces.
 *
 * Iteration 08 first shipped this as four one-word headings (Test / Find /
 * Fix / Prove) over plain body text on bare white. Feedback was that it read
 * as a footnote after the dark band above it, that the four words were too
 * abstract to carry meaning alone, and that it needed to be seen rather than
 * read. So each step now states its action in full and carries a small
 * rendering of its own output: the scheduled test, the two flagged concepts,
 * the four-step plan, the before-and-after scores.
 *
 * The four visuals are deliberately different from each other, so these are
 * four distinct objects rather than one card template repeated. Their numbers
 * are the same ones the Rohit story uses further down the page, so nothing
 * here is a fabricated statistic.
 *
 * The authoring ledger underneath answers the obvious follow-up question
 * ("where does the material come from?") and absorbs what iteration 07
 * carried as a separate AI authoring section.
 */

const flagged = [
  { name: "Lockout ordering", held: false },
  { name: "Stored-energy checks", held: false },
  { name: "Isolation mapping", held: true },
  { name: "Permit handover", held: true },
] as const;

const planSteps = ["Lockout sequence", "Stored energy", "Worked examples", "Re-assessment"] as const;

function StepVisual({ kind }: { kind: (typeof howItWorks.steps)[number]["visual"] }) {
  switch (kind) {
    case "test":
      return (
        <div className="rounded-xl bg-surface-elevated border border-border p-4">
          <p className="text-[13px] font-medium text-navy">Machine safety</p>
          <p className="mt-0.5 text-xs text-navy-500">Every quarter</p>
          <div className="mt-3 flex gap-1.5" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="h-6 flex-1 rounded-[3px] bg-navy/10" />
            ))}
          </div>
        </div>
      );
    case "flag":
      return (
        <ul className="rounded-xl bg-surface-elevated border border-border p-4 space-y-2">
          {flagged.map((f) => (
            <li key={f.name} className="flex items-center justify-between gap-2">
              <span
                className={`text-[13px] ${f.held ? "text-navy-400" : "text-navy font-medium"}`}
              >
                {f.name}
              </span>
              <span
                className={`text-[10px] shrink-0 rounded-full px-2 py-0.5 ${
                  f.held
                    ? "text-navy-400"
                    : "text-rose-700 bg-rose-50 border border-rose-200"
                }`}
              >
                {f.held ? "held" : "missing"}
              </span>
            </li>
          ))}
        </ul>
      );
    case "plan":
      return (
        <ol className="rounded-xl bg-surface-elevated border border-border p-4 space-y-2.5">
          {planSteps.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span className="font-mono text-[11px] tabular text-navy-400">{i + 1}</span>
              <span className="text-[13px] text-navy">{s}</span>
            </li>
          ))}
        </ol>
      );
    case "proof":
      return (
        <div className="rounded-xl bg-surface-elevated border border-border p-4 space-y-4">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-navy-500">Before</span>
              <span className="font-mono text-lg tabular text-rose-600 leading-none">64</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-navy/10" aria-hidden="true">
              <div className="h-full rounded-full bg-rose-500" style={{ width: "64%" }} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-navy-500">After</span>
              <span className="font-mono text-lg tabular text-emerald-600 leading-none">91</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-navy/10" aria-hidden="true">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: "91%" }} />
            </div>
          </div>
        </div>
      );
  }
}

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-bg-warm border-b border-border-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
            {howItWorks.heading}
          </h2>
          <p className="mt-5 text-navy-600 text-lg leading-relaxed">{howItWorks.lede}</p>
        </div>

        <ol className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="h-full">
              <Reveal delay={i * 110} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-surface-warm p-6 flex flex-col gap-5 shadow-card">
                  <div>
                    <span className="font-mono text-sm tabular text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-serif text-[1.6rem] font-normal text-navy leading-tight text-balance">
                      {step.title}
                    </h3>
                  </div>
                  <StepVisual kind={step.visual} />
                  <p className="text-sm text-navy-500 leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start border-t border-border pt-10">
          <div className="lg:col-span-5">
            <h3 className="font-serif text-[length:var(--text-section)] font-normal text-navy tracking-[-0.02em] leading-snug text-balance">
              {howItWorks.authoring.heading}
            </h3>
            <p className="mt-4 text-navy-600 leading-relaxed max-w-lg">
              {howItWorks.authoring.body}
            </p>
            <Link
              href={howItWorks.authoring.href}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group"
            >
              <span>{howItWorks.authoring.cta}</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </div>

          {/* The ledger states the transformation the paragraph describes:
              a document family on the left, what Skillar drafts from it on
              the right. Both columns are labelled once at the top, at every
              breakpoint. An earlier revision hid the right-hand label above
              sm, which left the output column with no header on desktop. */}
          <div className="lg:col-span-7">
            <dl className="grid grid-cols-2 gap-x-6 sm:gap-x-10">
              <dt className="text-xs font-semibold text-navy-400 uppercase tracking-wide pb-3 border-b border-navy/20">
                You upload
              </dt>
              <dd className="text-xs font-semibold text-accent uppercase tracking-wide pb-3 border-b border-navy/20">
                Skillar drafts
              </dd>

              {howItWorks.authoring.pipeline.map((row) => (
                <Fragment key={row.from}>
                  <dt className="text-navy-500 leading-relaxed py-5 border-b border-border/70">
                    {row.from}
                  </dt>
                  <dd className="text-navy leading-relaxed py-5 border-b border-border/70 flex items-start gap-3">
                    <ArrowRight
                      className="hidden sm:block w-4 h-4 text-accent mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{row.to}</span>
                  </dd>
                </Fragment>
              ))}
            </dl>

            <div className="mt-8 flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </span>
              <p className="text-sm text-navy-600 leading-relaxed">
                Nothing reaches a learner until one of your experts approves the draft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
