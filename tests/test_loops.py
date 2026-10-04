import unittest
from marathi.parser import parser
from marathi.interpreter import Interpreter

def run_code(code: str):
    outputs = []
    ast = parser.parse(code)
    interpreter = Interpreter(output_func=outputs.append)
    interpreter.run(ast)
    return outputs

class TestLoops(unittest.TestCase):
    def test_while_loop(self):
        code = """
        चल count = 1
        पर्यंत count <= 3 {
            छापा(count)
            count = count + 1
        }
        """
        self.assertEqual(run_code(code), [1, 2, 3])

    def test_for_loop(self):
        code = """
        साठी (i = 1; i <= 4; i = i + 1) {
            छापा(i)
        }
        """
        self.assertEqual(run_code(code), [1, 2, 3, 4])

    def test_break_statement(self):
        code = """
        साठी (i = 1; i <= 10; i = i + 1) {
            जर i == 3 तर {
                थांब
            }
            छापा(i)
        }
        """
        self.assertEqual(run_code(code), [1, 2])

    def test_continue_statement(self):
        code = """
        साठी (i = 1; i <= 5; i = i + 1) {
            जर i % 2 == 0 तर {
                पुढे
            }
            छापा(i)
        }
        """
        self.assertEqual(run_code(code), [1, 3, 5])

if __name__ == '__main__':
    unittest.main()
