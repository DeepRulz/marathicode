import { ExampleCard } from "@/components/ExampleCard";
import { Code2 } from "lucide-react";

export const metadata = {
  title: "Code Examples",
  description: "Explore practical MarathiCode programs demonstrating arithmetic, conditional branches, loops, and functions.",
};

const EXAMPLES_LIST = [
  {
    title: "1. Hello World (नमसकार)",
    filename: "hello.mr",
    description: "Simplest MarathiCode program demonstrating the print keyword छापा.",
    code: `छापा("नमसकार")`,
    expectedOutput: ["नमसकार"],
    explanation: [
      "छापा is the built-in output function.",
      '"नमसकार" is a double-quoted string literal.',
      "Output displays नमसकार on standard output.",
    ],
  },
  {
    title: "2. Variable Addition (बेरीज)",
    filename: "add.mr",
    description: "Demonstrates variable declaration (चल) with mixed ASCII and Devanagari identifiers and floating-point math.",
    code: `चल अ = ४
चल म = 5.8
छापा( अ + म )`,
    expectedOutput: ["9.8"],
    explanation: [
      "चल declares variable अ initialized to Devanagari digit ४ (4).",
      "चल म stores standard decimal float 5.8.",
      "छापा(अ + म) evaluates 4 + 5.8 to 9.8.",
    ],
  },
  {
    title: "3. Conditional Logic (जर - नाहीतर)",
    filename: "if.mr",
    description: "Demonstrates conditional branching with जर (if), तर (then), and नाहीतर (else).",
    code: `चल अ = १०
जर अ > ११ तर {
    छापा("खरे")
} नाहीतर {
    छापा("खोटे")
}`,
    expectedOutput: ["खोटे"],
    explanation: [
      "चल अ is set to 10.",
      "The expression अ > 11 evaluates to खोटे (False).",
      "The नाहीतर (else) block executes, printing खोटे.",
    ],
  },
  {
    title: "4. Functions & Return (क्षेत्रफळ व परिमिती)",
    filename: "rectangle_function.mr",
    description: "Demonstrates multi-parameter function definitions (कार्य) and return statements (परत).",
    code: `कार्य क्षेत्र(ल, म) {
    परत ल * म
}

कार्य परिमिती(ल, म) {
    परत 2 * (ल + म)
}

चल a = क्षेत्र(10, 20)
चल p = परिमिती(10, 20)
छापा(a)
छापा(p)`,
    expectedOutput: ["200", "60"],
    explanation: [
      "Define function क्षेत्र (Area) taking length (ल) and width (म).",
      "Define function परिमिती (Perimeter) taking length and width.",
      "Evaluate क्षेत्र(10, 20) => 200.",
      "Evaluate परिमिती(10, 20) => 2 * (10 + 20) = 60.",
    ],
  },
  {
    title: "5. Counter Loop (पर्यंत लूप)",
    filename: "while_counter.mr",
    description: "Demonstrates while loops (पर्यंत) incrementing a counter variable.",
    code: `चल counter = १
पर्यंत counter <= ५ {
    छापा(counter)
    चल counter = counter + १
}`,
    expectedOutput: ["1", "2", "3", "4", "5"],
    explanation: [
      "Initializes variable counter to 1.",
      "Checks condition counter <= 5 on each iteration.",
      "Increments counter by 1 until condition becomes false.",
    ],
  },
];

export default function ExamplesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#43B02A] text-xs font-semibold">
          <Code2 className="w-3.5 h-3.5" />
          <span>Official Language Samples</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          MarathiCode Practical Examples
        </h1>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-3xl">
          These code examples illustrate fundamental programming concepts written in MarathiCode. You can launch any example directly into the interactive playground.
        </p>
      </div>

      {/* Examples Grid */}
      <div className="space-y-8">
        {EXAMPLES_LIST.map((example, idx) => (
          <ExampleCard key={idx} {...example} />
        ))}
      </div>

    </div>
  );
}
