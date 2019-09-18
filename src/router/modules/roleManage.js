import Layout from '@/views/layout/Layout'

export default {
  path: '/roleManage',
  redirect: '/roleManage/index',
  component: Layout,
  sort: 3,
  children: [
    {
      path: '/roleManage/index',
      name: 'roleManageIndex',
      component: () =>
        import(/* webpackChunkName: "roleManage" */ '@/views/roleManage/index')
    },
    {
      path: '/roleManage/create',
      name: 'roleManageCreate',
      component: () =>
        import(/* webpackChunkName: "roleManage" */ '@/views/roleManage/create')
    },
    {
      path: '/roleManage/edit/:roleId',
      name: 'roleManageEdit',
      component: () =>
        import(/* webpackChunkName: "roleManage" */ '@/views/roleManage/edit')
    },
    {
      path: '/roleManage/authConfig/:roleId',
      props: true,
      name: 'roleManageAuthConfig',
      component: () =>
        import(
          /* webpackChunkName: "roleManage" */ '@/views/roleManage/authConfig'
        )
    }
  ],
  meta: {
    icon: 'role-manage',
    text: '角色管理',
    visible: true,
    permission: 'system:roleManage:view'
  }
}
