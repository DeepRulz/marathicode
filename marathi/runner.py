from marathi.parser import parser
from marathi.codegen import Interpreter

code = """
कार्य बेरीज(a, b) {
    परत a + b
}

चल x = 0
पर्यंत x < 5 {
    छापा(x)
    चल x = x + 1
}

चल y = बेरीज(10, 20)
छापा(y)

जर y > 20 आणि नाही खोटे तर {
    छापा("यशस्वी")
} नाहीतर {
    छापा("अपयश")
}
"""

ast = parser.parse(code)
interpreter = Interpreter()
interpreter.run(ast)
