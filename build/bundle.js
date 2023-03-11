(function(modules){
  const require = (id) => {
  const {factory, map} = modules[id];
  const localRequire = (requireDeclarationName) => require(map[requireDeclarationName]); 
  const module = {exports: {}};
  factory(module.exports, localRequire); 
  return module.exports; 
  } 
  require(0);
})({0: {
  factory: (exports, require) => {
    "use strict";

var _m = require("./m1.js");
var main = function main() {
  return (0, _m.determineCoolness)();
};
var result = main();
console.log("The result of determine coolness was: ".concat(result));
  },
  map: {"./m1.js":1}
},1: {
  factory: (exports, require) => {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.determineCoolness = void 0;
var _m = require("./m2.js");
var determineCoolness = function determineCoolness() {
  return (0, _m.add)(4, 5);
};

// Fix Circulars
// export const magicNumber = 42
exports.determineCoolness = determineCoolness;
  },
  map: {"./m2.js":2}
},2: {
  factory: (exports, require) => {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = void 0;
// Fix circulars...
// import { magicNumber } from "./m1"

var add = function add(a, b) {
  return a + b;
};
exports.add = add;
  },
  map: {}
}})
