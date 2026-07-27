import ply.yacc as yacc
from marathi.lexer import tokens
from marathi.ast_nodes import Assignment, BinaryOp, Number, String, Variable,Print,If,Block,Boolean,While,FunctionDef,FunctionCall,Return,UnaryOp

# -----------------------------
# OPERATOR PRECEDENCE
# -----------------------------
precedence = (
    ('right', 'NOT'),                 # highest among logic
    ('left', 'AND'),
    ('left', 'OR'),
    ('left', 'GT', 'LT', 'GE', 'LE', 'EQ', 'NE'),
    ('left', 'PLUS', 'MINUS'),
    ('left', 'TIMES', 'DIVIDE', 'MODULO'),
)


# -----------------------------
# GRAMMAR RULES
# -----------------------------
def p_program(p):
    """
    program : statement_list
    """
    p[0] = p[1]


def p_statement_list_single(p):
    """
    statement_list : statement
    """
    p[0] = [p[1]]


def p_statement_list_multi(p):
    """
    statement_list : statement_list statement
    """
    p[0] = p[1] + [p[2]]

def p_block(p):
    """
    block : LBRACE statement_list RBRACE
    """
    p[0] = Block(p[2])

def p_statement_if(p):
    """
    statement : IF expression THEN block
    """
    p[0] = If(p[2], p[4])

def p_statement_if_else(p):
    """
    statement : IF expression THEN block ELSE block
    """
    p[0] = If(p[2], p[4], p[6])


def p_statement_assign(p):
    """
    statement : VAR IDENTIFIER EQUALS expression
    """
    p[0] = Assignment(p[2], p[4])


def p_expression_binop(p):
    """
    expression : expression PLUS expression
               | expression MINUS expression
               | expression TIMES expression
               | expression DIVIDE expression
               | expression MODULO expression
               | expression GT expression
               | expression LT expression
               | expression GE expression
               | expression LE expression
               | expression EQ expression
               | expression NE expression
               | expression AND expression
               | expression OR expression
    """
    p[0] = BinaryOp(p[1], p[2], p[3])


def p_expression_group(p):
    """
    expression : LPAREN expression RPAREN
    """
    p[0] = p[2]


def p_expression_number(p):
    """
    expression : NUMBER
    """
    p[0] = Number(p[1])


def p_expression_var(p):
    """
    expression : IDENTIFIER
    """
    p[0] = Variable(p[1])


def p_error(p):
    if p:
        raise SyntaxError(f"वाक्यरचना त्रुटी '{p.value}' (ओळ {p.lineno})")
    else:
        raise SyntaxError("अपूर्ण वाक्य")

def p_statement_print(p):
    """
    statement : PRINT LPAREN expression RPAREN
    """
    p[0] = Print(p[3])

def p_expression_string(p):
    """
    expression : STRING
    """
    p[0] = String(p[1])

def p_expression_boolean(p):
    """
    expression : TRUE
               | FALSE
    """
    p[0] = Boolean(True if p[1] == 'खरे' else False)

def p_statement_while(p):
    """
    statement : WHILE expression block
    """
    p[0] = While(p[2], p[3])

def p_block_empty(p):
    """
    block : LBRACE RBRACE
    """
    p[0] = Block([])

def p_param_list_single(p):
    """
    param_list : IDENTIFIER
    """
    p[0] = [p[1]]


def p_param_list_multi(p):
    """
    param_list : param_list COMMA IDENTIFIER
    """
    p[0] = p[1] + [p[3]]


def p_param_list_empty(p):
    """
    param_list :
    """
    p[0] = []

def p_statement_function(p):
    """
    statement : FUNCTION IDENTIFIER LPAREN param_list RPAREN block
    """
    p[0] = FunctionDef(p[2], p[4], p[6])

def p_arg_list_single(p):
    """
    arg_list : expression
    """
    p[0] = [p[1]]


def p_arg_list_multi(p):
    """
    arg_list : arg_list COMMA expression
    """
    p[0] = p[1] + [p[3]]


def p_arg_list_empty(p):
    """
    arg_list :
    """
    p[0] = []

def p_expression_func_call(p):
    """
    expression : IDENTIFIER LPAREN arg_list RPAREN
    """
    p[0] = FunctionCall(p[1], p[3])

def p_statement_return(p):
    """
    statement : RETURN expression
    """
    p[0] = Return(p[2])

def p_expression_not(p):
    """
    expression : NOT expression
    """
    p[0] = UnaryOp(p[1], p[2])

parser = yacc.yacc()


