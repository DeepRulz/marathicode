export type ASTNode =
  | NumberNode
  | StringNode
  | BooleanNode
  | VariableNode
  | BinaryOpNode
  | UnaryOpNode
  | AssignmentNode
  | PrintNode
  | IfNode
  | BlockNode
  | WhileNode
  | FunctionDefNode
  | FunctionCallNode
  | ReturnNode;

export interface NumberNode {
  type: "Number";
  value: number;
}

export interface StringNode {
  type: "String";
  value: string;
}

export interface BooleanNode {
  type: "Boolean";
  value: boolean;
}

export interface VariableNode {
  type: "Variable";
  name: string;
}

export interface BinaryOpNode {
  type: "BinaryOp";
  left: ASTNode;
  operator: string;
  right: ASTNode;
}

export interface UnaryOpNode {
  type: "UnaryOp";
  operator: string;
  operand: ASTNode;
}

export interface AssignmentNode {
  type: "Assignment";
  name: string;
  expression: ASTNode;
}

export interface PrintNode {
  type: "Print";
  expression: ASTNode;
}

export interface IfNode {
  type: "If";
  condition: ASTNode;
  then_block: BlockNode;
  else_block?: BlockNode;
}

export interface BlockNode {
  type: "Block";
  statements: ASTNode[];
}

export interface WhileNode {
  type: "While";
  condition: ASTNode;
  body: BlockNode;
}

export interface FunctionDefNode {
  type: "FunctionDef";
  name: string;
  params: string[];
  body: BlockNode;
}

export interface FunctionCallNode {
  type: "FunctionCall";
  name: string;
  args: ASTNode[];
}

export interface ReturnNode {
  type: "Return";
  value: ASTNode;
}
