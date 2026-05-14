// Types for FitLore AI Outfit Analysis

export interface AnalysisResponse {
  analysis: {
    overall_score: number;
    rating_label: string;
    outfit_summary: string;
    detected_items: string[];
    season_fit: {
      score: number;
      comments: string;
    };
    occasion_fit: {
      score: number;
      comments: string;
    };
    color_analysis: {
      main_colors: string[];
      harmony_score: number;
      comments: string;
    };
    color_palette: ColorPaletteItem[];
    strengths: string[];
    improvements: string[];
    styling_suggestions: string[];
    accessory_suggestions: string[];
    footwear_suggestions: string[];
    shopping_keywords: string[];
    final_verdict: string;
  };
}

export interface ColorPaletteItem {
  name: string;
  hex: string;
  how_to_use: string;
}

export interface FormData {
  outfitImage: File | null;
  season: string;
  occasion: string;
  stylePreference: string;
  extraNotes: string;
}

export type Season =
  | "Summer"
  | "Winter"
  | "Spring"
  | "Autumn/Fall"
  | "Rainy/Monsoon"
  | "All-season/Indoor";

export type Occasion =
  | "Office/Work"
  | "Business Meeting"
  | "Casual Day Out"
  | "Dinner/Date"
  | "Wedding/Formal Event"
  | "Party/Night Out"
  | "Travel"
  | "Religious/Cultural Event"
  | "University/College"
  | "Sports/Outdoor Activity";

export type StylePreference =
  | "Balanced/Professional"
  | "Minimal"
  | "Streetwear"
  | "Formal"
  | "Smart Casual"
  | "Modest"
  | "Trendy/Fashion-Forward";

export const SEASONS: Season[] = [
  "Summer",
  "Winter",
  "Spring",
  "Autumn/Fall",
  "Rainy/Monsoon",
  "All-season/Indoor",
];

export const OCCASIONS: Occasion[] = [
  "Office/Work",
  "Business Meeting",
  "Casual Day Out",
  "Dinner/Date",
  "Wedding/Formal Event",
  "Party/Night Out",
  "Travel",
  "Religious/Cultural Event",
  "University/College",
  "Sports/Outdoor Activity",
];

export const STYLE_PREFERENCES: StylePreference[] = [
  "Balanced/Professional",
  "Minimal",
  "Streetwear",
  "Formal",
  "Smart Casual",
  "Modest",
  "Trendy/Fashion-Forward",
];

export function getScoreColor(score: number): string {
  if (score >= 85) return "var(--score-excellent)";
  if (score >= 70) return "var(--score-good)";
  if (score >= 55) return "var(--score-average)";
  if (score >= 40) return "var(--score-below)";
  return "var(--score-poor)";
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 70) return "Good";
  if (score >= 55) return "Average";
  if (score >= 40) return "Below Average";
  return "Poor";
}

export function getImageUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function formatHex(hex: string): string {
  return hex.startsWith("#") ? hex : `#${hex}`;
}