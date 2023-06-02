;(function (modules) {
  const require = (id) => {
    const { factory, map } = modules[id]

    const localRequire = (requireDeclarationName) =>
      require(map[requireDeclarationName])

    const module = { exports: {} }

    factory(module.exports, localRequire)

    return module.exports
  }

  require(0)
})


// The iife get invoked with this object
// under the name `modules`
({
  
  // Each modules is labeled by its ID which is the order in which it was found during the build process
  0: {

    // Each individual module object contains a `factory` key whose value is a function
    // At the time of invocation THE TRUE "BODY" OF THE IIFE will have provided the 
    // factory function with an exports object which in turn belongs to a module object
    // which is present only within the TRUE BODY OF THE IIFE... 
    
    // Additionally... 
    // and this is the weird part, factory is supplied with an IIFE scoped function known as 
    // `require` which is actually the only function that the IIFE has access to 
    // and is within `require` known as localRequire... 
    // It (`require`) accepts an ID let's say 0 (like the module ID *wink wink*)... 
    // The require function then pulls the function `factory`
    // out of the module (let's say 0) it then creates localRequire and sets
    // its body to an inner invocation of require. Note, localRequire is NOT YET invoked, but rather
    // is only declared, additionally and this is where it gets trickier `localRequire` itself
    // accepts a param `requireDeclarationName` which itself will be the ID of a module
    // which the factory function will rely upon (whew).
    
    // Now, that we sort of get what's happening let's take a look at module  and follow it through
    // 
    factory: (exports, require) => {
      "use strict"

      var _m = require("./m1.js")
      var main = function main() {
        return (0, _m.determineCoolness)()
      }
      var result = main()
      console.log("The result of determine coolness was: ".concat(result))
    },

    // map is the key which shows how to "map" a modules "id" to a string which represents its path
    // RELATIVE 
    map: { "./m1.js": 1 },
  },


  1: {
    factory: (exports, require) => {
      "use strict"

      Object.defineProperty(exports, "__esModule", {
        value: true,
      })
      exports.determineCoolness = void 0
      var _m = require("./m2.js")
      var determineCoolness = function determineCoolness() {
        return (0, _m.add)(4, 5)
      }

      // Fix Circulars
      // export const magicNumber = 42
      exports.determineCoolness = determineCoolness
    },
    map: { "./m2.js": 2 },
  },
  2: {
    factory: (exports, require) => {
      "use strict"

      Object.defineProperty(exports, "__esModule", {
        value: true,
      })
      exports.add = void 0
      // Fix circulars...
      // import { magicNumber } from "./m1"

      var add = function add(a, b) {
        return a + b
      }
      exports.add = add
    },
    map: {},
  },
})
