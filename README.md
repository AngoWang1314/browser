# npm installation

由于安装 pathoform 经常失败，所以加了这个下载命令

# vue-backstage

> 基于vue的后台项目，涉及技术栈：vuex vue-router elementUI axios mockjs等

### 依赖包
#### 安装[elementUI](http://element-cn.eleme.io/#/zh-CN)
```bash
npm install element-ui -S
```
**`main.js`**引入

```javascript
import elementUI from 'element-ui'
Vue.use(elementUI, {size: 'mini'})
```



#### 安装[normalize.css](http://necolas.github.io/normalize.css/)
```bash
npm install normalize.css -S
```

**`main.js`**引入

```javascript
import 'normalize.css/normalize.css'
```



#### 安装[svg-sprite-loader](https://www.npmjs.com/package/svg-sprite-loader)
```bash
npm install svg-sprite-loader -S
```

* 新建文件夹`icons-svg`存放svg资源
* 新建文件`icons-index.js`引入模块
* 新建组件`components-Base-SvgIcon.vue`定义svg组件
* 添加并修改配置`webpack.base.conf.js`

```javascript
{
	test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	loader: 'url-loader',
	exclude: [resolve('src/icons')],
	options: {
		limit: 10000,
		name: utils.assetsPath('img/[name].[hash:7].[ext]')
	}
},
{
	test: /\.svg$/,
	loader: 'svg-sprite-loader',
	include: [resolve('src/icons')],
	options: {
		symbolId: 'icon-[name]'
	}
}
```



#### 安装[less](http://lesscss.cn/)

```bash
npm install less less-loader --save-dev
```

**`webpack.base.conf.js`**

```
{
   test: /\.less$/,
   loader: "style-loader!css-loader!less-loader"
}
```



#### 安装[vuex](https://vuex.vuejs.org/zh-cn/)
```bash
npm install vuex --save
```

* 新建`store-index.js`,`store-getters.js`,`store-modules`文件和目录
* `store-index.js`创建实例
* `store-getters.js`vuex的getters集合
* `store-modules`vuex模块化
* `main.js`引入实例，在vue实例中加入配置



#### 安装[axios](https://www.kancloud.cn/yunye/axios/234845)

```bash
npm install axios -S
```
* 新建`utils/request.js`拦截器，对请求响应做拦截处理
* 相关配置在`config/api.js`文件中
* `api-xx.js`为具体请求



#### 安装工具库[lodash](https://www.lodashjs.com/)

```bash
npm i --save lodash
```



#### 安装vue-i18n，实现语言切换

```bash
npm i vue-i18n
```



### 路由

* 登录页 - /login
* 找回密码页 - /forgetPwd
* 注册页 - /register
* 主页 - /home
* 个人中心 - /userCenter
* 用户列表 - /userManage
* 角色列表 - /roleManage
* 权限列表 - /authManage



### 源码目录介绍

* api                   **存放api接口**

* assets              **存放图片资源**
* components   **`/base`下为全局组件，局部组件按需在页面中引入**
* config               **关于请求相关的配置文件**

* directives         **存放指令，已全局引入**
* filters                **存放过滤器，已全局引入**

* icons                 **svg的icon存放**

* lang                   **根据语言，将信息保存为不同的 json对象**
* mock                 **模拟数据**
* router                **路由的定义与处理**
* store                  **vuex状态管理**

* styles                 **存放样式**

* utils                    **工具类文件**

* views                  **存放页面**



### utils目录详情

* `golbalRegister.js`：**全局定义**公共组件`components/base`、指令`directives`、过滤器`filters`
* `request.js`：定义**请求拦截器**和**响应拦截器**，添加对响应状态码的判断，来决定是跳转到登录页面还是留在当前页面继续获取数据

* `token.js`：定义对token的读取、写入和移除的方法
* `validators.js`：自定义验证器，可配合表单校验，或者格式校验等



### 路由配置文件

1. `router/index.js`定义路由列表`staticRoutes`、白名单`whiteList`和实例，通过`vue-router beforeEach`钩子结合token判断限制路由跳转

   路由懒加载

   ```
   component: resolve => require(['@/views/login/index.vue'], resolve)
   ```



