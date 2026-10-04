import { ASTNode, BlockNode, FunctionDefNode, FunctionCallNode } from "./ast";

class ReturnSignal {
  value: any;
  constructor(value: any) {
    this.value = value;
  }
}

class BreakSignal {}
class ContinueSignal {}

class Environment {
  private parent?: Environment;
  private values: Map<string, any> = new Map();

  constructor(parent?: Environment) {
    this.parent = parent;
  }

  public define(name: string, value: any): void {
    this.values.set(name, value);
  }

  public assign(name: string, value: any): void {
    if (this.values.has(name)) {
      this.values.set(name, value);
    } else if (this.parent && this.parent.has(name)) {
      this.parent.assign(name, value);
    } else {
      this.values.set(name, value);
    }
  }

  public get(name: string): any {
    if (this.values.has(name)) {
      return this.values.get(name);
    }
    if (this.parent) {
      return this.parent.get(name);
    }
    throw new Error(`चल '${name}' परिभाषित नाही`);
  }

  public has(name: string): boolean {
    if (this.values.has(name)) return true;
    if (this.parent) return this.parent.has(name);
    return false;
  }
}

export class Interpreter {
  private globalEnv: Environment = new Environment();
  private functions: Map<string, FunctionDefNode> = new Map();
  private outputLogs: string[] = [];

  public run(program: ASTNode[]): string[] {
    this.globalEnv = new Environment();
    this.functions.clear();
    this.outputLogs = [];

    for (const stmt of program) {
      this.execute(stmt, this.globalEnv);
    }
    return this.outputLogs;
  }

  private execute(node: ASTNode, env: Environment): void {
    switch (node.type) {
      case "Assignment": {
        const val = this.evaluate(node.expression, env);
        env.assign(node.name, val);
        break;
      }

      case "ListAssign": {
        const lst = env.get(node.name);
        if (!Array.isArray(lst)) {
          throw new Error(`'${node.name}' हे यादी (list) नाही`);
        }
        const idx = this.evaluate(node.index, env);
        if (typeof idx !== "number" || idx < 0 || idx >= lst.length) {
          throw new Error(`यादीची निर्देशांक मर्यादा ओलांडली (Index ${idx})`);
        }
        const val = this.evaluate(node.expression, env);
        lst[idx] = val;
        break;
      }

      case "Print": {
        const val = this.evaluate(node.expression, env);
        let displayVal = val;
        if (typeof val === "boolean") {
          displayVal = val ? "खरे" : "खोटे";
        } else if (Array.isArray(val)) {
          displayVal = `[${val.map(v => typeof v === 'boolean' ? (v ? 'खरे' : 'खोटे') : JSON.stringify(v)).join(', ')}]`;
        }
        this.outputLogs.push(String(displayVal));
        break;
      }

      case "If": {
        const condition = this.evaluate(node.condition, env);
        if (condition) {
          this.executeBlock(node.then_block, env);
        } else if (node.else_block) {
          if (node.else_block.type === "If") {
            this.execute(node.else_block, env);
          } else {
            this.executeBlock(node.else_block, env);
          }
        }
        break;
      }

      case "While": {
        let maxIterations = 10000;
        let iterations = 0;
        while (this.evaluate(node.condition, env)) {
          iterations++;
          if (iterations > maxIterations) {
            throw new Error("अनंत लूप (Infinite loop protection triggered)");
          }
          try {
            this.executeBlock(node.body, env);
          } catch (e) {
            if (e instanceof BreakSignal) break;
            if (e instanceof ContinueSignal) continue;
            throw e;
          }
        }
        break;
      }

      case "For": {
        const loopEnv = new Environment(env);
        this.execute(node.init, loopEnv);
        let maxIterations = 10000;
        let iterations = 0;
        while (this.evaluate(node.condition, loopEnv)) {
          iterations++;
          if (iterations > maxIterations) {
            throw new Error("अनंत लूप (Infinite loop protection triggered)");
          }
          try {
            this.executeBlock(node.body, loopEnv);
          } catch (e) {
            if (e instanceof BreakSignal) break;
            if (e instanceof ContinueSignal) {
              this.execute(node.update, loopEnv);
              continue;
            }
            throw e;
          }
          this.execute(node.update, loopEnv);
        }
        break;
      }

      case "Break":
        throw new BreakSignal();

      case "Continue":
        throw new ContinueSignal();

      case "Block": {
        this.executeBlock(node, env);
        break;
      }

      case "FunctionDef": {
        this.functions.set(node.name, node);
        break;
      }

      case "FunctionCall": {
        this.callFunction(node, env);
        break;
      }

      case "Return": {
        const val = this.evaluate(node.value, env);
        throw new ReturnSignal(val);
      }

      default:
        throw new Error(`अज्ञात विधान (Unknown statement: ${JSON.stringify(node)})`);
    }
  }

