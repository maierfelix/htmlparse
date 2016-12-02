let idx = 0;

export let VoidKind = {};
export let TokenKind = {};
export let ElementKind = {};
export let KeywordKind = {};
export let PunctuatorKind = {};

((Label) => {

  Label[Label["html"] = ++idx] = "HTML";
  Label[Label["body"] = ++idx] = "BODY";
  Label[Label["head"] = ++idx] = "HEAD";

})(KeywordKind);

((Label) => {

  Label[Label["="] = ++idx] = "ASSIGN";
  Label[Label["<"] = ++idx] = "OTAG";
  Label[Label[">"] = ++idx] = "CTAG";
  Label[Label["/"] = ++idx] = "SLASH";
  Label[Label["-"] = ++idx] = "MINUS";
  Label[Label["!"] = ++idx] = "NOT";

  generateKeyAccess(PunctuatorKind);

})(PunctuatorKind);

((Label) => {

  Label[Label["TEXT_NODE"] = 3] = "TEXT_NODE";
  Label[Label["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
  Label[Label["COMMENT_NODE"] = 8] = "COMMENT_NODE";
  Label[Label["ATTRIBUTE_NODE"] = 2] = "ATTRIBUTE_NODE";

})(ElementKind);

((Label) => {

  Label[Label["area"] = ++idx] = "AREA";
  Label[Label["base"] = ++idx] = "BASE";
  Label[Label["col"] = ++idx] = "COL";
  Label[Label["embed"] = ++idx] = "EMBED";
  Label[Label["hr"] = ++idx] = "HR";
  Label[Label["img"] = ++idx] = "IMG";
  Label[Label["input"] = ++idx] = "INPUT";
  Label[Label["link"] = ++idx] = "LINK";
  Label[Label["menuitem"] = ++idx] = "MENUITEM";
  Label[Label["meta"] = ++idx] = "META";
  Label[Label["param"] = ++idx] = "PARAM";
  Label[Label["source"] = ++idx] = "SOURCE";
  Label[Label["track"] = ++idx] = "TRACK";
  Label[Label["wbr"] = ++idx] = "WBR";

})(VoidKind);

((Label) => {

  Label[Label["EOF"] = ++idx] = "EOF";
  Label[Label["Identifier"] = ++idx] = "Identifier";
  Label[Label["StringLiteral"] = ++idx] = "StringLiteral";
  Label[Label["NumericLiteral"] = ++idx] = "NumericLiteral";

})(TokenKind);

function generateKeyAccess(label) {
  let key = 0;
  let index = 0;
  let length = Object.keys(label).length;
  while (index < length) {
    key = (index + idx) - length + 1;
    if (label[key] !== void 0) {
      label[label[key]] = key;
    }
    ++index;
  };
};

export function getNameByLabel(kind) {
  if (TokenKind[kind] !== void 0) {
    return (TokenKind[kind]);
  }
  if (PunctuatorKind[kind] !== void 0) {
    return (PunctuatorKind[kind]);
  }
  if (KeywordKind[kind] !== void 0) {
    return (KeywordKind[kind]);
  }
  return (null);
};
