const path = require('path')
const bundler = require('../src/index')

test('#createModuleInfo seems to work', () => {
  const id = 0
  const fp = path.resolve(path.join('example-app', 'entry.js'))
  const result = bundler.createModuleInfo(fp, id)
  expect(result.id).toEqual(0)
  expect(result.deps).toEqual(['./m1.js'])
})

test('#createDependencyGraph seems to work', () => {
  const fp = path.resolve(path.join('example-app', 'entry.js'))
  const graph = bundler.createDependencyGraph(fp)
  expect(graph.length).toEqual(3)
})
