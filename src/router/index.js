import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import LoadData from '@/views/loadData/index'
import { quickSort } from '@/utils/utils'
import { getToken } from '@/utils/token'

Vue.use(Router)

const requireFilter = require.context(
  // 指令目录
  '@/router/modules',
  // 不查找子目录
  false,
  // js文件
  /.+\.js$/
)

var routes = []
// 对每个匹配的文件
requireFilter.keys().forEach(fileName => {
  // 请求指令模块
  const filterConfig = requireFilter(fileName)

  routes.push(filterConfig.default || filterConfig)
})

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home/index',
      hidden: true,
      sort: 0
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/index.vue'], resolve),
      hidden: true
    },
    {
      path: '/findPwd',
      name: 'findPwd',
      component: resolve => require(['@/views/findPwd/index.vue'], resolve),
      hidden: true
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/views/register/index.vue'], resolve),
      hidden: true
    },
    ...quickSort(routes),
    {
      path: '/load-data',
      name: 'LoadData',
      meta: {
        text: '加载公共数据中'
      },
      component: LoadData,
      hidden: true,
      sort: 0
    },
    {
      path: '*',
      redirect: '/home/index',
      hidden: true,
      sort: 0
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 白名单：无需合法token可进入
const whiteList = ['/login', '/register', '/findPwd']
function hasPermission (to) {
  let arr = []
  store.getters['init/routes'].forEach(item => {
    item.name && (arr.push(item.name))
    if (item.children) {
      item.children.forEach(child => {
        child.name && (arr.push(child.name))
      })
    }
  })
  return arr.some(item => item === to.name)
}
/*
  - 是否存在token
    - 是
      - 路由指向登录页 next(`/home/index`)
      - 是否已获取路由表
        - 是
          - 获取路由表
            - 成功 next()
            - 失败 next(`/login`)
        - 否
          - 判断路由是否在路由表(静态路由+动态路由)当中
            - 是 next()
            - 否 回到上一个有权限路由或者登录界面
    - 否
      - 是否为白名单
        - 是 next()
        - 否 next(`/login`)
*/
router.beforeEach((to, from, next) => {
  let path = to.path
  if (getToken()) {
    if (path === '/Login') {
      next(`/home`)
      return
    }
    if (!store.getters['init/user'].name) {
      store.dispatch('init/getInitData').then(function () {
        router.addRoutes(store.getters['init/asynRoutes'])
        next({...to, replace: true})
      }).catch(() => {
        // token过期
        store.dispatch('user/logout').then(function () {
          next(`/login`)
        })
      })
    } else {
      if (hasPermission(to)) {
        next()
      } else {
        console.log(from)
        if (from) {
          next({path: from.path})
        } else {
          next(`/login`)
        }
      }
    }
  } else {
    (whiteList.indexOf(to.path) !== -1) ? next() : next(`/login?redirect=${to.path}`)
  }
})
export default router
