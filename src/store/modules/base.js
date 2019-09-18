import { Loading } from 'element-ui'

const base = {
  namespaced: true,
  state: {
    loadingInstance: '',
    isCollapseMenu: false,
    language: 'cn'
  },
  getters: {
    isCollapseMenu: state => state.isCollapseMenu,
    language: state => state.language
  },
  mutations: {
    SHOW_LOADING (state, options = {}) {
      const defaultOptions = {
        lock: true,
        text: '加载中',
        spinner: '',
        background: 'rgba(0, 0, 0, 0.7)'
      }

      options = { ...options, ...defaultOptions }

      // 全屏 Loading 不会创建多个实例
      options.fullscreen = true

      state.loadingInstance = Loading.service(options)
    },

    HIDE_LOADING (state) {
      state.loadingInstance && state.loadingInstance.close()
    },

    TOGGLE_COLLAPSE_MENU (state) {
      state.isCollapseMenu = !state.isCollapseMenu
    },

    TOGGLE_LANGUAGE (state) {
      state.language = state.language === 'en' ? 'cn' : 'en'
    }
  },
  actions: {}
}

export default base
