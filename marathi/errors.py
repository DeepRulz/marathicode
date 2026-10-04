class MarathiError(Exception):
    """Base class for MarathiCode exceptions with rich formatting."""
    def __init__(self, message: str, line: int = None, col: int = None, line_text: str = None):
        self.message = message
        self.line = line
        self.col = col
        self.line_text = line_text
        super().__init__(self.format_error())

    def format_error(self) -> str:
        error_title = "त्रुटी (Error)"
        if self.__class__.__name__ == 'MarathiLexicalError':
            error_title = "शब्दरचना त्रुटी (Lexical Error)"
        elif self.__class__.__name__ == 'MarathiSyntaxError':
            error_title = "वाक्यरचना त्रुटी (Syntax Error)"
        elif self.__class__.__name__ == 'MarathiRuntimeError':
            error_title = "धावपळ त्रुटी (Runtime Error)"

        lines = [f"{error_title}"]
        if self.line is not None:
            lines.append(f"ओळ {self.line}:")
            if self.line_text:
                lines.append(f"    {self.line_text}")
                if self.col is not None and self.col > 0:
                    indent = " " * (4 + self.col - 1)
                    lines.append(f"{indent}^")
        lines.append(f"{self.message}")
        return "\n".join(lines)


class MarathiLexicalError(MarathiError):
    """Raised for illegal characters or malformed tokens."""
    pass


class MarathiSyntaxError(MarathiError):
    """Raised for parser/grammar errors."""
    pass


class MarathiRuntimeError(MarathiError):
    """Raised during execution for semantic errors."""
    pass


class UndefinedVariableError(MarathiRuntimeError):
    def __init__(self, name: str, line: int = None):
        super().__init__(f"चल '{name}' परिभाषित नाही.", line=line)


class UndefinedFunctionError(MarathiRuntimeError):
    def __init__(self, name: str, line: int = None):
        super().__init__(f"कार्य '{name}' सापडले नाही.", line=line)


class ArgumentCountError(MarathiRuntimeError):
    def __init__(self, func_name: str, expected: int, got: int, line: int = None):
        super().__init__(f"कार्य '{func_name}' साठी {expected} आर्ग्युमेंट्स आवश्यक आहेत, परंतु {got} दिले.", line=line)


class IndexOutOfBoundsError(MarathiRuntimeError):
    def __init__(self, index: int, length: int, line: int = None):
        super().__init__(f"यादीची निर्देशांक मर्यादा ओलांडली (Index {index}, length {length}).", line=line)


class TypeOperationError(MarathiRuntimeError):
    def __init__(self, op: str, type1: str, type2: str = None, line: int = None):
        if type2:
            msg = f"'{op}' या क्रियेसाठी {type1} आणि {type2} हे प्रकार अयोग्य आहेत."
        else:
            msg = f"'{op}' या क्रियेसाठी {type1} प्रकार अयोग्य आहे."
        super().__init__(msg, line=line)
