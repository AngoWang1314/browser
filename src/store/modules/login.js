import {
  userLogin,
  resetPwd
} from '@/api/login'

import * as storage from '@/utils/storage'

const user = {
  namespaced: true,
  state: {
    token: storage.getItem('token'),
    permissionList: storage.getItem('permissionList') || []
  },
  getters: {
    token: state => state.token,
    permissionList: state => state.permissionList
  },
  mutations: {
    SET_TOKEN (state, payload) {
      state.token = payload.token
      storage.setItem('token', payload.token)
    },
    SET_PERMISSION (state, payload) {
      state.permissionList = payload.permissionList
      storage.setItem('permissionList', payload.permissionList)
    },
    REMOVE_TOKEN (state) {
      state.token = ''
      storage.removeItem('token')
    },
    REMOVE_PERMISSION (state) {
      state.permissionList = []
      storage.removeItem('permissionList')
    }
  },
  actions: {
    login ({ commit }, params) {
      return new Promise((resolve, reject) => {
        userLogin(params)
          .then(response => {
            commit('SET_TOKEN', response)
            commit('SET_PERMISSION', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout ({ commit }) {
      return new Promise(resolve => {
        commit('REMOVE_TOKEN')
        commit('REMOVE_PERMISSION')
        resolve({})
      })
    },
    resetPwd ({ commit }, params) {
      return new Promise((resolve, reject) => {
        resetPwd(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
