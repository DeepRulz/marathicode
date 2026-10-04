"use client";

import { Keyboard } from "lucide-react";

interface MarathiKeyboardProps {
  onInsert: (text: string) => void;
}

export function MarathiKeyboard({ onInsert }: MarathiKeyboardProps) {
  const keywordGroup = [
    { text: "चल ", label: "चल (VAR)", tooltip: "Declare variable" },
    { text: "छापा()", label: "छापा (PRINT)", tooltip: "Print expression" },
    { text: "जर ", label: "जर (IF)", tooltip: "If conditional" },
    { text: " तर ", label: "तर (THEN)", tooltip: "Then block qualifier" },
    { text: "नाहीतर ", label: "नाहीतर (ELSE)", tooltip: "Else branch" },
    { text: "पर्यंत ", label: "पर्यंत (WHILE)", tooltip: "While loop" },
    { text: "साठी (", label: "साठी (FOR)", tooltip: "For loop" },
    { text: "थांब", label: "थांब (BREAK)", tooltip: "Break loop" },
    { text: "पुढे", label: "पुढे (CONTINUE)", tooltip: "Continue loop" },
    { text: "कार्य ", label: "कार्य (FUNCTION)", tooltip: "Define function" },
    { text: "परत ", label: "परत (RETURN)", tooltip: "Return statement" },
  ];

  const logicGroup = [
    { text: "खरे", label: "खरे (TRUE)", tooltip: "Boolean true" },
    { text: "खोटे", label: "खोटे (FALSE)", tooltip: "Boolean false" },
    { text: " आणि ", label: "आणि (AND)", tooltip: "Logical AND" },
    { text: " किंवा ", label: "किंवा (OR)", tooltip: "Logical OR" },
    { text: "नाही ", label: "नाही (NOT)", tooltip: "Logical NOT" },
    { text: "लांबी()", label: "लांबी()", tooltip: "List/String length" },
    { text: "जोडा()", label: "जोडा()", tooltip: "List append" },
  ];

  const symbolsGroup = [
    { text: " [ ]", label: "[ ]" },
    { text: " { }", label: "{ }" },
    { text: "( )", label: "( )" },
    { text: " = ", label: "=" },
    { text: " == ", label: "==" },
    { text: " != ", label: "!=" },
    { text: " > ", label: ">" },
    { text: " < ", label: "<" },
    { text: " >= ", label: ">=" },
    { text: " <= ", label: "<=" },
    { text: " + ", label: "+" },
    { text: " - ", label: "-" },
    { text: " * ", label: "*" },
    { text: " / ", label: "/" },
  ];

  const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] p-3 shadow-sm">
      
      {/* Keyboard Header */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100 dark:border-gray-800 text-xs">
        <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
          <Keyboard className="w-4 h-4 text-[#43B02A]" />
          <span>Marathi Soft Keyboard / Quick Insert</span>
        </div>
        <span className="text-[11px] text-gray-500 dark:text-gray-400">
          Click to insert Marathi keywords without typing Devanagari
        </span>
      </div>

      {/* Button Row 1: Core Keywords */}
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-1">
          Keywords:
        </span>
        {keywordGroup.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onInsert(item.text)}
            title={item.tooltip}
            className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-[#43B02A] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-medium font-marathi-code transition-all hover:scale-105 active:scale-95 shadow-2xs"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Button Row 2: Logic & Built-ins */}
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-1">
          Logic & Functions:
        </span>
        {logicGroup.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onInsert(item.text)}
            title={item.tooltip}
            className="px-2 py-1 rounded bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/60 dark:hover:bg-sky-900/80 text-[#0E5A9C] dark:text-sky-300 border border-sky-200 dark:border-sky-800/60 text-xs font-medium font-marathi-code transition-all hover:scale-105 active:scale-95 shadow-2xs"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Button Row 3: Symbols & Digits */}
      <div className="flex flex-wrap items-center gap-1">
        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-1">
          Operators & Digits:
        </span>
        {symbolsGroup.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onInsert(item.text)}
            className="px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-mono transition-all hover:scale-105 active:scale-95"
          >
            {item.label}
          </button>
        ))}

        <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-700 mx-1" />

        {marathiDigits.map((digit, idx) => (
          <button
            key={idx}
            onClick={() => onInsert(digit)}
            className="px-2 py-0.5 rounded bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 text-xs font-marathi-code transition-all hover:scale-105 active:scale-95"
          >
            {digit}
          </button>
        ))}
      </div>

    </div>
  );
}
