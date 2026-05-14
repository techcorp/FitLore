"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

export default function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
  style,
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`
        bg-[var(--bg-card)] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)]
        border border-[var(--border)]/50
        ${hover ? "transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1" : ""}
        ${paddings[padding]}
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
}