import { FlaskConical, AlertCircle, ArrowUpRight, CheckCircle2, FileText, Cpu, BookOpen } from "lucide-react";
import Link from "next/link";

export function ResearchStatus() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* 1. Research Status & Scope */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] p-8 md:p-12 shadow-sm space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#43B02A] text-xs font-semibold">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Project Status</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Research Status & Scope
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-[#0E5A9C] dark:text-sky-400 font-mono text-xs font-bold border border-sky-200 dark:border-sky-800/60 shrink-0">
            Current Stage: Research Prototype
          </div>
        </div>

        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          MarathiCode is currently a <strong>research prototype</strong>. The present work focuses on language design, Devanagari lexical and syntactic processing, interpreter architecture, and exploring the potential educational role of familiar-language programming.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Current Focus */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#43B02A]" />
              <span>Present Work Focus</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#43B02A] shrink-0 mt-2" />
                <span>Formal Marathi-native programming language design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#43B02A] shrink-0 mt-2" />
                <span>Lexical analysis and Devanagari tokenization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#43B02A] shrink-0 mt-2" />
                <span>Abstract Syntax Tree (AST) construction & formal grammar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#43B02A] shrink-0 mt-2" />
                <span>Tree-walking interpreter architecture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#43B02A] shrink-0 mt-2" />
                <span>Evaluating technical feasibility of native-language syntax</span>
              </li>
            </ul>
          </div>

          {/* Future Directions */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-[#0E5A9C] dark:text-sky-400" />
              <span>Future Learner Outcome Research</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              A controlled empirical study measuring learning outcomes has not yet been conducted. Future research could investigate:
            </p>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E5A9C] shrink-0 mt-2" />
                <span>Core algorithmic concept comprehension among beginner learners</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E5A9C] shrink-0 mt-2" />
                <span>Programming task completion performance and error resolution rate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E5A9C] shrink-0 mt-2" />
                <span>Perceived difficulty and cognitive load during early learning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E5A9C] shrink-0 mt-2" />
                <span>Learner confidence when introducing programming concepts</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* 2. Language Processing / NLP Clarification Section */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-[#F9FAFB] dark:bg-[#0B0F19] p-8 md:p-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0E5A9C] dark:text-sky-400 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>Technical Classification</span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Language Processing
        </h3>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
          MarathiCode uses concepts related to linguistic processing at the programming-language level. Its lexer performs tokenization and maps Marathi keywords to programming tokens, while its parser applies a formal grammar to construct an abstract syntax tree. These techniques are related to lexical and syntactic processing, although <strong>MarathiCode is a formal programming language rather than a natural-language NLP system</strong>.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="px-3 py-1 rounded-lg bg-gray-200/80 dark:bg-gray-800 font-mono">Formal Context-Free Grammar</span>
          <span className="px-3 py-1 rounded-lg bg-gray-200/80 dark:bg-gray-800 font-mono">Deterministic Lexer/Parser</span>
          <span className="px-3 py-1 rounded-lg bg-gray-200/80 dark:bg-gray-800 font-mono">No ML / No LLM / Non-Probabilistic</span>
        </div>
      </div>

    </section>
  );
}
