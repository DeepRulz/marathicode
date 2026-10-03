import { FlaskConical, Info } from "lucide-react";

export function ResearchQuestion() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] p-6 md:p-8 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-[#0E5A9C] dark:text-sky-400 text-xs font-semibold">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>The Research Question</span>
          </div>
          <div className="text-xs text-gray-500 font-mono">
            <strong>Current status:</strong> Working research prototype
          </div>
        </div>

        <blockquote className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white leading-snug italic">
          &ldquo;Can programming in a learner&apos;s familiar language reduce the linguistic barrier to learning programming?&rdquo;
        </blockquote>

        <div className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-400 pt-1">
          <Info className="w-4 h-4 text-[#0E5A9C] dark:text-sky-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            MarathiCode is a working prototype created to explore this question. The current work evaluates language design and implementation; no controlled learner study has yet been conducted, and its educational effectiveness remains a subject for future study.
          </p>
        </div>

      </div>
    </section>
  );
}
