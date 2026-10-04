import ply.yacc as yacc
from marathi.lexer import tokens, find_column, get_line_snippet
from marathi.errors import MarathiSyntaxError
from marathi.ast_nodes import (
    Assignment, ListAssign, BinaryOp, Number, String, Variable, Print, If, Block,
    Boolean, While, For, BreakNode, ContinueNode, FunctionDef, FunctionCall,
    Return, UnaryOp, ListLiteral, ListIndex
)

# -----------------------------
# OPERATOR PRECEDENCE
# -----------------------------
precedence = (
    ('right', 'NOT'),
    ('left', 'AND'),
    ('left', 'OR'),
    ('left', 'GT', 'LT', 'GE', 'LE', 'EQ', 'NE'),
    ('left', 'PLUS', 'MINUS'),
    ('left', 'TIMES', 'DIVIDE', 'MODULO'),
    ('left', 'LBRACKET'),
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
    p[0] = Block(p[2], lineno=p.lineno(1))


def p_block_empty(p):
    """
    block : LBRACE RBRACE
    """
    p[0] = Block([], lineno=p.lineno(1))


# ---------- CONDITIONALS ----------

def p_statement_if(p):
    """
    statement : IF expression THEN block
    """
    p[0] = If(p[2], p[4], lineno=p.lineno(1))


def p_statement_if_else(p):
    """
    statement : IF expression THEN block ELSE block
    """
    p[0] = If(p[2], p[4], p[6], lineno=p.lineno(1))


def p_statement_if_else_if(p):
    """
    statement : IF expression THEN block ELSE statement
    """
    p[0] = If(p[2], p[4], Block([p[6]]), lineno=p.lineno(1))


# ---------- ASSIGNMENTS ----------

def p_statement_var_decl(p):
    """
    statement : VAR IDENTIFIER EQUALS expression
    """
    p[0] = Assignment(p[2], p[4], is_decl=True, lineno=p.lineno(1))


def p_statement_assign(p):
    """
    statement : IDENTIFIER EQUALS expression
    """
    p[0] = Assignment(p[1], p[3], is_decl=False, lineno=p.lineno(1))


def p_statement_list_assign(p):
    """
    statement : expression LBRACKET expression RBRACKET EQUALS expression
    """
    p[0] = ListAssign(p[1], p[3], p[6], lineno=p.lineno(2))


# ---------- LOOPS ----------

def p_statement_while(p):
    """
    statement : WHILE expression block
    """
    p[0] = While(p[2], p[3], lineno=p.lineno(1))


def p_for_init_decl(p):
    """
    for_init : VAR IDENTIFIER EQUALS expression
    """
    p[0] = Assignment(p[2], p[4], is_decl=True, lineno=p.lineno(1))


def p_for_init_assign(p):
    """
    for_init : IDENTIFIER EQUALS expression
    """
    p[0] = Assignment(p[1], p[3], is_decl=False, lineno=p.lineno(1))


def p_statement_for(p):
    """
    statement : FOR LPAREN for_init SEMICOLON expression SEMICOLON for_init RPAREN block
    """
    p[0] = For(p[3], p[5], p[7], p[9], lineno=p.lineno(1))


def p_statement_break(p):
    """
    statement : BREAK
    """
    p[0] = BreakNode(lineno=p.lineno(1))


def p_statement_continue(p):
    """
    statement : CONTINUE
    """
    p[0] = ContinueNode(lineno=p.lineno(1))


# ---------- PRINT, CALL & RETURN ----------

def p_statement_print(p):
    """
    statement : PRINT LPAREN expression RPAREN
    """
    p[0] = Print(p[3], lineno=p.lineno(1))


def p_statement_return(p):
    """
    statement : RETURN expression
    """
    p[0] = Return(p[2], lineno=p.lineno(1))


def p_statement_func_call(p):
    """
    statement : IDENTIFIER LPAREN arg_list RPAREN
    """
    p[0] = FunctionCall(p[1], p[3], lineno=p.lineno(1))


# ---------- FUNCTIONS ----------

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
    p[0] = FunctionDef(p[2], p[4], p[6], lineno=p.lineno(1))


# ---------- EXPRESSIONS ----------

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
    p[0] = BinaryOp(p[1], p[2], p[3], lineno=p.lineno(2))


def p_expression_not(p):
    """
    expression : NOT expression
    """
    p[0] = UnaryOp(p[1], p[2], lineno=p.lineno(1))


def p_expression_group(p):
    """
    expression : LPAREN expression RPAREN
    """
    p[0] = p[2]


def p_expression_number(p):
    """
    expression : NUMBER
    """
    p[0] = Number(p[1], lineno=p.lineno(1))


def p_expression_string(p):
    """
    expression : STRING
    """
    p[0] = String(p[1], lineno=p.lineno(1))


def p_expression_boolean(p):
    """
    expression : TRUE
               | FALSE
    """
    p[0] = Boolean(True if p[1] == 'खरे' else False, lineno=p.lineno(1))


def p_expression_var(p):
    """
    expression : IDENTIFIER
    """
    p[0] = Variable(p[1], lineno=p.lineno(1))


# ---------- LIST EXPRESSIONS ----------

def p_expression_list_literal(p):
    """
    expression : LBRACKET arg_list RBRACKET
    """
    p[0] = ListLiteral(p[2], lineno=p.lineno(1))


def p_expression_list_index(p):
    """
    expression : expression LBRACKET expression RBRACKET
    """
    p[0] = ListIndex(p[1], p[3], lineno=p.lineno(2))


# ---------- FUNCTION CALLS ----------

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
    p[0] = FunctionCall(p[1], p[3], lineno=p.lineno(1))


# ---------- ERROR HANDLING ----------

def p_error(p):
    if p:
        col = find_column(p.lexer.lexdata, p)
        line_snippet = get_line_snippet(p.lexer.lexdata, p.lexpos)
        raise MarathiSyntaxError(
            f"अपेक्षित अभिव्यक्ती किंवा अयोग्य विधान: '{p.value}'",
            line=p.lineno,
            col=col,
            line_text=line_snippet
        )
    else:
        raise MarathiSyntaxError("अपूर्ण वाक्य (Unexpected end of input)")


parser = yacc.yacc(tabmodule='marathi.parsetab')
