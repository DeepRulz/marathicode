"use client";

import {
    Code2,
    Binary,
    Layers,
    Cpu,
    PlayCircle,
    Terminal,
} from "lucide-react";

const PIPELINE_STAGES = [
    {
        id: "source",
        name: "Marathi Source Code",
        icon: Code2,
        description: "The Marathi program written by the user.",
    },
    {
        id: "lexer",
        name: "Lexer",
        icon: Binary,
        description: "Breaks source code into meaningful tokens.",
    },
    {
        id: "parser",
        name: "Parser",
        icon: Layers,
        description: "Checks syntax and builds the program structure.",
    },
    {
        id: "ast",
        name: "AST",
        icon: Cpu,
        description: "Represents the structure of the program as a tree.",
    },
    {
        id: "interpreter",
        name: "Interpreter",
        icon: PlayCircle,
        description: "Executes the program represented by the AST.",
    },
    {
        id: "output",
        name: "Program Output",
        icon: Terminal,
        description: "Produces the result of the executed program.",
    },
];

export function LanguagePipeline() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

            {/* Header */}
            <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    How MarathiCode Works
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    From Marathi Devanagari text to execution: a classic programming-language architecture.
                </p>
            </div>

            {/* 6-Stage Pipeline */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">

                {PIPELINE_STAGES.map((stage, idx) => {
                    const Icon = stage.icon;

                    return (
                        <div
                            key={stage.id}
                            className="
                                min-h-[235px]
                                p-6
                                rounded-2xl
                                text-left
                                border border-gray-200
                                dark:border-gray-800
                                bg-white
                                dark:bg-[#111622]
                                shadow-sm
                                hover:border-gray-300 dark:hover:border-gray-700
                            "
                        >

                            {/* Icon + Step */}
                            <div className="flex items-center justify-between">

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

                                <span className="text-[11px] font-bold text-gray-400">
                                    Step 0{idx + 1}
                                </span>

                            </div>

                            {/* Content */}
                            <div className="mt-6 space-y-2">

                                <h4
                                    className="
                                        text-base
                                        font-bold
                                        text-gray-900
                                        dark:text-white
                                        leading-snug
                                    "
                                >
                                    {stage.name}
                                </h4>

                                <p
                                    className="
                                        text-sm
                                        text-gray-600
                                        dark:text-gray-400
                                        leading-relaxed
                                    "
                                >
                                    {stage.description}
                                </p>

                            </div>

                        </div>
                    );
                })}

            </div>

        </section>
    );
}