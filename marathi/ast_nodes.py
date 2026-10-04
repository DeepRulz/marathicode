# ============================================
# AST NODES FOR MARATHICODE
# ============================================

class ASTNode:
    """Base class for all AST nodes"""
    pass


# ---------- LITERALS ----------

class Number(ASTNode):
    def __init__(self, value, lineno=None):
        self.value = value
        self.lineno = lineno

    def __repr__(self):
        return f"Number({self.value})"


class String(ASTNode):
    def __init__(self, value, lineno=None):
        self.value = value
        self.lineno = lineno

    def __repr__(self):
        return f"String({self.value!r})"


class Boolean(ASTNode):
    def __init__(self, value: bool, lineno=None):
        self.value = value
        self.lineno = lineno

    def __repr__(self):
        return f"Boolean({self.value})"


class ListLiteral(ASTNode):
    def __init__(self, elements, lineno=None):
        self.elements = elements  # List of AST nodes
        self.lineno = lineno

    def __repr__(self):
        return f"ListLiteral({self.elements})"


# ---------- VARIABLES & ACCESS ----------

class Variable(ASTNode):
    def __init__(self, name, lineno=None):
        self.name = name
        self.lineno = lineno

    def __repr__(self):
        return f"Var({self.name})"


class ListIndex(ASTNode):
    def __init__(self, target, index, lineno=None):
        self.target = target  # ASTNode
        self.index = index    # ASTNode
        self.lineno = lineno

    def __repr__(self):
        return f"ListIndex({self.target}[{self.index}])"


# ---------- EXPRESSIONS ----------

class BinaryOp(ASTNode):
    def __init__(self, left, operator, right, lineno=None):
        self.left = left
        self.operator = operator
        self.right = right
        self.lineno = lineno

    def __repr__(self):
        return f"({self.left} {self.operator} {self.right})"


class UnaryOp(ASTNode):
    def __init__(self, operator, operand, lineno=None):
        self.operator = operator
        self.operand = operand
        self.lineno = lineno

    def __repr__(self):
        return f"({self.operator} {self.operand})"


# ---------- STATEMENTS ----------

class Assignment(ASTNode):
    def __init__(self, name, expression, lineno=None):
        self.name = name
        self.expression = expression
        self.lineno = lineno

    def __repr__(self):
        return f"Assign({self.name}, {self.expression})"


class ListAssign(ASTNode):
    def __init__(self, name, index, expression, lineno=None):
        self.name = name
        self.index = index
        self.expression = expression
        self.lineno = lineno

    def __repr__(self):
        return f"ListAssign({self.name}[{self.index}] = {self.expression})"


class Print(ASTNode):
    def __init__(self, expression, lineno=None):
        self.expression = expression
        self.lineno = lineno

    def __repr__(self):
        return f"Print({self.expression})"


class Block(ASTNode):
    def __init__(self, statements, lineno=None):
        self.statements = statements
        self.lineno = lineno

    def __repr__(self):
        return f"Block({self.statements})"


class If(ASTNode):
    def __init__(self, condition, then_block, else_block=None, lineno=None):
        self.condition = condition
        self.then_block = then_block
        self.else_block = else_block  # Can be Block or another If (for else-if)
        self.lineno = lineno

    def __repr__(self):
        if self.else_block:
            return f"If({self.condition}, {self.then_block}, {self.else_block})"
        return f"If({self.condition}, {self.then_block})"


# ---------- LOOPS ----------

class While(ASTNode):
    def __init__(self, condition, body, lineno=None):
        self.condition = condition
        self.body = body
        self.lineno = lineno

    def __repr__(self):
        return f"While({self.condition}, {self.body})"


class For(ASTNode):
    def __init__(self, init, condition, update, body, lineno=None):
        self.init = init
        self.condition = condition
        self.update = update
        self.body = body
        self.lineno = lineno

    def __repr__(self):
        return f"For(init={self.init}, cond={self.condition}, update={self.update}, body={self.body})"


class BreakNode(ASTNode):
    def __init__(self, lineno=None):
        self.lineno = lineno

    def __repr__(self):
        return "Break"


class ContinueNode(ASTNode):
    def __init__(self, lineno=None):
        self.lineno = lineno

    def __repr__(self):
        return "Continue"


# ---------- FUNCTIONS ----------

class FunctionDef(ASTNode):
    def __init__(self, name, params, body, lineno=None):
        self.name = name
        self.params = params      # list of strings
        self.body = body          # Block
        self.lineno = lineno

    def __repr__(self):
        return f"FunctionDef({self.name}, params={self.params}, body={self.body})"


class FunctionCall(ASTNode):
    def __init__(self, name, args, lineno=None):
        self.name = name
        self.args = args          # list of expressions
        self.lineno = lineno

    def __repr__(self):
        return f"Call({self.name}, args={self.args})"


class Return(ASTNode):
    def __init__(self, value, lineno=None):
        self.value = value
        self.lineno = lineno

    def __repr__(self):
        return f"Return({self.value})"
