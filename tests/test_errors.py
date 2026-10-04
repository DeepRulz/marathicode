import unittest
from marathi.parser import parser
from marathi.codegen import Interpreter
from marathi.errors import (
    MarathiLexicalError, MarathiSyntaxError, MarathiRuntimeError,
    UndefinedVariableError, UndefinedFunctionError, ArgumentCountError, IndexOutOfBoundsError
)

class TestErrors(unittest.TestCase):
    def test_lexical_error(self):
        code = "चल x = @"
        with self.assertRaises(MarathiLexicalError) as ctx:
            parser.parse(code)
        self.assertIn("शब्दरचना त्रुटी", str(ctx.exception))
        self.assertIn("अवैध चिन्ह '@'", str(ctx.exception))

    def test_syntax_error(self):
        code = "जर x > तर {"
        with self.assertRaises(MarathiSyntaxError) as ctx:
            parser.parse(code)
        self.assertIn("वाक्यरचना त्रुटी", str(ctx.exception))
        self.assertIn("^", str(ctx.exception))

    def test_undefined_variable(self):
        code = "छापा(अघोषित_चल)"
        ast = parser.parse(code)
        interpreter = Interpreter()
        with self.assertRaises(UndefinedVariableError) as ctx:
            interpreter.run(ast)
        self.assertIn("परिभाषित नाही", str(ctx.exception))

    def test_undefined_function(self):
        code = "अज्ञात्_कार्य()"
        ast = parser.parse(code)
        interpreter = Interpreter()
        with self.assertRaises(UndefinedFunctionError) as ctx:
            interpreter.run(ast)
        self.assertIn("सापडले नाही", str(ctx.exception))

    def test_argument_count_error(self):
        code = """
        कार्य जोडा_अंक(a, b) { परत a + b }
        जोडा_अंक(1)
        """
        ast = parser.parse(code)
        interpreter = Interpreter()
        with self.assertRaises(ArgumentCountError) as ctx:
            interpreter.run(ast)
        self.assertIn("आर्ग्युमेंट्स आवश्यक आहेत", str(ctx.exception))

    def test_index_out_of_bounds(self):
        code = """
        चल यादी = [1, 2]
        छापा(यादी[5])
        """
        ast = parser.parse(code)
        interpreter = Interpreter()
        with self.assertRaises(IndexOutOfBoundsError) as ctx:
            interpreter.run(ast)
        self.assertIn("मर्यादा ओलांडली", str(ctx.exception))

if __name__ == '__main__':
    unittest.main()
