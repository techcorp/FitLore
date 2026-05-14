"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import ImageUpload from "@/components/features/ImageUpload";
import LoadingState from "@/components/features/LoadingState";
import { submitOutfitAnalysis, saveImageToStorage, saveResultToStorage, fileToBase64 } from "@/lib/api";
import { SEASONS, OCCASIONS, STYLE_PREFERENCES } from "@/lib/types";

export default function AnalyzePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    outfitImage: null as File | null,
    season: "",
    occasion: "",
    stylePreference: "",
    extraNotes: "",
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.outfitImage) errors.outfitImage = "Please upload an outfit image";
    if (!formData.season) errors.season = "Please select a season";
    if (!formData.occasion) errors.occasion = "Please select an occasion";
    if (!formData.stylePreference) errors.stylePreference = "Please select a style preference";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await submitOutfitAnalysis(formData);
      const base64Image = await fileToBase64(formData.outfitImage!);
      saveImageToStorage(base64Image);
      saveResultToStorage(result);
      router.push("/result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze outfit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingState />;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="max-w-lg mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Upload Your Outfit
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Let our AI analyze your style
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image Upload */}
            <Card>
              <ImageUpload
                value={formData.outfitImage}
                onChange={(file) => {
                  setFormData({ ...formData, outfitImage: file });
                  setValidationErrors({ ...validationErrors, outfitImage: "" });
                }}
                error={validationErrors.outfitImage}
              />
            </Card>

            {/* Form Fields */}
            <Card>
              <div className="space-y-4">
                <Select
                  label="Season"
                  options={SEASONS.map((s) => ({ value: s, label: s }))}
                  value={formData.season}
                  onChange={(e) => {
                    setFormData({ ...formData, season: e.target.value });
                    setValidationErrors({ ...validationErrors, season: "" });
                  }}
                  placeholder="Select season"
                  error={validationErrors.season}
                />

                <Select
                  label="Occasion"
                  options={OCCASIONS.map((o) => ({ value: o, label: o }))}
                  value={formData.occasion}
                  onChange={(e) => {
                    setFormData({ ...formData, occasion: e.target.value });
                    setValidationErrors({ ...validationErrors, occasion: "" });
                  }}
                  placeholder="Select occasion"
                  error={validationErrors.occasion}
                />

                <Select
                  label="Style Preference"
                  options={STYLE_PREFERENCES.map((s) => ({ value: s, label: s }))}
                  value={formData.stylePreference}
                  onChange={(e) => {
                    setFormData({ ...formData, stylePreference: e.target.value });
                    setValidationErrors({ ...validationErrors, stylePreference: "" });
                  }}
                  placeholder="Select style"
                  error={validationErrors.stylePreference}
                />

                <Textarea
                  label="Additional Notes (Optional)"
                  placeholder="I want this outfit to look more premium..."
                  value={formData.extraNotes}
                  onChange={(e) => setFormData({ ...formData, extraNotes: e.target.value })}
                  maxLength={300}
                  charCount
                  rows={3}
                />
              </div>
            </Card>

            {/* Error */}
            {error && (
              <div className="p-4 bg-[var(--error)]/10 border border-[var(--error)]/20 rounded-xl text-[var(--error)] text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button type="submit" size="lg" className="w-full">
              Analyze Outfit
            </Button>
          </form>

          {/* Tips - Collapsed on mobile */}
          <Card className="mt-6">
            <h3 className="font-semibold text-sm mb-3">Tips for Best Results</h3>
            <ul className="space-y-2">
              {["Good lighting", "Full outfit in frame", "Clear image"].map((tip, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}