import { Hero } from "@/components/Hero";
import { WhySection } from "@/components/WhySection";
import { LanguagePipeline } from "@/components/LanguagePipeline";
import { LanguageFeatures } from "@/components/LanguageFeatures";

export const metadata = {
  title: "MarathiCode — Native-Language Programming | Sprout Tech",
  description: "MarathiCode is a Marathi-native programming language developed by Sprout Tech, using familiar Marathi terminology and Devanagari identifiers to express programming logic.",
};

export default function HomePage() {
  return (
    <div className="w-full space-y-16 sm:space-y-24 pb-16 sm:pb-24">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. What is MarathiCode? */}
      <WhySection />

      {/* 3. How MarathiCode Works - Execution Pipeline */}
      <LanguagePipeline />

      {/* 4. Language Features - 4 Compact Groups */}
      <LanguageFeatures />
    </div>
  );
}
