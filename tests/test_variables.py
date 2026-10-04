import unittest
from marathi.parser import parser
from marathi.codegen import Interpreter

def run_code(code: str):
    outputs = []
    ast = parser.parse(code)
    interpreter = Interpreter(output_func=outputs.append)
    interpreter.run(ast)
    return outputs

class TestVariables(unittest.TestCase):
    def test_variable_declaration_and_print(self):
        code = """
        चल अ = 10
        छापा(अ)
        """
        self.assertEqual(run_code(code), [10])

    def test_variable_reassignment(self):
        code = """
        चल x = 5
        x = 15
        छापा(x)
        """
        self.assertEqual(run_code(code), [15])

    def test_variable_scope_and_shadowing(self):
        code = """
        चल x = 100
        जर खरे तर {
            चल x = 200
            छापा(x)
        }
        छापा(x)
        """
        self.assertEqual(run_code(code), [200, 200])

if __name__ == '__main__':
    unittest.main()
