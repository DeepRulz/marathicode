import unittest
from marathi.parser import parser
from marathi.codegen import Interpreter

def run_code(code: str):
    outputs = []
    ast = parser.parse(code)
    interpreter = Interpreter(output_func=outputs.append)
    interpreter.run(ast)
    return outputs

class TestFunctions(unittest.TestCase):
    def test_function_definition_and_call(self):
        code = """
        कार्य गुणोत्तर(a, b) {
            परत a * b
        }
        चल उत्तर = गुणोत्तर(6, 7)
        छापा(उत्तर)
        """
        self.assertEqual(run_code(code), [42])

    def test_recursive_function(self):
        code = """
        कार्य फॅक्टोरिअल(n) {
            जर n <= 1 तर {
                परत 1
            }
            परत n * फॅक्टोरिअल(n - 1)
        }
        छापा(फॅक्टोरिअल(5))
        """
        self.assertEqual(run_code(code), [120])

if __name__ == '__main__':
    unittest.main()
