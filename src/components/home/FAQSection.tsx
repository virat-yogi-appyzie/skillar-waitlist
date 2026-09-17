"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { faq } from "@/content/home";

/**
 * The objection ledger, sitting between the diagnostic and the final CTA so
 * a visitor arrives at the ask with their questions already answered.
 *
 * A ruled list, not cards: each row is one question, and one row is open at
 * a time. The open row's answer expands through the CSS grid 0fr -> 1fr
 * trick, which animates height without measuring it; under
 * prefers-reduced-motion the rows snap open.
 */
export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy leading-tight tracking-[-0.025em]">
              {faq.heading}
            </h2>
            <p className="mt-4 text-navy-500 leading-relaxed max-w-sm">{faq.lede}</p>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-border">
              {faq.items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q} className="border-b border-border">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${i}`}
                        className="w-full flex items-center justify-between gap-6 py-5 sm:py-6 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                      >
                        <span
                          className={`font-serif text-lg sm:text-xl leading-snug transition-colors duration-200 ${
                            isOpen ? "text-navy" : "text-navy-600 group-hover:text-navy"
                          }`}
                        >
                          {item.q}
                        </span>
                        <Plus
                          aria-hidden="true"
                          className={`w-4 h-4 shrink-0 text-navy-400 transition-transform duration-300 ease-premium motion-reduce:transition-none ${
                            isOpen ? "rotate-45" : "group-hover:rotate-90"
                          }`}
                          strokeWidth={2}
                        />
                      </button>
                    </h3>
                    <div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-label={item.q}
                      className={`grid transition-[grid-template-rows] duration-400 ease-premium motion-reduce:transition-none ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pr-10 max-w-2xl">
                          <p className="text-navy-500 leading-relaxed">{item.a}</p>
                          {"link" in item && item.link && (
                            <Link
                              href={item.link.href}
                              className="mt-3 inline-block text-sm font-medium text-accent hover:text-accent-hover transition-colors underline underline-offset-4 decoration-accent/30"
                              tabIndex={isOpen ? 0 : -1}
                            >
                              {item.link.label}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
