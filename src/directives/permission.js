import hasPermission from '@/utils/hasPermission'

const permissionHandle = (el, {value}) => {
  if (hasPermission(value)) {
    el.classList.remove('hide')
  } else {
    el.classList.add('hide')
  }
}

export default {
  inserted: permissionHandle,
  update: permissionHandle
}
