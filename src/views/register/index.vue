<template>
  <div class="outside-container">
    <div class="main">
      <el-form ref="form" :model="form" :rules="formRules" size="large">
        <el-form-item class="title-wrapper">
          <div class="title">
            <img class="ib vam" src="http://temp.im/142x142" alt="">
            <span class="ib vam">注 册 账 号</span>
          </div>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            placeholder="请输入账号/手机/邮箱"
            v-model="form.username">
            <template slot="prepend">
              <span class="iconfont icon-user"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入登录密码"
            v-model="form.password">
            <template slot="prepend">
              <span class="iconfont icon-pwd"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="comfirmPassword">
          <el-input
            placeholder="请再次输入登录密码"
            v-model="form.comfirmPassword">
            <template slot="prepend">
              <span class="iconfont icon-pwd"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-input
              placeholder="请输入图形验证码"
              v-model="form.code"
              @keyup.enter.native="register">
              <template slot="prepend">
                <span class="iconfont icon-code"></span>
              </template>
              <div slot="append" class="ib vam">
                <div class="validate-code">
                  <validate-code
                    :true-code="code"
                    :config="codeConfig"
                    @on-code-change="codeChange"></validate-code>
                </div>
              </div>
            </el-input>
        </el-form-item>
        <el-form-item class="item-wrapper">
          <el-button type="primary" class="full-btn" @click="register" :loading="flag.isLogin">{{ flag.isLogin ? '正 在 登 录 ...' : '注 册' }}</el-button>
        </el-form-item>
        <el-form-item class="item-wrapper">
          <div class="login">已经有账号？<span @click="gotoLogin()">快速登录</span></div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import ValidateCode from '@/components/ValidateCode'
export default {
  components: {
    ValidateCode
  },
  data () {
    const trueCodeValidator = (rule, value, callback) => {
      if (value.toLowerCase() === this.code.toLowerCase()) {
        return callback()
      } else {
        return callback(new Error('验证码错误'))
      }
    }
    const comfirmPwdValidator = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('登录密码不一致'))
      } else {
        callback()
      }
    }
    return {
      code: '',
      codeConfig: {
        width: 98,
        height: 40
      },
      flag: {
        isLogin: false
      },
      form: {
        username: '',
        password: '',
        comfirmPassword: '',
        code: ''
      },
      formRules: {
        username: [{
          required: true,
          message: '请输入账号/手机号/邮箱',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入登录密码',
          trigger: 'blur'
        }],
        comfirmPassword: [{
          required: true,
          message: '请再次输入登录密码',
          trigger: 'blur'
        }, {
          validator: comfirmPwdValidator,
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入图形验证码',
          trigger: 'blur'
        }, {
          validator: trueCodeValidator,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    codeChange (val) {
      this.code = val
    },
    register () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.flag.isLogin = true
          this.$store.dispatch('user/login', this.form).then(() => {
            this.$router.push({ path: '/home' })
          })
        }
      })
    },
    gotoLogin () {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/less/outside.less';
.main {
  .el-form {
    padding-top: 30px;
  }
  .title-wrapper {
    margin-bottom: 10px;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: #909399;
    img {
      margin-right: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .validate-code {
    width: 100px;
    height: 38px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .login {
    margin-top: 10px;
    height: 20px;
    line-height: 20px;
    color: #999;
    text-align: center;
    span {
      display: inline-block;
      padding: 0 5px;
      cursor: pointer;
      color: #0079FE;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
