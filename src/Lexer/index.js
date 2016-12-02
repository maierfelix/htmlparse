import {
  TokenKind,
  KeywordKind,
  PunctuatorKind
} from "../labels";

export default class Lexer {

  constructor() {
    this.idx = 0;
    this.line = 0;
    this.column = 0;
    this.tokens = [];
    this.src = "";
    this.length = 0;
  }

  reset() {
    this.idx = -1;
    this.line = 1;
    this.column = 0;
    this.tokens = [];
  }

  lex(src) {
    this.reset();
    this.src = src;
    this.length = src.length;
    let cc = 0;
    while (cc = this.next()) {
      if (this.isWhitespace(cc)) continue;
      // ignore token, increment line and reset column idx
      if (this.isLineTerminator(cc)) {
        this.line++;
        this.column = 0;
        continue;
      }
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
    if (this.isPunctuator(String.fromCharCode(cc))) {
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
    if (this.isKeyword(value)){
      kind = KeywordKind[value];
    } else {
      kind = TokenKind.Identifier;
    }
    this.column--;
    this.pushToken(kind, start, value);
    this.idx--;
  }

  scanPunctuator(cc) {
    let ch = String.fromCharCode(cc);
    if (this.isPunctuator(ch)) {
      let kind = PunctuatorKind[ch];
      this.pushToken(kind, this.idx-1, ch);
    }
  }

  scanString(cc) {
    let start = this.idx;
    while (cc = this.next()) {
      if (this.isQuote(cc)) break;
    };
    let kind = TokenKind.StringLiteral;
    let value = this.src.slice(start+1, this.idx);
    this.pushToken(kind, start, value);
  }

  pushToken(kind, start, value) {
    let length = (this.idx - start)-1;
    let begin = (this.column - length);
    let end = begin + length;
    let token = {
      kind: kind,
      value: value,
      line: this.line,
      begin: begin,
      end: end
    };
    this.tokens.push(token);
  }

  pushEOF() {
    let kind = TokenKind.EOF;
    let value = null;
    this.pushToken(kind, 0, value);
  }

  next() {
    if (++this.idx < this.length) {
      this.column++;
      return (this.src[this.idx].charCodeAt(0));
    } else {
      return (0);
    }
  }

  isKeyword(str) {
    return (KeywordKind[str] !== void 0);
  }

  isPunctuator(str) {
    return (PunctuatorKind[str] !== void 0);
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
