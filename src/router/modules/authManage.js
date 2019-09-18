import Layout from '@/views/layout/Layout'

export default {
  path: '/authManage',
  redirect: '/authManage/index',
  component: Layout,
  sort: 2,
  children: [
    {
      path: '/authManage/index',
      name: 'authManageIndex',
      component: () =>
        import(/* webpackChunkName: "authManage" */ '@/views/authManage/index')
    },
    {
      path: '/authManage/create',
      name: 'authManageCreate',
      component: () =>
        import(/* webpackChunkName: "authManage" */ '@/views/authManage/create')
    },
    {
      path: '/authManage/edit/:authId',
      name: 'authManageEdit',
      props: true,
      component: () =>
        import(/* webpackChunkName: "authManage" */ '@/views/authManage/edit')
    },
    {
      path: '/authManage/detail/:authId',
      name: 'authManageDetail',
      component: () =>
        import(/* webpackChunkName: "authManage" */ '@/views/authManage/detail')
    }
  ],
  meta: {
    icon: 'auth-manage',
    text: '权限管理',
    visible: true,
    permission: 'system:authManage:index'
  }
}
