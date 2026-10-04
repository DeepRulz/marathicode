export type TokenType =
  | "NUMBER"
  | "STRING"
  | "IDENTIFIER"
  | "PLUS"
  | "MINUS"
  | "TIMES"
  | "DIVIDE"
  | "MODULO"
  | "EQUALS"
  | "LPAREN"
  | "RPAREN"
  | "LBRACE"
  | "RBRACE"
  | "LBRACKET"
  | "RBRACKET"
  | "COMMA"
  | "SEMICOLON"
  | "GT"
  | "LT"
  | "GE"
  | "LE"
  | "EQ"
  | "NE"
  | "VAR"
  | "PRINT"
  | "IF"
  | "THEN"
  | "ELSE"
  | "WHILE"
  | "FOR"
  | "BREAK"
  | "CONTINUE"
  | "FUNCTION"
  | "RETURN"
  | "TRUE"
  | "FALSE"
  | "AND"
  | "OR"
  | "NOT"
  | "EOF";

export interface Token {
  type: TokenType;
  value: string;
  line: number;
}

export const RESERVED_KEYWORDS: Record<string, TokenType> = {
  "चल": "VAR",
  "छापा": "PRINT",
  "जर": "IF",
  "तर": "THEN",
  "नाहीतर": "ELSE",
  "पर्यंत": "WHILE",
  "साठी": "FOR",
  "थांब": "BREAK",
  "पुढे": "CONTINUE",
  "कार्य": "FUNCTION",
  "परत": "RETURN",
  "खरे": "TRUE",
  "खोटे": "FALSE",
  "आणि": "AND",
  "किंवा": "OR",
  "नाही": "NOT",
};

function parseMarathiNumber(str: string): number {
  const devanagariDigits: Record<string, string> = {
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
  };
  const normalized = str.replace(/[०-९]/g, (w) => devanagariDigits[w] || w);
  return Number(normalized);
}

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let line = 1;
  let i = 0;

  while (i < source.length) {
    const char = source[i];

    if (char === '\n') {
      line++;
      i++;
      continue;
    }

    if (/\s/.test(char)) {
      i++;
      continue;
    }

    if (source.startsWith('//', i)) {
      while (i < source.length && source[i] !== '\n') i++;
      continue;
    }

    if (source.startsWith('>=', i)) {
      tokens.push({ type: 'GE', value: '>=', line });
      i += 2; continue;
    }
    if (source.startsWith('<=', i)) {
      tokens.push({ type: 'LE', value: '<=', line });
      i += 2; continue;
    }
    if (source.startsWith('==', i)) {
      tokens.push({ type: 'EQ', value: '==', line });
      i += 2; continue;
    }
    if (source.startsWith('!=', i)) {
      tokens.push({ type: 'NE', value: '!=', line });
      i += 2; continue;
    }

    if (char === '+') { tokens.push({ type: 'PLUS', value: '+', line }); i++; continue; }
    if (char === '-') { tokens.push({ type: 'MINUS', value: '-', line }); i++; continue; }
    if (char === '*') { tokens.push({ type: 'TIMES', value: '*', line }); i++; continue; }
    if (char === '/') { tokens.push({ type: 'DIVIDE', value: '/', line }); i++; continue; }
    if (char === '%') { tokens.push({ type: 'MODULO', value: '%', line }); i++; continue; }
    if (char === '(') { tokens.push({ type: 'LPAREN', value: '(', line }); i++; continue; }
    if (char === ')') { tokens.push({ type: 'RPAREN', value: ')', line }); i++; continue; }
    if (char === '{') { tokens.push({ type: 'LBRACE', value: '{', line }); i++; continue; }
    if (char === '}') { tokens.push({ type: 'RBRACE', value: '}', line }); i++; continue; }
    if (char === '[') { tokens.push({ type: 'LBRACKET', value: '[', line }); i++; continue; }
    if (char === ']') { tokens.push({ type: 'RBRACKET', value: ']', line }); i++; continue; }
    if (char === ',') { tokens.push({ type: 'COMMA', value: ',', line }); i++; continue; }
    if (char === ';') { tokens.push({ type: 'SEMICOLON', value: ';', line }); i++; continue; }
    if (char === '>') { tokens.push({ type: 'GT', value: '>', line }); i++; continue; }
    if (char === '<') { tokens.push({ type: 'LT', value: '<', line }); i++; continue; }
    if (char === '=') { tokens.push({ type: 'EQUALS', value: '=', line }); i++; continue; }

    // String literals with escape sequence support
    if (char === '"') {
      let strVal = '';
      i++; // Skip opening quote
      while (i < source.length && source[i] !== '"') {
        if (source[i] === '\\' && i + 1 < source.length) {
          const nextChar = source[i + 1];
          if (nextChar === 'n') { strVal += '\n'; i += 2; continue; }
          if (nextChar === 't') { strVal += '\t'; i += 2; continue; }
          if (nextChar === '"') { strVal += '"'; i += 2; continue; }
          if (nextChar === '\\') { strVal += '\\'; i += 2; continue; }
        }
        if (source[i] === '\n') line++;
        strVal += source[i];
        i++;
      }
      if (i >= source.length) {
        throw new Error(`वाक्यरचना त्रुटी: बंद न झालेला स्ट्रिंग (ओळ ${line})`);
      }
      i++; // Skip closing quote
      tokens.push({ type: 'STRING', value: strVal, line });
      continue;
    }

    if (/[0-9०-९]/.test(char)) {
      let numStr = '';
      while (i < source.length && /[0-9०-९\.]/.test(source[i])) {
        numStr += source[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value: String(parseMarathiNumber(numStr)), line });
      continue;
    }

    if (/[a-zA-Z_\u0900-\u097F]/.test(char)) {
      let idStr = '';
      while (i < source.length && /[a-zA-Z0-9_\u0900-\u097F]/.test(source[i])) {
        idStr += source[i];
        i++;
      }
      const reservedType = RESERVED_KEYWORDS[idStr];
      if (reservedType) {
        tokens.push({ type: reservedType, value: idStr, line });
      } else {
        tokens.push({ type: 'IDENTIFIER', value: idStr, line });
      }
      continue;
    }

    throw new Error(`अवैध चिन्ह '${char}' (ओळ ${line})`);
  }

  tokens.push({ type: 'EOF', value: '', line });
  return tokens;
}
