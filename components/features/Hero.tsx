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

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-card)] rounded-full shadow-sm border border-[var(--border)]">
              <span className="w-1.5 h-1.5 bg-[var(--success)] rounded-full animate-pulse" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                AI-Powered Fashion Analysis
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block font-[family-name:var(--font-playfair)] text-[var(--text-primary)]">
                Upload Your Outfit.
              </span>
              <span className="block mt-1 text-[var(--accent)]">
                Get an Instant AI Style Review.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-lg mx-auto lg:mx-0">
              Our AI analyzes your outfit styling, season suitability, occasion match,
              color harmony, and provides personalized improvement suggestions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 lg:gap-4">
              <Link href="/analyze">
                <Button size="lg" className="group px-8">
                  <span>Analyze My Outfit</span>
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <Link href="/#how-it-works">
                <Button variant="ghost" size="lg">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Preview Cards (Desktop only) */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative space-y-6">
              <Card className="relative z-10 animate-float" padding="lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="font-semibold">Overall Score</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 -rotate-90">
                      <circle cx="40" cy="40" r="36" fill="none" stroke="var(--border)" strokeWidth="4" />
                      <circle cx="40" cy="40" r="36" fill="none" stroke="var(--success)" strokeWidth="4" strokeLinecap="round" strokeDasharray="226 226" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[var(--success)]">82</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Very Good</p>
                    <p className="text-sm text-[var(--text-secondary)]">Well-balanced outfit</p>
                  </div>
                </div>
              </Card>

              <Card className="relative z-10 animate-float ml-12" padding="md" style={{ animationDelay: "0.5s" }}>
                <p className="text-sm font-medium mb-3">Color Palette</p>
                <div className="flex gap-2">
                  {["#36454F", "#D6C2A1", "#1A1A1A", "#F5F5F5"].map((color, i) => (
                    <div key={i} className="w-10 h-10 rounded-lg shadow-inner" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </Card>

              <Card className="relative z-10 animate-float" padding="md" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="text-sm font-medium">Styling Tip</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Try adding a textured watch strap
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}