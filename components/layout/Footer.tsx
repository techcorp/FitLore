"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] py-8">
      <div className="max-w-lg mx-auto px-4 text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <span className="text-base font-bold"><span className="font-[family-name:var(--font-playfair)]">Fit</span><span className="text-[var(--accent)]">Lore</span></span>
        </Link>
        <p className="text-xs text-[var(--text-tertiary)] mb-4">AI-powered outfit analysis for the style-conscious</p>
        <div className="flex justify-center gap-6 text-xs text-[var(--text-secondary)] mb-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <p className="text-xs text-[var(--text-tertiary)]">&copy; {new Date().getFullYear()} FitLore. All rights reserved.</p>
      </div>
    </footer>
  );
}