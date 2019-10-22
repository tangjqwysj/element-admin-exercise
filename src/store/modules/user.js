import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo } from '@/api/user'

const state = {
  token: getToken(),
  name: '',
  roles: [],
  avatar: '',
  introduction: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INTRODUCTION: (state, introdution) => {
    state.introduction = introdution
  }
}

const actions = {
  getInfo: ({ commit }) => {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then((response) => {
        const { data } = response
        if (!data) {
          reject(new Error('Verification failed, please Login again.'))
        }
        const { roles, name, avatar, introduction } = data
        if (!roles || roles.length <= 0) {
          reject(new Error('getInfo: roles must be a non-null array!'))
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch((error) => {
        reject(new Error('user/info promise' + error))
      })
    })
  },
  resetToken: ({ commit }) => {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
  login: ({ commit }, userInfo) => {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password }).then((response) => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch((err) => {
        reject(new Error('login' + err))
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
