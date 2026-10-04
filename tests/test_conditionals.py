import unittest
from marathi.parser import parser
from marathi.interpreter import Interpreter

def run_code(code: str):
    outputs = []
    ast = parser.parse(code)
    interpreter = Interpreter(output_func=outputs.append)
    interpreter.run(ast)
    return outputs

class TestConditionals(unittest.TestCase):
    def test_if_then(self):
        code = """
        जर 10 > 5 तर {
            छापा("होय")
        }
        """
        self.assertEqual(run_code(code), ["होय"])

    def test_if_else(self):
        code = """
        जर 2 > 5 तर {
            छापा("होय")
        } नाहीतर {
            छापा("नाही")
        }
        """
        self.assertEqual(run_code(code), ["नाही"])

    def test_else_if(self):
        code = """
        चल अंक = 75
        जर अंक > 90 तर {
            छापा("उत्कृष्ट")
        } नाहीतर जर अंक > 70 तर {
            छापा("छान")
        } नाहीतर {
            छापा("सामान्य")
        }
        """
        self.assertEqual(run_code(code), ["छान"])

if __name__ == '__main__':
    unittest.main()
