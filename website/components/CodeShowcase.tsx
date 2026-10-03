import Link from "next/link";
import { Terminal, ArrowRight, Code2 } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

const SHOWCASE_EXAMPLES = [
  {
    title: "१. हॅलो वर्ल्ड (Hello World)",
    desc: "Print statements use native 'छापा' (print) function.",
    code: `// पहिला मराठीकोड प्रोग्राम
छापा("नमस्कार, मराठीकोड!")`,
  },
  {
    title: "२. चल आणि अटी (Variables & Conditionals)",
    desc: "Declare variables with 'चल' and test conditions with 'जर...तर...नाहीतर'.",
    code: `चल वय = १८

जर वय >= १८ तर {
    छापा("तुम्ही मतदान करू शकता")
} नाहीतर {
    छापा("तुम्ही अजून अपात्र आहात")
}`,
  },
  {
    title: "३. कार्ये (Functions & Calculations)",
    desc: "Define custom functions using 'कार्य' and return values with 'परत'.",
    code: `कार्य बेरीज(अ, ब) {
    परत अ + ब
}

चल निकाल = बेरीज(२५, ७५)
छापा(निकाल)`,
  },
];

export function CodeShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#43B02A] text-xs font-semibold">
          <Code2 className="w-3.5 h-3.5" />
          <span>Code Examples</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          See It in Marathi
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          Clean, expressive Devanagari syntax designed for intuitive programming logic.
        </p>
      </div>

      {/* Grid of Examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SHOWCASE_EXAMPLES.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] p-5 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white font-marathi-code">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>
              <CodeBlock code={item.code} />
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80">
              <Link
                href="/playground"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#43B02A] dark:text-emerald-400 hover:underline"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Open in Playground</span>
                <ArrowRight className="w-3 h-3 ml-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
