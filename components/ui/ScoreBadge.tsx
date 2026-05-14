"use client";

import { getScoreColor, getScoreLabel } from "@/lib/types";

interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function ScoreBadge({
  score,
  size = "md",
  showLabel = true,
}: ScoreBadgeProps) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  const sizes = {
    sm: "text-sm px-2 py-0.5",
    md: "text-base px-3 py-1",
    lg: "text-lg px-4 py-1.5",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-2 font-semibold rounded-full
        ${sizes[size]}
      `}
      style={{
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      <span>{score}</span>
      {showLabel && <span className="opacity-75">/ 100</span>}
    </span>
  );
}

interface RatingBadgeProps {
  label: string;
  score: number;
}

export function RatingBadge({ label, score }: RatingBadgeProps) {
  const color = getScoreColor(score);

  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
      style={{
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      {label}
    </span>
  );
}