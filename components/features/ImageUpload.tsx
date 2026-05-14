"use client";

import { useCallback, useState } from "react";

interface ImageUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export default function ImageUpload({ onChange, error }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Please upload a JPG, PNG, or WebP image";
    }
    if (file.size > MAX_SIZE) {
      return "Image must be smaller than 10MB";
    }
    return null;
  };

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setLocalError(validationError);
        return;
      }
      setLocalError(null);
      onChange(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    setLocalError(null);
  };

  const displayError = error || localError;

  if (preview) {
    return (
      <div className="w-full">
        <div className="relative rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border)]">
          <img src={preview} alt="Outfit preview" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <span className="text-white text-sm font-medium">Outfit Image</span>
              <button
                type="button"
                onClick={handleRemove}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        {displayError && <p className="mt-2 text-sm text-[var(--error)]">{displayError}</p>}
      </div>
    );
  }

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className={`
          flex flex-col items-center justify-center w-full h-64 rounded-2xl
          border-2 border-dashed cursor-pointer
          transition-all duration-300
          ${isDragging ? "border-[var(--accent)] bg-[var(--accent)]/5" : "border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5"}
          ${displayError ? "border-[var(--error)]" : ""}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragging ? "bg-[var(--accent)]/10" : "bg-[var(--bg-secondary)]"}`}>
            <svg
              className={`w-8 h-8 ${isDragging ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="mb-2 text-sm text-[var(--text-primary)]">
            <span className="font-semibold text-[var(--accent)]">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-[var(--text-tertiary)]">JPG, PNG, or WebP (max 10MB)</p>
        </div>
        <input id="image-upload" type="file" className="hidden" accept={ACCEPTED_TYPES.join(",")} onChange={handleInputChange} />
      </label>
      {displayError && <p className="mt-2 text-sm text-[var(--error)]">{displayError}</p>}
    </div>
  );
}