import { tokenize } from "./lexer";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";

export interface ExecutionResult {
  logs: string[];
  ast?: any;
  error?: string;
  executionTimeMs: number;
}

export function runMarathiCode(sourceCode: string): ExecutionResult {
  const startTime = performance.now();
  try {
    const tokens = tokenize(sourceCode);
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    const logs = interpreter.run(ast);
    const endTime = performance.now();

    return {
      logs,
      ast,
      executionTimeMs: Math.round((endTime - startTime) * 100) / 100,
    };
  } catch (err: any) {
    const endTime = performance.now();
    return {
      logs: [],
      error: err.message || String(err),
      executionTimeMs: Math.round((endTime - startTime) * 100) / 100,
    };
  }
}
