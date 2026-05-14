"use client";

import { useEffect } from "react";

interface ErrorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  type?: "error" | "warning" | "info";
}

export default function ErrorPopup({
  isOpen,
  onClose,
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  type = "error",
}: ErrorPopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const icons = {
    error: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    warning: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    info: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const colors = {
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "text-red-500",
      title: "text-red-800",
      message: "text-red-600",
      button: "bg-red-500 hover:bg-red-600",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: "text-amber-500",
      title: "text-amber-800",
      message: "text-amber-600",
      button: "bg-amber-500 hover:bg-amber-600",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "text-blue-500",
      title: "text-blue-800",
      message: "text-blue-600",
      button: "bg-blue-500 hover:bg-blue-600",
    },
  };

  const colorScheme = colors[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          relative w-full max-w-md p-6 rounded-2xl shadow-2xl
          ${colorScheme.bg} ${colorScheme.border} border
          animate-in zoom-in-95 duration-200
        `}
      >
        {/* Icon */}
        <div className={`flex justify-center mb-4 ${colorScheme.icon}`}>
          {icons[type]}
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className={`text-xl font-bold mb-2 ${colorScheme.title}`}>
            {title}
          </h3>
          <p className={`text-sm ${colorScheme.message}`}>
            {message}
          </p>
        </div>

        {/* Action */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className={`
              px-8 py-2.5 rounded-xl text-white font-medium
              transition-all duration-200
              ${colorScheme.button}
              hover:shadow-lg active:scale-95
            `}
          >
            Try Again
          </button>
        </div>

        {/* Hint */}
        <p className="text-center text-xs text-[var(--text-tertiary)] mt-4">
          Make sure the backend service is running and try again.
        </p>
      </div>
    </div>
  );
}