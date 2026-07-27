"use client";

import { useState } from "react";
import { ArrowRight, Code, Binary, Layers, Cpu, PlayCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PIPELINE_STAGES = [
  {
    id: "source",
    title: "1. Source Code",
    marathi: "स्रोत कोड",
    icon: Code,
    file: "examples/*.mr",
    description: "Input source text written in Marathi Devanagari syntax containing variables, conditionals, loops, functions, and print calls.",
    snippet: `कार्य क्षेत्र(ल, म) {
    परत ल * म
}`,
    details: [
      "UTF-8 encoded string input.",
      "Supports Marathi Devanagari Unicode characters (U+0900 to U+097F).",
      "Whitespace-insensitive formatting with brace-delimited blocks.",
    ],
  },
  {
    id: "lexer",
    title: "2. Lexical Analysis",
    marathi: "लेक्सिकल विश्लेषण",
    icon: Binary,
    file: "marathi/lexer.py",
    description: "Converts raw characters into a sequence of structured Tokens using PLY Lexer regex rules.",
    snippet: `[VAR 'चल'], [IDENTIFIER 'वय'], [EQUALS '='], [NUMBER '10']`,
    details: [
      "Uses ply.lex regular expression matching rules.",
      "Matches Marathi reserved words ('चल', 'छापा', 'जर', 'तर', 'नाहीतर', 'पर्यंत', 'कार्य', 'परत').",
      "Tracks line numbers for accurate diagnostic error locations.",
    ],
  },
  {
    id: "parser",
    title: "3. Syntax Analysis",
    marathi: "सिंटॅक्स विश्लेषण",
    icon: Layers,
    file: "marathi/parser.py",
    description: "LALR(1) parser using PLY Yacc to convert flat tokens into nested syntactic grammar structures according to operator precedence.",
    snippet: `precedence = (
    ('right', 'NOT'),
    ('left', 'AND'), ('left', 'OR'),
    ('left', 'GT', 'LT', 'GE', 'LE', 'EQ', 'NE'),
    ('left', 'PLUS', 'MINUS'),
    ('left', 'TIMES', 'DIVIDE', 'MODULO')
)`,
    details: [
      "Constructs context-free grammar parse trees.",
      "Handles operator precedence (e.g. multiplicative * before additive +).",
      "Emits Marathi syntax error diagnostics on invalid token structures.",
    ],
  },
  {
    id: "ast",
    title: "4. Abstract Syntax Tree",
    marathi: "अ‍ॅबस्ट्रॅक्ट सिंटॅक्स ट्री",
    icon: Cpu,
    file: "marathi/ast_nodes.py",
    description: "Intermediate structural representation storing code semantics without execution overhead.",
    snippet: `FunctionDef(
  name='क्षेत्र',
  params=['ल', 'म'],
  body=Block([Return(BinaryOp(Var(ल), '*', Var(म)))])
)`,
    details: [
      "Pure data structures inheriting from ASTNode base class.",
      "Nodes include Assignment, Print, If, While, FunctionDef, FunctionCall, Return.",
      "Tree structure mirrors the nested control-flow hierarchy.",
    ],
  },
  {
    id: "interpreter",
    title: "5. Execution Engine",
    marathi: "इंटरप्रिटर / कोड जनरेशन",
    icon: PlayCircle,
    file: "marathi/codegen.py",
    description: "Tree-walking interpreter evaluating AST statements, maintaining scope maps, and executing logic.",
    snippet: `class Interpreter:
    def run(self, program):
        for stmt in program:
            self.execute(stmt)`,
    details: [
      "Maintains dynamic environment scope maps (self.env and self.functions).",
      "Function execution allocates isolated child call-stack environments.",
      "Return statements bubble values via internal ReturnSignal exception handling.",
    ],
  },
];

export function ArchitectureDiagram() {
  const [activeStageId, setActiveStageId] = useState<string>("source");

  const activeStage = PIPELINE_STAGES.find((s) => s.id === activeStageId)!;

  return (
    <div className="w-full space-y-8">
      
      {/* Pipeline Navigation Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {PIPELINE_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={cn(
                "p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between space-y-3 relative",
                isActive
                  ? "bg-white dark:bg-[#111622] border-[#43B02A] shadow-md ring-2 ring-[#43B02A]/20"
                  : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
                    isActive
                      ? "bg-[#43B02A] text-white"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-gray-400">Step 0{idx + 1}</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                  {stage.title}
                </h4>
                <p className="text-[11px] font-semibold text-[#43B02A] dark:text-emerald-400">
                  {stage.marathi}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] p-6 lg:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Stage Info */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 text-[#43B02A] font-mono text-xs font-semibold border border-emerald-200 dark:border-emerald-800/60">
              {activeStage.file}
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {activeStage.marathi}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {activeStage.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {activeStage.description}
          </p>

          <div className="pt-2 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Technical Implementation Highlights:
            </h4>
            <ul className="space-y-2">
              {activeStage.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#43B02A] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Code Snippet */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="rounded-xl border border-gray-800 bg-[#0A0D14] p-4 text-xs font-marathi-code text-emerald-300 leading-relaxed overflow-x-auto shadow-inner">
            <div className="text-gray-500 mb-2 border-b border-gray-800 pb-1 text-[11px]">
              Implementation View ({activeStage.file}):
            </div>
            <pre>
              <code>{activeStage.snippet}</code>
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
}
