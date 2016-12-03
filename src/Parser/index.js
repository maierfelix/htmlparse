import {
  TokenKind as TT,
  PunctuatorKind as PP,
  getNameByLabel
} from "../labels";

import {
  inherit
} from "../utils";

import * as parse from "./parse";

export default class Parser {

  constructor() {
    this.idx = 0;
    this.limit = 0;
    this.tokens = null;
    this.current = null;
  }

  reset(tokens) {
    this.idx = 0;
    this.current = tokens[0];
    this.limit = tokens.length;
    this.tokens = tokens;
  }

  parse(tokens) {
    this.reset(tokens);
    let node = this.parseRoot();
    return (node);
  }

  eat(kind) {
    if (this.peek(kind)) {
      this.next();
      return (true);
    } else {
      return (false);
    }
  }

  consume() {
    let tmp = this.current;
    this.next();
    return (tmp);
  }

  peek(kind) {
    return (
      this.current.kind === kind
    );
  }

  isEOF() {
    return (
      this.current.kind === TT.EOF
    );
  }

  back() {
    if (this.idx >= 1) {
      // go 2 back, so we can go 1 forward
      // to simulate real back behaviour
      this.idx -= 2;
      this.next();
      return (true);
    }
    return (false);
  }

  subsequent(kind) {
    this.next();
    let result = this.peek(kind);
    this.back();
    return (result);
  }

  next() {
    if (this.idx < this.limit) {
      this.current = this.tokens[++this.idx];
      return (true);
    } else {
      return (false);
    }
  }

  expect(kind) {
    if (this.peek(kind)) {
      this.next();
    } else {
      this.throw(`Expected ${getNameByLabel(kind)} but got ${getNameByLabel(this.current.kind)}`, this.current);
    }
  }

  throw(msg, token) {
    let range = token.range;
    throw new Error(msg);
  }

}

inherit(Parser, parse);
