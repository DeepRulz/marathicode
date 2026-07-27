import { Token, TokenType } from "./lexer";
import {
  ASTNode,
  BlockNode,
  IfNode,
  WhileNode,
  FunctionDefNode,
  FunctionCallNode,
  ReturnNode,
  AssignmentNode,
  PrintNode,
  BinaryOpNode,
  UnaryOpNode,
  NumberNode,
  StringNode,
  BooleanNode,
  VariableNode,
} from "./ast";

export class Parser {
  private tokens: Token[];
  private current: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  public parse(): ASTNode[] {
    const statements: ASTNode[] = [];
    while (!this.isAtEnd()) {
      statements.push(this.statement());
    }
    return statements;
  }

  // Helper Methods
  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private isAtEnd(): boolean {
    return this.peek().type === "EOF";
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private consume(type: TokenType, errorMessage: string): Token {
    if (this.check(type)) return this.advance();
    const tok = this.peek();
    throw new Error(
      tok.type === "EOF"
        ? "अपूर्ण वाक्य"
        : `${errorMessage} (वाक्यरचना त्रुटी '${tok.value}' ओळ ${tok.line})`
    );
  }

  // Statement Parsing
  private statement(): ASTNode {
    if (this.match("VAR")) return this.assignmentStatement();
    if (this.match("PRINT")) return this.printStatement();
    if (this.match("IF")) return this.ifStatement();
    if (this.match("WHILE")) return this.whileStatement();
    if (this.match("FUNCTION")) return this.functionDefStatement();
    if (this.match("RETURN")) return this.returnStatement();

    throw new Error(
      `वाक्यरचना त्रुटी '${this.peek().value}' (ओळ ${this.peek().line})`
    );
  }

  private assignmentStatement(): AssignmentNode {
    const nameToken = this.consume("IDENTIFIER", "चल चे नाव आवश्यक आहे");
    this.consume("EQUALS", "'=' चिन्ह आवश्यक आहे");
    const expr = this.expression();
    return {
      type: "Assignment",
      name: nameToken.value,
      expression: expr,
    };
  }

  private printStatement(): PrintNode {
    this.consume("LPAREN", "'(' आवश्यक आहे");
    const expr = this.expression();
    this.consume("RPAREN", "')' आवश्यक आहे");
    return {
      type: "Print",
      expression: expr,
    };
  }

  private ifStatement(): IfNode {
    const condition = this.expression();
    this.consume("THEN", "'तर' आवश्यक आहे");
    const thenBlock = this.block();
    let elseBlock: BlockNode | undefined = undefined;

    if (this.match("ELSE")) {
      elseBlock = this.block();
    }

    return {
      type: "If",
      condition,
      then_block: thenBlock,
      else_block: elseBlock,
    };
  }

  private whileStatement(): WhileNode {
    const condition = this.expression();
    const body = this.block();
    return {
      type: "While",
      condition,
      body,
    };
  }

  private functionDefStatement(): FunctionDefNode {
    const nameToken = this.consume("IDENTIFIER", "कार्याचे नाव आवश्यक आहे");
    this.consume("LPAREN", "'(' आवश्यक आहे");

    const params: string[] = [];
    if (!this.check("RPAREN")) {
      do {
        const paramTok = this.consume("IDENTIFIER", "पॅरामीटरचे नाव आवश्यक आहे");
        params.push(paramTok.value);
      } while (this.match("COMMA"));
    }
    this.consume("RPAREN", "')' आवश्यक आहे");

    const body = this.block();
    return {
      type: "FunctionDef",
      name: nameToken.value,
      params,
      body,
    };
  }

  private returnStatement(): ReturnNode {
    const value = this.expression();
    return {
      type: "Return",
      value,
    };
  }

  private block(): BlockNode {
    this.consume("LBRACE", "'{' आवश्यक आहे");
    const statements: ASTNode[] = [];
    while (!this.check("RBRACE") && !this.isAtEnd()) {
      statements.push(this.statement());
    }
    this.consume("RBRACE", "'}' आवश्यक आहे");
    return {
      type: "Block",
      statements,
    };
  }

  // Expression Parsing (Precedence matching PLY Yacc)
  private expression(): ASTNode {
    return this.logicalOr();
  }

  private logicalOr(): ASTNode {
    let expr = this.logicalAnd();
    while (this.match("OR")) {
      const operator = "किंवा";
      const right = this.logicalAnd();
      expr = { type: "BinaryOp", left: expr, operator, right };
    }
    return expr;
  }

  private logicalAnd(): ASTNode {
    let expr = this.equality();
    while (this.match("AND")) {
      const operator = "आणि";
      const right = this.equality();
      expr = { type: "BinaryOp", left: expr, operator, right };
    }
    return expr;
  }

  private equality(): ASTNode {
    let expr = this.relational();
    while (this.match("EQ", "NE")) {
      const operator = this.previous().value;
      const right = this.relational();
      expr = { type: "BinaryOp", left: expr, operator, right };
    }
    return expr;
  }

  private relational(): ASTNode {
    let expr = this.additive();
    while (this.match("GT", "LT", "GE", "LE")) {
      const operator = this.previous().value;
      const right = this.additive();
      expr = { type: "BinaryOp", left: expr, operator, right };
    }
    return expr;
  }

  private additive(): ASTNode {
    let expr = this.multiplicative();
    while (this.match("PLUS", "MINUS")) {
      const operator = this.previous().value;
      const right = this.multiplicative();
      expr = { type: "BinaryOp", left: expr, operator, right };
    }
    return expr;
  }

  private multiplicative(): ASTNode {
    let expr = this.unary();
    while (this.match("TIMES", "DIVIDE", "MODULO")) {
      const operator = this.previous().value;
      const right = this.unary();
      expr = { type: "BinaryOp", left: expr, operator, right };
    }
    return expr;
  }

  private unary(): ASTNode {
    if (this.match("NOT")) {
      const operator = "नाही";
      const operand = this.unary();
      return { type: "UnaryOp", operator, operand };
    }
    return this.primary();
  }

  private primary(): ASTNode {
    if (this.match("NUMBER")) {
      return { type: "Number", value: Number(this.previous().value) };
    }
    if (this.match("STRING")) {
      return { type: "String", value: this.previous().value };
    }
    if (this.match("TRUE")) {
      return { type: "Boolean", value: true };
    }
    if (this.match("FALSE")) {
      return { type: "Boolean", value: false };
    }

    if (this.match("IDENTIFIER")) {
      const name = this.previous().value;
      // Function Call check
      if (this.match("LPAREN")) {
        const args: ASTNode[] = [];
        if (!this.check("RPAREN")) {
          do {
            args.push(this.expression());
          } while (this.match("COMMA"));
        }
        this.consume("RPAREN", "')' आवश्यक आहे");
        return { type: "FunctionCall", name, args };
      }
      return { type: "Variable", name };
    }

    if (this.match("LPAREN")) {
      const expr = this.expression();
      this.consume("RPAREN", "')' आवश्यक आहे");
      return expr;
    }

    throw new Error(
      `अवैध अभिव्यक्ती '${this.peek().value}' (ओळ ${this.peek().line})`
    );
  }
}
