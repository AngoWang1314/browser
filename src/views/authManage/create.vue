<template>
  <div class="main-container">
    <div class="main">
      <div class="title">新建权限</div>
      <div class="form">
        <el-form ref="form" :model="form" label-width="120px" label-position="left" size="small">
          <el-form-item label="权限名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="父层权限名称">
            <el-select v-model="form.parentId" placeholder="请选择">
              <el-option
                v-for="item in parentAuths"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限类型">
            <el-radio-group v-model="form.authType">
              <el-radio-button :label="item.id" :disabled="!item.isUsed" v-for="(item, index) in authTypes" :key="index">{{ item.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="请求地址">
            <el-input v-model="form.location"></el-input>
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="form.authSign"></el-input>
          </el-form-item>
          <el-form-item label="连接目标">
            <el-select v-model="form.displayMode" placeholder="请选择">
              <el-option
                v-for="item in displayModes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可见状态">
              <el-radio-group v-model="form.isDisplay">
                <el-radio-button label="true">可见</el-radio-button>
                <el-radio-button label="false">不可见</el-radio-button>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.remark"
              :autosize="{ minRows: 2, maxRows: 4}"
              resize="none">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createAuth()">新建权限</el-button>
            <el-button type="info" @click="cancelAndBack()">取消并返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      form: {
        name: '',
        authType: 'menu',
        parentId: '',
        location: '',
        authSign: '',
        displayMode: '',
        isDisplay: true
      }
    }
  },
  created () {
    // this.getInitData()
  },
  computed: {
    ...mapGetters([
      'authTypes',
      'displayModes',
      'parentAuths'
    ])
  },
  methods: {
    // getInitData () {
    //   this.$store.dispatch('getInitData')
    //   this.$store.dispatch('getParentAuth')
    // },
    createAuth () {
      this.$store.dispatch('createAuth', this.form).then(rs => {
        this.$router.push({path: '/authManage/index'})
      })
    },
    cancelAndBack () {
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/less/base.less';
.el-form-item {
  text-align: left;
}
.el-select {
  width: 100%;
}
</style>