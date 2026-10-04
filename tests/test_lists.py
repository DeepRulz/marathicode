import unittest
from marathi.parser import parser
from marathi.interpreter import Interpreter
from marathi.errors import IndexOutOfBoundsError

def run_code(code: str):
    outputs = []
    ast = parser.parse(code)
    interpreter = Interpreter(output_func=outputs.append)
    interpreter.run(ast)
    return outputs

class TestLists(unittest.TestCase):
    def test_list_literal_and_indexing(self):
        code = """
        चल संख्या = [10, 20, 30]
        छापा(संख्या[0])
        छापा(संख्या[2])
        """
        self.assertEqual(run_code(code), [10, 30])

    def test_nested_list_indexing(self):
        code = """
        चल matrix = [[1, 2], [3, 4]]
        छापा(matrix[1][0])
        """
        self.assertEqual(run_code(code), [3])

    def test_nested_list_mutation(self):
        code = """
        चल matrix = [[1, 2], [3, 4]]
        matrix[0][1] = 99
        छापा(matrix[0][1])
        """
        self.assertEqual(run_code(code), [99])

    def test_list_index_out_of_bounds(self):
        code = """
        चल संख्या = [1, 2]
        छापा(संख्या[5])
        """
        with self.assertRaises(IndexOutOfBoundsError):
            run_code(code)

    def test_list_builtins_lambi_and_joda(self):
        code = """
        चल फळे = ["आंबा", "केळी"]
        छापा(लांबी(फळे))
        जोडा(फळे, "सफरचंद")
        छापा(लांबी(फळे))
        छापा(फळे[2])
        """
        self.assertEqual(run_code(code), [2, 3, "सफरचंद"])

if __name__ == '__main__':
    unittest.main()
