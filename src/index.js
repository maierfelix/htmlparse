import Lexer from "./Lexer/index";
import Parser from "./Parser/index";

let lexer = new Lexer();
let parser = new Parser();

let parse = (str) => {
  let tokens = lexer.lex(str);
  let ast = parser.parse(tokens);
  return (ast);
};

/*
let fs = require("fs");
let path = "test/simple.html";
let document = fs.readFileSync(process.cwd() + "/" + path, "utf8");

console.log(JSON.stringify(parse(document), null, 2));
*/

module.exports = {
  Lexer: Lexer,
  Parser: Parser,
  parse: parse,
  serialize: serialize
};