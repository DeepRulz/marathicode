import { ArrowRight } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

export function WhySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header & Description */}
      <div className="max-w-3xl space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          What is MarathiCode?
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          MarathiCode is a programming language that lets programmers express familiar programming concepts using Marathi keywords and Devanagari identifiers.
        </p>
      </div>

      {/* Visual Syntax Comparison */}
      <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Left: Conventional Programming Syntax */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Conventional Syntax
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-900 p-4 text-xs font-mono text-gray-300">
              <pre>
                <code>{`let age = 18;

if (age >= 18) {
    print("Eligible");
}`}</code>
              </pre>
            </div>
          </div>

          {/* Right: MarathiCode Syntax */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#43B02A] uppercase tracking-wider">
              MarathiCode Syntax
            </div>
            <div className="rounded-xl border border-emerald-900/60 bg-[#090D16] p-4 text-xs font-mono text-emerald-300 shadow-sm">
              <pre>
                <code>{`चल वय = १८

जर वय >= १८ तर {
    छापा("पात्र")
}`}</code>
              </pre>
            </div>
          </div>

        </div>
      </div>

      {/* Explanatory sentence */}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Variables, conditions, loops, functions and expressions follow familiar programming-language structures.
      </p>

    </section>
  );
}
