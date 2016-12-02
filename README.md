<div align="center">
  <h3>A minimal blazing fast HTML parser.</h3>
</div>

<div align="center">
  <a href="https://travis-ci.org/maierfelix/htmlparse">
    <img src="https://img.shields.io/travis/maierfelix/htmlparse/master.svg?style=flat-square" alt="Build Status" />
  </a>
  <a href="https://www.npmjs.com/package/htmlparse">
    <img src="https://img.shields.io/npm/v/htmlparse.svg?style=flat-square" alt="NPM Version" />
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" alt="API Stability" />
  </a>
</div>

## Installation

```sh
npm install htmlparse
```

Or clone the source:

```sh
git clone https://github.com/maierfelix/htmlparse.git
```

## API


#### parse
Use `parse(str)` to parse an HTML string
```js
let ast = parser.parse(str); // returns ast
```

#### serialize
Use `serialize(ast)` to serialize an AST back into it's relative string
```js
let ast = parser.serialize(ast); // returns string
```