2. router实例在`main.js`中注入

   ```
   new Vue({
     el: '#app',
     i18n,
     router,
     store,
     components: { App },
     template: '<App/>'
   })
   ```




### 数据模拟&API接入

1. 安装Mock.js

```bash
npm install mockjs --save-dev
```


2. mock/*.js编写模拟数据   [官网示例传送](http://mockjs.com/examples.html#Helper)

```javascript
import Mock from 'mockjs'
const Random = Mock.Random
const initData = () => {
  return {
    userInfo: {
      name: Random.cname(),
      id: Random.id()
    }
  }
}
```



3. mock/index.js拦截请求，返回对应模拟数据



### 前端跨域问题

`config/index.js`中`proxyTable`添加代理配置

```javascript
proxyTable: {
    '/v1': {
        target: 'http://localhost:3000',
        changeOrigin: true, // 允许跨域
        pathRewrite:{
            '^/v1':'/v1'
        }
    }
}
```
配置后，axios就不需再设置baseURL了 （config/api.js）



### vuex状态管理

`store/index.js`新建store实例

```javascript
const store = new vuex.Store({
  modules: modules,
  getters: getters
})
```

`main.js`注入实例store

```
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
```

`store/getters.js`存放store的计算属性

`store/modules`下存放各模块的状态，避免应用复杂带来臃肿

>  mutations处理同步事务，actions处理异步事务
>
> actions通过commit来变更状态

```
const auth = {
    state: {
        list: []
    },
    mutations: {
        SET_AUTH_LIST (state, responese) {
            state.list = responese.rows
        }
    },
    actions: {
        getList ({commit}, params) {
            // 异步请求得到response
            commit('SET_AUTH_LIST', response)
        }
    }
}
```



# 权限管理

分权限，角色，用户三个模块。权限有父子级关系，方便角色管理配置权限时区分各个页面的功能模块。角色可配置多个权限，用户可配置多个角色。菜单不考虑可定制化的情况，但是遇到有这种需求，可增加菜单管理模块来实现。

# element ui 按需引入

由于组件使用率不一，大多数情况下，在 main.js 里全部引入的方式是没必要的。而在每个页面单独引入的方式，虽然能保证最大限度减少包的大小，但是在繁琐。折中方案是，凡页面中用到的 elementUI 组件，都在 plugins 下的 element.js 中引入。

# dll 加速打包进程

在 webpack.dll.config.js 中配置了项目中常用的库，然后打包成 vender.js，后续打包过程就会略去以下的库，加速打包过程

```
  entry: {
    // 定义程序中打包公共文件的入口文件vendor.js
    vendor: ['vue', 'vuex', 'axios', 'vue-router']
  }
```


# store 模块

store 设 modules，分模块管理数据，每个模块都需设置 namespaced 为 true，使用时都需带上命名空间。
```
  computed: {
    ...mapGetters('role', ['list'])
  },
  methods: {
    ...mapActions('role', ['getList'])
  }
  this.list
  this.getList(params)

  // 或者
  this.$store.getters['role/list']
  this.$store.dispatch('role/getList', params)
```


# router 模块

router 也设 modules，按菜单分多个文件管理路由，多人同时开发减少冲突，然后公用的路由集中放在 index.js 下管理。token，权限，公共数据的获取，都在路由守卫钩子里统一实现。三者优先级：token > 权限 > 公共数据获取。为获取 token，需先登录。登录完，meta 设置了 permission 的路由，进入前需要判断是否有权限。进入后，发现为获取公共数据，则会跳转到 LoadData 获取完数据在跳回原来的路由。



# 页面中权限控制

## v-permission
```
  <el-button
    class="fr"
    type="primary"
    icon="el-icon-plus"
    v-permission="'system:authManage:create'"
    @click="createAuth()">新建权限</el-button>
```

## this.$permission

```
  {
    hasPermission () {
      // 通过方法 $permission 判断是否拥有权限
      return this.$permission(['system:authManage:create'])
    }
  }
```
