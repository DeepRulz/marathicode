import unittest
from marathi.parser import parser
from marathi.interpreter import Interpreter

def run_code(code: str):
    outputs = []
    ast = parser.parse(code)
    interpreter = Interpreter(output_func=outputs.append)
    interpreter.run(ast)
    return outputs

class TestUnicode(unittest.TestCase):
    def test_marathi_unicode_identifiers(self):
        code = """
        चल नाव_1 = "महाराष्ट्र"
        चल _माहिती = 2026
        छापा(नाव_1)
        छापा(_माहिती)
        """
        self.assertEqual(run_code(code), ["महाराष्ट्र", 2026])

    def test_marathi_function_names(self):
        code = """
        कार्य नमस्कार_सांगा(नाव) {
            परत "नमस्कार, " + नाव
        }
        छापा(नमस्कार_सांगा("स्वराज"))
        """
        self.assertEqual(run_code(code), ["नमस्कार, स्वराज"])

if __name__ == '__main__':
    unittest.main()
