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
})({
  0: {
    factory: (exports, require) => {
      "use strict"

      var _m = require("./m1.js")
      var main = function main() {
        return (0, _m.determineCoolness)()
      }
      var result = main()
      console.log("The result of determine coolness was: ".concat(result))
    },
    map: { "./m1.js": 1 },
  },
  1: {
    factory: (exports, require) => {
      "use strict"

      Object.defineProperty(exports, "__esModule", {
        value: true,
      })
      exports.magicNumber = exports.determineCoolness = void 0
      var _m = require("./m2.js")
      var determineCoolness = function determineCoolness() {
        return (0, _m.add)(4, 5)
      }

      // Circular
      exports.determineCoolness = determineCoolness
      var magicNumber = 1
      exports.magicNumber = magicNumber
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
      var _m = require("./m1")
      // Circular

      var add = function add(a, b) {
        return a + b + _m.magicNumber
      }
      exports.add = add
    },
    map: { "./m1": 1 },
  },
})
