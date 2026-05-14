"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ScoreDisplay from "@/components/features/ScoreDisplay";
import ColorPalette from "@/components/features/ColorPalette";
import { getImageFromStorage, getResultFromStorage, clearStorage } from "@/lib/api";
import { AnalysisResponse, getScoreColor } from "@/lib/types";
import Link from "next/link";

export default function ResultPage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedImage = getImageFromStorage();
    const storedResult = getResultFromStorage();
    if (storedImage && storedResult) {
      setImage(storedImage);
      setResult(storedResult);
    }
    setIsLoading(false);
  }, []);

  const handleAnalyzeAnother = () => {
    clearStorage();
    router.push("/analyze");
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-20 md:pt-24 flex items-center justify-center">
          <div className="animate-pulse text-[var(--text-tertiary)]">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!result || !image) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-20 md:pt-24 pb-12">
          <div className="max-w-sm mx-auto px-4">
            <Card className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">No Analysis Found</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-6">Please upload an outfit first.</p>
              <Link href="/analyze"><Button>Analyze an Outfit</Button></Link>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { analysis } = result;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 md:pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--success)]/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium">Analysis Complete</span>
            </div>
            <Button size="sm" onClick={handleAnalyzeAnother}>New Analysis</Button>
          </div>

          {/* Top Section - Image + Score + Summary */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden bg-[var(--bg-secondary)] md:col-span-1">
              <img src={image} alt="Outfit" className="w-full h-64 md:h-full object-contain" style={{ backgroundColor: 'var(--bg-secondary)' }} />
            </div>

            {/* Score */}
            <Card className="flex flex-col items-center justify-center md:col-span-1">
              <p className="text-xs md:text-sm text-[var(--text-secondary)] mb-2">Overall Score</p>
              <ScoreDisplay score={analysis.overall_score} size="md" />
            </Card>

            {/* Summary */}
            <Card className="md:col-span-1">
              <h3 className="text-xs md:text-sm font-semibold text-[var(--text-secondary)] mb-2">Summary</h3>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">{analysis.outfit_summary}</p>
              <div className="mt-4 pt-3 border-t border-[var(--border)]">
                <p className="text-xs font-medium mb-2">Detected Items</p>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.detected_items.map((item, i) => (
                    <span key={i} className="px-2 py-1 bg-[var(--bg-secondary)] rounded text-xs">{item}</span>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Season", score: analysis.season_fit.score },
              { label: "Occasion", score: analysis.occasion_fit.score },
              { label: "Color", score: analysis.color_analysis.harmony_score },
            ].map((item, i) => (
              <Card key={i} className="py-4 px-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm font-medium">{item.label}</span>
                  <span className="text-lg md:text-xl font-bold" style={{ color: getScoreColor(item.score) }}>{item.score}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Colors */}
          <Card className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm font-semibold">Main Colors</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.color_analysis.main_colors.map((color, i) => (
                  <span key={i} className="px-3 py-1.5 bg-[var(--bg-secondary)] rounded-lg text-sm">{color}</span>
                ))}
              </div>
            </div>
          </Card>

          {/* Strengths & Improvements */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card>
              <h3 className="text-sm font-semibold text-[var(--success)] mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Strengths
              </h3>
              <ul className="space-y-2">
                {analysis.strengths.map((item, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-[var(--warning)] mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Areas to Improve
              </h3>
              <ul className="space-y-2">
                {analysis.improvements.map((item, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--warning)] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Suggestions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Card className="py-4">
              <h3 className="text-xs font-medium text-[var(--text-secondary)] mb-2">Styling</h3>
              <p className="text-xs md:text-sm">{analysis.styling_suggestions[0]}</p>
            </Card>
            <Card className="py-4">
              <h3 className="text-xs font-medium text-[var(--text-secondary)] mb-2">Accessories</h3>
              <p className="text-xs md:text-sm">{analysis.accessory_suggestions[0]}</p>
            </Card>
            <Card className="py-4">
              <h3 className="text-xs font-medium text-[var(--text-secondary)] mb-2">Footwear</h3>
              <p className="text-xs md:text-sm">{analysis.footwear_suggestions[0]}</p>
            </Card>
            <Card className="py-4">
              <h3 className="text-xs font-medium text-[var(--text-secondary)] mb-2">Shop</h3>
              <div className="flex flex-wrap gap-1">
                {analysis.shopping_keywords.slice(0, 3).map((kw, i) => (
                  <button key={i} onClick={() => navigator.clipboard.writeText(kw)} className="px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded text-xs">{kw}</button>
                ))}
              </div>
            </Card>
          </div>

          {/* Color Palette */}
          <div className="mb-6">
            <ColorPalette palette={analysis.color_palette} />
          </div>

          {/* Final Verdict */}
          <Card className="bg-gradient-to-r from-[var(--accent)]/5 to-transparent border-[var(--accent)]/20 mb-6">
            <p className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Final Verdict</p>
            <p className="text-base md:text-lg italic text-[var(--text-primary)] leading-relaxed">&ldquo;{analysis.final_verdict}&rdquo;</p>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button size="md" onClick={handleAnalyzeAnother}>Analyze Another Outfit</Button>
            <Link href="/"><Button variant="ghost" size="md">Back to Home</Button></Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}