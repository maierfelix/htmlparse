import buble from "rollup-plugin-buble";
import uglify from "rollup-plugin-uglify";

export default {
  entry: "src/index.js",
  moduleName: "parser",
  plugins: [ buble(), uglify() ],
  targets: [
    { dest: "dist/parser.min.js", format: "umd" }
  ]
};