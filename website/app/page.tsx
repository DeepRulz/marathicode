import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { CTASection } from "@/components/CTASection";
import {
  Code2,
  Binary,
  Layers,
  Cpu,
  Sparkles,
  Terminal,
  ShieldCheck,
  Zap,
  Globe,
  GraduationCap,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Philosophy & Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-[#0E5A9C] dark:text-sky-400 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Sprout Tech Educational Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Why Build with MarathiCode?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            When beginners start programming, they often struggle first with <strong>unfamiliar English syntax</strong> rather than core algorithmic logic.
            MarathiCode addresses this by enabling learners to express logic in their native language before transitioning to mainstream tools.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          <FeatureCard
            title="Native Marathi Syntax"
            marathiTitle="मराठी कीवर्ड्स"
            description="Built using native Marathi keywords like चल (var), जर (if), तर (then), पर्यंत (while), and कार्य (function)."
            icon={Code2}
            color="green"
          />

          <FeatureCard
            title="Unicode Identifier Support"
            marathiTitle="युनिकोड अक्षरे"
            description="Supports Devanagari character ranges (U+0900-U+097F) as well as ASCII for variable names and function parameters."
            icon={Globe}
            color="blue"
          />

          <FeatureCard
            title="Structured Grammar"
            marathiTitle="व्याकरण व नियम"
            description="Employs a formal context-free grammar with mathematically intuitive operator precedence for boolean logic and arithmetic."
            icon={Binary}
            color="default"
          />

          <FeatureCard
            title="Pure Data Types"
            marathiTitle="डेटा प्रकार"
            description="Supports Numbers (integers and floats with Devanagari digit support), Strings, and Boolean values (खरे / खोटे)."
            icon={Layers}
            color="green"
          />

          <FeatureCard
            title="Isolated Scope Environments"
            marathiTitle="लोकल स्कोप"
            description="Function calls establish isolated stack-frame environments preventing variable leaks across scopes."
            icon={Cpu}
            color="blue"
          />

          <FeatureCard
            title="Real-Time Web Playground"
            marathiTitle="वेब प्लॅटफॉर्म"
            description="Features a complete interactive web editor with integrated soft Marathi keyword insertion for instant execution."
            icon={Zap}
            color="default"
          />
        </div>
      </section>

      {/* 3. Detailed Language Capabilities Section
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#43B02A] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Language Design Highlights</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Designed for Simplicity and Precision
            </h2>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              MarathiCode combines expressive Devanagari syntax with modern language concepts like block scoping, recursion, dynamic typing, and descriptive error diagnostics in Marathi.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#43B02A] hover:bg-[#389623] text-white font-semibold text-sm shadow-sm transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Full Documentation</span>
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold text-sm transition-all"
              >
                <Terminal className="w-4 h-4 text-[#0E5A9C] dark:text-sky-400" />
                <span>Open Playground</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-gray-800 bg-[#0A0D14] p-6 text-xs font-marathi-code text-emerald-300 space-y-3 shadow-xl">
            <div className="text-gray-500 border-b border-gray-800 pb-2 text-[11px] font-mono">
              // MarathiCode Quick Preview
            </div>
            <pre className="leading-relaxed">
              {`कार्य गुणाकार(a, b) {
    परत a * b
}

चल संख्या1 = १०
चल संख्या2 = ५

जर संख्या1 > संख्या2 तर {
    छापा(गुणाकार(संख्या1, संख्या2))
}`}
            </pre>
          </div>

        </div>
      </section> */}

      {/* 4. CTA Banner */}
      <CTASection />
    </div>
  );
}
