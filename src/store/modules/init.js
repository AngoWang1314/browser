import { getInitData } from '@/api/init'

const init = {
  namespaced: true,
  state: {
    sexes: [],
    authTypes: [],
    displayModes: [],
    status: [],
    sexMap: {},
    authTypeMap: {},
    displayModeMap: {},
    statusMap: {},
    user: {},
    asynRoutes: [],
    routes: []
  },
  getters: {
    routes: state => state.routes,
    user: state => state.user,
    sexes: state => state.sexes,
    sexMap: state => state.sexMap,
    authTypes: state => state.authTypes,
    authTypeMap: state => state.authTypeMap,
    displayModes: state => state.displayModes,
    displayModeMap: state => state.displayModeMap,
    status: state => state.status,
    statusMap: state => state.statusMap
  },
  mutations: {
    SET_INIT_DATA (state, initData) {
      const {
        userInfo,
        sexes,
        authTypes,
        displayModes,
        status
      } = initData

      state.user = userInfo
      state.sexes = sexes
      state.authTypes = authTypes
      state.displayModes = displayModes
      state.status = status

      for (let i = 0; i < sexes.length; i++) {
        state.sexMap[sexes[i].id] = sexes[i].name
      }

      for (let i = 0; i < authTypes.length; i++) {
        state.authTypeMap[authTypes[i].id] = authTypes[i].name
      }

      for (let i = 0; i < displayModes.length; i++) {
        state.displayModeMap[displayModes[i].id] = displayModes[i].name
      }

      for (let i = 0; i < status.length; i++) {
        state.statusMap[status[i].id] = status[i].name
      }
    },
    SET_ROUTES (state, payload) {
      state.routes = payload
    }
  },
  actions: {
    getInitData ({ commit }) {
      return new Promise((resolve, reject) => {
        getInitData()
          .then(response => {
            commit('SET_INIT_DATA', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    setRoutes ({ commit }, params) {
      commit('SET_ROUTES', params)
    }
  }
}

export default init
