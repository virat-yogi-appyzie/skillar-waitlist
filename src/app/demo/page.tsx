"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqAccordion, { FaqItem } from "@/components/FaqAccordion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Check,
  Clock,
  ShieldCheck,
  Users2
} from "lucide-react";
import { submitDemoRequest } from "@/lib/actions";
import {
  hero,
  walkthroughSteps,
  form as formCopy,
  teamSizeOptions,
  focusOptions,
  faqSection,
  faqs,
} from "@/content/demo";

/* Accessible select: a button that opens a listbox of options. */
interface Option {
  value: string;
  label: string;
}

function ShadcnSelect({
  label,
  options,
  value,
  onChange,
  required = false,
}: {
  label: string;
  options: readonly Option[];
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-semibold text-navy-500 mb-1.5">
        {label} {required && "*"}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-3 rounded-xl bg-surface border text-sm text-left flex items-center justify-between transition-all duration-150 cursor-pointer ${
          open
            ? "border-accent ring-2 ring-accent/15 bg-white shadow-xs"
            : "border-border hover:border-navy-300 hover:bg-white"
        }`}
      >
        <span className="text-navy-900 font-medium truncate">
          {selectedOption ? selectedOption.label : "Select an option"}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-navy-500 transition-transform duration-200 shrink-0 ml-2 ${
            open ? "rotate-180 text-accent" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full rounded-xl bg-white border border-border shadow-xl py-1.5 max-h-60 overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-100">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full px-3.5 py-2.5 text-xs text-left flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-navy-700 hover:bg-surface hover:text-navy-950 font-normal"
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const demoFaqs: FaqItem[] = [...faqs];

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [teamSize, setTeamSize] = useState("1,000 - 5,000");
  const [focusArea, setFocusArea] = useState("Compliance & Certification");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const data = new FormData(e.currentTarget);
      const result = await submitDemoRequest({
        firstName: String(data.get("firstName") || ""),
        lastName: String(data.get("lastName") || ""),
        email: String(data.get("email") || ""),
        company: String(data.get("company") || ""),
        teamSize: teamSize,
        focusArea: focusArea,
      });

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || formCopy.errorFallback);
      }
    } catch {
      setError(formCopy.errorNetwork);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main id="main-content" className="bg-bg">
        {/* Hero: what the walkthrough covers, with the booking form alongside */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-border">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Headline and the three beats of the walkthrough */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <h1 className="font-serif text-[clamp(2.5rem,4.8vw,4.25rem)] font-normal text-navy leading-[1.04] tracking-[-0.025em]">
                    {hero.title}
                  </h1>

                  <p className="text-navy-600 text-lg sm:text-xl leading-relaxed font-normal max-w-2xl">
                    {hero.lede}
                  </p>
                </div>

                {/* The walkthrough, told as three numbered beats */}
                <ol className="pt-2 border-t border-border">
                  {walkthroughSteps.map((step, idx) => (
                    <li key={step.title} className="py-6 border-b border-border/70">
                      <span className="font-mono text-sm tabular text-navy-500">
                        {idx + 1} of {walkthroughSteps.length}
                      </span>
                      <h3 className="mt-2 font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em] leading-snug">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-navy-500 leading-relaxed max-w-xl">
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ol>

                {/* What the session costs you */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-navy-500">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="w-4 h-4 text-navy-400" />
                    {hero.trustSignals[0]}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-navy-400" />
                    {hero.trustSignals[1]}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Users2 className="w-4 h-4 text-navy-400" />
                    {hero.trustSignals[2]}
                  </span>
                </div>
              </div>

              {/* Right Column: Sticky Executive Booking Form */}
              <div className="lg:col-span-5 self-start lg:sticky lg:top-24">
                <div className="p-8 sm:p-9 rounded-2xl bg-white border border-border shadow-xl space-y-6">
                  {submitted ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-serif text-2xl text-navy font-normal tracking-[-0.02em]">
                        {formCopy.successTitle}
                      </h3>
                      <p className="text-sm text-navy-500 max-w-sm mx-auto leading-relaxed">
                        {formCopy.successBody}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h2 className="font-serif text-2xl text-navy font-normal tracking-[-0.02em] mb-1">
                          {formCopy.title}
                        </h2>
                        <p className="text-sm text-navy-500 leading-relaxed">
                          {formCopy.subtitle}
                        </p>
                      </div>

                      {error && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                          {error}
                        </div>
                      )}

                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-3.5">
                          <div>
                            <label htmlFor="demo-first-name" className="block text-sm font-semibold text-navy-500 mb-1.5">
                              {formCopy.fields.firstName} *
                            </label>
                            <input
                              id="demo-first-name"
                              type="text"
                              name="firstName"
                              autoComplete="given-name"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-sm text-navy placeholder:text-navy-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/15 transition-all"
                              placeholder={formCopy.placeholders.firstName}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="demo-last-name" className="block text-sm font-semibold text-navy-500 mb-1.5">
                              {formCopy.fields.lastName} *
                            </label>
                            <input
                              id="demo-last-name"
                              type="text"
                              name="lastName"
                              autoComplete="family-name"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-sm text-navy placeholder:text-navy-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/15 transition-all"
                              placeholder={formCopy.placeholders.lastName}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="demo-email" className="block text-sm font-semibold text-navy-500 mb-1.5">
                            {formCopy.fields.email} *
                          </label>
                          <input
                            id="demo-email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-sm text-navy placeholder:text-navy-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/15 transition-all"
                            placeholder={formCopy.placeholders.email}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="demo-company" className="block text-sm font-semibold text-navy-500 mb-1.5">
                            {formCopy.fields.company} *
                          </label>
                          <input
                            id="demo-company"
                            type="text"
                            name="company"
                            autoComplete="organization"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-sm text-navy placeholder:text-navy-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/15 transition-all"
                            placeholder={formCopy.placeholders.company}
                            required
                          />
                        </div>

                        {/* Custom Accessible Shadcn Dropdowns */}
                        <div className="space-y-4">
                          <ShadcnSelect
                            label={formCopy.fields.teamSize}
                            options={teamSizeOptions}
                            value={teamSize}
                            onChange={setTeamSize}
                            required
                          />
                          <ShadcnSelect
                            label={formCopy.fields.focus}
                            options={focusOptions}
                            value={focusArea}
                            onChange={setFocusArea}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-3.5 px-6 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-btn hover:shadow-btn-hover cursor-pointer disabled:opacity-60 mt-3"
                        >
                          <span>{submitting ? formCopy.submitting : formCopy.submit}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <p className="text-center text-xs text-navy-500">
                          {formCopy.footnote}
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Session logistics, answered */}
        <FaqAccordion
          items={demoFaqs}
          title={faqSection.title}
          description={faqSection.description}
          theme="surface"
        />
      </main>
      <Footer />
    </>
  );
}
