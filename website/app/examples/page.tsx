import { ExampleCard } from "@/components/ExampleCard";
import { Code2 } from "lucide-react";

export const metadata = {
  title: "Code Examples",
  description: "Official executable MarathiCode program examples demonstrating arithmetic, conditionals, loops, functions, and lists.",
};

const EXAMPLES_LIST = [
  {
    title: "1. Hello World (नमस्कार)",
    filename: "hello.mr",
    description: "Simplest MarathiCode program demonstrating the print keyword छापा.",
    code: `छापा("नमस्कार मराठी कोड!")`,
    expectedOutput: ["नमस्कार मराठी कोड!"],
    explanation: [
      "छापा is the built-in output function.",
      '"नमस्कार मराठी कोड!" is a UTF-8 double-quoted string literal.',
      "Output displays the text on stdout console.",
    ],
  },
  {
    title: "2. Variables & Devanagari Numerals (चल व अंक)",
    filename: "variables.mr",
    description: "Demonstrates variable declaration (चल) with ASCII and Devanagari numerals.",
    code: `चल अ = ४
चल ब = 5.8
चल संख्या = १२३
छापा(अ + ब)
छापा(संख्या)`,
    expectedOutput: ["9.8", "123"],
    explanation: [
      "चल declares variable अ initialized to Devanagari digit ४ (4).",
      "चल ब stores standard float 5.8.",
      "Devanagari numeral १२३ evaluates directly to integer 123.",
    ],
  },
  {
    title: "3. Conditional Branching (जर - नाहीतर जर)",
    filename: "else_if.mr",
    description: "Demonstrates multi-branch conditionals with जर (if), नाहीतर जर (else-if), and नाहीतर (else).",
    code: `चल गुण = ७५

जर गुण > ९० तर {
    छापा("विशेष गुणवत्ता")
} नाहीतर जर गुण > ६० तर {
    छापा("प्रथम श्रेणी")
} नाहीतर {
    छापा("उत्तीर्ण")
}`,
    expectedOutput: ["प्रथम श्रेणी"],
    explanation: [
      "Initializes variable गुण to 75.",
      "Evaluates गुण > ९० (False), then evaluates गुण > ६० (True).",
      "Executes the नाहीतर जर branch, printing प्रथम श्रेणी.",
    ],
  },
  {
    title: "4. Counted For Loop with Break & Continue (साठी - थांब / पुढे)",
    filename: "for_loop.mr",
    description: "Demonstrates counted loops (साठी), skipping iterations with पुढे (continue), and exiting with थांब (break).",
    code: `साठी (i = १; i <= ५; i = i + १) {
    जर i == ३ तर {
        पुढे
    }
    जर i == ५ तर {
        थांब
    }
    छापा(i)
}`,
    expectedOutput: ["1", "2", "4"],
    explanation: [
      "Initializes counter i = 1 up to 5.",
      "When i == 3, पुढे skips printing and continues to next loop iteration.",
      "When i == 5, थांब terminates loop execution.",
    ],
  },
  {
    title: "5. Counter Loop (पर्यंत लूप)",
    filename: "while_counter.mr",
    description: "Demonstrates while loops (पर्यंत) repeating execution until condition becomes false.",
    code: `चल counter = १
पर्यंत counter <= ३ {
    छापा(counter)
    counter = counter + १
}`,
    expectedOutput: ["1", "2", "3"],
    explanation: [
      "Initializes variable counter to 1.",
      "Evaluates condition counter <= 3 on each iteration.",
      "Increments counter until condition becomes false.",
    ],
  },
  {
    title: "6. Functions & Recursion (फॅक्टोरिअल)",
    filename: "factorial.mr",
    description: "Demonstrates recursive function definitions (कार्य) and return statements (परत).",
    code: `कार्य फॅक्टोरिअल(n) {
    जर n <= १ तर {
        परत १
    }
    परत n * फॅक्टोरिअल(n - १)
}

छापा(फॅक्टोरिअल(५))`,
    expectedOutput: ["120"],
    explanation: [
      "Defines recursive function फॅक्टोरिअल accepting parameter n.",
      "Base case checks if n <= 1 and returns 1.",
      "Recursive case calculates n * फॅक्टोरिअल(n - 1). Evaluating फॅक्टोरिअल(5) returns 120.",
    ],
  },
  {
    title: "7. Lists & Nested Indexing (यादी क्रिया)",
    filename: "lists.mr",
    description: "Demonstrates list literals, nested matrix indexing, mutation, and built-in functions (लांबी, जोडा).",
    code: `चल फळे = ["आंबा", "केळी"]
जोडा(फळे, "सफरचंद")
छापा(लांबी(फळे))

चल matrix = [[१, २], [३, ४]]
छापा(matrix[१][०])`,
    expectedOutput: ["3", "3"],
    explanation: [
      "Appends 'सफरचंद' to list फळे using built-in function जोडा.",
      "laamghi(फळे) returns updated list length 3.",
      "Nested matrix indexing matrix[1][0] evaluates to 3.",
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
          MarathiCode Official Examples
        </h1>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-3xl">
          A curated selection of 7 official executable MarathiCode v0.1 programs illustrating variables, conditionals, loops, functions, and lists.
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
