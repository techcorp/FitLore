import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/features/Hero";
import FeaturesGrid from "@/components/features/FeaturesGrid";
import HowItWorks from "@/components/features/HowItWorks";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturesGrid />
        <HowItWorks />

        {/* CTA Section */}
        <section className="py-16 bg-[var(--accent)]">
          <div className="max-w-lg mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Ready to Elevate Your Style?
            </h2>
            <p className="text-sm text-white/80 mb-6">
              Upload your outfit and get instant AI-powered insights.
            </p>
            <Link href="/analyze">
              <Button size="lg" className="bg-white text-[var(--accent)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)] w-full max-w-xs">
                Analyze My Outfit Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}