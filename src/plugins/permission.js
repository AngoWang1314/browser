import hasPermission from '@/utils/hasPermission'

// 命名和指令 v-permission 统一
export default {
  install (Vue) {
    Vue.prototype.$permission = function (permissions) {
      return hasPermission(permissions)
    }
  }
}
