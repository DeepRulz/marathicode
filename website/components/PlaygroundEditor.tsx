"use client";

import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { MarathiKeyboard } from "./MarathiKeyboard";
import { runMarathiCode, ExecutionResult } from "@/lib/marathi-engine";
import {
  Play,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  Terminal,
  Code2,
  FileCode,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const SAMPLE_PROGRAMS = [
  {
    name: "hello.mr",
    label: "१. नमस्कार (Hello World)",
    code: `छापा("नमस्कार मराठी कोड!")`,
  },
  {
    name: "add.mr",
    label: "२. बेरीज (Add Numbers)",
    code: `चल अ = ४
चल म = 5.8
छापा(अ + म)`,
  },
  {
    name: "else_if.mr",
    label: "३. जर-नाहीतर जर (Else-If Conditional)",
    code: `चल गुण = ७५
जर गुण > ९० तर {
    छापा("विशेष गुणवत्ता")
} नाहीतर जर गुण > ६० तर {
    छापा("प्रथम श्रेणी")
} नाहीतर {
    छापा("उत्तीर्ण")
}`,
  },
  {
    name: "for_loop.mr",
    label: "४. साठी लूप (Counted For Loop)",
    code: `साठी (i = १; i <= ५; i = i + १) {
    जर i == ३ तर {
        छापा("३ वर पुढे जा")
        आगे // continue
        पुढे
    }
    छापा(i)
}`,
  },
  {
    name: "lists.mr",
    label: "५. यादी क्रिया (Lists & Built-ins)",
    code: `चल फळे = ["आंबा", "केळी"]
छापा("सुरवातीची लांबी: " + लांबी(फळे))

जोडा(फळे, "सफरचंद")
छापा("नवीन लांबी: " + लांबी(फळे))
छापा("तिसरे फळ: " + फळे[२])`,
  },
  {
    name: "functions.mr",
    label: "६. कार्य गणिते (Functions)",
    code: `कार्य फॅक्टोरिअल(n) {
    जर n <= १ तर {
        परत १
    }
    परत n * फॅक्टोरिअल(n - १)
}

छापा("५ चे फॅक्टोरिअल: " + फॅक्टोरिअल(५))`,
  },
];

export function PlaygroundEditor() {
  const [code, setCode] = useState<string>(SAMPLE_PROGRAMS[0].code);
  const [activeSample, setActiveSample] = useState<string>("hello.mr");
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);

  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleInsertKeyword = (textToInsert: string) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const selection = editor.getSelection();
      const id = { major: 1, minor: 1 };
      const op = {
        identifier: id,
        range: selection,
        text: textToInsert,
        forceMoveMarkers: true,
      };
      editor.executeEdits("my-source", [op]);
      editor.focus();
    } else {
      setCode((prev) => prev + textToInsert);
    }
  };

  const handleRun = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const res = runMarathiCode(code);
      setResult(res);
      setIsExecuting(false);
    }, 100);
  };

  const handleClearConsole = () => {
    setResult(null);
  };

  const handleSelectSample = (name: string) => {
    const sample = SAMPLE_PROGRAMS.find((s) => s.name === name);
    if (sample) {
      setCode(sample.code);
      setActiveSample(name);
      setResult(null);
    }
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4">
      
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 shadow-sm">
        
        {/* Sample Selector */}
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-[#43B02A]" />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            उदाहरण:
          </span>
          <select
            value={activeSample}
            onChange={(e) => handleSelectSample(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#43B02A]"
          >
            {SAMPLE_PROGRAMS.map((sample) => (
              <option key={sample.name} value={sample.name}>
                {sample.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium flex items-center gap-1.5 transition-all"
            title="Copy source code"
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

          <button
            onClick={() => handleSelectSample(activeSample)}
            className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium flex items-center gap-1.5 transition-all"
            title="Reset code to original sample"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isExecuting}
            className="px-5 py-1.5 rounded-lg bg-[#43B02A] hover:bg-[#389623] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isExecuting ? "Executing..." : "Run (चालवा)"}</span>
          </button>
        </div>

      </div>

      {/* Soft Marathi Keyboard Bar */}
      <MarathiKeyboard onInsert={handleInsertKeyword} />

      {/* Editor & Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Monaco Editor Container */}
        <div className="lg:col-span-7 rounded-xl border border-gray-200 dark:border-gray-800 bg-[#1E1E1E] overflow-hidden shadow-lg flex flex-col h-[480px]">
          <div className="px-4 py-2 bg-[#252526] border-b border-[#333333] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
              <Code2 className="w-3.5 h-3.5 text-[#43B02A]" />
              <span>{activeSample}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">MarathiCode v0.1</span>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              language="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              onMount={handleEditorDidMount}
              options={{
                fontSize: 14,
                fontFamily: "'Consolas', 'Fira Code', 'Noto Sans Devanagari', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                glyphMargin: false,
                folding: true,
                padding: { top: 12, bottom: 12 },
              }}
            />
          </div>
        </div>

        {/* Terminal / Console Container */}
        <div className="lg:col-span-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-[#0A0D14] overflow-hidden shadow-lg flex flex-col h-[480px]">
          
          {/* Terminal Header */}
          <div className="px-4 py-2.5 bg-[#141923] border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
              <Terminal className="w-4 h-4 text-[#43B02A]" />
              <span>Console Output</span>
              {result && (
                <span className="text-[10px] text-gray-400 flex items-center gap-1 ml-2">
                  <Clock className="w-3 h-3" />
                  {result.executionTimeMs}ms
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {result && (
                <button
                  onClick={handleClearConsole}
                  className="p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-red-400 transition-colors"
                  title="Clear Console"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Terminal Content Body */}
          <div className="p-4 flex-1 overflow-y-auto font-marathi-code text-sm">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 text-xs space-y-2">
                <Terminal className="w-8 h-8 stroke-[1.5] text-gray-600" />
                <p>Click "Run (चालवा)" to execute code in live Marathi engine</p>
              </div>
            ) : result.error ? (
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-950/60 border border-red-800/60 px-2.5 py-1 rounded">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Execution Error (त्रुटी)</span>
                </div>
                <div className="text-red-300 font-medium pl-2 border-l-2 border-red-500">
                  {result.error}
                </div>
              </div>
            ) : result.logs.length === 0 ? (
              <div className="text-gray-400 text-xs italic">
                Program completed successfully with no output statements.
              </div>
            ) : (
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Success (यशस्वी)</span>
                </div>
                <div className="space-y-1 pt-1">
                  {result.logs.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-emerald-300">
                      <span className="text-gray-600 select-none">&gt;</span>
                      <span className="whitespace-pre-wrap">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
