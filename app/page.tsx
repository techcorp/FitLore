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
        <section className="py-16 md:py-24 bg-[var(--accent)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Elevate Your Style?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Upload your outfit today and get instant AI-powered insights to look your best for any occasion.
            </p>
            <Link href="/analyze">
              <Button
                size="lg"
                className="bg-white text-[var(--accent)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)]"
              >
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