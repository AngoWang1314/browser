import store from '@/store'

export default function (permission = '') {
  let permissionList = store.getters['login/permissionList'] || []
  return permissionList.indexOf(permission) > -1
}
