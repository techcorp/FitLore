"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

const tips = [
  "Analyzing outfit composition...",
  "Checking color harmony...",
  "Evaluating season suitability...",
  "Reviewing occasion match...",
  "Detecting outfit items...",
  "Generating style recommendations...",
  "Preparing your fashion report...",
];

export default function LoadingState() {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="text-center max-w-md w-full">
        {/* Animated Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-[var(--border)]" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--accent)] animate-spin" style={{ animationDuration: "1.5s" }} />
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-[var(--accent)]/50 animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }} />
          <div className="absolute inset-4 rounded-full bg-[var(--accent)]/10 animate-pulse" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">Analyzing Your Outfit</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Our AI is reviewing your outfit with precision
        </p>

        {/* Animated Tip */}
        <div className="bg-[var(--bg-secondary)] rounded-xl px-6 py-4">
          <p className="text-sm font-medium text-[var(--accent)] animate-pulse">
            {tips[currentTip]}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {tips.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTip ? "bg-[var(--accent)] w-4" : "bg-[var(--border)]"
              }`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}