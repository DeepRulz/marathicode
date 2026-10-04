# MarathiCode Language Specification
**Version 0.1 (Pre-Freeze Release)**  
*Author: Deep Shah et al.*  
*Date: October 2026*

---

## 1. Overview
**MarathiCode** is an imperative, interpreted, dynamically-typed native-language programming language designed for the Marathi-speaking developer community and native-language computing research. It bridges natural Devanagari Marathi script semantics with modern programming language abstractions.

This specification documents **MarathiCode Version 0.1**, defining the official lexical tokens, grammar, scope environment model, type system, error interface, and operational semantics prior to formal software copyright registration.

---

## 2. Lexical Structure
MarathiCode source files use UTF-8 encoding with standard `.mr` extension.

### 2.1 Whitespace & Comments
- Whitespace (spaces, tabs, newlines) serves as token separators and line counters.
- Single-line comments begin with `//` and extend to the end of the line.

```marathi
// हा एक टिप्पणी संदेश आहे (This is a comment)
```

### 2.2 Character Set
- Keywords, identifiers, and literals support ASCII and the Unicode Devanagari range (`U+0900` to `U+097F`).

---

## 3. Keywords
MarathiCode features 16 reserved keywords written in native Devanagari Marathi:

| Keyword | English Equivalent | Category | Description |
| :--- | :--- | :--- | :--- |
| `चल` | `var` | Variable | Declares a local or global variable |
| `छापा` | `print` | IO | Outputs an expression to stdout |
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

## 4. Identifiers
Identifiers name variables, functions, and parameters.

### 4.1 Syntax Rules
- Must begin with an ASCII letter (`a-z`, `A-Z`), underscore (`_`), or Devanagari character (`\u0900-\u097F`).
- Subsequent characters may include ASCII/Devanagari digits (`0-9`, `०-९`).
- Cannot match any reserved keyword.

### 4.2 Examples
`वय`, `एकूण_गुण`, `बेरीज1`, `_संख्या`

---

## 5. Literals
MarathiCode supports numbers, strings, booleans, and list literals.

### 5.1 Number Literals
Supports ASCII (`10`, `3.14`) and Devanagari digits (`१०`, `३.१४`). Represented internally as 64-bit IEEE double floats or integers.

### 5.2 String Literals
Enclosed in double quotes (`"..."`). Supports escape sequences:
- `\n` : Newline
- `\t` : Tab
- `\"` : Escaped double quote
- `\\` : Backslash

```marathi
"नमस्कार\nमराठी \"कोड\""
```

### 5.3 Boolean Literals
`खरे` (True) and `खोटे` (False).

### 5.4 List Literals
Comma-separated expressions within square brackets (`[...]`).

```marathi
[10, "मराठी", खरे, [1, 2]]
```

---

## 6. Operators

### 6.1 Arithmetic Operators
- `+` Addition / String concatenation
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `%` Modulo

### 6.2 Comparison Operators
- `==` Equals
- `!=` Not equals
- `>` Greater than
- `<` Less than
- `>=` Greater than or equal
- `<=` Less than or equal

### 6.3 Logical Operators
- `आणि` Logical AND
- `किंवा` Logical OR
- `नाही` Logical Negation (Unary)

---

## 7. Expressions
Expressions evaluate to values. Operator precedence from highest to lowest:

1. Primary (`IDENTIFIER`, `NUMBER`, `STRING`, `BOOLEAN`, `[...]`, `(expr)`)
2. Indexing (`expr[index]`) & Function Calls (`func(...)`)
3. Unary Negation (`नाही`)
4. Multiplicative (`*`, `/`, `%`)
5. Additive (`+`, `-`)
6. Relational (`>`, `<`, `>=`, `<=`, `==`, `!=`)
7. Logical AND (`आणि`)
8. Logical OR (`किंवा`)

---

## 8. Variables
Variables are declared using `चल` and assigned with `=`.

```marathi
चल वय = 25
वय = 26 // Reassignment
```

---

## 9. Conditional Statements
Conditionals evaluate expressions and execute corresponding code blocks. Supports `नाहीतर जर` (else-if).

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

## 10. Loops

### 10.1 While Loop (`पर्यंत`)
```marathi
चल i = 1
पर्यंत i <= 5 {
    छापा(i)
    i = i + 1
}
```

### 10.2 Counted For Loop (`साठी`)
```marathi
साठी (i = 1; i <= 10; i = i + 1) {
    जर i == 5 तर {
        थांब // Break loop
    }
    छापा(i)
}
```

---

## 11. Functions
Defined with `कार्य` and return values with `परत`.

```marathi
कार्य बेरीज(a, b) {
    परत a + b
}

चल उत्तर = बेरीज(10, 20)
```

---

## 12. Lists & Built-in Functions

### 12.1 Indexing & Assignment
Zero-indexed using bracket notation:
```marathi
चल संख्या = [10, 20, 30]
छापा(संख्या[0]) // 10
संख्या[1] = 99
```

### 12.2 Standard Built-ins
- `लांबी(यादी_किंवा_स्ट्रिंग)`: Returns element count or character length.
- `जोडा(यादी, मूल्य)`: Appends value to list.

---

## 13. Scope & Environment Model
MarathiCode uses a hierarchical scope environment model:

```
Global Environment
       ↓
Function Environment
       ↓
Block Environment
```

1. **Global Scope**: Top-level declarations.
2. **Function Scope**: Parameters and function-local variables.
3. **Block Scope**: Variables declared inside `{ ... }` blocks.
4. **Lookup Rule**: Unresolved identifiers traverse upwards to parent environment frames.

---

## 14. Error Handling
All lexical, syntax, and runtime exceptions output structured Marathi messages with line numbers and source caret pointers (`^`).

```
वाक्यरचना त्रुटी (Syntax Error)
ओळ 4:
    जर x > तर {
          ^
अपेक्षित अभिव्यक्ती.
```

---

## 15. Program Execution
Command-line execution via CLI:
```bash
marathicode program.mr
```
The interpreter reads source text, tokenizes through lexical analysis, constructs an AST via LALR parser, and executes nodes on the Environment machine.

---

## 16. Formal Grammar (EBNF)

```ebnf
program          = { statement } ;
statement        = var_decl | assignment | list_assign | print_stmt 
                 | if_stmt | while_stmt | for_stmt | break_stmt 
                 | continue_stmt | func_def | func_call | return_stmt ;

var_decl         = "चल" IDENTIFIER "=" expression ;
assignment       = IDENTIFIER "=" expression ;
list_assign      = IDENTIFIER "[" expression "]" "=" expression ;
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

## 17. Examples

### 17.1 Factorial Function
```marathi
कार्य फॅक्टोरिअल(n) {
    जर n <= 1 तर {
        परत 1
    }
    परत n * फॅक्टोरिअल(n - 1)
}

छापा("५ चे फॅक्टोरिअल: " + फॅक्टोरिअल(5))
```

### 17.2 List Operations & Counted Loop
```marathi
चल संख्या = [10, 20, 30]
जोडा(संख्या, 40)

साठी (i = 0; i < लांबी(संख्या); i = i + 1) {
    छापा(संख्या[i])
}
```

---
*End of MarathiCode Language Specification v0.1*
