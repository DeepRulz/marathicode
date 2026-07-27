from marathi.parser import parser

ast = parser.parse("चल x = 10 + 20 * 3")
print(ast)


tests = [
    "छापा(10)",
    "छापा(10 + 20 * 3)",
    "चल x = 5",
    "छापा(x)",
]

for code in tests:
    print("INPUT:", code)
    ast = parser.parse(code)
    print("AST  :", ast)
    print()

code = '''
जर 10 > 5 तर {
    छापा("मोठे")
} नाहीतर {
    छापा("लहान")
}
'''

ast = parser.parse(code)
print(ast)

tests = [
    "छापा(खरे)",
    "छापा(खोटे)",
    "जर खरे तर { छापा(1) }",
    "जर खोटे तर { } नाहीतर { छापा(0) }",
]

for code in tests:
    print("INPUT:", code)
    print("AST:", parser.parse(code))
    print()

code = """
चल x = 0
पर्यंत x < 3 {
    छापा(x)
    चल x = x + 1
}
"""

ast = parser.parse(code)
print(ast)

code = """
कार्य बेरीज(a, b) {
    परत a + b
}

चल x = बेरीज(10, 20)
छापा(x)
"""

ast = parser.parse(code)
print(ast)

tests = [
    "छापा(खरे आणि खोटे)",
    "छापा(खरे किंवा खोटे)",
    "छापा(नाही खरे)",
    "जर खरे आणि नाही खोटे तर { छापा(1) }",
    "जर x > 5 आणि y < 10 तर { छापा(x) }",
]

for code in tests:
    print("INPUT:", code)
    print("AST:", parser.parse(code))
    print()
