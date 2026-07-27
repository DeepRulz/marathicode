import { ASTNode, BlockNode, FunctionDefNode, FunctionCallNode } from "./ast";

class ReturnSignal {
  value: any;
  constructor(value: any) {
    this.value = value;
  }
}

export class Interpreter {
  private env: Map<string, any> = new Map();
  private functions: Map<string, FunctionDefNode> = new Map();
  private outputLogs: string[] = [];

  public run(program: ASTNode[]): string[] {
    this.env.clear();
    this.functions.clear();
    this.outputLogs = [];

    for (const stmt of program) {
      this.execute(stmt);
    }
    return this.outputLogs;
  }

  private execute(node: ASTNode): void {
    switch (node.type) {
      case "Assignment": {
        const val = this.evaluate(node.expression);
        this.env.set(node.name, val);
        break;
      }

      case "Print": {
        const val = this.evaluate(node.expression);
        let displayVal = val;
        if (typeof val === "boolean") {
          displayVal = val ? "खरे" : "खोटे";
        }
        this.outputLogs.push(String(displayVal));
        break;
      }

      case "If": {
        const condition = this.evaluate(node.condition);
        if (condition) {
          this.executeBlock(node.then_block);
        } else if (node.else_block) {
          this.executeBlock(node.else_block);
        }
        break;
      }

      case "While": {
        let maxIterations = 10000; // Protection against infinite loops
        let iterations = 0;
        while (this.evaluate(node.condition)) {
          iterations++;
          if (iterations > maxIterations) {
            throw new Error("अनंत लूप (Infinite loop protection triggered)");
          }
          this.executeBlock(node.body);
        }
        break;
      }

      case "Block": {
        this.executeBlock(node);
        break;
      }

      case "FunctionDef": {
        this.functions.set(node.name, node);
        break;
      }

      case "Return": {
        const val = this.evaluate(node.value);
        throw new ReturnSignal(val);
      }

      default:
        throw new Error(`अज्ञात विधान (Unknown statement: ${JSON.stringify(node)})`);
    }
  }

  private executeBlock(block: BlockNode): void {
    for (const stmt of block.statements) {
      this.execute(stmt);
    }
  }

  private evaluate(node: ASTNode): any {
    switch (node.type) {
      case "Number":
        return node.value;

      case "String":
        return node.value;

      case "Boolean":
        return node.value;

      case "Variable": {
        if (!this.env.has(node.name)) {
          throw new Error(`चल '${node.name}' परिभाषित नाही`);
        }
        return this.env.get(node.name);
      }

      case "BinaryOp": {
        const left = this.evaluate(node.left);
        const right = this.evaluate(node.right);

        switch (node.operator) {
          case "+": return left + right;
          case "-": return left - right;
          case "*": return left * right;
          case "/": return left / right;
          case "%": return left % right;

          case ">": return left > right;
          case "<": return left < right;
          case ">=": return left >= right;
          case "<=": return left <= right;
          case "==": return left === right;
          case "!=": return left !== right;

          case "आणि": return left && right;
          case "किंवा": return left || right;

          default:
            throw new Error(`अवैध ऑपरेटर ${node.operator}`);
        }
      }

      case "UnaryOp": {
        const value = this.evaluate(node.operand);
        if (node.operator === "नाही") {
          return !value;
        }
        throw new Error(`अवैध unary ऑपरेटर ${node.operator}`);
      }

      case "FunctionCall": {
        return this.callFunction(node);
      }

      default:
        throw new Error(`अवैध अभिव्यक्ती (${JSON.stringify(node)})`);
    }
  }

  private callFunction(call: FunctionCallNode): any {
    if (!this.functions.has(call.name)) {
      throw new Error(`कार्य '${call.name}' सापडले नाही`);
    }

    const func = this.functions.get(call.name)!;

    if (call.args.length !== func.params.length) {
      throw new Error("arguments ची संख्या चुकीची आहे");
    }

    // Save scope environment
    const savedEnv = new Map(this.env);

    for (let i = 0; i < func.params.length; i++) {
      const paramName = func.params[i];
      const argValue = this.evaluate(call.args[i]);
      this.env.set(paramName, argValue);
    }

    try {
      this.executeBlock(func.body);
    } catch (e) {
      if (e instanceof ReturnSignal) {
        this.env = savedEnv;
        return e.value;
      }
      this.env = savedEnv;
      throw e;
    }

    this.env = savedEnv;
    return null;
  }
}
