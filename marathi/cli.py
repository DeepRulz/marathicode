import sys
from marathi.parser import parser
from marathi.codegen import Interpreter

def main():
    if len(sys.argv) != 2:
        print("वापर: marathicode <file.mr>")
        sys.exit(1)

    filename = sys.argv[1]

    if not filename.endswith(".mr"):
        print("फक्त .mr फाइल्स चालतील")
        sys.exit(1)

    with open(filename, "r", encoding="utf-8") as f:
        code = f.read()

    ast = parser.parse(code)
    interpreter = Interpreter()
    interpreter.run(ast)

if __name__ == "__main__":
    main()
