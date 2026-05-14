"use client";

import Card from "@/components/ui/Card";

const steps = [
  { num: "01", title: "Upload Image", desc: "Drag and drop your outfit photo or click to browse. Supports JPG, PNG, and WebP formats.", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { num: "02", title: "Select Context", desc: "Choose the season, occasion, and your preferred style to get personalized recommendations.", icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" },
  { num: "03", title: "Get Analysis", desc: "Receive a detailed fashion report with scores, color palettes, and styling suggestions.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto">
            Get professional outfit analysis in under a minute. No complicated steps, just upload and discover.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line - Desktop only */}
          <div className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5 bg-[var(--border)]" />

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="text-center h-full" padding="lg">
                  {/* Step Number Badge */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.num}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mt-2 mb-6 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent)]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                    </svg>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {step.desc}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}