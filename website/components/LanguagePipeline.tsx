"use client";

import { useState } from "react";
import { ArrowRight, Code2, Binary, Layers, Cpu, PlayCircle, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const PIPELINE_STAGES = [
  {
    id: "source",
    name: "Marathi Source Code",
    marathi: "मराठी कोड",
    icon: Code2,
    shortDesc: "Input code written in Marathi Devanagari syntax.",
    details: "Written using Marathi keywords like चल, जर, तर, कार्य alongside Devanagari identifiers.",
    codeSnippet: `चल वय = १८
जर वय >= १८ तर {
    छापा("पात्र")
}`,
  },
  {
    id: "lexer",
    name: "Lexer",
    marathi: "लेक्सिकल ॲनालायझर",
    icon: Binary,
    shortDesc: "Breaks Marathi source code into meaningful programming tokens.",
    details: "Scans string input and produces a stream of typed tokens (VAR, IDENTIFIER, EQUALS, NUMBER).",
    codeSnippet: `[VAR 'चल'], [ID 'वय'], [EQ '='], [NUM '18']`,
  },
  {
    id: "parser",
    name: "Parser",
    marathi: "सिंटॅक्स पार्सर",
    icon: Layers,
    shortDesc: "Uses the language grammar to understand how tokens are structured.",
    details: "Applies context-free grammar rules and operator precedence to construct parse trees.",
    codeSnippet: `AssignmentStmt(target='वय', value=Literal(18))`,
  },
  {
    id: "ast",
    name: "AST",
    marathi: "ॲबस्ट्रॅक्ट सिंटॅक्स ट्री",
    icon: Cpu,
    shortDesc: "Builds a structured representation of the program.",
    details: "Nested tree data structure representing statements, conditions, blocks, and function definitions.",
    codeSnippet: `BlockNode([
  VarDecl(name='वय', value=18),
  IfNode(cond=Ge('वय', 18), body=[Print('पात्र')])
])`,
  },
  {
    id: "interpreter",
    name: "Interpreter",
    marathi: "इंटरप्रिटर",
    icon: PlayCircle,
    shortDesc: "Executes the resulting program.",
    details: "Tree-walking execution engine that evaluates nodes and manages dynamic environment scopes.",
    codeSnippet: `Environment.set('वय', 18)
Execute IfNode => condition True => Print("पात्र")`,
  },
  {
    id: "output",
    name: "Program Output",
    marathi: "प्रोग्राम आऊटपुट",
    icon: Terminal,
    shortDesc: "Produces terminal output or return values.",
    details: "Outputs results to standard stdout or browser execution console.",
    codeSnippet: `> पात्र`,
  },
];

export function LanguagePipeline() {
  const [selectedId, setSelectedId] = useState<string>("source");
  const activeStage = PIPELINE_STAGES.find((s) => s.id === selectedId)!;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          How MarathiCode Works
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          From Marathi Devanagari text to execution: a classic programming-language architecture.
        </p>
      </div>

      {/* 6-Stage Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {PIPELINE_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.id}
              className="p-4 rounded-2xl text-left border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-[#43B02A]">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-gray-400">Step 0{idx + 1}</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                  {stage.name}
                </h4>
                <p className="text-[10px] font-medium text-[#43B02A] dark:text-emerald-400 font-marathi-code mt-0.5">
                  {stage.marathi}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Short Summary Sentence */}
      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        MarathiCode transforms Marathi source code through lexical analysis and parsing into an executable program representation.
      </p>

    </section>
  );
}
