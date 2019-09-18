<template>
  <transition name="slide-fade">
    <el-menu :default-active="defaultActiveRoute" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapseMenu">
      <router-link
        v-for="(router, index) in _routes"
        :key="index"
        :to="router.path"
      >
        <el-menu-item :index="router.path">
          <svg-icon  :icon-class="router.meta.icon"></svg-icon>
          <span slot="title">{{ router.meta.text }}</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false,
      defaultActiveRoute: ''
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.defaultActiveRoute = route.matched[0].path
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters('base', [
      'isCollapseMenu'
    ]),
    ...mapGetters('init', [
      'routes'
    ]),
    ...mapGetters('login', [
      'permissionList'
    ]),
    _routes () {
      return this.routes.filter(item => {
        // 可见的即为菜单
        // meta 没带 permission 即不需控制
        // meta 带 permission 则需判断
        return item.meta.visible && (!item.meta.permission || this.permissionList.indexOf(item.meta.permission) > -1)
      })
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less">
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.el-menu-vertical {
  background-color: #000C17;
  border: none;
  a {
    text-decoration: none;
  }
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    text-align: left;
    color: #FFF;
    background-color: #001529;
    i {
      color: #FFF;
    }
    &:hover {
      background-color: #1890FF;
    }
  }
  .is-active {
    background-color: #1890FF;
  }
  .svg-icon {
    width: 16px !important;
    height: 16px !important;
    vertical-align: middle !important;
  }
}
</style>
