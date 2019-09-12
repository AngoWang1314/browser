export default {
  namespaced: true,
  state: {
    excludeComponents: []
  },
  getters: {
    excludeComponents: state => state.excludeComponents
  },
  mutations: {
    ADD_EXCLUDE_COMPONENT (state, components) {
      // components 可能是组件name字符串或者数组
      let excludeComponents = state.excludeComponents
      if (Array.isArray(components)) {
        state.excludeComponents = [...new Set([...excludeComponents, ...components])]
      } else {
        state.excludeComponents = [...new Set([...excludeComponents, components])]
      }
    },
    DEL_EXCLUDE_COMPONENT (state, components) {
      // components 可能是组件name字符串或者数组
      let excludeComponents = state.excludeComponents
      if (Array.isArray(components)) {
        for (let i = 0; i < components.length; i++) {
          let index = excludeComponents.findIndex(v => v === components[i])
          if (index > -1) {
            excludeComponents.splice(index, 1)
          }
        }
      } else {
        for (let i = 0, len = excludeComponents.length; i < len; i++) {
          if (excludeComponents[i] === components) {
            excludeComponents.splice(i, 1)
            break
          }
        }
      }
      state.excludeComponents = excludeComponents
    }
  }
}
