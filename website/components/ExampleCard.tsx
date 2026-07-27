"use client";

import Link from "next/link";
import { Terminal, Check, Copy, ArrowRight, BookOpen } from "lucide-react";
import { useState } from "react";

interface ExampleCardProps {
  title: string;
  filename: string;
  description: string;
  code: string;
  expectedOutput: string[];
  explanation: string[];
}

export function ExampleCard({
  title,
  filename,
  description,
  code,
  expectedOutput,
  explanation,
}: ExampleCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-xs text-gray-500 font-mono">examples/{filename}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
          <Link
            href="/playground"
            className="px-3.5 py-1.5 rounded-lg bg-[#43B02A] hover:bg-[#389623] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Open in Playground</span>
          </Link>
        </div>
      </div>

      {/* Body: Code + Output */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Source Code View */}
        <div className="lg:col-span-7 space-y-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Source Code (.mr):
          </span>
          <div className="rounded-xl border border-gray-800 bg-[#0A0D14] p-4 text-xs font-marathi-code text-emerald-300 overflow-x-auto">
            <pre>
              <code>{code}</code>
            </pre>
          </div>
        </div>

        {/* Expected Output & Breakdown */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Expected Output:
            </span>
            <div className="rounded-xl border border-gray-800 bg-[#050811] p-3 text-xs font-mono text-sky-300 space-y-1">
              {expectedOutput.map((out, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-gray-600">&gt;</span>
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Explanation:
            </span>
            <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
              {explanation.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#43B02A] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
