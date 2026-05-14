"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/95 backdrop-blur-lg border-b border-[var(--border)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="FitLore" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              How It Works
            </Link>
          </div>

          {/* Desktop CTA */}
          <Link href="/analyze" className="hidden md:inline-flex">
            <Button size="sm">Analyze Outfit</Button>
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[var(--text-secondary)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border)]">
            <div className="flex flex-col gap-4">
              <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                Features
              </Link>
              <Link href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                How It Works
              </Link>
              <Link href="/analyze" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full">Analyze Outfit</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}