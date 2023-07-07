const fs = require('fs')
const path = require('path')
const resolve = require('resolve').sync

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const templates = require('./templates.js')

const getFileContents = (fp) => {
  const UTF8 = 'utf-8'
  const content = fs.readFileSync(fp, UTF8)
  return content
}

const createASTFromText = (content) => {
  const parseOpts = { sourceType: 'module' }
  const ast = parser.parse(content, parseOpts)
  return ast
}

const extractDependenciesFromAST = (ast) => {
  const deps = []
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      // console.log(`Node: ${JSON.stringify(node, null, 2)}\n\n`)
      // console.log(`Node Source: ${JSON.stringify(node.source, null, 2)}\n\n`)
      // console.log(`Node Source Value: ${JSON.stringify(node.source, null, 2)}\n\n`)
      deps.push(node.source.value)
    }
  })
  return deps
}

const generateCodeFromAST = (ast) => {
  const transformOpts = { presets: ['@babel/preset-env'] }
  const { code } = babel.transformFromAstSync(ast, null, transformOpts)
  return code
}

const createModuleInfo = (fp, id) => {
  // Gets a file's content as UTF8 text
  const content = getFileContents(fp)
  // console.log(`Content:\n${content}\n==========\n`)

  // Create the Abstract Syntax Tree (ast)
  const ast = createASTFromText(content)
  // console.log(`AST: ${JSON.stringify(ast, null, 2)}\n==========\n`)

  // Create a list of just dependencies listed in the file
  const deps = extractDependenciesFromAST(ast)
  // console.log(`Dependencies for ID ${id}:\n${JSON.stringify(deps, null, 2)}\n==========\n`)

  // Create transpiled code from AST
  const code = generateCodeFromAST(ast)
  // console.log(`Transformed code:\n${code}\n==========\n`)

  // Return the provided id, fullpath to the file,
  // the extracted array of deps, and the stringified
  // version of the source code from the file.
  return { id, fp, deps, code }
}



const createDependencyGraph = (entry) => {
  let id = 0
  const entryInfo = createModuleInfo(entry, id)

  const graphArray = [entryInfo]
  // This is a for loop over an array whose length will change
  for (const module of graphArray) {
    module.map = {}
    module.deps.forEach((depPath) => {
      const moduleDepPath = resolve(depPath, { basedir: path.dirname(module.fp) })
      const moduleInfo = createModuleInfo(moduleDepPath, ++id)
      graphArray.push(moduleInfo)
      module.map[depPath] = moduleInfo.id
    })
  }

  console.log(graphArray)

  return graphArray
}

const pack = (graph) => {
  const moduleArgArr = graph.map((module) => templates.factoryAndMapObject(module))
  const bundle = templates.iifeBundler(moduleArgArr)
  return bundle
}

module.exports = {
  createModuleInfo,
  createDependencyGraph,
  pack
}


// Aside
// Here some was some work I tried to do to begin working against circular dependencies making the program hang for forever



// const graphArrayCircularDependencyAlreadySatisfied = (graphArray, fp1, fp2) => {
//   const fp1Found = graphArray.find(_module => _module.fp === fp1)
//   const fp2Found = graphArray.find(_module => _module.fp === fp2)
//   if (fp1Found && fp2Found) {
//     return true
//   }
// }



// The section is inside the module.deps.forEach loop
// if (graphArray.length > 999) {
//   console.error('Graph too large exiting 1')
//   process.exit(1)
// }

// if (graphArrayCircularDependencyAlreadySatisfied(graphArray, module.fp, moduleInfo.fp)) {
//   console.warn(`WARN: module ${module.fp} and ${moduleInfo.fp} both already exist in the graph potential unsupported circular dependency. Not pushing another node into the graph, but runtime state is at risk`)
//   const _m = graphArray.find(_module => _module.fp === moduleInfo.fp)
//   module.map[depPath] = _m.id
// } else {
//   graphArray.push(moduleInfo)
//   module.map[depPath] = moduleInfo.id
// }