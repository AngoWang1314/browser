<template>
  <div class="main-container">
    <div class="main">
      <div class="title">编辑权限</div>
      <div class="form">
        <el-form ref="form" :model="form" label-width="120px" label-position="left" size="small">
          <el-form-item label="父层权限名称">
            <el-select v-model="form.parentId" placeholder="请选择">
              <el-option
                v-for="item in allAuth"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限名称">
            <el-input v-model="form.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="form.authSign"></el-input>
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
            <el-button type="primary" @click="saveEdit()">保存编辑</el-button>
            <el-button type="info" @click="cancelAndBack()">取消并返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['authId'],
  data () {
    return {
      form: {
        parentId: '',
        name: '',
        authSign: '',
        remark: ''
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['allAuth'])
  },
  created () {
    this.getAllAuth()
    this.authDetail()
  },
  methods: {
    ...mapActions('auth', ['getAllAuth', 'getDetail', 'updateAuth']),
    authDetail () {
      this.getDetail({
        id: this.authId
      }).then((data) => {
        this.form = data
      })
    },
    saveEdit () {
      this.form.id = this.authId
      this.updateAuth(this.form).then(() => {
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
@import '../../styles/less/main.less';
.el-form-item {
  text-align: left;
}
.el-select {
  width: 100%;
}
</style>
