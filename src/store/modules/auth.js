import {
  getAuthList,
  createAuth,
  deleteAuth,
  getDetail,
  saveEditAuth,
  getAllAuth
} from '@/api/auth'
const auth = {
  namespaced: true,
  state: {
    list: [],
    totalCount: 0,
    allAuth: []
  },
  getters: {
    list: state => state.list,
    totalCount: state => state.totalCount,
    allAuth: state => state.allAuth
  },
  mutations: {
    SET_AUTH_LIST (state, payload) {
      state.list = payload.rows
      state.totalCount = payload.totalCount
    },
    SET_ALL_AUTH (state, payload) {
      state.allAuth = [{id: '0', name: '根目录'}, ...payload]
    }
  },
  actions: {
    getList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getAuthList(params)
          .then(response => {
            commit('SET_AUTH_LIST', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getAllAuth ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getAllAuth(params)
          .then(response => {
            commit('SET_ALL_AUTH', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    createAuth ({ commit }, params) {
      return new Promise((resolve, reject) => {
        createAuth(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteAuth ({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteAuth(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateAuth ({ commit }, params) {
      return new Promise((resolve, reject) => {
        saveEditAuth(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getDetail ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getDetail(params)
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

export default auth
