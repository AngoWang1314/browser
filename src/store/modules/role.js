import {
  createRole,
  getRoleList,
  deleteRole,
  getRoleDetail,
  updateRole,
  getRoleAuth,
  configAuth
} from '@/api/role'

const role = {
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
    SET_LIST (state, result) {
      state.list = result.rows
      state.totalCount = result.totalCount
    }
  },
  actions: {
    createRole ({ commit }, params) {
      return new Promise((resolve, reject) => {
        createRole(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getRoleList(params)
          .then(response => {
            commit('SET_LIST', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteRole ({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteRole(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getRoleDetail ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getRoleDetail(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateRole ({ commit }, params) {
      return new Promise((resolve, reject) => {
        updateRole(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getRoleAuth ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getRoleAuth(params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    configAuth ({ commit }, params) {
      return new Promise((resolve, reject) => {
        configAuth(params)
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

export default role
