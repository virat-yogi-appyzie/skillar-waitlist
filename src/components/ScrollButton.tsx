"use client";

import React from "react";

export interface ScrollButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export default function ScrollButton({
  targetId,
  children,
  className = "",
  offset = 0,
  onClick,
  ...props
}: ScrollButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      if (offset !== 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
