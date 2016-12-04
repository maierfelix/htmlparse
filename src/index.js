import Lexer from "./Lexer/index";
import Parser from "./Parser/index";

let lexer = new Lexer();
let parser = new Parser();

let parse = (str) => {
  let tokens = lexer.lex(str);
  let ast = parser.parse(tokens);
  return (ast);
};

export {
  Lexer,
  Parser,
  parse
}