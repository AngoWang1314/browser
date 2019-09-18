<template>
  <div class="main-container">
    <div class="main">
      <div class="title">权限配置</div>
      <div class="form">
        <el-form label-width="0px" label-position="left" size="small">
          <div class="level" v-for="parentAuth in authTree" :key="parentAuth.id">
            <el-checkbox v-model="parentAuth.isChecked">{{parentAuth.name}}</el-checkbox>
            <div class="level-group" v-if="parentAuth.children.length">
                <span v-for="item in parentAuth.children" :key="item.id">
                  <el-checkbox v-model="item.isChecked">{{item.name}}</el-checkbox>
                </span>
            </div>
          </div>
          <div class="action">
            <el-button type="primary" @click="saveEditConfig()">保存配置</el-button>
            <el-button type="info" @click="goBack()">取消并返回</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['roleId'],
  data () {
    return {
      checkAll: false,
      authTree: [],
      checkedAuths: [],
      checked: true
    }
  },
  computed: {
    ...mapGetters('auth', ['allAuth'])
  },
  created () {
    this.roleAuth().then(this.getAuthTree)
  },
  methods: {
    ...mapActions('auth', ['getAllAuth']),
    ...mapActions('role', [
      'getRoleAuth',
      'configAuth'
    ]),
    getAuthTree () {
      this.getAllAuth().then(data => {
        if (data.length) {
          let authTree = []
          for (let i = 0; i < data.length; i++) {
            this.$set(data[i], 'isChecked', false)
            for (let j = 0; j < this.checkedAuths.length; j++) {
              if (this.checkedAuths[j] === data[i].id) {
                data[i].isChecked = true
              }
            }

            if (data[i].parentId === '0') {
              authTree.push(data[i])
            }
          }
          this.authTree = authTree

          for (let i = 0; i < this.authTree.length; i++) {
            this.authTree[i].children = []
            for (let j = 0; j < data.length; j++) {
              if (this.authTree[i].id === data[j].parentId) {
                this.authTree[i].children.push(data[j])
              }
            }
          }
        }
      })
    },
    roleAuth () {
      return this.getRoleAuth({
        roleId: this.roleId
      }).then(rs => {
        for (let i = 0; i < rs.length; i++) {
          if (rs[i].roleId === this.roleId) {
            this.checkedAuths.push(rs[i].authId)
          }
        }
      })
    },
    saveEditConfig () {
      this.$confirm('将进行更改权限配置, 确定继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let array = []
        for (let i = 0; i < this.authTree.length; i++) {
          if (this.authTree[i].isChecked) {
            array.push(this.authTree[i].id)
          }
          for (let j = 0; j < this.authTree[i].children.length; j++) {
            if (this.authTree[i].children[j].isChecked) {
              array.push(this.authTree[i].children[j].id)
            }
          }
        }
        this.configAuth({
          id: this.roleId,
          authIds: array
        }).then(data => {
          this.$message({
            type: 'success',
            message: '更改成功!',
            onClose: this.goBack
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消更改'
        })
      })
    },
    goBack () {
      this.$router.push({path: '/roleManage/index'})
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/less/main.less';
.el-form-item {
  text-align: left;
}
.form {
  text-align: left;
}
.check-all {
  padding-bottom: 15px;
  text-align: left;
}
.level {
  padding: 15px 0;
  border-top: 1px solid #ebeef5;
  .level-group {
    margin-top: 15px;
    .el-checkbox {
      margin: 5px 0;
    }
  }
}
.el-checkbox {
  width: 115px;
  margin: 0;
}
.action {
  margin-top: 5px;
  text-align: center;
}
</style>
