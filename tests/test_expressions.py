import unittest
from marathi.parser import parser
from marathi.codegen import Interpreter

def run_code(code: str):
    outputs = []
    ast = parser.parse(code)
    interpreter = Interpreter(output_func=outputs.append)
    interpreter.run(ast)
    return outputs

class TestExpressions(unittest.TestCase):
    def test_arithmetic_precedence(self):
        code = "छापा(10 + 2 * 5 - 8 / 4)"
        self.assertEqual(run_code(code), [18.0])

    def test_string_escape_sequences(self):
        code = r'छापा("नमस्कार\nजग\t\"मराठी\"")'
        self.assertEqual(run_code(code), ['नमस्कार\nजग\t"मराठी"'])

    def test_booleans_and_logical_operators(self):
        code = """
        छापा(खरे आणि खोटे)
        छापा(खरे किंवा खोटे)
        छापा(नाही खोटे)
        """
        self.assertEqual(run_code(code), [False, True, True])

    def test_comparisons(self):
        code = """
        छापा(10 > 5)
        छापा(5 <= 5)
        छापा(10 == 20)
        छापा(10 != 20)
        """
        self.assertEqual(run_code(code), [True, True, False, True])

if __name__ == '__main__':
    unittest.main()
