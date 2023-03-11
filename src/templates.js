const factoryAndMapObject = (module) => `${module.id}: {
  factory: (exports, require) => {
    ${module.code}
  },
  map: ${JSON.stringify(module.map)}
}`

const iifeBundler = (moduleArgArr) => `(function(modules){
  const require = (id) => {
  const {factory, map} = modules[id];
  const localRequire = (requireDeclarationName) => require(map[requireDeclarationName]); 
  const module = {exports: {}};
  factory(module.exports, localRequire); 
  return module.exports; 
  } 
  require(0);
})({${moduleArgArr.join()}})
`

module.exports = {
  factoryAndMapObject,
  iifeBundler
}
