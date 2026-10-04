import unittest
from marathi.parser import parser
from marathi.interpreter import Interpreter

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

    def test_variable_block_scope_shadowing(self):
        code = """
        चल x = 100
        जर खरे तर {
            चल x = 200
            छापा(x)
        }
        छापा(x)
        """
        self.assertEqual(run_code(code), [200, 100])

    def test_nested_block_scope_mutation(self):
        code = """
        चल x = 10
        जर खरे तर {
            x = 20
        }
        छापा(x)
        """
        self.assertEqual(run_code(code), [20])

    def test_variable_non_leaking_out_of_scope(self):
        code = """
        जर खरे तर {
            चल गोपनीय = 99
        }
        छापा(गोपनीय)
        """
        from marathi.errors import UndefinedVariableError
        with self.assertRaises(UndefinedVariableError):
            run_code(code)

if __name__ == '__main__':
    unittest.main()
