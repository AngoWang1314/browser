<template>
  <div
    class="h100p"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"></div>
</template>
<script>
import { mapActions } from 'vuex'
import { setToken } from '@/utils/token'
import { getQuery } from '@/utils/utils'

export default {
  name: 'LoadData',
  data () {
    return {
      fullscreenLoading: true
    }
  },
  created () {
    this.initToken()
    this.getInitData().then(() => {
      this.fullscreenLoading = false
      this.$router.back()
    })
  },
  methods: {
    ...mapActions('init', ['getInitData']),
    initToken () {
      let querys = getQuery()
      let params = {
        token_code: querys.token_code,
        ref: querys.ref
      }
      setToken(JSON.stringify(params))
    }
  }
}
</script>
<style scoped>
.h100p {
  height: 100%;
}
</style>
