import { constantRoutes, asyncRoutes } from '@/router'
import cloneDeep from 'lodash/cloneDeep'

const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  }
  return true
}

const filterAsyncRoutes = (routes, roles) => {
  let ret = []
  routes.forEach((route) => {
    let temp = cloneDeep(route)
    if (hasPermission(roles, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, roles)
      }
      ret.push(temp)
    }
  })
  return ret
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generatorRoutes: ({ commit }, roles) => {
    return new Promise((resolve) => {
      let accessRoutes
      if (roles.includes('admin')) {
        accessRoutes = asyncRoutes || []
      } else {
        accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }

      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
