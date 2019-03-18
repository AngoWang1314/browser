<template>
  <div class="main-container">
    <div class="main">
      <div class="title">新建角色</div>
      <div class="form">
        <el-form ref="form" :model="form" :rules="formRules" label-width="80px" label-position="left" size="small">
          <el-form-item label="角色标识" prop="key">
            <el-input v-model="form.key"></el-input>
          </el-form-item>
          <el-form-item label="角色名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="desc">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.desc"
              :autosize="{ minRows: 2, maxRows: 4}"
              resize="none">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createRole()">新建角色</el-button>
            <el-button type="primary" @click="createAndConfig()">新建并配置权限</el-button>
            <el-button type="info" @click="cancelAndBack()">取消并返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    const keyValidator = (rule, value, callback) => {
      var exp = /^[A-Za-z]+$/
      if (!value) {
        callback(new Error('请输入角色标识'))
      } else if (!exp.test(value)) {
        callback(new Error('角色标识只能使用英文字母'))
      } else {
        callback()
      }
    }

    const nameValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入角色名'))
      } else if (value.length > 10) {
        callback(new Error('角色名不能超过10个字'))
      } else {
        callback()
      }
    }

    const descValidator = (rule, value, callback) => {
      if (value && value.length > 50) {
        callback(new Error('角色名不能超过50字'))
      } else {
        callback()
      }
    }

    return {
      form: {
        key: '',
        name: '',
        desc: '',
        createdBy: '-'
      },
      formRules: {
        key: [
          {validator: keyValidator, trigger: 'blur'}
        ],
        name: [
          {validator: nameValidator, trigger: 'blur'}
        ],
        desc: [
          {validator: descValidator, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    createRoleHandler () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$store.dispatch('createRole', this.form).then(() => {
              resolve(this.form)
              return this.form
            }, () => {
              resolve(false)
              return false
            })
          } else {
            resolve(false)
            return false
          }
        })
      })
    },
    createRole () {
      this.createRoleHandler().then(response => {
        this.$router.push({path: '/roleManage/index'})
      })
    },
    createAndConfig () {
      this.createRoleHandler().then(response => {
        if (response) {
          this.cancelAndBack()
        }
      })
    },
    cancelAndBack () {
      this.$router.back(-1)
    },
    editRole () {
      this.$router.push({path: '/roleManage/edit'})
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/less/main.less';
.el-form-item {
  text-align: left;
}
</style>