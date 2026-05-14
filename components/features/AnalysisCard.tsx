"use client";

import Card from "@/components/ui/Card";
import ScoreBadge from "@/components/ui/ScoreBadge";

interface AnalysisCardProps {
  title: string;
  score: number;
  comments: string;
  icon: React.ReactNode;
}

export function AnalysisCard({ title, score, comments, icon }: AnalysisCardProps) {
  return (
    <Card hover className="h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
            {icon}
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <ScoreBadge score={score} size="sm" />
      </div>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{comments}</p>
    </Card>
  );
}

interface ListCardProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  variant?: "default" | "success" | "warning";
}

export function ListCard({ title, items, icon, variant = "default" }: ListCardProps) {
  const colors = {
    default: "text-[var(--accent)]",
    success: "text-[var(--success)]",
    warning: "text-[var(--warning)]",
  };

  const bgColors = {
    default: "bg-[var(--accent)]/10",
    success: "bg-[var(--success)]/10",
    warning: "bg-[var(--warning)]/10",
  };

  return (
    <Card hover className="h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl ${bgColors[variant]} flex items-center justify-center ${colors[variant]}`}>
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
            <svg className={`w-5 h-5 ${colors[variant]} flex-shrink-0 mt-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

interface KeywordsCardProps {
  keywords: string[];
}

export function KeywordsCard({ keywords }: KeywordsCardProps) {
  const copyToClipboard = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold">Shopping Keywords</h3>
          <p className="text-sm text-[var(--text-secondary)]">Click to copy for shopping</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <button
            key={index}
            onClick={() => copyToClipboard(keyword)}
            className="px-3 py-1.5 bg-[var(--bg-secondary)] rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-colors duration-300 flex items-center gap-1.5 group"
          >
            {keyword}
            <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        ))}
      </div>
    </Card>
  );
}