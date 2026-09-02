"use client";

import { ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
}

/**
 * A button with subtle magnetic cursor-following behavior.
 * The element gently pulls toward the pointer, creating a premium feel.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  href,
}: MagneticButtonProps) {
  const magnetic = useMagnetic<HTMLAnchorElement | HTMLButtonElement>({
    strength,
    maxDistance: 8,
    radius: 80,
  });

  if (href) {
    return (
      <a
        ref={magnetic.ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        style={{
          transform: `translate(${magnetic.x}px, ${magnetic.y}px)`,
          transition: "transform 150ms var(--ease-premium)",
          display: "inline-flex",
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={magnetic.ref as React.RefObject<HTMLButtonElement>}
      type="button"
      className={className}
      style={{
        transform: `translate(${magnetic.x}px, ${magnetic.y}px)`,
        transition: "transform 150ms var(--ease-premium)",
        display: "inline-flex",
      }}
    >
      {children}
    </button>
  );
}
