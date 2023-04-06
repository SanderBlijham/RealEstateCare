const componentFiles = import.meta.glob('./src/components/base/*.vue')

const components = {}

for (const path in componentFiles) {
  const componentName = path.match(/\/([\w-]+)\.vue$/)[1]
  components[componentName] = import(`./components/base/${componentName}.vue`)
    .then(module => module.default)
}

export default {
  install: base => {
    for (const name in components) {
      base.component(name, components[name])
    }
  }
}
