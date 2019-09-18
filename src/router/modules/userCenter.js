import Layout from '@/views/layout/Layout'

export default {
  path: '/userCenter',
  redirect: '/userCenter/index',
  component: Layout,
  sort: 0,
  children: [
    {
      path: '/userCenter/index',
      name: 'userCenterIndex',
      component: () => import(/* webpackChunkName: "userCenter" */ '@/views/userCenter/index')
    },
    {
      path: '/userCenter/pwd',
      name: 'userCenterPwd',
      component: () => import(/* webpackChunkName: "userCenter" */ '@/views/userCenter/pwd')
    }
  ],
  meta: {
    visible: false
  }
}
