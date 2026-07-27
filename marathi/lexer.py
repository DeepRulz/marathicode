import ply.lex as lex
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
    'COMMA',

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
t_COMMA = r','
t_GE = r'>='
t_LE = r'<='
t_EQ = r'=='
t_NE = r'!='
t_GT = r'>'
t_LT = r'<'
t_EQUALS = r'='
t_ignore = ' \t'

def t_NUMBER(t):
    r'\d+(\.\d+)?'
    t.value = float(t.value) if '.' in t.value else int(t.value)
    return t

def t_STRING(t):
    r'"([^"]*)"'
    t.value = t.value[1:-1]
    return t

def t_IDENTIFIER(t):
    r'[a-zA-Z_\u0900-\u097F][a-zA-Z0-9_\u0900-\u097F]*'
    t.type = reserved.get(t.value, 'IDENTIFIER')
    return t

def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

def t_error(t):
    raise SyntaxError(
        f"अवैध चिन्ह '{t.value[0]}' (ओळ {t.lexer.lineno})"
    )

lexer = lex.lex()