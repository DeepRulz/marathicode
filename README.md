# Marathi Programming Language (Experimental)

This repository contains an experimental programming language implementation written in Python.
The language uses Marathi-inspired keywords and syntax and was built mainly as a learning exercise in
language design, parsing, and interpretation.

This is **not a production system**. It is a prototype created to explore ideas.

---

## Why this project

When beginners, especially younger students, are introduced to programming,
they often struggle first with **unfamiliar language**, not logic.

This project started with a simple question:

> Can familiarity (language, words, structure) make the first interaction with coding feel less intimidating?

The idea was to explore whether using **Marathi-style keywords and syntax**
could help younger learners focus on *thinking logically* before worrying about English-heavy syntax.

This is meant as an **entry point**, not a replacement for mainstream programming languages.

---

## What’s inside

The project implements a small language pipeline:

- Lexer (tokenization)
- Parser (AST generation)
- AST node definitions
- Basic execution / code generation
- A simple CLI to run `.mr` files
- Minimal test cases for lexer and parser

The implementation is intentionally simple and readable.

Example programs are available in the `examples/` directory and are written
to resemble the kind of problems beginners usually start with.

---

## Repository layout

marathi-lang

├── marathi/ # Core implementation 

├── examples/ # Sample programs

├── README.md

├── LICENSE

└── .gitignore


---

## Current state

Status: **Experimental / Prototype**

Things this project does **not** aim to be:
- A finished language
- A scalable or optimized system
- An officially deployed educational product

This repository documents exploration and learning.
Any real-world classroom or institutional use would require
separate evaluation, redesign, and validation.

---

## Notes and learnings

While working on this project, I learned a lot about:
- Writing lexers and parsers
- AST-based execution
- Language design trade-offs
- How familiarity can lower the initial barrier to learning
- The practical limits of taking experimental ideas into formal systems

These learnings are the main outcome of this work.

---

## License

Licensed under the **Apache License 2.0**.

You are free to use and adapt the code with attribution.
Authorship may not be misrepresented.

See `LICENSE` for details.

---

## Author

Deep Shah

This repository exists as a public record of independent work and experimentation.