# MarathiCode Language Specification
**Version 0.1 (Pre-Freeze Release)**  
*Author: Deep Shah et al. (Sprout Tech Research & Development)*  
*Date: October 2026*

---

## 1. Overview & Research Positioning
**MarathiCode** is an imperative, interpreted, dynamically-typed native-language programming language designed to explore programming through Marathi-native syntax and Devanagari identifiers while retaining familiar programming-language structures.

### Research Positioning Statement
- MarathiCode investigates how a programming-language interface can be localized for Marathi while maintaining standard programming-language abstractions.
- Whether native-language programming produces measurable educational benefits remains an open question for future empirical research.
- MarathiCode acknowledges prior work in localized computing and Indian-language programming systems.

This specification documents **MarathiCode Version 0.1**, defining the official lexical tokens, grammar, scope environment model, type system, error interface, and operational semantics prior to formal software copyright registration.

---

## 2. Design Rationale
- **Marathi Keywords & Devanagari Identifiers**: Enables natural reading in Devanagari script without requiring English keyword memorization for control flow constructs.
- **Conventional Structural Alignment**: Retains standard imperative control flow (blocks, functions, recursion, loops) so concepts transfer directly to conventional languages.
- **Brace-Delimited Blocks (`{ ... }`)**: Provides explicit, unambiguous scope boundaries across lexical analysis.
- **AST-Based Interpretation**: Uses an abstract syntax tree parser and environment machine for clear, inspectable execution semantics.
- **Unicode First**: Full native support for Devanagari script (`U+0900` to `U+097F`) alongside ASCII digits and text.
- **Localized Diagnostics**: Error reporting provides line numbers, column pointers (`^`), and Marathi error labels for improved developer experience.

---

## 3. Lexical Structure
MarathiCode source files use UTF-8 encoding with standard `.mr` extension.

### 3.1 Whitespace & Comments
- Whitespace (spaces, tabs, newlines) serves as token separators and line counters.
- Single-line comments begin with `//` and extend to the end of the line.

```marathi
// हा एक टिप्पणी संदेश आहे (This is a comment)
```

### 3.2 Character Set
- Keywords, identifiers, and literals support ASCII and the Unicode Devanagari range (`U+0900` to `U+097F`).

---

## 4. Keywords
MarathiCode features 16 reserved keywords written in native Devanagari Marathi:

| Keyword | English Equivalent | Category | Description |
| :--- | :--- | :--- | :--- |
| `चल` | `var` | Variable | Declares a variable in the current block/global scope |
| `छापा` | `print` | IO | Outputs an expression to standard output |
| `जर` | `if` | Conditional | Begins a conditional statement |
| `तर` | `then` | Conditional | Qualifies the condition execution block |
| `नाहीतर` | `else` | Conditional | Specifies the fallback or else-if branch |
| `पर्यंत` | `while` | Loop | Iterates while condition holds true |
| `साठी` | `for` | Loop | Counted loop statement |
| `थांब` | `break` | Loop | Exits nearest loop block |
| `पुढे` | `continue` | Loop | Jumps to next loop iteration |
| `कार्य` | `function` | Function | Defines a named function |
| `परत` | `return` | Function | Returns a value from function execution |
| `खरे` | `true` | Literal | Boolean true value |
| `खोटे` | `false` | Literal | Boolean false value |
| `आणि` | `and` | Logical | Short-circuit logical AND |
| `किंवा` | `or` | Logical | Short-circuit logical OR |
| `नाही` | `not` | Logical | Unary logical negation |

---

## 5. Identifiers
Identifiers name variables, functions, and parameters.

### 5.1 Syntax Rules
- Must begin with an ASCII letter (`a-z`, `A-Z`), underscore (`_`), or Devanagari character (`\u0900-\u097F`).
- Subsequent characters may include ASCII/Devanagari digits (`0-9`, `०-९`).
- Cannot match any reserved keyword.

### 5.2 Examples
`वय`, `एकूण_गुण`, `बेरीज1`, `_संख्या`

---

## 6. Literals
MarathiCode supports numbers, strings, booleans, and list literals.

### 6.1 Number Literals
Supports ASCII (`10`, `3.14`) and Devanagari digits (`१०`, `३.१४`). Represented internally as 64-bit IEEE double floats or integers.

### 6.2 String Literals
Enclosed in double quotes (`"..."`). Supports escape sequences:
- `\n` : Newline
- `\t` : Tab
- `\"` : Escaped double quote
- `\\` : Backslash

```marathi
"नमस्कार\nमराठी \"कोड\""
```

### 6.3 Boolean Literals
`खरे` (True) and `खोटे` (False).

### 6.4 List Literals
Comma-separated expressions within square brackets (`[...]`).

```marathi
[10, "मराठी", खरे, [1, 2]]
```

---

## 7. Operators

### 7.1 Arithmetic Operators
- `+` Addition / String concatenation
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `%` Modulo

### 7.2 Comparison Operators
- `==` Equals
- `!=` Not equals
- `>` Greater than
- `<` Less than
- `>=` Greater than or equal
- `<=` Less than or equal

### 7.3 Logical Operators
- `आणि` Short-circuit Logical AND
- `किंवा` Short-circuit Logical OR
- `नाही` Logical Negation (Unary)

---

## 8. Expressions & Precedence
Expressions evaluate to values. Operator precedence from highest to lowest:

