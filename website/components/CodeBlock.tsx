"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
}

export function CodeBlock({ code, filename, language = "marathi" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl border border-gray-800 bg-[#0A0D14] overflow-hidden shadow-lg">
      {/* Header Bar */}
      <div className="px-4 py-2.5 bg-[#141923] border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Terminal className="w-3.5 h-3.5 text-[#43B02A]" />
          <span>{filename || `example.${language === "marathi" ? "mr" : "py"}`}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-sans">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="font-sans">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <div className="p-4 overflow-x-auto text-sm font-marathi-code text-emerald-300 leading-relaxed">
        <pre>
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}
