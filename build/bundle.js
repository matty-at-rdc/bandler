

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
var _m2 = require("./m3.js");
if (_m2.IS_READY_FOR_PROD) {
  "Let's go to prod then!";
}
var main = function main() {
  return (0, _m.determineCoolness)();
};
var result = main();
console.log("The result of determine coolness was: ".concat(result));
  },
  map: {"./m1.js":1,"./m3.js":2}
},1: {
  factory: (exports, require) => {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.determineCoolness = void 0;
var _m = require("./m2.js");
var _m2 = require("./m3.js");
if (_m2.IS_READY_FOR_PROD) {
  "Let's go to prod then!";
}
var determineCoolness = function determineCoolness() {
  return (0, _m.add)(4, 5);
};

// Circular
// export const magicNumber = () => 1
exports.determineCoolness = determineCoolness;
  },
  map: {"./m2.js":3,"./m3.js":4}
},2: {
  factory: (exports, require) => {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IS_READY_FOR_PROD = void 0;
var IS_READY_FOR_PROD = false;
exports.IS_READY_FOR_PROD = IS_READY_FOR_PROD;
  },
  map: {}
},3: {
  factory: (exports, require) => {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = void 0;
// Circular
// import { magicNumber } from "./m1"
// const someNum = magicNumber()
var someNum = 0;
var add = function add(a, b) {
  return a + b + someNum;
};
exports.add = add;
  },
  map: {}
},4: {
  factory: (exports, require) => {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IS_READY_FOR_PROD = void 0;
var IS_READY_FOR_PROD = false;
exports.IS_READY_FOR_PROD = IS_READY_FOR_PROD;
  },
  map: {}
}})
