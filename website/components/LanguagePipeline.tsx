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
        <section className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 space-y-10">

            {/* Header */}
            <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    How MarathiCode Works
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
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
                flex flex-col
                justify-between
              "
                        >

                            {/* Icon + Step */}
                            <div className="flex items-center justify-between">

                                <div
                                    className="
                    w-12 h-12
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
                                    <Icon className="w-6 h-6" />
                                </div>

                                <span className="text-xs sm:text-sm font-mono text-gray-400">
                  Step 0{idx + 1}
                </span>

                            </div>

                            {/* Content */}
                            <div className="space-y-3">

                                <h4
                                    className="
                    text-base
                    sm:text-lg
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
                    sm:text-base
                    leading-relaxed
                    text-gray-600
                    dark:text-gray-400
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