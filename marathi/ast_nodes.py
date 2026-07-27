# ============================================
# AST NODES
# ============================================
# These classes represent the *meaning* of code
# They do NOT execute anything
# They only store structure
# ============================================


class ASTNode:
    """Base class for all AST nodes"""
    pass


# ---------- LITERALS ----------

class Number(ASTNode):
    def __init__(self, value):
        self.value = value

    def __repr__(self):
        return f"Number({self.value})"


class String(ASTNode):
    def __init__(self, value):
        self.value = value

    def __repr__(self):
        return f"String({self.value!r})"


class Boolean(ASTNode):
    def __init__(self, value: bool):
        self.value = value

    def __repr__(self):
        return f"Boolean({self.value})"


# ---------- VARIABLES ----------

class Variable(ASTNode):
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"Var({self.name})"


# ---------- EXPRESSIONS ----------

class BinaryOp(ASTNode):
    def __init__(self, left, operator, right):
        self.left = left
        self.operator = operator
        self.right = right

    def __repr__(self):
        return f"({self.left} {self.operator} {self.right})"


# ---------- STATEMENTS ----------

class Assignment(ASTNode):
    def __init__(self, name, expression):
        self.name = name
        self.expression = expression

    def __repr__(self):
        return f"Assign({self.name}, {self.expression})"

class Print(ASTNode):
    def __init__(self, expression):
        self.expression = expression

    def __repr__(self):
        return f"Print({self.expression})"


class If(ASTNode):
    def __init__(self, condition, then_block, else_block=None):
        self.condition = condition
        self.then_block = then_block
        self.else_block = else_block

    def __repr__(self):
        if self.else_block:
            return f"If({self.condition}, {self.then_block}, {self.else_block})"
        return f"If({self.condition}, {self.then_block})"


class Block(ASTNode):
    def __init__(self, statements):
        self.statements = statements

    def __repr__(self):
        return f"Block({self.statements})"

# ---------- WHILE LOOP ----------

class While(ASTNode):
    def __init__(self, condition, body):
        self.condition = condition
        self.body = body

    def __repr__(self):
        return f"While({self.condition}, {self.body})"

# ---------- FUNCTIONS ----------

class FunctionDef(ASTNode):
    def __init__(self, name, params, body):
        self.name = name
        self.params = params      # list of strings
        self.body = body          # Block

    def __repr__(self):
        return f"FunctionDef({self.name}, params={self.params}, body={self.body})"


class FunctionCall(ASTNode):
    def __init__(self, name, args):
        self.name = name
        self.args = args          # list of expressions

    def __repr__(self):
        return f"Call({self.name}, args={self.args})"


class Return(ASTNode):
    def __init__(self, value):
        self.value = value

    def __repr__(self):
        return f"Return({self.value})"

# ---------- UNARY OPERATIONS ----------

class UnaryOp(ASTNode):
    def __init__(self, operator, operand):
        self.operator = operator
        self.operand = operand

    def __repr__(self):
        return f"({self.operator} {self.operand})"
