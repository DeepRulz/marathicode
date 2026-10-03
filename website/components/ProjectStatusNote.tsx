import { FlaskConical, CheckCircle2 } from "lucide-react";

export function ProjectStatusNote() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E5A9C] dark:text-sky-400">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Project Status</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Working Research Prototype
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            MarathiCode currently includes a functional lexer, parser, AST-based interpreter and interactive browser demonstration.
          </p>
        </div>
        <div className="shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-[#43B02A] dark:text-emerald-400 font-mono text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Active Implementation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
