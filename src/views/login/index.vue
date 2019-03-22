<template>
  <div class="outside-container">
    <div class="main">
      <div class="logo">
        <img src="http://temp.im/142x142" alt="">
      </div>
      <el-form ref="form" :model="form" size="large" :rules="formRules">
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
        <el-form-item prop="code">
          <el-input
            placeholder="请输入图形验证码"
            v-model="form.code" @keyup.enter.native="login">
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
        <el-form-item>
          <el-checkbox v-model="form.isRemember">记住登录状态</el-checkbox>
          <span class="forget-pwd" @click="gotoFindPwd">忘记密码？</span>
        </el-form-item>
        <el-form-item class="item-wrapper">
            <el-button type="primary" class="full-btn" @click="login">登 录</el-button>
        </el-form-item>
        <el-form-item class="item-wrapper">
          <div class="register">还没有账号？<span @click="gotoRegister">快速注册</span></div>
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
    return {
      code: '',
      codeConfig: {
        width: 98,
        height: 40
      },
      form: {
        username: '',
        password: '',
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
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    codeChange (val) {
      console.log(`验证码：${val}`)
      this.code = val
    },
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('login', this.form).then(() => {
            this.$router.push({ path: this.redirect || '/home' })
          })
        }
      })
    },
    gotoFindPwd () {
      this.$router.push({ path: '/findPwd' })
    },
    gotoRegister () {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/less/outside.less';
.main {
  .logo {
    position: absolute;
    top: -71px;
    left: 50%;
    margin-left: -71px;
    width: 142px;
    height: 142px;
    border-radius: 50%;
    z-index: 2;
    overflow: hidden;
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
  .forget-pwd {
    float: right;
    color: #606266;
    cursor: pointer;
    &:hover {
      color: #0079FE;
      text-decoration: underline;
    }
  }

  .register {
    margin-top: 10px;
    height: 20px;
    line-height: 20px;
    color: #999;
    text-align: center;
    span {
      display: inline-block;
      padding: 0 5px;
      cursor: pointer;
      color: @mainColor;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
<style>
  .el-input-group__prepend {
    padding: 0 10px;
  }
  .el-input-group__append {
    padding: 0;
  }
</style>