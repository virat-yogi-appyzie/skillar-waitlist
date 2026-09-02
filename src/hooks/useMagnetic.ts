"use client";

import { useEffect, useRef, useState } from "react";

interface MagneticOptions {
  /** Strength of the magnetic pull (default: 0.3) */
  strength?: number;
  /** Maximum distance the element will move in px (default: 20) */
  maxDistance?: number;
  /** Radius within which the magnetic effect activates (default: 100) */
  radius?: number;
}

interface MagneticReturn {
  x: number;
  y: number;
  isHovered: boolean;
}

/**
 * Gives an element magnetic cursor-following behavior.
 * The element gently pulls toward the pointer within a radius.
 *
 * @example
 * ```tsx
 * const magnetic = useMagnetic({ strength: 0.4 });
 * <button style={{ transform: `translate(${magnetic.x}px, ${magnetic.y}px)` } />
 * ```
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {}
) {
  const { strength = 0.3, maxDistance = 20, radius = 100 } = options;
  const ref = useRef<T>(null) as React.RefObject<T>;
  const [state, setState] = useState<MagneticReturn>({ x: 0, y: 0, isHovered: false });
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0, isHovered: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius) {
        const pull = (1 - distance / radius) * strength;
        targetRef.current = {
          x: Math.max(-maxDistance, Math.min(maxDistance, dx * pull)),
          y: Math.max(-maxDistance, Math.min(maxDistance, dy * pull)),
          isHovered: true,
        };
      } else {
        targetRef.current = { x: 0, y: 0, isHovered: false };
      }
    };

    const handleLeave = () => {
      targetRef.current = { x: 0, y: 0, isHovered: false };
    };

    const tick = () => {
      setState((prev) => {
        const t = targetRef.current;
        // Spring-like easing toward target
        const ease = 0.15;
        const newX = prev.x + (t.x - prev.x) * ease;
        const newY = prev.y + (t.y - prev.y) * ease;
        // Snap to zero when very close to avoid infinite raf
        if (Math.abs(newX) < 0.01 && Math.abs(newY) < 0.01 && !t.isHovered) {
          return { x: 0, y: 0, isHovered: false };
        }
        return { x: newX, y: newY, isHovered: t.isHovered };
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [strength, maxDistance, radius]);

  return { ref, ...state };
}
