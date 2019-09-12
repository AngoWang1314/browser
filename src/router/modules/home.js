import Layout from '@/views/layout/Layout'

export default {
  path: '/home',
  redirect: '/home/index',
  component: Layout,
  children: [
    {
      path: '/home/index',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/home/index')
    }
  ],
  meta: {
    icon: 'home',
    text: '主页'
  }
}
