let parser = require("../dist/parser.js");

let fs = require("fs");

let dir = process.cwd() + "/test/";
let ignore = ["unreached", "index.js"];
let sources = [];

let readFile = (entry) => {
  if (/\.html$/.test(entry)) {
    let src = {
      name: entry,
      src: fs.readFileSync(entry, "utf8"),
    };
    sources.push(src);
  }
};

let readDir = (dir) => {
  fs.readdirSync(dir).forEach(function(entry) {
    if (ignore.indexOf(entry) > -1) return void 0;
    let file = dir + '/' + entry;
    let stat = fs.statSync(file);
    if (stat.isDirectory()) {
      readDir(file);
    } else {
      readFile(file);
    }
  });
};

readDir(dir);

let failures = 0;

sources.map((src) => {
  let tokens = null;
  let ast = null;
  let code = null;
  let success = false;
  let error = null;
  let name = src.name.replace(dir, "").slice(1, src.name.length);
  try {
    ast = parser.parse(src.src);
    success = true;
  } catch(e) {
    error  = e;
    success = false;
  }
  if (!success) failures++;
  console.log(`[${success ? "PASSED" : "FAILED"}]::${name + (!success ? " => " + error : "")}`);
});

if (failures) {
  console.log(`\n${sources.length - failures}/${sources.length} PASSED!`);
} else {
  console.log("\nSTABLE!");
}
