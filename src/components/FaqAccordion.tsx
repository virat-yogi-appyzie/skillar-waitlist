"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
  category?: string;
}

export interface FaqAccordionProps {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  defaultOpenIndex?: number | null;
  allowMultiple?: boolean;
  theme?: "surface" | "white" | "navy";
}

export default function FaqAccordion({
  items,
  eyebrow,
  title = "Everything you need to know.",
  description,
  className = "",
  defaultOpenIndex = null,
  allowMultiple = false,
  theme = "surface",
}: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    defaultOpenIndex !== null ? [defaultOpenIndex] : []
  );

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  const isNavy = theme === "navy";
  const isWhite = theme === "white";

  return (
    <section
      className={`py-16 lg:py-24 ${
        isNavy
          ? "bg-navy text-white"
          : isWhite
          ? "bg-white text-navy-950"
          : "bg-surface text-navy-950"
      } ${className}`}
    >
      <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        {(eyebrow || title || description) && (
          <div className="max-w-2xl mb-12 lg:mb-14">
            {title && (
              <h2
                className={`font-serif text-[length:var(--text-display)] font-normal tracking-[-0.025em] leading-tight ${
                  isNavy ? "text-white" : "text-navy"
                }`}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={`text-base mt-4 leading-relaxed ${
                  isNavy ? "text-white/70" : "text-navy-500"
                }`}
              >
                {description}
              </p>
            )}
            {/* An eyebrow that carried real information reads below the heading,
                as plain text, never as an uppercase mono kicker above it. */}
            {eyebrow && (
              <p className={`text-sm mt-2 ${isNavy ? "text-white/60" : "text-navy-500"}`}>
                {eyebrow}
              </p>
            )}
          </div>
        )}

        {/* Accordion List */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndexes.includes(idx);
            return (
              <div
                key={item.question}
                className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                  isNavy
                    ? isOpen
                      ? "bg-white/[0.06] border-white/25"
                      : "bg-white/[0.03] border-white/10 hover:border-white/20"
                    : isWhite
                    ? isOpen
                      ? "bg-white border-navy/25"
                      : "bg-surface/50 border-border hover:border-navy-300"
                    : isOpen
                    ? "bg-white border-navy/25"
                    : "bg-white border-border hover:border-navy-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-6 cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-serif text-lg sm:text-xl font-normal tracking-[-0.02em] pr-2 leading-snug ${
                      isNavy ? "text-white" : "text-navy"
                    }`}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    } ${isNavy ? "text-white/60" : "text-navy-400"}`}
                  />
                </button>

                {isOpen && (
                  <div
                    className={`px-6 sm:px-7 pb-7 pt-4 text-base leading-relaxed border-t ${
                      isNavy
                        ? "text-white/70 border-white/10"
                        : "text-navy-500 border-border/80"
                    }`}
                  >
                    {typeof item.answer === "string" ? (
                      <p>{item.answer}</p>
                    ) : (
                      item.answer
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
