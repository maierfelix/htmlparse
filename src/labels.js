export const CC_LT = 60;
export const CC_GT = 62;

export const CC_ZERO = 48;
export const CC_NINE = 57;

export const CC_QUOTE = 39;
export const CC_QUOTE2 = 34;

export const CC_UCA = 65;
export const CC_LCA = 97;
export const CC_UCZ = 90;
export const CC_LCZ = 122;

export const CC_US = 95;
export const CC_NOT = 33;
export const CC_DOT = 46;
export const CC_SLASH = 47;
export const CC_MINUS = 45;
export const CC_ASSIGN = 61;

export let VoidKind = {};
export let TokenKind = {};
export let ElementKind = {};
export let PunctuatorKind = {};

let idx = 0;

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
  Label[Label["TextLiteral"] = ++idx] = "TextLiteral";
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
  return (null);
};
