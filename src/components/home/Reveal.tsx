"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals its children once, when they first scroll into view.
 *
 * Used only where a group is genuinely enumerable (the problem's three
 * questions, the four product steps), so the stagger reads as sequence
 * rather than as decoration applied to every section alike. The animation
 * is defined in globals.css as `.reveal`, which collapses to no motion
 * under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** Stagger, in ms, for an item inside an enumerable group. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reveal if the element is in view OR has already been scrolled past.
    // Without the second case a fast scroll (or a jump to an anchor) can
    // carry an element from below the viewport to above it between observer
    // callbacks, and it would stay invisible forever.
    const reveal = () => {
      setShown(true);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    const passed = () => el.getBoundingClientRect().bottom < 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) reveal();
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    observer.observe(el);

    // Safety net for the same race: if we ever find ourselves below it, show it.
    const onScroll = () => {
      if (passed()) reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    if (passed()) reveal();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
