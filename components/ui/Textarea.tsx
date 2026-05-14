"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  charCount?: boolean;
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, charCount, maxLength, className = "", value, ...props },
    ref
  ) => {
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          value={value}
          maxLength={maxLength}
          className={`
            w-full bg-[var(--bg-card)] border border-[var(--border)]
            rounded-xl px-4 py-3 text-[var(--text-primary)]
            focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent
            transition-all duration-300 resize-none
            ${error ? "border-[var(--error)] focus:ring-[var(--error)]" : ""}
            ${className}
          `}
          {...props}
        />
        <div className="flex justify-between items-center mt-1">
          {error && (
            <p className="text-sm text-[var(--error)]">{error}</p>
          )}
          {charCount && maxLength && (
            <p className="text-sm text-[var(--text-tertiary)] ml-auto">
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;