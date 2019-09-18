import Layout from '@/views/layout/Layout'

export default {
  path: '/userManage',
  redirect: '/userManage/index',
  component: Layout,
  sort: 4,
  children: [
    {
      path: '/userManage/index',
      name: 'userManageIndex',
      component: () =>
        import(/* webpackChunkName: "userManage" */ '@/views/userManage/index')
    },
    {
      path: '/userManage/create',
      name: 'userManageCreate',
      component: () =>
        import(/* webpackChunkName: "userManage" */ '@/views/userManage/create')
    },
    {
      path: '/userManage/edit/:userId',
      name: 'userManageEdit',
      component: () =>
        import(/* webpackChunkName: "userManage" */ '@/views/userManage/edit')
    }
  ],
  meta: {
    icon: 'user-manage',
    text: '用户管理',
    visible: true,
    permission: 'system:userManage:view'
  }
}
