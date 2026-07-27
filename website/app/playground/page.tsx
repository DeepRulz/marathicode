import { PlaygroundEditor } from "@/components/PlaygroundEditor";
import { Terminal } from "lucide-react";

export const metadata = {
  title: "Playground",
  description: "Test and execute MarathiCode programs live in your web browser with our integrated Devanagari soft keyboard toolbar.",
};

export default function PlaygroundPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-6">
      
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#43B02A] text-xs font-semibold">
          <Terminal className="w-3.5 h-3.5" />
          <span>Live Web Engine v0.1</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          MarathiCode Online Playground
        </h1>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
          Type MarathiCode programs directly in the Monaco editor below. Use the integrated <strong>Marathi Soft Keyboard Toolbar</strong> to insert Devanagari keywords without needing a Marathi input method on your machine.
        </p>
      </div>

      {/* Editor & Console */}
      <PlaygroundEditor />

    </div>
  );
}
