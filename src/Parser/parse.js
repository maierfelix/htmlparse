import {
  VoidKind as VV,
  TokenKind as TT,
  ElementKind as EE,
  PunctuatorKind as PP
} from "../labels";

import {
  getNameByLabel
} from "../labels";

export function parseRoot() {
  return (this.parseNodeList());
}

export function parseNodeList() {
  let nodes = [];
  while (true) {
    if (this.isEOF() || this.peek(PP.CTAG)) break;
    let node = this.parseNode();
    nodes.push(node);
  };
  return (nodes);
}

export function parseNode() {

  let node = {};

  // opening tag
  this.expect(PP.OTAG);
  let tag = this.consume().value;
  node.localName = tag;
  node.nodeType = EE.ELEMENT_NODE;
  let attrs = this.parseAttributes();
  node.attributes = attrs;
  // lazy closed
  if (this.eat(PP.SLASH)) {
    this.expect(PP.CTAG);
    return (node);
  }
  this.expect(PP.CTAG);

  node.children = this.parseNodeContent(tag);
  if (!this.isEOF()) {
    this.expectClosingNode();
  }

  return (node);

}

export function parseNodeContent(tag) {
  let nodes = [];
  while (true) {
    if (this.isEOF()) break;
    // check if next tag closes parent node
    if (this.subsequent(PP.SLASH)) {
      if (this.tokens[this.idx + 2].value === tag) break;
    }
    let node = this.parseNode();
    nodes.push(node);
  };
  return (nodes);
}

export function expectClosingNode() {
  this.expect(PP.OTAG);
  this.expect(PP.SLASH);
  this.next(); // skip tag
  this.parseAttributes(); // ignore attrs
  this.expect(PP.CTAG);
}

export function parseAttributes() {
  let nodes = [];
  while (true) {
    if (this.peek(PP.CTAG) || this.peek(PP.SLASH)) break;
    let node = {};
    node.nodeType = EE.ATTRIBUTE_NODE;
    node.name = this.consume().value;
    if (this.eat(PP.ASSIGN)) {
      node.nodeValue = this.consume().value;
    }
    nodes.push(node);
  };
  return (nodes);
}
