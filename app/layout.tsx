import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FitLore - AI Outfit Analysis",
  description: "Upload your outfit image and get instant AI-powered style analysis with scores, color palettes, and personalized recommendations.",
  keywords: ["AI fashion", "outfit analysis", "style recommendations", "fashion tech", "outfit scoring"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}