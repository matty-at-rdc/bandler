const fs = require('fs')
const path = require("path")
const bundler = require('./src/index.js')

const args = process.argv.slice(2)

if (!args.length) {
    process.exit(1)
}

const p = '/Users/matt.cale/Desktop/Code/personal/javascript/bandler/example-app/entry.js'
const graph = bundler.createDependencyGraph(p)
const bundle = bundler.pack(graph)

const outFile = "bundle.js"
const out = path.join("build", outFile)
fs.writeFile(out, bundle, () => {
    console.log(`Wrote bundle to ${out}`)
})