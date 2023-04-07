beforeEach(() => {
  jest.resetAllMocks()
})

test('How an IIFE Bundler Works...', () => {
  const modZero = {
    0: {
      factory: (exports, require) => {
        const example = require('./example')
        const result = example.a === 'A'
        console.log(result)
      },
      map: { './example': 1 }
    }
  }

  const modOne = {
    1: {
      factory: (exports, require) => {
        const a = 'A'
        exports.a = a
      },
      map: {}
    }
  }

  // This is where the stringifying magic plays a big hand...
  // Of note: I really hate this...
  const _modules = { 0: modZero[0], 1: modOne[1] }

  const NonIIFEBundler = (modules) => {
    // console.log('modules', modules)

    const require = (id) => {
      // console.log(`You just required module ${id}`)

      const { factory, map } = modules[id]

      // console.log(`The requirements map for module id ${id}:`, map)
      // console.log(`The function body for module id ${id}: ${factory}`)

      // This is the magic!
      const localRequire = (requireDeclarationName) => {
        // Stated in a sentence (or two):
        // localRequire is a function which is a closure for `require` (which we are in right now).
        // The "enclosed" require itself encloses around the `map` property _currently_ in scope
        // and will at execution time be supplied with `requireDeclarationName` which will be the relative
        // path to a dependency of the current module's factory function's body
        return require(map[requireDeclarationName]) // 0 --> 1 --> X
      }

      // An object for the current module to store the things it will end up exporting
      // When inside the factory function body
      const module = { exports: {} }

      // We invoke the factory and GIVE it a place to store its exports
      // and we give it a require function which knows how to recursively call this function
      factory(module.exports, localRequire) // 0 --> 1 --> An object that looks like {a: "A"}

      // We return (from this our recursively called function) the mutated exports object we crated a few lines above.
      return module.exports
    }

    require(0)
  }

  // This is the exact code the IIFE bundler runs
  console.log = jest.fn() // Comment this out when debugging for logging!
  NonIIFEBundler(_modules)
  expect(console.log.mock.calls[0][0]).toBe(true)
})

// Addendum
// See below and compare it to the non-immediate form in the test ` NonIIFEBundler`

// (function(modules){
//     const require = (id) => {
//       const {factory, map} = modules[id];

//       const localRequire = (requireDeclarationName) => require(map[requireDeclarationName]);

//       const module = {exports: {}};

//       factory(module.exports, localRequire);

//       return module.exports;
//     }

//     require(0);
//   })(modules)
