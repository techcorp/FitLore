"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--accent)]/10" />
      </div>
      <div className="absolute top-1/3 -left-20 w-48 h-48 bg-[var(--accent)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-20 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Content - Always first on mobile */}
          <div className="text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-card)] rounded-full shadow-sm border border-[var(--border)]">
              <span className="w-1.5 h-1.5 bg-[var(--success)] rounded-full animate-pulse" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                AI-Powered Fashion Analysis
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight px-2">
              <span className="block font-[family-name:var(--font-playfair)] text-[var(--text-primary)]">
                Upload Your Outfit.
              </span>
              <span className="block mt-1 text-[var(--accent)]">
                Get an Instant AI Style Review.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md mx-auto px-4">
              Our AI analyzes your outfit styling, season suitability, occasion match,
              color harmony, and provides personalized improvement suggestions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center gap-3 px-4">
              <Link href="/analyze" className="w-full max-w-xs">
                <Button size="lg" className="w-full group">
                  <span>Analyze My Outfit</span>
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <Link href="/#how-it-works" className="w-full max-w-xs">
                <Button variant="ghost" size="lg" className="w-full">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>

          {/* Preview Cards - Only visible on desktop */}
          <div className="hidden lg:block relative">
            <div className="relative space-y-4 max-w-md mx-auto">
              <Card className="relative z-10 animate-float" padding="md">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-sm">Overall Score</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="var(--border)" strokeWidth="3" />
                      <circle cx="32" cy="32" r="28" fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeDasharray="175 176" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-[var(--success)]">82</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Very Good</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}