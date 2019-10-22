import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const modulesFile = require.context('./modules', true, /\.js$/)
const modules = modulesFile.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFile(modulePath).default
  modules[moduleName] = value
  return modules
}, {})
const store = new Vuex.Store({
  modules,
  getters
})

export default store
