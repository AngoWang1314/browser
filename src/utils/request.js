import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getItem } from '@/utils/storage'
import {
  baseUrl,
  serviceTimeout,
  retStatusCodeKey,
  retDataKey,
  retMsgKey,
  successStatusCodeValue,
  redirectStatusCodeValue
} from '@/config/api'

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  timeout: serviceTimeout, // 请求超时时间
  withCredentials: true // 跨域
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (!config.isHideLoading) {
      store.commit('base/SHOW_LOADING', {
        loadingText: '努力加载数据中...',
        loadingSpinner: '',
        loadingBackground: 'rgba(0, 0, 0, 0.8)'
      })
    }

    let token = getItem('token')
    if (token) {
      config.headers['X-Token'] = token
    }

    return config
  },
  error => {
    store.commit('base/HIDE_LOADING')
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    store.commit('base/HIDE_LOADING')
    const res = response[retDataKey]
    if (res[retStatusCodeKey] === successStatusCodeValue) {
      return Promise.resolve(res[retDataKey])
    } else if (res[retStatusCodeKey] === redirectStatusCodeValue) {
      Message({
        message: res[retMsgKey],
        type: 'error',
        duration: 2000,
        onClose () {
          // res[retDataKey][redirectURLKey] && (location.href = res[retDataKey][redirectURLKey])
          router.push('/login')
        }
      })
    } else {
      !response.config.isHideMessage && Message({
        message: res[retMsgKey],
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(res[retMsgKey])
    }
  },
  error => {
    store.commit('base/HIDE_LOADING')
    let statusCode = error.response && error.response.status
    let msg = ''
    if (statusCode && typeof statusCode === 'number') {
      if (statusCode > 500) {
        msg = '服务器错误'
      } else if (statusCode > 400) {
        msg = '客户端错误'
      }
    } else {
      msg = error
    }
    Message({
      message: msg,
      type: 'error',
      duration: 2 * 1000,
      onClose  () {
        router.push('/login')
      }
    })
    return Promise.reject(error.response ? error.response.data : error)
  }
)
export default service
