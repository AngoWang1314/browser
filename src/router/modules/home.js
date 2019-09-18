import Layout from '@/views/layout/Layout'

export default {
  path: '/home',
  redirect: '/home/index',
  component: Layout,
  sort: 1,
  children: [
    {
      path: '/home/index',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/home/index')
    }
  ],
  meta: {
    icon: 'home',
    text: '主页',
    visible: true,
    permission: 'system:home:view'
  }
}
