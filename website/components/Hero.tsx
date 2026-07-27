"use client";

import Link from "next/link";
import { Terminal, BookOpen, Sparkles, ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { runMarathiCode } from "@/lib/marathi-engine";

const HERO_CODE = `कार्य क्षेत्र(ल, म) {
    परत ल * म
}

कार्य परिमिती(ल, म) {
    परत 2 * (ल + म)
}

चल a = क्षेत्र(10, 20)
चल p = परिमिती(10, 20)

छापा(a)
छापा(p)`;

export function Hero() {
  const [activeCode, setActiveCode] = useState(HERO_CODE);
  const [isRunning, setIsRunning] = useState(false);
  const [outputLogs, setOutputLogs] = useState<string[]>(["200", "60"]);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = runMarathiCode(activeCode);
      if (res.error) {
        setOutputLogs([`त्रुटी: ${res.error}`]);
      } else {
        setOutputLogs(res.logs);
      }
      setIsRunning(false);
    }, 150);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-[#0A0D12] dark:via-[#0E1520] dark:to-[#0A0D12]">

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#43B02A]/15 to-[#0E5A9C]/15 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Sprout Tech Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-[#43B02A] dark:text-emerald-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Programming in Marathi</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.15]">
              कोडिंग शिका <br />
              <span className="sprout-gradient-text">तुमच्या स्वाभिमानी भाषेत</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              MarathiCode is a programming language that lets developers write code using Marathi syntax and Devanagari identifiers. Designed to make programming more accessible, it helps learners focus on computational thinking while remaining expressive enough for real applications.
            </p>

            {/* Key Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#43B02A]" />
                <span>Logic-First Learning</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#0E5A9C] dark:text-sky-400" />
                <span>Devanagari Unicode Identifiers</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#43B02A]" />
                <span>Scoped Functions & Loops</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#0E5A9C] dark:text-sky-400" />
                <span>Marathi Error Diagnostics</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/playground"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#43B02A] hover:bg-[#389623] text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                <Terminal className="w-5 h-5" />
                <span>Try Online Playground</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold text-base shadow-sm transition-all duration-200"
              >
                <BookOpen className="w-5 h-5 text-[#0E5A9C] dark:text-sky-400" />
                <span>Read Documentation</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Animated Interactive Code Example */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-gray-800 bg-[#0F172A] shadow-2xl overflow-hidden">

              {/* Window Header */}
              <div className="px-4 py-3 bg-[#1E293B] border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-gray-400">rectangle_function.mr</span>
                </div>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#43B02A] hover:bg-[#389623] text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isRunning ? "Running..." : "Run"}</span>
                </button>
              </div>

              {/* Code Display */}
              <div className="p-4 overflow-x-auto text-sm font-marathi-code text-emerald-300 leading-relaxed bg-[#090D16]">
                <pre>
                  <code>{activeCode}</code>
                </pre>
              </div>

              {/* Terminal Output */}
              <div className="border-t border-gray-800 bg-[#050811] p-4 text-xs font-mono">
                <div className="text-gray-400 mb-1 flex items-center justify-between">
                  <span>Output Terminal:</span>
                  <span className="text-[10px] text-emerald-400">Live Execution</span>
                </div>
                {outputLogs.map((log, idx) => (
                  <div key={idx} className="text-sky-300 flex items-center gap-2">
                    <span className="text-gray-600">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