  private executeBlock(block: BlockNode, env: Environment): void {
    const blockEnv = new Environment(env);
    for (const stmt of block.statements) {
      this.execute(stmt, blockEnv);
    }
  }

  private evaluate(node: ASTNode, env: Environment): any {
    switch (node.type) {
      case "Number":
        return node.value;

      case "String":
        return node.value;

      case "Boolean":
        return node.value;

      case "ListLiteral":
        return node.elements.map(e => this.evaluate(e, env));

      case "Variable":
        return env.get(node.name);

      case "ListIndex": {
        const lst = this.evaluate(node.target, env);
        if (!Array.isArray(lst) && typeof lst !== 'string') {
          throw new Error("निर्देशांक क्रिया फक्त यादी किंवा स्ट्रिंगवर चालते");
        }
        const idx = this.evaluate(node.index, env);
        if (typeof idx !== 'number' || idx < 0 || idx >= lst.length) {
          throw new Error(`यादीची निर्देशांक मर्यादा ओलांडली (Index ${idx})`);
        }
        return lst[idx];
      }

      case "BinaryOp": {
        const left = this.evaluate(node.left, env);
        const right = this.evaluate(node.right, env);

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
        const value = this.evaluate(node.operand, env);
        if (node.operator === "नाही") {
          return !value;
        }
        throw new Error(`अवैध unary ऑपरेटर ${node.operator}`);
      }

      case "FunctionCall": {
        return this.callFunction(node, env);
      }

      default:
        throw new Error(`अवैध अभिव्यक्ती (${JSON.stringify(node)})`);
    }
  }

  private callFunction(call: FunctionCallNode, env: Environment): any {
    // Built-in functions
    if (call.name === "लांबी") {
      if (call.args.length !== 1) throw new Error("लांबी कार्यासाठी 1 आर्ग्युमेंट आवश्यक आहे");
      const target = this.evaluate(call.args[0], env);
      if (Array.isArray(target) || typeof target === 'string') return target.length;
      throw new Error("लांबी कार्यासाठी यादी किंवा स्ट्रिंग आवश्यक आहे");
    }

    if (call.name === "जोडा") {
      if (call.args.length !== 2) throw new Error("जोडा कार्यासाठी 2 आर्ग्युमेंट्स आवश्यक आहेत");
      const lst = this.evaluate(call.args[0], env);
      if (!Array.isArray(lst)) throw new Error("जोडा कार्यासाठी पहिली आर्ग्युमेंट यादी (list) असावी");
      const item = this.evaluate(call.args[1], env);
      lst.push(item);
      return lst;
    }

    if (!this.functions.has(call.name)) {
      throw new Error(`कार्य '${call.name}' सापडले नाही`);
    }

    const func = this.functions.get(call.name)!;

    if (call.args.length !== func.params.length) {
      throw new Error(`कार्य '${call.name}' साठी ${func.params.length} आर्ग्युमेंट्स आवश्यक आहेत`);
    }

    const funcEnv = new Environment(this.globalEnv);

    for (let i = 0; i < func.params.length; i++) {
      const paramName = func.params[i];
      const argValue = this.evaluate(call.args[i], env);
      funcEnv.define(paramName, argValue);
    }

    try {
      this.executeBlock(func.body, funcEnv);
    } catch (e) {
      if (e instanceof ReturnSignal) {
        return e.value;
      }
      throw e;
    }

    return null;
  }
}
