import { createRole, getRoleList, deleteRole, getRoleDetail, updateRole, getRoleAuth, configAuth } from '@/api/role'
const role = {
  state: {
    roleList: [],
    roleTotalCount: 0
  },
  mutations: {
    SET_ROLE_LIST (state, result) {
      state.roleList = result.rows
      state.roleTotalCount = result.totalCount
    }
  },
  actions: {
    createRole ({commit}, params) {
      return new Promise((resolve, reject) => {
        createRole(params).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRoleList ({commit}, params) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLE_LIST', {
          rows: [
            {
              createdAt: 1546998704524,
              createdBy: '-',
              desc: '测试用',
              id: '5c3553b054539e2a7026b69d',
              key: 'admin',
              name: '管理员'
            }, {
              createdAt: 1547628597766,
              createdBy: '-',
              desc: 'aa',
              id: '5c3553b054539e2a7026b69d',
              key: 'aa',
              name: 'cc'
            }
          ],
          totalCount: 2
        })
        // getRoleList(params).then((response) => {
        //   commit('SET_ROLE_LIST', response)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    deleteRole ({commit}, params) {
      return new Promise((resolve, reject) => {
        deleteRole(params).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRoleDetail ({commit}, params) {
      return new Promise((resolve, reject) => {
        getRoleDetail(params).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateRole ({commit}, params) {
      return new Promise((resolve, reject) => {
        updateRole(params).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRoleAuth ({commit}, params) {
      return new Promise((resolve, reject) => {
        getRoleAuth(params).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    configAuth ({commit}, params) {
      return new Promise((resolve, reject) => {
        configAuth(params).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default role