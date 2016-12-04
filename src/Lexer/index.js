import {
  TokenKind as TT,
  PunctuatorKind as PP
} from "../labels";

import {
  CC_LT,
  CC_GT,
  CC_US,
  CC_NOT,
  CC_DOT,
  CC_UCA,
  CC_LCA,
  CC_UCZ,
  CC_LCZ,
  CC_ZERO,
  CC_NINE,
  CC_SLASH,
  CC_MINUS,
  CC_QUOTE,
  CC_QUOTE2,
  CC_ASSIGN
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
    while (true) {
      if ((cc = this.next()) <= 0) break;
      if (this.isBlank(cc)) continue;
      this.scanToken(cc);
    };
    this.pushEOF();
    return (this.tokens);
  }

  scanToken(cc) {
    if (this.isPunctuator(cc)) {
      // tag open
      if (cc === CC_LT) {
        this.scanTagOpen();
        return void 0;
      }
    }
    this.scanText();
    return void 0;
  }

  scanText() {
    let cc = 0;
    let start = this.idx;
    while (cc = this.next()) {
      if (cc === CC_LT) break;
    };
    let value = this.src.slice(start, this.idx);
    this.pushToken(TT.TextLiteral, value);
    this.idx--;
  }

  scanTagOpen() {
    let cc = 0;
    this.scanPunctuator();
    while (true) {
      if ((cc = this.next()) <= 0) break;
      // string
      if (this.isQuote(cc)) {
        this.scanQuotedString();
        continue;
      }
      // blank
      if (this.isBlank(cc)) continue;
      // alpha
      if (this.isAlpha(cc)) {
        this.scanAlpha();
        continue;
      }
      // punctuator
      if (this.isPunctuator(cc)) {
        if (cc === CC_GT) {
          this.scanTagClose();
          break;
        }
        // comment open?
        if (cc === CC_MINUS && this.src[this.idx + 1] === "-") {
          this.scanComment(cc);
          continue;
        }
        // attribute values can be unquoted
        if (cc === CC_ASSIGN) {
          this.scanEscapedAttribute();
          continue;
        }
        this.scanPunctuator();
        continue;
      }
      this.idx--;
      break;
    };
  }

  scanEscapedAttribute() {
    let cc = 0;
    this.scanPunctuator();
    let next = this.src[this.idx+1].charCodeAt(0);
    if (!this.isQuote(next)) {
      let start = this.idx;
      while (true) {
        if ((cc = this.next()) <= 0) break;
        if (this.isBlank(cc)) break;
        if (this.isTag(cc)) break;
        if (cc === CC_SLASH) {
          if (this.src[this.idx+1] === ">") break;
        }
      };
      let value = this.src.slice(start+1, this.idx);
      this.pushToken(TT.StringLiteral, value);
    }
  }

  scanComment(cc) {
    this.idx++;
    while (true) {
      let last = cc;
      if ((cc = this.next()) <= 0) break;
      if (last === CC_MINUS && cc === CC_MINUS) break;
    };
    this.tokens.splice(this.tokens.length-2, 2);
    this.idx++;
  }

  scanTagClose() {
    this.scanPunctuator();
  }

  scanAlpha() {
    let cc = 0;
    let start = this.idx;
    while (cc = this.next()) {
      if (
        !this.isAlpha(cc) &&
        !this.isNumber(cc) &&
        !(cc === CC_MINUS || cc === CC_DOT || cc === CC_US)
      ) break;
    };
    let value = this.src.slice(start, this.idx);
    this.pushToken(TT.Identifier, value);
    this.idx--;
  }

  scanPunctuator() {
    let ch = this.src[this.idx];
    this.pushToken(PP[ch], ch);
  }

  scanQuotedString() {
    let cc = 0;
    let start = this.idx;
    while (true) {
      if ((cc = this.next()) <= 0) break;
      if (this.isQuote(cc)) break;
    };
    let value = this.src.slice(start+1, this.idx);
    this.pushToken(TT.StringLiteral, value);
  }

  pushToken(kind, value) {
    this.tokens.push({
      kind: kind,
      value: value
    });
  }

  pushEOF() {
    let value = "";
    this.pushToken(TT.EOF, value);
  }

  next() {
    if (++this.idx < this.length) {
      return (this.src[this.idx].charCodeAt(0));
    } else {
      return (0);
    }
  }

  isTag(cc) {
    return (
      cc === CC_LT ||
      cc === CC_GT
    );
  }

  isPunctuator(cc) {
    return (
      cc === CC_LT ||
      cc === CC_GT ||
      cc === CC_NOT ||
      cc === CC_ASSIGN ||
      cc === CC_SLASH ||
      cc === CC_MINUS
    );
  }

  isNumber(cc) {
    return (
      cc >= CC_ZERO && cc <= CC_NINE
    );
  }

  isQuote(cc) {
    return (
      cc === CC_QUOTE ||
      cc === CC_QUOTE2
    );
  }

  isLineTerminator(cc) {
    return (
      cc === 0xa ||
      cc === 0xd
    );
  }

  isBlank(cc) {
    return (
      // line terminators
      cc === 0xa ||
      cc === 0xd ||
      // whitespace etc
      cc === 0x9 ||
      cc === 0xb ||
      cc === 0xc ||
      cc === 0x20 ||
      cc === 0xa0
    );
  }

  isAlpha(cc) {
    return (
      cc >= CC_UCA && cc <= CC_UCZ ||
      cc >= CC_LCA && cc <= CC_LCZ
    );
  }

}
