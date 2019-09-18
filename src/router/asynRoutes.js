import Layout from '@/views/layout/Layout'

// 异步路由
const asynRoutesMap = {
  userManage: {
    path: '/userManage',
    redirect: '/userManage/index',
    component: Layout,
    children: [
      {
        path: '/userManage/index',
        name: 'userManageIndex',
        component: () => import(/* webpackChunkName: "userManage" */ '@/views/userManage/index')
      },
      {
        path: '/userManage/create',
        name: 'userManageCreate',
        component: () => import(/* webpackChunkName: "userManage" */ '@/views/userManage/create')
      },
      {
        path: '/userManage/edit/:userId',
        name: 'userManageEdit',
        component: () => import(/* webpackChunkName: "userManage" */ '@/views/userManage/edit')
      }
    ],
    meta: {
      icon: 'user-manage',
      text: '用户管理'
    }
  }
}
export default asynRoutesMap
