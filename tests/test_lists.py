import unittest
from marathi.parser import parser
from marathi.codegen import Interpreter

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

    def test_list_index_assignment(self):
        code = """
        चल संख्या = [1, 2, 3]
        संख्या[1] = 99
        छापा(संख्या[1])
        """
        self.assertEqual(run_code(code), [99])

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
