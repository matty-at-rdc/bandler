const path = require('path')
const bundler = require('../src/index')

beforeEach(() => {
  jest.resetAllMocks()
})

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

test('#pack seems to work', () => {
  const fp = path.resolve(path.join('example-app', 'entry.js'))
  const graph = bundler.createDependencyGraph(fp)
  const bundle = bundler.pack(graph)

  // All our bundle does when invoked is call `console.log` so let's monitor it
  console.log = jest.fn()
  const invocableBundle = new Function(bundle) // eslint-disable-line
  invocableBundle()
  expect(console.log.mock.calls[0][0]).toBe('The result of determine coolness was: 9')
})
