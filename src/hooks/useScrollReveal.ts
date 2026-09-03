"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.add("js-reveal");

    const el = ref.current;
    if (!el) return;

    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      if (el.classList.contains("reveal")) observer.observe(el);
      el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));

      return () => observer.disconnect();
    } catch {
      document.documentElement.classList.remove("js-reveal");
    }
  }, []);

  return ref;
}
