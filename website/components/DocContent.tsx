import { CodeBlock } from "./CodeBlock";
import { siteConfig } from "@/lib/config";
import { Terminal, CheckCircle2, AlertTriangle, BookOpen, Layers, Cpu, Code2, Globe, HelpCircle, FileText } from "lucide-react";
import Link from "next/link";

interface DocContentProps {
  slug: string;
}

export function DocContent({ slug }: DocContentProps) {
  switch (slug) {
    case "getting-started":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#43B02A] text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Language Guide</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Getting Started with MarathiCode
            </h1>
            <p className="text-[#43B02A] dark:text-emerald-400 font-marathi-code text-sm mt-1">
              मराठीकोड - कोडिंग शिकण्याची सोपी आणि स्वाभिमानी पद्धत
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            Welcome to <strong>MarathiCode</strong>, an intuitive, educational programming language developed by <strong>Deep Shah at Sprout Tech</strong>. 
            MarathiCode replaces English-centric keywords with familiar Marathi Devanagari terminology, enabling students and beginners to master algorithmic logic without being blocked by language barriers.
          </p>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 p-6 space-y-3">
            <h3 className="font-bold text-[#0E5A9C] dark:text-sky-400 text-base flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span>Core Language Philosophy</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Programming is fundamentally about structure, logic, and problem-solving. By introducing control flow, functions, variables, and boolean conditions in Marathi, learners build strong computational thinking that seamlessly transfers to languages like Python, JavaScript, and C++.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-2">
            Your First Program: Hello World
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            MarathiCode source files use the <code className="font-mono text-[#43B02A] bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">.mr</code> file extension. Below is the classic "Hello World" program written in MarathiCode:
          </p>

          <CodeBlock
            filename="hello.mr"
            code={`// पहिला मराठीकोड प्रोग्राम
छापा("नमसकार")`}
          />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-4">
            Key Features at a Glance
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] space-y-2">
              <h4 className="font-bold text-sm text-[#43B02A] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Devanagari Keywords</span>
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Native Marathi keywords like <code className="text-[#43B02A] font-bold">चल</code> (var), <code className="text-[#43B02A] font-bold">छापा</code> (print), <code className="text-[#43B02A] font-bold">जर</code> (if), <code className="text-[#43B02A] font-bold">पर्यंत</code> (while), and <code className="text-[#43B02A] font-bold">कार्य</code> (function).
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] space-y-2">
              <h4 className="font-bold text-sm text-[#0E5A9C] dark:text-sky-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Unicode Identifiers</span>
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Supports full Devanagari character sets (<code className="font-mono">U+0900</code> to <code className="font-mono">U+097F</code>). Variable names like <code className="font-mono font-bold">वय</code>, <code className="font-mono font-bold">गुण</code>, <code className="font-mono font-bold">क्षेत्र</code> are supported.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] space-y-2">
              <h4 className="font-bold text-sm text-[#43B02A] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Scoped Functions & Returns</span>
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Functions isolate stack-frame scopes and return computed values using <code className="text-[#43B02A] font-bold">परत</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] space-y-2">
              <h4 className="font-bold text-sm text-[#0E5A9C] dark:text-sky-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Descriptive Error Messages</span>
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Emits clear error messages in Marathi when variables are missing or syntax is invalid.
              </p>
            </div>
          </div>
        </div>
      );

    case "installation":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Installation & Setup
            </h1>
            <p className="text-[#0E5A9C] dark:text-sky-400 font-mono text-sm mt-1">
              Running MarathiCode Environment
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You can run MarathiCode programs using either the <strong>Online Web Playground</strong> (which requires zero setup and runs 100% in your browser) or via local command line utilities.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-2">Option 1: Online Playground (Recommended)</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No installation required. Launch the interactive browser playground with integrated Monaco editor and soft Marathi keyboard:
          </p>

          <div className="pt-1">
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#43B02A] text-white font-bold text-sm shadow-sm hover:bg-[#389623] transition-all"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Interactive Playground</span>
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-4">Option 2: Command Line Setup</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            To run <code>.mr</code> files locally from your terminal:
          </p>

          <CodeBlock
            filename="Terminal"
            language="bash"
            code={`# Step 1: Write your MarathiCode file (e.g. program.mr)
# Step 2: Execute the file via command line runner:
marathicode program.mr

# Expected Output:
# नमसकार`}
          />
        </div>
      );

    case "language-basics":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Language Basics & Syntax Rules
            </h1>
            <p className="text-[#43B02A] dark:text-emerald-400 font-marathi-code text-sm mt-1">
              मूलभूत नियम व वाक्यरचना
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            MarathiCode syntax is designed to be clean, readable, and structured. This section outlines fundamental syntactic rules, brace scoping, and character set rules.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Statement Structure</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Statements in MarathiCode are separated by newlines. Semicolons are not required. Whitespace and indentation are ignored inside blocks.
          </p>

          <CodeBlock
            filename="syntax.mr"
            code={`// Variable assignment statement
चल x = १०

// Print statement
छापा(x)`}
          />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-2">2. Block Scoping with Braces</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Blocks of code inside conditional statements (<code className="text-[#43B02A] font-bold">जर</code>), loops (<code className="text-[#43B02A] font-bold">पर्यंत</code>), and functions (<code className="text-[#43B02A] font-bold">कार्य</code>) are enclosed within curly braces <code className="font-mono font-bold text-[#0E5A9C] dark:text-sky-400">&#123; &#125;</code>.
          </p>

          <CodeBlock
            filename="blocks.mr"
            code={`जर १० > ५ तर {
    छापा("१० मोठे आहे")
}`}
          />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-2">3. Unicode Identifiers</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Variable and function names can use Marathi Devanagari letters, ASCII letters, underscores, and numbers:
          </p>

          <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li><code className="font-mono font-bold">चल वय = २५</code> (Valid Devanagari variable)</li>
            <li><code className="font-mono font-bold">चल total_गुण = ९५</code> (Valid mixed Marathi + ASCII)</li>
            <li><code className="font-mono font-bold">कार्य बेरीज_१(a, b)</code> (Valid function name)</li>
          </ul>
        </div>
      );

    case "variables":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Variables & Assignment (चल)
            </h1>
            <p className="text-[#43B02A] dark:text-emerald-400 font-marathi-code text-sm mt-1">
              {"चल <नाव> = <अभिव्यक्ती>"}
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Variables store values in memory. In MarathiCode, variables are declared using the keyword <code className="font-bold text-[#43B02A]">चल</code> (meaning variable).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Syntax & Declaration</h2>
          
          <CodeBlock
            filename="variables.mr"
            code={`// Numbers
चल वय = २५
चल गुण = 85.5

// Strings
चल नाव = "राम"

// Booleans
चल पास = खरे
चल नापास = खोटे

छापा(वय)
छापा(नाव)`}
          />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-2">Variable Re-assignment & Expressions</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Variable values can be updated or computed dynamically using expressions:
          </p>

          <CodeBlock
            filename="reassignment.mr"
            code={`चल संख्या = १०
चल संख्या = संख्या + ५
छापा(संख्या) // Prints 15`}
          />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-2">Rules for Variable Names</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-100 dark:bg-gray-800 font-bold text-gray-900 dark:text-white">
                <tr>
                  <th className="p-3">Rule</th>
                  <th className="p-3">Example</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-mono">
                <tr>
                  <td className="p-3">Devanagari identifier</td>
                  <td className="p-3 text-[#43B02A]">चल वय = २०</td>
                  <td className="p-3 text-emerald-500 font-bold">Valid</td>
                </tr>
                <tr>
                  <td className="p-3">ASCII identifier</td>
                  <td className="p-3 text-[#43B02A]">चल age = 20</td>
                  <td className="p-3 text-emerald-500 font-bold">Valid</td>
                </tr>
                <tr>
                  <td className="p-3">Mixed Marathi + ASCII</td>
                  <td className="p-3 text-[#43B02A]">चल total_गुण = 100</td>
                  <td className="p-3 text-emerald-500 font-bold">Valid</td>
                </tr>
                <tr>
                  <td className="p-3">Reserved keyword name</td>
                  <td className="p-3 text-red-400">चल जर = १०</td>
                  <td className="p-3 text-red-500 font-bold">Invalid Error</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    case "data-types":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Data Types in MarathiCode
            </h1>
            <p className="text-[#0E5A9C] dark:text-sky-400 font-mono text-sm mt-1">
              Numbers, Strings, and Booleans
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            MarathiCode supports three primary data types: <strong>Numbers</strong>, <strong>Strings</strong>, and <strong>Booleans</strong>.
          </p>

          {/* Type 1: Numbers */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Numbers (संख्या)</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Numbers can be integers or floating-point decimals. Both ASCII digits (<code className="font-mono font-bold">0-9</code>) and Devanagari digits (<code className="font-mono font-bold text-[#43B02A]">०, १, २, ३, ४, ५, ६, ७, ८, ९</code>) are fully supported.
            </p>

            <CodeBlock
              filename="numbers.mr"
              code={`চল a = 10     // ASCII digits
चल b = ४      // Devanagari digit 4
चल c = 3.14   // Decimal float

छापा(a + b)   // Prints 14`}
            />
          </div>

          {/* Type 2: Strings */}
          <div className="space-y-3 pt-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Strings (अक्षरमाला)</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Strings are text literals enclosed in double quotes <code className="font-mono font-bold">"..."</code>. They can contain Marathi script, ASCII text, symbols, or spaces.
            </p>

            <CodeBlock
              filename="strings.mr"
              code={`चल संदेश = "शुभ सकाळ!"
चल नाव = "अमित"

छापा(संदेश)`}
            />
          </div>

          {/* Type 3: Booleans */}
          <div className="space-y-3 pt-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Booleans (तार्किक मूल्ये)</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Booleans represent logical truth values using <code className="font-bold text-[#43B02A]">खरे</code> (True) and <code className="font-bold text-[#43B02A]">खोटे</code> (False).
            </p>

            <CodeBlock
              filename="booleans.mr"
              code={`चल सत्य = खरे
चल असत्य = खोटे

छापा(सत्य)   // Outputs: खरे
छापा(असत्य)  // Outputs: खोटे`}
            />
          </div>
        </div>
      );

    case "operators":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Operators & Expressions
            </h1>
            <p className="text-[#43B02A] dark:text-emerald-400 font-marathi-code text-sm mt-1">
              अंकगणितीय व तार्किक ऑपरेटर
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Operators are symbols used to perform calculations, comparisons, and logical evaluations.
          </p>

          {/* Arithmetic Operators */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Arithmetic Operators</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 dark:bg-gray-800 font-bold text-gray-900 dark:text-white">
                  <tr>
                    <th className="p-3">Operator</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Example Code</th>
                    <th className="p-3">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-mono">
                  <tr>
                    <td className="p-3 font-bold text-[#43B02A]">+</td>
                    <td className="p-3">Addition</td>
                    <td className="p-3">१० + ५</td>
                    <td className="p-3">१५</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#43B02A]">-</td>
                    <td className="p-3">Subtraction</td>
                    <td className="p-3">१० - ५</td>
                    <td className="p-3">५</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#43B02A]">*</td>
                    <td className="p-3">Multiplication</td>
                    <td className="p-3">१० * ५</td>
                    <td className="p-3">५०</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#43B02A]">/</td>
                    <td className="p-3">Division</td>
                    <td className="p-3">१० / २</td>
                    <td className="p-3">५</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#43B02A]">%</td>
                    <td className="p-3">Modulo (Remainder)</td>
                    <td className="p-3">१० % ३</td>
                    <td className="p-3">१</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Relational Operators */}
          <div className="space-y-3 pt-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Comparison Operators</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 dark:bg-gray-800 font-bold text-gray-900 dark:text-white">
                  <tr>
                    <th className="p-3">Operator</th>
                    <th className="p-3">Meaning</th>
                    <th className="p-3">Example</th>
                    <th className="p-3">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-mono">
                  <tr>
                    <td className="p-3 font-bold text-[#0E5A9C] dark:text-sky-400">&gt;</td>
                    <td className="p-3">Greater than</td>
                    <td className="p-3">१० &gt; ५</td>
                    <td className="p-3 text-emerald-500 font-bold">खरे</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#0E5A9C] dark:text-sky-400">&lt;</td>
                    <td className="p-3">Less than</td>
                    <td className="p-3">१० &lt; ५</td>
                    <td className="p-3 text-red-400 font-bold">खोटे</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#0E5A9C] dark:text-sky-400">==</td>
                    <td className="p-3">Equal to</td>
                    <td className="p-3">१० == १०</td>
                    <td className="p-3 text-emerald-500 font-bold">खरे</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#0E5A9C] dark:text-sky-400">!=</td>
                    <td className="p-3">Not equal to</td>
                    <td className="p-3">१० != ५</td>
                    <td className="p-3 text-emerald-500 font-bold">खरे</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Logical Operators */}
          <div className="space-y-3 pt-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Logical Operators</h2>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li><code className="font-bold text-[#43B02A]">आणि</code> (AND) — Returns <code className="text-[#43B02A]">खरे</code> if both conditions are true.</li>
              <li><code className="font-bold text-[#43B02A]">किंवा</code> (OR) — Returns <code className="text-[#43B02A]">खरे</code> if at least one condition is true.</li>
              <li><code className="font-bold text-[#43B02A]">नाही</code> (NOT) — Negates a boolean expression.</li>
            </ul>

            <CodeBlock
              filename="logic.mr"
              code={`चल x = १०
चल y = २०

जर x > ५ आणि y > १० तर {
    छापा("दोन्ही अटी सत्य आहेत")
}`}
            />
          </div>
        </div>
      );

    case "conditions":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Conditional Statements (जर - तर - नाहीतर)
            </h1>
            <p className="text-[#43B02A] dark:text-emerald-400 font-marathi-code text-sm mt-1">
              {"जर <शर्त> तर { ... } नाहीतर { ... }"}
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Conditionals execute different blocks of code depending on whether an expression evaluates to <code className="text-[#43B02A] font-bold">खरे</code> or <code className="text-[#43B02A] font-bold">खोटे</code>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Single If Condition (जर - तर)</h2>

          <CodeBlock
            filename="if_single.mr"
            code={`चल गुण = ८५

जर गुण >= ३५ तर {
    छापा("तुम्ही उत्तीर्ण झालात!")
}`}
          />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-2">2. If-Else Branching (जर - तर - नाहीतर)</h2>

          <CodeBlock
            filename="if_else.mr"
            code={`चल गुण = २५

जर गुण >= ३५ तर {
    छापा("पास")
} नाहीतर {
    छापा("नापास")
}`}
          />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-2">3. Complex Conditions with Logical Operators</h2>

          <CodeBlock
            filename="complex_if.mr"
            code={`चल वय = २०
चल परवाना = खरे

जर वय >= १८ आणि परवाना तर {
    छापा("ड्रायव्हिंगसाठी पात्र")
} नाहीतर {
    छापा("अपात्र")
}`}
          />
        </div>
      );

    case "loops":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Loops & Iteration (पर्यंत लूप)
            </h1>
            <p className="text-[#43B02A] dark:text-emerald-400 font-marathi-code text-sm mt-1">
              {"पर्यंत <शर्त> { ... }"}
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The <code className="font-bold text-[#43B02A]">पर्यंत</code> keyword (meaning "until / while") repeats a block of code continuously as long as the test condition remains <code className="text-[#43B02A] font-bold">खरे</code>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Counter Loop Example</h2>

          <CodeBlock
            filename="while.mr"
            code={`चल क्र = १

पर्यंत क्र <= ५ {
    छापा(क्र)
    चल क्र = क्र + १
}

// Output:
// 1
// 2
// 3
// 4
// 5`}
          />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-2">Accumulator Loop (Sum of Numbers)</h2>

          <CodeBlock
            filename="sum.mr"
            code={`चल i = १
चल एकूण_बेरीज = ०

पर्यंत i <= १० {
    चल एकूण_बेरीज = एकूण_बेरीज + i
    चल i = i + १
}

छापा("१ ते १० ची बेरीज:")
छापा(एकूण_बेरीज) // Prints 55`}
          />
        </div>
      );

    case "functions":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Functions & Scope (कार्य व स्कोप)
            </h1>
            <p className="text-[#43B02A] dark:text-emerald-400 font-marathi-code text-sm mt-1">
              {"कार्य <नाव>(पॅरामीटर्स) { परत <मूल्य> }"}
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Functions encapsulate reusable logic. They are declared using <code className="font-bold text-[#43B02A]">कार्य</code> (meaning function/work) and return computed values using <code className="font-bold text-[#43B02A]">परत</code> (return).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Defining and Calling Functions</h2>

          <CodeBlock
            filename="functions.mr"
            code={`कार्य बेरीज(a, b) {
    परत a + b
}

चल निकाल = बेरीज(१०, २०)
छापा(निकाल) // Prints 30`}
          />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-2">2. Multi-Parameter Geometric Function</h2>

          <CodeBlock
            filename="rectangle_function.mr"
            code={`कार्य क्षेत्र(ल, म) {
    परत ल * म
}

कार्य परिमिती(ल, म) {
    परत 2 * (ल + म)
}

चल a = क्षेत्र(10, 20)
चल p = परिमिती(10, 20)

छापा(a) // Prints 200
छापा(p) // Prints 60`}
          />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pt-2">3. Scope Isolation</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Function parameters and variables defined inside functions are isolated within that function's call frame and do not overwrite outer variables.
          </p>
        </div>
      );

    case "builtin-functions":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Built-in Functions (छापा)
            </h1>
            <p className="text-[#43B02A] dark:text-emerald-400 font-marathi-code text-sm mt-1">
              छापा(अभिव्यक्ती)
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The primary built-in function in MarathiCode is <code className="font-bold text-[#43B02A]">छापा</code> (print). It outputs evaluated expressions to the console terminal.
          </p>

          <CodeBlock
            filename="print.mr"
            code={`// Printing String
छापा("नमसकार")

// Printing Number
छापा(100)

// Printing Expressions directly
छापा(10 + 20 * 3)

// Printing Boolean values
छापा(खरे)`}
          />
        </div>
      );

    case "keywords":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Keywords Reference
            </h1>
            <p className="text-[#0E5A9C] dark:text-sky-400 font-mono text-sm mt-1">
              Complete Reserved Keyword Matrix
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold">
                <tr>
                  <th className="p-3">Marathi Keyword</th>
                  <th className="p-3">Token Concept</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Example Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {siteConfig.keywords.map((kw, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/60">
                    <td className="p-3 font-bold font-marathi-code text-[#43B02A] text-sm">{kw.marathi}</td>
                    <td className="p-3 font-mono text-gray-600 dark:text-gray-400">{kw.english}</td>
                    <td className="p-3 font-medium text-gray-800 dark:text-gray-200">{kw.description}</td>
                    <td className="p-3 font-marathi-code text-sky-400">{kw.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "error-messages":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Error Messages & Diagnostics
            </h1>
            <p className="text-red-400 font-mono text-sm mt-1">
              Marathi Error Diagnostics
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            When a program contains illegal characters, syntax violations, or undefined variable accesses, MarathiCode raises intuitive error diagnostic messages.
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 space-y-2">
              <h4 className="font-bold text-red-500 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>1. Undefined Variable Error</span>
              </h4>
              <p className="text-xs font-mono text-gray-700 dark:text-gray-300">
                चल 'वय' परिभाषित नाही
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Triggered when trying to access a variable name that has not been declared with <code className="text-[#43B02A]">चल</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 space-y-2">
              <h4 className="font-bold text-red-500 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>2. Undefined Function Error</span>
              </h4>
              <p className="text-xs font-mono text-gray-700 dark:text-gray-300">
                कार्य 'बेरीज' सापडले नाही
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Triggered when invoking a function name that has not been defined with <code className="text-[#43B02A]">कार्य</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 space-y-2">
              <h4 className="font-bold text-red-500 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>3. Invalid Syntax Error</span>
              </h4>
              <p className="text-xs font-mono text-gray-700 dark:text-gray-300">
                वाक्यरचना त्रुटी (Syntax Error)
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Triggered when brackets or tokens are misplaced.
              </p>
            </div>
          </div>
        </div>
      );

    case "examples":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Practical Examples
            </h1>
            <p className="text-[#43B02A] dark:text-emerald-400 font-marathi-code text-sm mt-1">
              व्यावहारिक कोडिंग उदाहरणे
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Here are real-world code examples demonstrating various features of MarathiCode. You can copy and execute any example in the online playground.
          </p>

          <CodeBlock
            filename="rectangle.mr"
            code={`// १. क्षेत्रफळ व परिमिती
कार्य क्षेत्र(ल, म) {
    परत ल * म
}

कार्य परिमिती(ल, म) {
    परत 2 * (ल + म)
}

चल a = क्षेत्र(10, 20)
चल p = परिमिती(10, 20)

छापा(a) // 200
छापा(p) // 60`}
          />

          <CodeBlock
            filename="even_odd.mr"
            code={`// २. सम/विषम संख्या तपासणे
कार्य सम_आहे(संख्या) {
    जर संख्या % २ == ० तर {
        परत खरे
    } नाहीतर {
        परत खोटे
    }
}

छापा(सम_आहे(१०)) // खरे
छापा(सम_आहे(७))  // खोटे`}
          />
        </div>
      );

    case "faq":
      return (
        <div className="space-y-8">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h1>
            <p className="text-[#0E5A9C] dark:text-sky-400 font-mono text-sm mt-1">
              Common Questions & Answers
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#43B02A]" />
                <span>Why create a programming language in Marathi?</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                When beginners start learning to code, they often struggle first with unfamiliar English syntax instead of pure logic. MarathiCode lowers this barrier by using native terminology so learners can focus on logical problem-solving first.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#0E5A9C] dark:text-sky-400" />
                <span>Can I type numbers using Marathi Devanagari digits?</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Yes! Both Devanagari digits (०, १, २, ३, ४, ५, ६, ७, ८, ९) and standard ASCII digits (0-9) are parsed and supported seamlessly.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111622] space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#43B02A]" />
                <span>How do I type Marathi keywords if I don't have a Marathi keyboard?</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                The online playground includes an integrated <strong>Marathi Soft Keyboard Toolbar</strong> right above the code editor. Clicking any keyword button inserts it directly at your cursor location!
              </p>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white capitalize">
              {slug.replace("-", " ")} Documentation
            </h1>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Detailed language specification for MarathiCode.
          </p>
        </div>
      );
  }
}
