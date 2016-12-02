import {
  VoidKind as VV,
  TokenKind as TT,
  ElementKind as EE,
  KeywordKind as KK,
  PunctuatorKind as PP
} from "../labels";

import {
  getNameByLabel
} from "../labels";

import Node from "../nodes";

export function parseRoot() {
  let node = {};
  let children = this.parseNodeList();
  node.children = children;
  return (node);
}

export function parseNodeList() {
  let nodes = [];
  while (!this.peek(PP.CTAG)) {
    if (this.isEOF()) break;
    nodes.push(this.parseNode());
  };
  return (nodes);
}

export function parseNode() {
  let node = {};
  this.expect(PP.OTAG);
  let tag = this.consume().value;
  node.localName = tag;
  node.nodeType = EE.ELEMENT_NODE;
  let attrs = this.parseAttributes();
  node.attributes = attrs;
  this.expect(PP.CTAG);
  if (this.peek(PP.OTAG)) {
    node.children = this.parseNodeList();
  }
  // parse closing tag
  if (this.eat(PP.OTAG)) {
    this.expect(PP.SLASH);
    this.next();
    this.expect(PP.CTAG);
  }
  return (node);
}

export function parseAttributes() {
  let nodes = [];
  while (!this.peek(PP.CTAG)) {
    let node = {};
    node.nodeType = EE.ATTRIBUTE_NODE;
    let id = this.consume().value;
    if (this.eat(PP.ASSIGN)) {
      node.nodeValue = this.consume().value;
    }
    nodes.push(node);
  };
  return (nodes);
}
