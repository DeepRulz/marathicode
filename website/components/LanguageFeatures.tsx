import Link from "next/link";
import {
    Code2,
    Layers,
    Cpu,
    ArrowRight,
    GitBranch,
} from "lucide-react";

const FEATURE_GROUPS = [
    {
        title: "Marathi Syntax",
        desc: "Write programs using Marathi keywords, familiar syntax, and Devanagari identifiers.",
        icon: Code2,
    },
    {
        title: "Core Logic",
        desc: "Define variables, perform calculations, compare values, and combine conditions.",
        icon: Layers,
    },
    {
        title: "Control Flow",
        desc: "Use conditional statements and loops to control the flow and execution of your programs.",
        icon: GitBranch,
    },
    {
        title: "Functions",
        desc: "Create reusable functions with parameters, local scopes, and return values.",
        icon: Cpu,
    },
];

export function LanguageFeatures() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">

                <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Language Features
                    </h2>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Core programming primitives supported by the MarathiCode engine.
                    </p>
                </div>

                <Link
                    href="/docs"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#43B02A] dark:text-emerald-400 hover:underline shrink-0"
                >
                    <span>View full language documentation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>

            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {FEATURE_GROUPS.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="
                p-5
                rounded-2xl
                border
                border-gray-200
                dark:border-gray-800
                bg-white
                dark:bg-[#111622]
                space-y-2.5
                hover:border-gray-300
                dark:hover:border-gray-700
                transition-all
              "
                        >

                            {/* Icon */}
                            <div
                                className="
                  w-8 h-8
                  rounded-xl
                  bg-emerald-50
                  dark:bg-emerald-950/60
                  border
                  border-emerald-200
                  dark:border-emerald-800/60
                  flex
                  items-center
                  justify-center
                  text-[#43B02A]
                "
                            >
                                <Icon className="w-4 h-4" />
                            </div>

                            {/* Content */}
                            <div className="mt-6 space-y-2">

                                <h3
                                    className="
                    text-base
                    font-bold
                    text-gray-900
                    dark:text-white
                    leading-snug
                  "
                                >
                                    {item.title}
                                </h3>

                                <p
                                    className="
                    text-sm
                    text-gray-600
                    dark:text-gray-400
                    leading-relaxed
                  "
                                >
                                    {item.desc}
                                </p>

                            </div>

                        </div>
                    );
                })}

            </div>

        </section>
    );
}