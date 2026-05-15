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
 * Process image by drawing onto canvas and exporting as fresh RGB JPEG
 * - Accept: JPG, JPEG, PNG, WEBP
 * - Convert every upload to real JPEG
 * - max width/height: 768px
 * - JPEG quality: 0.75
 * - output filename: outfit.jpg
 * - output type: image/jpeg
 */
export async function processImageForN8n(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      // Calculate dimensions while maintaining aspect ratio
      let width = img.width;
      let height = img.height;
      const maxDim = 768;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = (height / width) * maxDim;
          width = maxDim;
        } else {
          width = (width / height) * maxDim;
          height = maxDim;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(width);
      canvas.height = Math.round(height);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // Draw image (this converts to RGB automatically)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Export as JPEG with quality 0.75
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to export canvas as JPEG"));
          }
        },
        "image/jpeg",
        0.75
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}

/**
 * Submit outfit for AI analysis
 * Sends multipart/form-data to n8n webhook
 */
export async function submitOutfitAnalysis(
  formData: FormData
): Promise<AnalysisResponse> {
  const payload = new FormData();

  if (formData.outfitImage) {
    // Process image: redraw onto canvas and export as fresh RGB JPEG
    const processedBlob = await processImageForN8n(formData.outfitImage);
    const processedFile = new File([processedBlob], "outfit.jpg", {
      type: "image/jpeg",
    });
    payload.append("outfitImage", processedFile);
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
    throw new Error("We could not analyze this image. Please upload a clear JPG or PNG image and try again.");
  }

  if (!response.ok) {
    // Show clean message instead of raw n8n/Ollama errors
    throw new Error("We could not analyze this image. Please upload a clear JPG or PNG image and try again.");
  }

  try {
    return await response.json();
  } catch {
    throw new Error("We could not analyze this image. Please upload a clear JPG or PNG image and try again.");
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