import {
  getUserList,
  createUser,
  getUserDetail,
  updateUser,
  prohibiteUser,
  unusableUser,
  normalUser
} from '@/api/user'

const user = {
  namespaced: true,
  state: {
    list: [],
    totalCount: 0
  },
  getters: {
    list: state => state.list,
    totalCount: state => state.totalCount
  },
  mutations: {
    SET_USER_LIST (state, result) {
      state.list = result.rows
      state.totalCount = result.totalCount
    }
  },
  actions: {
    getList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getUserList(params)
          .then(response => {
            commit('SET_USER_LIST', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    createUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        createUser(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getUserDetail ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getUserDetail(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        updateUser(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    prohibiteUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        prohibiteUser(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    unusableUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        unusableUser(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    normalUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        normalUser(params)
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
