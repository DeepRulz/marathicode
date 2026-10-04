from typing import Any, List
from marathi.environment import Environment
from marathi.ast_nodes import (
    Number, String, Boolean, Variable, ListLiteral, ListIndex,
    BinaryOp, UnaryOp, Assignment, ListAssign, Print,
    If, While, For, BreakNode, ContinueNode, Block,
    FunctionDef, FunctionCall, Return
)
from marathi.errors import (
    MarathiRuntimeError, UndefinedFunctionError, ArgumentCountError,
    IndexOutOfBoundsError, TypeOperationError
)


class ReturnSignal(Exception):
    """Internal control flow signal for return statements."""
    def __init__(self, value: Any):
        self.value = value


class BreakSignal(Exception):
    """Internal control flow signal for break statements."""
    pass


class ContinueSignal(Exception):
    """Internal control flow signal for continue statements."""
    pass


class Interpreter:
    def __init__(self, output_func=print):
        self.global_env = Environment()
        self.functions = {}
        self.output_func = output_func
        self.setup_builtins()

    def setup_builtins(self):
        """Setup native Marathi built-in functions like लांबी and जोडा."""
        def builtin_labhi(args, line):
            if len(args) != 1:
                raise ArgumentCountError("लांबी", 1, len(args), line=line)
            val = args[0]
            if isinstance(val, (list, str)):
                return len(val)
            raise TypeOperationError("लांबी", type(val).__name__, line=line)

        def builtin_joda(args, line):
            if len(args) != 2:
                raise ArgumentCountError("जोडा", 2, len(args), line=line)
            lst, item = args[0], args[1]
            if not isinstance(lst, list):
                raise TypeOperationError("जोडा", type(lst).__name__, line=line)
            lst.append(item)
            return lst

        self.builtins = {
            "लांबी": builtin_labhi,
            "जोडा": builtin_joda
        }

    # -------------------------
    # ENTRY POINT
    # -------------------------

    def run(self, program: List[Any]):
        env = self.global_env
        for stmt in program:
            self.execute(stmt, env)

    # -------------------------
    # STATEMENTS
    # -------------------------

    def execute(self, node: Any, env: Environment):
        if isinstance(node, Assignment):
            value = self.evaluate(node.expression, env)
            env.assign(node.name, value)

        elif isinstance(node, ListAssign):
            lst = env.get(node.name, line=node.lineno)
            if not isinstance(lst, list):
                raise TypeOperationError("list indexing", type(lst).__name__, line=node.lineno)
            idx = self.evaluate(node.index, env)
            if not isinstance(idx, int):
                raise TypeOperationError("list index", type(idx).__name__, line=node.lineno)
            if idx < 0 or idx >= len(lst):
                raise IndexOutOfBoundsError(idx, len(lst), line=node.lineno)
            val = self.evaluate(node.expression, env)
            lst[idx] = val

        elif isinstance(node, Print):
            value = self.evaluate(node.expression, env)
            self.output_func(value)

        elif isinstance(node, If):
            condition = self.evaluate(node.condition, env)
            if condition:
                self.execute_block(node.then_block, env)
            elif node.else_block:
                self.execute_block(node.else_block, env)

        elif isinstance(node, While):
            while self.evaluate(node.condition, env):
                try:
                    self.execute_block(node.body, env)
                except BreakSignal:
                    break
                except ContinueSignal:
                    continue

        elif isinstance(node, For):
            loop_env = Environment(parent=env)
            self.execute(node.init, loop_env)
            while self.evaluate(node.condition, loop_env):
                try:
                    self.execute_block(node.body, loop_env)
                except BreakSignal:
                    break
                except ContinueSignal:
                    pass
                self.execute(node.update, loop_env)

        elif isinstance(node, BreakNode):
            raise BreakSignal()

        elif isinstance(node, ContinueNode):
            raise ContinueSignal()

        elif isinstance(node, Block):
            self.execute_block(node, env)

        elif isinstance(node, FunctionDef):
            self.functions[node.name] = node

        elif isinstance(node, FunctionCall):
            self.call_function(node, env)

        elif isinstance(node, Return):
            value = self.evaluate(node.value, env)
            raise ReturnSignal(value)

        else:
            raise MarathiRuntimeError(f"अज्ञात् विधान (Unknown statement): {node}", line=getattr(node, 'lineno', None))

    def execute_block(self, block: Block, env: Environment):
        block_env = Environment(parent=env)
        for stmt in block.statements:
            self.execute(stmt, block_env)

    # -------------------------
    # EXPRESSIONS
    # -------------------------

    def evaluate(self, node: Any, env: Environment) -> Any:
        if isinstance(node, Number):
            return node.value

        elif isinstance(node, String):
            return node.value

        elif isinstance(node, Boolean):
            return node.value

        elif isinstance(node, ListLiteral):
            return [self.evaluate(elem, env) for elem in node.elements]

        elif isinstance(node, Variable):
            return env.get(node.name, line=node.lineno)

        elif isinstance(node, ListIndex):
            lst = self.evaluate(node.target, env)
            if not isinstance(lst, (list, str)):
                raise TypeOperationError("indexing", type(lst).__name__, line=node.lineno)
            idx = self.evaluate(node.index, env)
            if not isinstance(idx, int):
                raise TypeOperationError("index", type(idx).__name__, line=node.lineno)
            if idx < 0 or idx >= len(lst):
                raise IndexOutOfBoundsError(idx, len(lst), line=node.lineno)
            return lst[idx]

        elif isinstance(node, BinaryOp):
            left = self.evaluate(node.left, env)
            right = self.evaluate(node.right, env)

            op = node.operator
            if op == '+': return left + right
            if op == '-': return left - right
            if op == '*': return left * right
            if op == '/': return left / right
            if op == '%': return left % right

            if op == '>': return left > right
            if op == '<': return left < right
            if op == '>=': return left >= right
            if op == '<=': return left <= right
            if op == '==': return left == right
            if op == '!=': return left != right

            if op == 'आणि': return bool(left and right)
            if op == 'किंवा': return bool(left or right)

            raise MarathiRuntimeError(f"अवैध ऑपरेटर '{op}'", line=node.lineno)

        elif isinstance(node, UnaryOp):
            value = self.evaluate(node.operand, env)
            if node.operator == 'नाही':
                return not value
            raise MarathiRuntimeError(f"अवैध unary ऑपरेटर '{node.operator}'", line=node.lineno)

        elif isinstance(node, FunctionCall):
            return self.call_function(node, env)

        else:
            raise MarathiRuntimeError(f"Unknown expression: {node}", line=getattr(node, 'lineno', None))

    # -------------------------
    # FUNCTIONS
    # -------------------------

    def call_function(self, call: FunctionCall, env: Environment) -> Any:
        if call.name in self.builtins:
            evaluated_args = [self.evaluate(arg, env) for arg in call.args]
            return self.builtins[call.name](evaluated_args, line=call.lineno)

        if call.name not in self.functions:
            raise UndefinedFunctionError(call.name, line=call.lineno)

        func = self.functions[call.name]

        if len(call.args) != len(func.params):
            raise ArgumentCountError(call.name, len(func.params), len(call.args), line=call.lineno)

        func_env = Environment(parent=self.global_env)

        for param, arg in zip(func.params, call.args):
            func_env.define(param, self.evaluate(arg, env))

        try:
            self.execute_block(func.body, func_env)
        except ReturnSignal as r:
            return r.value

        return None
