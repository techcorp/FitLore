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
        <main className="flex-1 pt-20 flex items-center justify-center">
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
        <main className="flex-1 pt-20 pb-12">
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
      <main className="flex-1 pt-20 pb-12">
        <div className="max-w-lg mx-auto px-4">
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
            <Button size="sm" onClick={handleAnalyzeAnother}>New</Button>
          </div>

          {/* Image */}
          <div className="relative rounded-xl overflow-hidden bg-[var(--bg-secondary)] mb-4">
            <img src={image} alt="Outfit" className="w-full h-64 sm:h-72 object-contain" style={{ backgroundColor: 'var(--bg-secondary)' }} />
          </div>

          {/* Score */}
          <Card className="flex flex-row items-center justify-between mb-4">
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Overall Score</p>
              <p className="text-2xl font-bold" style={{ color: getScoreColor(analysis.overall_score) }}>{analysis.overall_score}</p>
            </div>
            <ScoreDisplay score={analysis.overall_score} size="sm" />
          </Card>

          {/* Summary */}
          <Card className="mb-4">
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">{analysis.outfit_summary}</p>
          </Card>

          {/* Detected Items */}
          <Card className="mb-4">
            <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">Detected Items</p>
            <div className="flex flex-wrap gap-1.5">
              {analysis.detected_items.map((item, i) => (
                <span key={i} className="px-2 py-1 bg-[var(--bg-secondary)] rounded text-xs">{item}</span>
              ))}
            </div>
          </Card>

          {/* Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {[
              { label: "Season", score: analysis.season_fit.score, icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
              { label: "Occasion", score: analysis.occasion_fit.score, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
              { label: "Color", score: analysis.color_analysis.harmony_score, icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
            ].map((item, i) => (
              <Card key={i} className="py-3 px-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{item.label}</span>
                  <span className="text-lg font-bold" style={{ color: getScoreColor(item.score) }}>{item.score}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Colors */}
          <Card className="mb-4">
            <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">Colors</p>
            <div className="flex flex-wrap gap-1.5">
              {analysis.color_analysis.main_colors.map((color, i) => (
                <span key={i} className="px-2 py-1 bg-[var(--bg-secondary)] rounded text-xs">{color}</span>
              ))}
            </div>
          </Card>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <Card>
              <h3 className="text-xs font-semibold text-[var(--success)] mb-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Strengths
              </h3>
              <ul className="space-y-1">
                {analysis.strengths.slice(0, 3).map((item, i) => (
                  <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[var(--success)] mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="text-xs font-semibold text-[var(--warning)] mb-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Improve
              </h3>
              <ul className="space-y-1">
                {analysis.improvements.slice(0, 3).map((item, i) => (
                  <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[var(--warning)] mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Suggestions Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card className="py-3">
              <h3 className="text-xs font-medium text-[var(--text-secondary)] mb-1.5">Styling</h3>
              <p className="text-xs">{analysis.styling_suggestions[0]}</p>
            </Card>
            <Card className="py-3">
              <h3 className="text-xs font-medium text-[var(--text-secondary)] mb-1.5">Accessories</h3>
              <p className="text-xs">{analysis.accessory_suggestions[0]}</p>
            </Card>
            <Card className="py-3">
              <h3 className="text-xs font-medium text-[var(--text-secondary)] mb-1.5">Footwear</h3>
              <p className="text-xs">{analysis.footwear_suggestions[0]}</p>
            </Card>
            <Card className="py-3">
              <h3 className="text-xs font-medium text-[var(--text-secondary)] mb-1.5">Shop</h3>
              <div className="flex flex-wrap gap-1">
                {analysis.shopping_keywords.slice(0, 2).map((kw, i) => (
                  <button key={i} onClick={() => navigator.clipboard.writeText(kw)} className="px-1.5 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] rounded text-xs">{kw}</button>
                ))}
              </div>
            </Card>
          </div>

          {/* Color Palette */}
          <div className="mb-4">
            <ColorPalette palette={analysis.color_palette} />
          </div>

          {/* Final Verdict */}
          <Card className="bg-gradient-to-r from-[var(--accent)]/5 to-transparent border-[var(--accent)]/20 mb-6">
            <p className="text-xs font-medium text-[var(--text-secondary)] mb-1">Final Verdict</p>
            <p className="text-sm italic text-[var(--text-primary)]">&ldquo;{analysis.final_verdict}&rdquo;</p>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-2">
            <Button size="sm" onClick={handleAnalyzeAnother}>Analyze Another</Button>
            <Link href="/"><Button variant="ghost" size="sm">Home</Button></Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}