1. Primary (`IDENTIFIER`, `NUMBER`, `STRING`, `BOOLEAN`, `[...]`, `(expr)`)
2. Indexing (`expr[index]`) & Function Calls (`func(...)`)
3. Unary Negation (`नाही`)
4. Multiplicative (`*`, `/`, `%`)
5. Additive (`+`, `-`)
6. Relational (`>`, `<`, `>=`, `<=`, `==`, `!=`)
7. Short-circuit Logical AND (`आणि`)
8. Short-circuit Logical OR (`किंवा`)

---

## 9. Variables & Block Scope
Variables declared with `चल` exist in the current block scope. Reassignments update existing variable bindings in the scope hierarchy.

```marathi
चल x = 100

जर खरे तर {
    चल x = 200  // Shadowed inside block
    छापा(x)     // Prints 200
}

छापा(x)         // Prints 100 (Outer scope preserved)
```

---

## 10. Conditional Statements
Supports `जर-तर`, `नाहीतर`, and `नाहीतर जर` (else-if).

```marathi
जर गुण > 90 तर {
    छापा("अमुल्य")
} नाहीतर जर गुण > 60 तर {
    छापा("उत्तम")
} नाहीतर {
    छापा("साधारण")
}
```

---

## 11. Loops

### 11.1 While Loop (`पर्यंत`)
```marathi
चल i = 1
पर्यंत i <= 5 {
    छापा(i)
    i = i + 1
}
```

### 11.2 Counted For Loop (`साठी`) with `थांब` & `पुढे`
```marathi
साठी (i = 1; i <= 10; i = i + 1) {
    जर i == 3 तर {
        पुढे // Skip rest of iteration
    }
    जर i == 8 तर {
        थांब // Break loop
    }
    छापा(i)
}
```

---

## 12. Functions & Scope
Functions are defined with `कार्य` and return values with `परत`.

```marathi
कार्य बेरीज(a, b) {
    परत a + b
}

चल उत्तर = बेरीज(10, 20)
```

---

## 13. Lists & Built-in Functions

### 13.1 Indexing & Nested Lists
Zero-indexed using bracket notation:
```marathi
चल संख्या = [10, 20, 30]
छापा(संख्या[0]) // 10

चल matrix = [[1, 2], [3, 4]]
छापा(matrix[1][0]) // 3
matrix[0][1] = 99
```

### 13.2 Standard Built-ins
- `लांबी(यादी_किंवा_स्ट्रिंग)`: Returns element count or string length.
- `जोडा(यादी, मूल्य)`: Appends value to list.

---

## 14. Scope Environment Architecture
MarathiCode uses a parent-pointer scope environment hierarchy:

```
Global Environment
       ↓
Function Environment
       ↓
Block Environment
```

---

## 15. Error Handling
Outputs structured Marathi error messages with line numbers, column pointers (`^`), and code snippets.

```
वाक्यरचना त्रुटी (Syntax Error)
ओळ 4:
    जर x > तर {
          ^
अपेक्षित अभिव्यक्ती किंवा अयोग्य विधान.
```

---

## 16. Program Execution
CLI invocation:
```bash
python -m marathi.cli program.mr
```

---

## 17. Formal Grammar (EBNF)

```ebnf
program          = { statement } ;
statement        = var_decl | assignment | list_assign | print_stmt 
                 | if_stmt | while_stmt | for_stmt | break_stmt 
                 | continue_stmt | func_def | func_call | return_stmt ;

var_decl         = "चल" IDENTIFIER "=" expression ;
assignment       = IDENTIFIER "=" expression ;
list_assign      = expression "[" expression "]" "=" expression ;
print_stmt       = "छापा" "(" expression ")" ;

if_stmt          = "जर" expression "तर" block [ "नाहीतर" ( if_stmt | block ) ] ;
while_stmt       = "पर्यंत" expression block ;
for_stmt         = "साठी" "(" (var_decl | assignment) ";" expression ";" assignment ")" block ;
break_stmt       = "थांब" ;
continue_stmt    = "पुढे" ;

func_def         = "कार्य" IDENTIFIER "(" [ param_list ] ")" block ;
param_list       = IDENTIFIER { "," IDENTIFIER } ;
return_stmt      = "परत" expression ;

block            = "{" { statement } "}" ;

expression       = logical_or ;
logical_or       = logical_and { "किंवा" logical_and } ;
logical_and      = comparison { "आणि" comparison } ;
comparison       = additive { ( ">" | "<" | ">=" | "<=" | "==" | "!=" ) additive } ;
additive         = multiplicative { ( "+" | "-" ) multiplicative } ;
multiplicative   = unary { ( "*" | "/" | "%" ) unary } ;
unary            = [ "नाही" ] primary ;
primary          = NUMBER | STRING | BOOLEAN | list_literal | list_index | func_call | IDENTIFIER | "(" expression ")" ;

list_literal     = "[" [ arg_list ] "]" ;
list_index       = primary "[" expression "]" ;
func_call        = IDENTIFIER "(" [ arg_list ] ")" ;
arg_list         = expression { "," expression } ;
```

---

## 18. Official Examples

### 18.1 Factorial Function
```marathi
कार्य फॅक्टोरिअल(n) {
    जर n <= 1 तर {
        परत 1
    }
    परत n * फॅक्टोरिअल(n - 1)
}

छापा("५ चे फॅक्टोरिअल: " + फॅक्टोरिअल(5))
```

### 18.2 Nested Lists & Counted Loop
```marathi
चल matrix = [[1, 2], [3, 4]]

साठी (i = 0; i < लांबी(matrix); i = i + 1) {
    साठी (j = 0; j < लांबी(matrix[i]); j = j + 1) {
        छापा(matrix[i][j])
    }
}
```

---
*End of MarathiCode Language Specification v0.1*
