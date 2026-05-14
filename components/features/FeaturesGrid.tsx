"use client";

import Card from "@/components/ui/Card";

const features = [
  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Outfit Scoring", description: "Get a comprehensive score based on styling harmony and visual appeal." },
  { icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", title: "Season Suitability", description: "Evaluate if your outfit is appropriate for current weather." },
  { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", title: "Occasion Matching", description: "Analyze how well your outfit matches the event." },
  { icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01", title: "Color Harmony", description: "Discover if your color choices create cohesion." },
  { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", title: "Styling Suggestions", description: "Receive expert recommendations to enhance your style." },
  { icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", title: "Accessories", description: "Get curated suggestions for accessories and shoes." },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-16 md:py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">What FitLore Analyzes</h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto">
            Our AI examines every aspect of your outfit to provide comprehensive, actionable insights.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <Card key={i} hover className="py-5 px-5 md:py-6 md:px-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}