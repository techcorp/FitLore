"use client";

import { getScoreColor, getScoreLabel } from "@/lib/types";

interface ScoreDisplayProps {
  score: number;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function ScoreDisplay({ score, size = "md" }: ScoreDisplayProps) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  const sizes = {
    sm: { circle: 60, stroke: 4, text: "text-lg", label: "text-xs" },
    md: { circle: 100, stroke: 6, text: "text-3xl", label: "text-sm" },
    lg: { circle: 140, stroke: 8, text: "text-5xl", label: "text-base" },
    xl: { circle: 180, stroke: 10, text: "text-6xl", label: "text-lg" },
  };

  const config = sizes[size];
  const radius = (config.circle - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: config.circle, height: config.circle }}>
        {/* Background circle */}
        <svg width={config.circle} height={config.circle} className="-rotate-90">
          <circle
            cx={config.circle / 2}
            cy={config.circle / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={config.stroke}
          />
          {/* Progress circle */}
          <circle
            cx={config.circle / 2}
            cy={config.circle / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${config.text}`} style={{ color }}>
            {score}
          </span>
        </div>
      </div>
      {/* Label */}
      <span
        className={`mt-3 font-semibold ${config.label}`}
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}