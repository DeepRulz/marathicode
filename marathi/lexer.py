import ply.lex as lex
from marathi.errors import MarathiLexicalError

tokens = (
    'NUMBER',
    'STRING',
    'IDENTIFIER',

    'PLUS',
    'MINUS',
    'TIMES',
    'DIVIDE',
    'MODULO',
    'EQUALS',

    'LPAREN',
    'RPAREN',
    'LBRACE',
    'RBRACE',
    'LBRACKET',
    'RBRACKET',
    'COMMA',
    'SEMICOLON',

    'GT',
    'LT',
    'GE',
    'LE',
    'EQ',
    'NE',
)

reserved = {
    'चल': 'VAR',
    'छापा': 'PRINT',
    'जर': 'IF',
    'तर': 'THEN',
    'नाहीतर': 'ELSE',
    'पर्यंत': 'WHILE',
    'साठी': 'FOR',
    'थांब': 'BREAK',
    'पुढे': 'CONTINUE',
    'कार्य': 'FUNCTION',
    'परत': 'RETURN',
    'खरे': 'TRUE',
    'खोटे': 'FALSE',
    'आणि': 'AND',
    'किंवा': 'OR',
    'नाही': 'NOT',
}

tokens = tokens + tuple(reserved.values())

t_PLUS = r'\+'
t_MINUS = r'-'
t_TIMES = r'\*'
t_DIVIDE = r'/'
t_MODULO = r'%'
t_LPAREN = r'\('
t_RPAREN = r'\)'
t_LBRACE = r'\{'
t_RBRACE = r'\}'
t_LBRACKET = r'\['
t_RBRACKET = r'\]'
t_COMMA = r','
t_SEMICOLON = r';'
t_GE = r'>='
t_LE = r'<='
t_EQ = r'=='
t_NE = r'!='
t_GT = r'>'
t_LT = r'<'
t_EQUALS = r'='
t_ignore = ' \t'


def find_column(input_text, token):
    line_start = input_text.rfind('\n', 0, token.lexpos) + 1
    return (token.lexpos - line_start) + 1


def get_line_snippet(input_text, lexpos):
    line_start = input_text.rfind('\n', 0, lexpos) + 1
    line_end = input_text.find('\n', lexpos)
    if line_end == -1:
        line_end = len(input_text)
    return input_text[line_start:line_end]


def t_COMMENT(t):
    r'//.*'
    pass  # Ignore single-line comments


def t_NUMBER(t):
    r'\d+(\.\d+)?'
    t.value = float(t.value) if '.' in t.value else int(t.value)
    return t


def t_STRING(t):
    r'"([^"\\]|\\.)*"'
    val = t.value[1:-1]
    # Handle string escape sequences
    val = val.replace(r'\n', '\n').replace(r'\t', '\t').replace(r'\"', '"').replace(r'\\', '\\')
    t.value = val
    return t


def t_IDENTIFIER(t):
    r'[a-zA-Z_\u0900-\u097F][a-zA-Z0-9_\u0900-\u097F]*'
    t.type = reserved.get(t.value, 'IDENTIFIER')
    return t


def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)


def t_error(t):
    col = find_column(t.lexer.lexdata, t)
    line_snippet = get_line_snippet(t.lexer.lexdata, t.lexpos)
    raise MarathiLexicalError(
        f"अवैध चिन्ह '{t.value[0]}'",
        line=t.lexer.lineno,
        col=col,
        line_text=line_snippet
    )


lexer = lex.lex()