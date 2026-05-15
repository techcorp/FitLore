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
import ErrorPopup from "@/components/features/ErrorPopup";
import { submitOutfitAnalysis, saveImageToStorage, saveResultToStorage, fileToBase64 } from "@/lib/api";
import { SEASONS, OCCASIONS, STYLE_PREFERENCES } from "@/lib/types";

export default function AnalyzePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("We could not analyze this image. Please upload a clear JPG or PNG image and try again.");

  const [formData, setFormData] = useState({
    outfitImage: null as File | null,
    season: "",
    occasion: "",
    stylePreference: "",
    extraNotes: "",
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const MAX_FILE_SIZE = 700 * 1024; // 700KB

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Image is selected
    if (!formData.outfitImage) {
      errors.outfitImage = "Please upload an outfit image";
    } else if (formData.outfitImage.size > MAX_FILE_SIZE) {
      // File size is reasonable
      errors.outfitImage = `Image must be under 700KB (your file is ${(formData.outfitImage.size / 1024).toFixed(1)}KB)`;
    }

    // Season is selected
    if (!formData.season) errors.season = "Please select a season";

    // Occasion is selected
    if (!formData.occasion) errors.occasion = "Please select an occasion";

    // Style preference is selected
    if (!formData.stylePreference) errors.stylePreference = "Please select a style preference";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setShowError(false);

    try {
      const result = await submitOutfitAnalysis(formData);
      const base64Image = await fileToBase64(formData.outfitImage!);
      saveImageToStorage(base64Image);
      saveResultToStorage(result);
      router.push("/result");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to analyze outfit. Please try again.");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingState />;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 md:pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              Upload Your Outfit
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Let our AI analyze your style
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Image Upload */}
            <Card className="p-4 sm:p-6">
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
            <Card className="p-4 sm:p-6">
              <div className="space-y-4 md:space-y-5">
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
            <ErrorPopup
              isOpen={showError}
              onClose={() => setShowError(false)}
              title="Connection Error"
              message={errorMessage}
              type="error"
            />

            {/* Submit */}
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Analyze Outfit"}
            </Button>
          </form>

          {/* Tips */}
          <Card className="mt-6 p-4 sm:p-6">
            <h3 className="font-semibold text-sm md:text-base mb-3">Tips for Best Results</h3>
            <ul className="space-y-2">
              {["Good lighting - natural daylight works best", "Show the full outfit from front angle", "Choose a simple background", "Make sure the image is clear and not blurry"].map((tip, i) => (
                <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-[var(--text-secondary)]">
                  <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
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