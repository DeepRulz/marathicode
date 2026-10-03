import Link from "next/link";
import { Terminal, ArrowRight, BookOpen, Code2 } from "lucide-react";

export function CTASection() {
  return (
    <section className="my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#43B02A] via-[#2A821E] to-[#0E5A9C] p-8 md:p-12 text-white shadow-2xl">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md">
            <Code2 className="w-3.5 h-3.5" />
            <span>Get Started with MarathiCode</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Try MarathiCode
          </h2>

          <p className="text-white/90 text-base leading-relaxed">
            Write a program, explore the syntax, and see Marathi programming in action.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#111111] hover:bg-gray-100 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <Terminal className="w-4 h-4 text-[#43B02A]" />
              <span>Launch Playground</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black/20 hover:bg-black/30 border border-white/30 text-white font-semibold text-sm transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Documentation</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
