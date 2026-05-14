// API Integration for FitLore
// Replace the WEBHOOK_URL with your n8n webhook endpoint

import type { FormData, AnalysisResponse } from "./types";

// ============================================
// CONFIGURATION - Replace with your n8n webhook URL
// ============================================
export const WEBHOOK_URL =
  "https://n8n.imaginationai.net/webhook/drapeiq/outfit-analyzer";

// ============================================
// STORAGE KEYS for localStorage
// ============================================
export const STORAGE_KEYS = {
  IMAGE: "fitlore_image",
  RESULT: "fitlore_result",
} as const;

// ============================================
// API FUNCTION
// ============================================

/**
 * Submit outfit for AI analysis
 * Sends multipart/form-data to n8n webhook
 */
export async function submitOutfitAnalysis(
  formData: FormData
): Promise<AnalysisResponse> {
  const payload = new FormData();

  if (formData.outfitImage) {
    payload.append("outfitImage", formData.outfitImage);
  }
  payload.append("season", formData.season);
  payload.append("occasion", formData.occasion);
  payload.append("stylePreference", formData.stylePreference);
  payload.append("extraNotes", formData.extraNotes);

  let response: Response;
  try {
    response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: payload,
    });
  } catch (networkError) {
    throw new Error("Unable to connect to the server. Please check that the backend service is running.");
  }

  if (!response.ok) {
    const statusText = response.status === 0 ? "Service unavailable" : response.statusText;
    throw new Error(`Server returned an error: ${response.status} ${statusText}`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error("Received an invalid response from the server. Please ensure the backend is running correctly.");
  }
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

/**
 * Save image to localStorage as base64
 */
export function saveImageToStorage(base64: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.IMAGE, base64);
  }
}

/**
 * Get image from localStorage
 */
export function getImageFromStorage(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(STORAGE_KEYS.IMAGE);
  }
  return null;
}

/**
 * Save analysis result to localStorage
 */
export function saveResultToStorage(result: AnalysisResponse): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.RESULT, JSON.stringify(result));
  }
}

/**
 * Get analysis result from localStorage
 */
export function getResultFromStorage(): AnalysisResponse | null {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEYS.RESULT);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
  }
  return null;
}

/**
 * Clear all stored data
 */
export function clearStorage(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEYS.IMAGE);
    localStorage.removeItem(STORAGE_KEYS.RESULT);
  }
}

/**
 * Convert File to base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Check if stored data exists
 */
export function hasStoredData(): boolean {
  if (typeof window !== "undefined") {
    const image = localStorage.getItem(STORAGE_KEYS.IMAGE);
    const result = localStorage.getItem(STORAGE_KEYS.RESULT);
    return !!(image && result);
  }
  return false;
}