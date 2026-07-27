from lexer import lexer

def run_test(title, code):
    print("\n" + "=" * 60)
    print(title)
    print("=" * 60)
    print(code.strip(), "\n")
    try:
        lexer.input(code)
        for tok in lexer:
            print(f"{tok.type:10} | {tok.value!r:10} | line {tok.lineno}")
    except SyntaxError as e:
        print("ERROR:", e)


# -------------------------
# TEST CASES
# -------------------------

run_test(
    "TEST 1: BASIC DATA TYPES",
    '''
चल वय = 10
चल गुण = 3.14
चल नाव = "राम"
चल पास = खरे
चल नापास = खोटे
'''
)

run_test(
    "TEST 2: ARITHMETIC OPERATORS",
    '''
चल a = 10
चल b = 3
चल x = a + b
चल y = a - b
चल z = a * b
चल d = a / b
चल m = a % b
'''
)

run_test(
    "TEST 3: COMPARISON OPERATORS",
    '''
जर a == b तर { }
जर a != b तर { }
जर a > b तर { }
जर a < b तर { }
जर a >= b तर { }
जर a <= b तर { }
'''
)

run_test(
    "TEST 4: LOGICAL OPERATORS",
    '''
जर खरे आणि खोटे किंवा खरे तर {
    छापा("तर्क")
}
'''
)

run_test(
    "TEST 5: IDENTIFIERS (UNICODE + MIXED)",
    '''
चल x = 1
चल _y = 2
चल संख्या1 = 3
चल total_गुण = 100
चल बेरीज_1 = 10
'''
)

run_test(
    "TEST 6: FUNCTIONS & BLOCKS",
    '''
कार्य बेरीज(a, b) {
    परत a + b
}
'''
)

run_test(
    "TEST 7: WHITESPACE & NEWLINES",
    'चल   x=10\n\n\nछापा ( x )'
)

run_test(
    "TEST 8: ERROR HANDLING",
    'चल x = @'
)

# =========================
# END
# =========================