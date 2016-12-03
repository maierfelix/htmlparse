import {
  TokenKind as TT,
  PunctuatorKind as PP
} from "../labels";

export default class Lexer {

  constructor() {
    this.idx = 0;
    this.tokens = [];
    this.src = "";
    this.length = 0;
  }

  reset() {
    this.idx = -1;
    this.tokens = [];
  }

  lex(src) {
    this.reset();
    this.src = src;
    this.length = src.length;
    let cc = 0;
    while (cc = this.next()) {
      if (
        this.isWhitespace(cc) ||
        this.isLineTerminator(cc)
      ) continue;
      this.scanToken(cc);
    };
    this.pushEOF();
    return (this.tokens);
  }

  scanToken(cc) {
    // alpha most common, so placed here
    if (this.isAlpha(cc)) {
      this.scanAlpha(cc);
      return void 0;
    }
    // punctuator
    if (this.isPunctuator(cc)) {
      this.scanPunctuator(cc);
      return void 0;
    }
    // quoted string
    if (this.isQuote(cc)) {
      this.scanString(cc);
      return void 0;
    }
    // unexpected
    throw new Error(`Unexpected token ${String.fromCharCode(cc)}`);
  }

  scanAlpha(cc) {
    let start = this.idx;
    while (cc = this.next()) {
      if (!this.isAlpha(cc)) break;
    };
    let value = this.src.slice(start, this.idx);
    let kind = null;
    kind = TT.Identifier;
    this.pushToken(kind, value);
    this.idx--;
  }

  scanPunctuator(cc) {
    let ch = String.fromCharCode(cc);
    this.pushToken(PP[ch], ch);
  }

  scanString(cc) {
    let start = this.idx;
    while (cc = this.next()) {
      if (this.isQuote(cc)) break;
    };
    let kind = TT.StringLiteral;
    let value = this.src.slice(start+1, this.idx);
    this.pushToken(kind, value);
  }

  pushToken(kind, value) {
    this.tokens.push({
      kind: kind,
      value: value
    });
  }

  pushEOF() {
    let kind = TT.EOF;
    let value = "";
    this.pushToken(kind, value);
  }

  next() {
    if (++this.idx < this.length) {
      return (this.src[this.idx].charCodeAt(0));
    } else {
      return (0);
    }
  }

  // we need max performance here
  // so this stuff is hardcoded =^ ./labels
  isPunctuator(cc) {
    return (
      cc === 60 || // =
      cc === 62 || // <
      cc === 61 || // >
      cc === 47 || // /
      cc === 45 || // -
      cc === 33    // !
    );
  }

  isQuote(cc) {
    return (
      cc === 34 ||
      cc === 39
    );
  }

  isLineTerminator(cc) {
    return (
      cc === 10 ||
      cc === 13
    );
  }

  isAlpha(cc) {
    return (
      cc >= 65 && cc <= 90 ||
      cc >= 97 && cc <= 122 ||
      cc === 95
    );
  }

  isWhitespace(cc) {
    return (
      cc === 9 ||
      cc === 11 ||
      cc === 12 ||
      cc === 32 ||
      cc === 160
    );
  }

}
