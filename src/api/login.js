import request from '@/utils/request'
export function userLogin (params) {
  return request({
    url: '/v1/user/login',
    method: 'post',
    data: params
  })
}

export function resetPwd (params) {
  return request({
    url: '/v1/user/resetPwd',
    method: 'post',
    data: params
  })
}
