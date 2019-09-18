import Mock from 'mockjs'
import { isSimulateData, baseUrl } from '@/config/api'
import loginAPI from './login'
import userAPI from './user'
import initAPI from './init'
import authAPI from './auth'
import roleAPI from './role'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

function returnResult (data) {
  return () => {
    return {
      ok: 0,
      msg: '操作成功',
      data: typeof data === 'function' ? data() : data
    }
  }
}
if (isSimulateData) {
  Mock.mock(RegExp(baseUrl + '/v1/init/data' + '.*'), 'get', returnResult(initAPI.getInitData))
  Mock.mock(RegExp(baseUrl + '/v1/user/login' + '.*'), 'post', returnResult(loginAPI.userLogin))
  Mock.mock(RegExp(baseUrl + '/v1/user/logout'), 'post', returnResult())
  Mock.mock(RegExp(baseUrl + '/v1/user/list' + '.*'), 'get', returnResult(userAPI.getUserList))
  Mock.mock(RegExp(baseUrl + '/v1/user/detail' + '.*'), 'post', returnResult(userAPI.getUserDetail))
  Mock.mock(RegExp(baseUrl + '/v1/user/create' + '.*'), 'post', returnResult())
  Mock.mock(RegExp(baseUrl + '/v1/user/edit' + '.*'), 'post', returnResult())
  Mock.mock(RegExp(baseUrl + '/v1/user/delete' + '.*'), 'post', returnResult())
  Mock.mock(RegExp(baseUrl + '/v1/user/prohibite'), 'post', returnResult())
  Mock.mock(RegExp(baseUrl + '/v1/user/normal'), 'post', returnResult())
  Mock.mock(RegExp(baseUrl + '/v1/user/unusable'), 'post', returnResult())
  Mock.mock(RegExp(baseUrl + '/v1/user/resetPwd'), 'post', returnResult())
  Mock.mock(RegExp(baseUrl + '/v1/auth/list' + '.*'), 'get', returnResult(authAPI.getAuthList))
  Mock.mock(RegExp(baseUrl + '/v1/auth/delete'), 'post', returnResult())
  Mock.mock(RegExp(baseUrl + '/v1/auth/update'), 'post', returnResult())
  Mock.mock(RegExp(baseUrl + '/v1/auth/create'), 'post', returnResult())
  Mock.mock(RegExp(baseUrl + '/v1/auth/all' + '.*'), 'get', returnResult(authAPI.getAuthAll))
  Mock.mock(RegExp(baseUrl + '/v1/auth/detail' + '.*'), 'post', returnResult(authAPI.getAuthDetail))
  Mock.mock(RegExp(baseUrl + '/v1/role/list' + '.*'), 'get', returnResult(roleAPI.getRoleList))
  Mock.mock(RegExp(baseUrl + '/v1/role/detail' + '.*'), 'post', returnResult(roleAPI.getRoleDetail))
  Mock.mock(RegExp(baseUrl + '/v1/role/roleAuth' + '.*'), 'get', returnResult(roleAPI.getRoleAuth))
  Mock.mock(RegExp(baseUrl + '/v1/role/delete'), 'post', returnResult())
  Mock.mock(RegExp(baseUrl + '/v1/role/configAuth'), 'post', returnResult())
}
export default Mock
