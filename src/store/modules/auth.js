import { getAuthList, getParentAuth, createAuth, deleteAuth, getDetail, saveEditAuth, getAllAuth } from '@/api/auth'
const auth = {
  state: {
    authList: [],
    authTotalCount: 0,
    parentAuths: [],
    parentAuthMap: {}
  },
  mutations: {
    SET_AUTH_LIST (state, result) {
      state.authList = result.rows
      state.authTotalCount = result.totalCount
    },
    SET_PARENT_AUTH (state, result) {
      result.unshift({id: 0, name: '无'})
      state.parentAuths = result

      for (let i = 0; i < state.parentAuths.length; i++) {
        state.parentAuthMap[state.parentAuths[i].id] = state.parentAuths[i].name
      }
    }
  },
  actions: {
    getAuthList ({commit}, params) {
      return new Promise((resolve, reject) => {
        commit('SET_AUTH_LIST', {
          rows: [
            {
              authSign: 'system:home:view',
              authType: 'menu',
              id: '5c3c54f286885e2788b43fd2',
              isDisplay: true,
              location: '#/home/index',
              name: '主页',
              remark: '均有权限'
            },
            {
              authSign: 'system:userManage:view',
              authType: 'menu',
              id: '5c3da5d2671ac11a741d56b6',
              isDisplay: true,
              location: '#/userManage/index',
              name: '用户管理'
            },
            {
              authSign: 'system:roleManage:view',
              authType: 'menu',
              id: '5c3da64a671ac11a741d56b7',
              isDisplay: true,
              location: '#/roleManage/index',
              name: '角色管理'
            },
            {
              authSign: 'system:authManage:index',
              authType: 'menu',
              id: '5c3da85c671ac11a741d56b8',
              isDisplay: true,
              location: '#/authManage/index',
              name: '权限管理'
            },
            {
              authSign: 'system:userManage:create',
              authType: 'button',
              id: '5c3dac40671ac11a741d56b9',
              isDisplay: true,
              location: '#/userManage/create',
              name: '新建用户'
            },
            {
              authSign: 'system:userManage:edit',
              authType: 'button',
              id: '5c3e8ea2aa6d031f90bfcf43',
              isDisplay: true,
              location: '#/userManage/edit',
              name: '编辑用户'
            },
            {
              authSign: 'system:userManage:resetPwd',
              authType: 'button',
              id: '5c3e91dcaa6d031f90bfcf45',
              isDisplay: true,
              location: '#/userManage/index',
              name: '重置密码'
            },
            {
              authSign: 'system:userManage:index',
              authType: 'button',
              id: '5c3e9340aa6d031f90bfcf46',
              isDisplay: true,
              location: '#/userManage/index',
              name: '停用用户'
            },
            {
              authSign: 'system:userManage:prohibite',
              authType: 'button',
              id: '5c3e966caa6d031f90bfcf47',
              isDisplay: true,
              location: '#/userManage/index',
              name: '禁用账号'
            },
            {
              authSign: 'system:roleManage:create',
              authType: 'button',
              id: '5c3e96cbaa6d031f90bfcf48',
              isDisplay: true,
              location: '#/roleManage/create',
              name: '新建角色'
            }
          ],
          totalCount: 12
        })
        // getAuthList(params).then(response => {
        //   commit('SET_AUTH_LIST', response)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    getAllAuth ({commit}, params) {
      return new Promise((resolve, reject) => {
        getAllAuth(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getParentAuth ({commit}) {
      return new Promise((resolve, reject) => {
        getParentAuth().then(response => {
          commit('SET_PARENT_AUTH', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    createAuth ({commit}, params) {
      return new Promise((resolve, reject) => {
        createAuth(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteAuth ({commit}, params) {
      return new Promise((resolve, reject) => {
        deleteAuth(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getDetail ({commit}, params) {
      return new Promise((resolve, reject) => {
        getDetail(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    saveEditAuth ({commit}, params) {
      return new Promise((resolve, reject) => {
        saveEditAuth(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default auth