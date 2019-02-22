import { getUserList, createUser, getUserDetail, updateUser, prohibiteUser, unusableUser, normalUser, resetPwd } from '@/api/user'
const user = {
  state: {
    userList: [],
    userTotalCount: 0
  },
  mutations: {
    SET_USER_LIST (state, result) {
      state.userList = result.rows
      state.userTotalCount = result.totalCount
    }
  },
  actions: {
    getUserList ({commit}, params) {
      return new Promise((resolve, reject) => {
        commit('SET_USER_LIST', {
          rows: [
            {
              email: '1010136336@qq.com',
              id: '5c3858c135f2bf29984dc868',
              mobile: '13560472222',
              remark: '',
              sex: 'male',
              status: 'unusable',
              username: '刘灿融'
            }, {
              email: '13560475555@qq.com',
              id: '5c4690fbcc000b261c1c13d4',
              mobile: '13560475555',
              remark: '',
              sex: 'male',
              status: 'normal',
              username: 'aa'
            }, {
              email: '13560475556@qq.com',
              id: '5c46b697f591e01648886102',
              mobile: '13560475556',
              remark: '',
              sex: 'female',
              status: 'normal',
              username: 'aa'
            }
          ],
          totalCount: 3
        })
        // getUserList(params).then(response => {
        //   commit('SET_USER_LIST', response)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    createUser ({commit}, params) {
      return new Promise((resolve, reject) => {
        createUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserDetail ({commit}, params) {
      return new Promise((resolve, reject) => {
        getUserDetail(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateUser ({commit}, params) {
      return new Promise((resolve, reject) => {
        updateUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    prohibiteUser ({commit}, params) {
      return new Promise((resolve, reject) => {
        prohibiteUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    unusableUser ({commit}, params) {
      return new Promise((resolve, reject) => {
        unusableUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    normalUser ({commit}, params) {
      return new Promise((resolve, reject) => {
        normalUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    resetPwd ({commit}, params) {
      return new Promise((resolve, reject) => {
        resetPwd(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user