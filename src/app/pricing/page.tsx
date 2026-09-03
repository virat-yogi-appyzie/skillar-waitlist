"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqAccordion, { FaqItem } from "@/components/FaqAccordion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  RefreshCw,
  CheckCircle2,
  ChevronDown,
  Check,
  Sliders,
  type LucideIcon,
} from "lucide-react";
import { submitPricingQuoteRequest } from "@/lib/actions";
import {
  hero,
  estimator,
  scalePresets,
  tiersSection,
  tiers,
  standardsSection,
  valuePillars,
  quoteForm,
  workforceOptions,
  tierOptions,
  faqSection,
  faqs,
} from "@/content/pricing";

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

/* Icon bindings. The copy itself lives in src/content/pricing.ts. */

const pillarIcons: Record<(typeof valuePillars)[number]["id"], LucideIcon> = {
  seats: Zap,
  privacy: Lock,
  integrations: RefreshCw,
  reporting: ShieldCheck,
};

const pricingFaqs: FaqItem[] = [...faqs];

export default function PricingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // Interactive state
  const [activeScaleIndex, setActiveScaleIndex] = useState(1);
  const [workforceSize, setWorkforceSize] = useState("1,000 - 5,000");
  const [selectedTier, setSelectedTier] = useState("Global Enterprise");

  const currentPreset = scalePresets[activeScaleIndex];

  const handleSelectPreset = (index: number) => {
    setActiveScaleIndex(index);
    const preset = scalePresets[index];
    setWorkforceSize(preset.teamSizeVal);
    setSelectedTier(preset.recommendedTier);
  };

  const scrollToForm = (tierName: string, teamSize?: string) => {
    setSelectedTier(tierName);
    if (teamSize) setWorkforceSize(teamSize);
    const formElement = document.getElementById("quote-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const data = new FormData(e.currentTarget);
      const result = await submitPricingQuoteRequest({
        firstName: String(data.get("firstName") || ""),
        lastName: String(data.get("lastName") || ""),
        email: String(data.get("email") || ""),
        company: String(data.get("company") || ""),
        workforceSize: workforceSize,
        deploymentTier: selectedTier,
      });

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || quoteForm.errorFallback);
      }
    } catch {
      setError(quoteForm.errorNetwork);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main id="main-content" className="bg-bg">
        {/* Hero, with the scope estimator alongside */}
        <section className="pt-36 pb-16 lg:pt-44 lg:pb-24 border-b border-border">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Heading & Value Statement */}
              <div className="lg:col-span-7 space-y-6">
                <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4.75rem)] font-normal text-navy leading-[1.04] tracking-[-0.025em]">
                  {hero.title}
                </h1>

                <p className="text-navy-600 text-lg sm:text-xl leading-relaxed font-normal max-w-2xl">
                  {hero.lede}
                </p>

                <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-navy-500">
                  {hero.badges.map((badge) => (
                    <li key={badge}>{badge}</li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Interactive Deployment Matrix Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-white border border-border shadow-xl p-6 sm:p-7 space-y-5 relative overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3 border-b border-border/80 pb-4">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-navy-400" />
                      <span className="font-serif text-lg text-navy">
                        {estimator.title}
                      </span>
                    </div>
                    <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-xs text-navy-500">
                      {estimator.chip}
                    </span>
                  </div>

                  {/* Interactive Scale Selector Tabs */}
                  <div>
                    <span className="block text-sm font-semibold text-navy-500 mb-2">
                      {estimator.scalePrompt}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {scalePresets.map((preset, idx) => (
                        <button
                          key={preset.learners}
                          type="button"
                          aria-pressed={activeScaleIndex === idx}
                          onClick={() => handleSelectPreset(idx)}
                          className={`py-2 px-2.5 rounded-xl font-mono text-xs tabular transition-colors duration-150 cursor-pointer text-center ${
                            activeScaleIndex === idx
                              ? "bg-navy text-white"
                              : "bg-surface text-navy-600 hover:bg-surface-elevated hover:text-navy border border-border/80"
                          }`}
                        >
                          {preset.learners}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scoped Summary Box */}
                  <dl className="rounded-xl bg-surface/80 border border-border/80 p-4 text-sm">
                    <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-border/60">
                      <dt className="text-navy-500 shrink-0">{estimator.recommendedLabel}</dt>
                      <dd className="font-medium text-navy text-right">
                        {currentPreset.recommendedTier}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 pt-3">
                      <dt className="text-navy-500 shrink-0">{estimator.rows.turnaround}</dt>
                      <dd className="text-navy text-right">{currentPreset.turnaround}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 pt-2">
                      <dt className="text-navy-500 shrink-0">{estimator.rows.scope}</dt>
                      <dd className="text-navy text-right">{currentPreset.diagnosticScope}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 pt-2">
                      <dt className="text-navy-500 shrink-0">{estimator.rows.authoring}</dt>
                      <dd className="text-navy text-right">{currentPreset.authoringCapacity}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 pt-2">
                      <dt className="text-navy-500 shrink-0">{estimator.rows.support}</dt>
                      <dd className="text-navy text-right">{currentPreset.supportTier}</dd>
                    </div>
                  </dl>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => scrollToForm(currentPreset.recommendedTier, currentPreset.teamSizeVal)}
                    className="w-full py-3 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-btn hover:shadow-btn-hover"
                  >
                    <span>{estimator.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* The three deployment models */}
        <section className="py-20 lg:py-28 bg-surface">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="max-w-3xl mb-14">
              <h2 className="font-serif text-[length:var(--text-display)] text-navy font-normal tracking-[-0.025em] leading-tight">
                {tiersSection.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`rounded-2xl p-8 flex flex-col justify-between transition-colors duration-200 ${
                    tier.featured
                      ? "bg-white border border-accent shadow-lg"
                      : "bg-white border border-border shadow-xs hover:border-navy-300"
                  }`}
                >
                  <div>
                    <span className="inline-block rounded-full border border-border px-2.5 py-0.5 text-xs text-navy-500 mb-4">
                      {tier.badge}
                    </span>

                    <h3 className="font-serif text-2xl text-navy font-normal tracking-[-0.02em] mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-navy-500 mb-6 leading-relaxed">
                      {tier.tagline}
                    </p>

                    <div className="py-3 px-4 rounded-xl bg-surface/80 border border-border/80 mb-6 text-sm text-navy">
                      <span className="block text-xs text-navy-500 mb-0.5">{tiersSection.idealScaleLabel}</span>
                      {tier.idealFor}
                    </div>

                    <h4 className="text-sm font-semibold text-navy-500 mb-4 pt-6 border-t border-border">
                      {tiersSection.featuresHeading}
                    </h4>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-navy-500 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => scrollToForm(tier.name)}
                    className={`w-full py-3.5 px-6 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      tier.featured
                        ? "bg-accent hover:bg-accent-hover text-white shadow-btn hover:shadow-btn-hover"
                        : "bg-navy hover:bg-navy-950 text-white shadow-xs"
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What survives a procurement review */}
        <section className="py-20 lg:py-28 border-y border-border">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="max-w-3xl mb-14">
              <h2 className="font-serif text-[length:var(--text-display)] text-navy font-normal tracking-[-0.025em] leading-tight">
                {standardsSection.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valuePillars.map((pillar) => {
                const Icon = pillarIcons[pillar.id];
                return (
                  <div key={pillar.id} className="p-6 rounded-2xl bg-white border border-border shadow-xs space-y-4">
                    <Icon className="w-5 h-5 text-navy-400" />
                    <h3 className="font-serif text-xl text-navy font-normal tracking-[-0.02em]">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-navy-500 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quote request, prefilled from the estimator and the tier cards */}
        <section id="quote-form" className="py-20 lg:py-28 bg-surface scroll-mt-20">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Context & Contact Details */}
              <div className="lg:col-span-5 space-y-6">
                <h2 className="font-serif text-[length:var(--text-display)] text-navy font-normal tracking-[-0.025em] leading-tight">
                  {quoteForm.title}
                </h2>
                <p className="text-navy-500 leading-relaxed">
                  {quoteForm.lede}
                </p>

                <div className="p-6 rounded-2xl bg-white border border-border space-y-4 shadow-2xs">
                  <h3 className="text-sm font-semibold text-navy-500">
                    {quoteForm.nextHeading}
                  </h3>
                  <ol className="space-y-3 text-sm text-navy-500">
                    {quoteForm.nextSteps.map((stepText, idx) => (
                      <li key={stepText} className="flex items-start gap-3">
                        <span className="font-mono tabular text-navy-500 shrink-0">{idx + 1}</span>
                        <span>{stepText}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Right Column: Custom Quote Form with Shadcn Select Dropdowns */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 rounded-2xl bg-white border border-border shadow-lg">
                  {submitted ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-serif text-2xl text-navy font-normal tracking-[-0.02em]">
                        {quoteForm.successTitle}
                      </h3>
                      <p className="text-sm text-navy-500 max-w-md mx-auto leading-relaxed">
                        {quoteForm.successBody}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="font-serif text-xl text-navy font-normal tracking-[-0.02em] mb-2">
                        {quoteForm.formTitle}
                      </h3>

                      {error && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="pricing-first-name" className="block text-sm font-semibold text-navy-500 mb-1.5">
                            {quoteForm.fields.firstName} *
                          </label>
                          <input
                            id="pricing-first-name"
                            type="text"
                            name="firstName"
                            autoComplete="given-name"
                            required
                            placeholder={quoteForm.placeholders.firstName}
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-sm text-navy placeholder:text-navy-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/15 transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="pricing-last-name" className="block text-sm font-semibold text-navy-500 mb-1.5">
                            {quoteForm.fields.lastName} *
                          </label>
                          <input
                            id="pricing-last-name"
                            type="text"
                            name="lastName"
                            autoComplete="family-name"
                            required
                            placeholder={quoteForm.placeholders.lastName}
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-sm text-navy placeholder:text-navy-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/15 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="pricing-email" className="block text-sm font-semibold text-navy-500 mb-1.5">
                            {quoteForm.fields.email} *
                          </label>
                          <input
                            id="pricing-email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            placeholder={quoteForm.placeholders.email}
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-sm text-navy placeholder:text-navy-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/15 transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="pricing-company" className="block text-sm font-semibold text-navy-500 mb-1.5">
                            {quoteForm.fields.company} *
                          </label>
                          <input
                            id="pricing-company"
                            type="text"
                            name="company"
                            autoComplete="organization"
                            required
                            placeholder={quoteForm.placeholders.company}
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-sm text-navy placeholder:text-navy-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/15 transition-all"
                          />
                        </div>
                      </div>

                      {/* Clean Shadcn-Style Custom Dropdowns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ShadcnSelect
                          label={quoteForm.fields.workforceSize}
                          options={workforceOptions}
                          value={workforceSize}
                          onChange={setWorkforceSize}
                          required
                        />
                        <ShadcnSelect
                          label={quoteForm.fields.deployment}
                          options={tierOptions}
                          value={selectedTier}
                          onChange={setSelectedTier}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 px-6 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-btn hover:shadow-btn-hover cursor-pointer disabled:opacity-50 mt-2"
                      >
                        <span>{submitting ? quoteForm.submitting : quoteForm.submit}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <p className="text-xs text-navy-500 text-center pt-1">
                        {quoteForm.footnote}
                      </p>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Pricing questions, answered */}
        <FaqAccordion
          items={pricingFaqs}
          title={faqSection.title}
          description={faqSection.description}
          theme="surface"
        />
      </main>
      <Footer />
    </>
  );
}
