<template>
  <div class="main-container">
    <div class="main">
      <div class="title">权限详情</div>
      <div class="form">
        <el-form ref="form" :model="form" label-width="120px" label-position="left" size="small">
          <el-form-item label="权限名称">
            <div>{{form.name}}</div>
          </el-form-item>
          <el-form-item label="权限标识">
            <div>{{form.authSign}}</div>
          </el-form-item>
          <el-form-item label="备注">
            <div>{{form.remark}}</div>
          </el-form-item>
        </el-form>
        <el-button type="info" @click="backList()">返回列表</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      authId: 0,
      form: {
        name: '',
        authSign: '',
        remark: ''
      }
    }
  },
  created () {
    this.authId = this.$route.params.authId
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.$store.dispatch('auth/getDetail', {
        id: this.authId
      }).then((data) => {
        this.form = data
      })
    },
    backList () {
      this.$router.push({path: '/authManage/index'})
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/less/main.less';
.el-form-item {
  text-align: right;
  border-bottom: 1px solid #ebeef5;
}
</style>
