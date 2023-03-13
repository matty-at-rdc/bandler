
// An IIFE which accepts a parameter called modules which will
// be an array of "modules". These are the 'modules' you created 
// in the invoker of factoryAndMapObject ("pack" right now).
// It is the "moduleArgArr" parameter passed to "iifeBundler"
(function(modules){

  // We declare a new function which we call "require" which accepts
  // a parameter "id" (which will begin with the entry point id 0).
  const require = (id) => {

    // We extract the "factory" and "map" properties from the module,
    // looking up the module by the provided id.
    const {factory, map} = modules[id];

    // We delcare an inner function called localRequire. 
    // It is a function which itself calls the "require" function
    // which you are in right now (whoa!). It accepts an argument 
    // called requireDeclarationName which will be a "key" 
    // in the current modules "map" property. The value of 
    // said property will be itself an array of modules, since 
    // that is what "require" expects!
    const localRequire = (requireDeclarationName) => require(map[requireDeclarationName]); 

    // We declare an object called module which has a
    // key called exports which itself is an object.
    const module = {exports: {}};

    // We call the "factory" function we extracted from the module object 
    // we provide as parameter the module.exports object we made above
    // and the localRequore function which is a closured and which
    // itself has a closured around this instance of "require"
    factory(module.exports, localRequire); 

    // Return the exports property of the locally made "module" object
    return module.exports; 
  } 

  // Start the chain reaction by invoking require with the Oth ID!
  require(0);
})({0: {
  // A property on each module with the key: "factory"
  // whose value is a function which accepts two paramters
  // one called 'exports' and one called 'require' the two 
  // parameters are used by the body of the function which is
  // not available until after the code has been built so at the 
  // time of writing this comment i cannot see it... maybe 
  // compile it and  then come back and explain what you saw...  
  factory: (exports, require) => {
    "use strict";

var _m = require("./m1.js");
var main = function main() {
  return (0, _m.determineCoolness)();
};
var result = main();
console.log("The result of determine coolness was: ".concat(result));
  },

  // A property called 'map' which contains the module in question's
  // map property as a string. The map property is added to each module  
  // we loop over....
  map: {"./m1.js":1}
},1: {
  // A property on each module with the key: "factory"
  // whose value is a function which accepts two paramters
  // one called 'exports' and one called 'require' the two 
  // parameters are used by the body of the function which is
  // not available until after the code has been built so at the 
  // time of writing this comment i cannot see it... maybe 
  // compile it and  then come back and explain what you saw...  
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

  // A property called 'map' which contains the module in question's
  // map property as a string. The map property is added to each module  
  // we loop over....
  map: {"./m2.js":2}
},2: {
  // A property on each module with the key: "factory"
  // whose value is a function which accepts two paramters
  // one called 'exports' and one called 'require' the two 
  // parameters are used by the body of the function which is
  // not available until after the code has been built so at the 
  // time of writing this comment i cannot see it... maybe 
  // compile it and  then come back and explain what you saw...  
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

  // A property called 'map' which contains the module in question's
  // map property as a string. The map property is added to each module  
  // we loop over....
  map: {}
}})
