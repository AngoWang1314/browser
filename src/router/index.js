import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import LoadData from '@/views/loadData/index'
import { quickSort } from '@/utils/utils'
import { Message } from 'element-ui'

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

routes = quickSort(routes)

store.dispatch('init/setRoutes', routes)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: '/home/index',
      visible: true,
      sort: 0 // 0 表示无需排序
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/views/login/index.vue'], resolve),
      visible: true,
      sort: 0
    },
    {
      path: '/findPwd',
      name: 'FindPwd',
      component: resolve => require(['@/views/findPwd/index.vue'], resolve),
      visible: true,
      sort: 0
    },
    {
      path: '/register',
      name: 'Register',
      component: resolve => require(['@/views/register/index.vue'], resolve),
      visible: true,
      sort: 0
    },
    ...routes,
    {
      path: '/load-data',
      name: 'LoadData',
      meta: {
        text: '加载公共数据中'
      },
      component: LoadData,
      visible: true,
      sort: 0
    },
    {
      path: '*',
      redirect: '/',
      visible: true,
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

/*
  - 是否存在token
    - 是
      - 路由指向登录页 next(`/home/index`)
      - 是否已获取公用初始数据
        - 是
          - 成功 next()
        - 否
          - 判断路由是否在路由表(静态路由+动态路由)当中
            - 是 next()
            - 否 回到上一个有权限路由或者登录界面
    - 否
      - 是否为白名单
        - 是 next()
        - 否 next(`/login`)
*/
router.beforeEach(async (to, from, next) => {
  to.meta.text && (document.title = to.meta.text)

  if (store.getters['login/token']) {
    console.log('has token')
    if (to.name === 'Login') {
      console.log('to login ==> to root')
      next({name: 'Root'})
      return
    }

    const { permission } = to.meta
    if (permission) {
      console.log('need permission')
      const permissionList = store.getters['login/permissionList']
      if (permissionList && permissionList.indexOf(permission) === -1) {
        console.log('unauthorized')
        Message.error('无权限访问此页面，请重新登录')
        await store.dispatch('login/logout')
        next({name: 'Login'})
      }
    }

    let noInitData = !store.getters['init/user'].name
    let whiteList = ['LoadData']
    if (whiteList.indexOf(to.name) === -1 && noInitData) {
      console.log('no init data')
      next({name: 'LoadData'})
    } else {
      console.log('no problem')
      next()
    }
  } else {
    let whiteList = ['Login', 'Register', 'FindPwd']

    if (whiteList.indexOf(to.name) > -1) {
      console.log('login register findpwd')
      next()
    } else {
      console.log('not whitelist ==> login')
      next({name: 'Login', query: {redirect: to.path}})
    }
  }
})
export default router
