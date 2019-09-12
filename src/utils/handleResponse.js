import { Message } from 'element-ui'
import {
  retStatusCodeKey,
  retDataKey,
  retMsgKey,
  redirectURLKey,
  successStatusCodeValue,
  redirectStatusCodeValue
} from '@/config/api'

/**
 * 处理接口返回数据
 * @param {object} res {ok: 0, data: {}, msg: ''}
 */
export function handleResponse (res) {
  return new Promise((resolve, reject) => {
    if (res[retStatusCodeKey] === successStatusCodeValue) {
      resolve(res[retDataKey])
    } else if (res[retStatusCodeKey] === redirectStatusCodeValue) {
      Message({
        message: res[retMsgKey],
        type: 'error',
        duration: 2 * 1000,
        onClose: () => {
          res[retDataKey][redirectURLKey] && (location.href = res[retDataKey][redirectURLKey])
        }
      })
      reject(res[retMsgKey])
    } else {
      Message({
        message: res[retMsgKey],
        type: 'error',
        duration: 2 * 1000
      })
      reject(res[retMsgKey])
    }
  })
}
