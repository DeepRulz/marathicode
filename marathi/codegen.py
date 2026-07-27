from marathi.ast_nodes import (
    Number, String, Boolean, Variable,
    BinaryOp, UnaryOp,
    Assignment, Print,
    If, While, Block,
    FunctionDef, FunctionCall, Return
)


class ReturnSignal(Exception):
    """Used internally to handle return statements"""
    def __init__(self, value):
        self.value = value


class Interpreter:
    def __init__(self):
        self.env = {}          # variables
        self.functions = {}    # function definitions

    # -------------------------
    # ENTRY POINT
    # -------------------------

    def run(self, program):
        for stmt in program:
            self.execute(stmt)

    # -------------------------
    # STATEMENTS
    # -------------------------

    def execute(self, node):
        if isinstance(node, Assignment):
            value = self.evaluate(node.expression)
            self.env[node.name] = value

        elif isinstance(node, Print):
            value = self.evaluate(node.expression)
            print(value)

        elif isinstance(node, If):
            condition = self.evaluate(node.condition)
            if condition:
                self.execute_block(node.then_block)
            elif node.else_block:
                self.execute_block(node.else_block)

        elif isinstance(node, While):
            while self.evaluate(node.condition):
                self.execute_block(node.body)

        elif isinstance(node, Block):
            self.execute_block(node)

        elif isinstance(node, FunctionDef):
            self.functions[node.name] = node

        elif isinstance(node, Return):
            value = self.evaluate(node.value)
            raise ReturnSignal(value)

        else:
            raise RuntimeError(f"Unknown statement: {node}")

    def execute_block(self, block):
        for stmt in block.statements:
            self.execute(stmt)

    # -------------------------
    # EXPRESSIONS
    # -------------------------

    def evaluate(self, node):
        if isinstance(node, Number):
            return node.value

        elif isinstance(node, String):
            return node.value

        elif isinstance(node, Boolean):
            return node.value

        elif isinstance(node, Variable):
            if node.name not in self.env:
                raise RuntimeError(f"चल '{node.name}' परिभाषित नाही")
            return self.env[node.name]

        elif isinstance(node, BinaryOp):
            left = self.evaluate(node.left)
            right = self.evaluate(node.right)

            if node.operator == '+': return left + right
            if node.operator == '-': return left - right
            if node.operator == '*': return left * right
            if node.operator == '/': return left / right
            if node.operator == '%': return left % right

            if node.operator == '>': return left > right
            if node.operator == '<': return left < right
            if node.operator == '>=': return left >= right
            if node.operator == '<=': return left <= right
            if node.operator == '==': return left == right
            if node.operator == '!=': return left != right

            if node.operator == 'आणि': return left and right
            if node.operator == 'किंवा': return left or right

            raise RuntimeError(f"अवैध ऑपरेटर {node.operator}")

        elif isinstance(node, UnaryOp):
            value = self.evaluate(node.operand)
            if node.operator == 'नाही':
                return not value
            raise RuntimeError(f"अवैध unary ऑपरेटर {node.operator}")

        elif isinstance(node, FunctionCall):
            return self.call_function(node)

        else:
            raise RuntimeError(f"Unknown expression: {node}")

    # -------------------------
    # FUNCTIONS
    # -------------------------

    def call_function(self, call):
        if call.name not in self.functions:
            raise RuntimeError(f"कार्य '{call.name}' सापडले नाही")

        func = self.functions[call.name]

        if len(call.args) != len(func.params):
            raise RuntimeError("arguments ची संख्या चुकीची आहे")

        # New local scope
        saved_env = self.env.copy()
        self.env = saved_env.copy()

        for param, arg in zip(func.params, call.args):
            self.env[param] = self.evaluate(arg)

        try:
            self.execute_block(func.body)
        except ReturnSignal as r:
            self.env = saved_env
            return r.value

        self.env = saved_env
        return None
