// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import VueI18n from 'vue-i18n'
import LangEn from '@/lang/en'
import LangCn from '@/lang/cn'
import '@/mock/index'

// 引入element-ui
import '@/plugins/element'

// 样式重置
import 'normalize.css/normalize.css'
import '@/styles/tool.css'
import '@/styles/iconfont/iconfont.css'

import App from '@/App'
import router from '@/router'

// 全局注册
import '@/utils/golbalRegister'

// import vuex
import store from '@/store'

// svg
import '@/icons/index'

Vue.use(VueI18n)
Vue.config.productionTip = false

const i18n = {
  locale: 'cn',
  messages: {
    cn: LangCn,
    en: LangEn
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
