<template>
  <div class="outside-container">
    <div class="main">
      <transition name="form" mode="out-in">
        <el-form ref="form" :model="form" :rules="formRules" size="large" v-if="!flag.isPassValidate" key="validator">
          <el-form-item class="title-wrapper">
            <div class="title">
              <img class="ib vam" src="http://temp.im/142x142" alt="">
              <span class="ib vam">找 回 密 码</span>
            </div>
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input
              placeholder="请输入你的注册手机"
              v-model="form.mobile">
              <template slot="prepend">
                <svg-icon  icon-class="mobile"></svg-icon>
              </template>
              <div slot="append" class="ib vam">
                <div class="send-code" v-bind:class="{'active': code.showSendCode}" @click="sendCode()">
                  {{ code.text }}
                </div>
              </div>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              placeholder="请输入手机验证码"
              v-model="form.code"
              @keyup.enter.native="gotoResetPwd">
              <template slot="prepend">
                <svg-icon  icon-class="number"></svg-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="item-wrapper">
            <el-button type="primary" class="full-btn" @click="gotoResetPwd">下 一 步</el-button>
          </el-form-item>
          <el-form-item class="item-wrapper">
            <div class="login"><span @click="gotoLogin">返回 登录</span></div>
          </el-form-item>
        </el-form>
        <el-form ref="pwdForm" :model="pwdForm" :rules="pwdFormRules" size="large" key="reset" v-else>
          <el-form-item class="title-wrapper">
            <div class="title">
              <img class="ib vam" src="http://temp.im/142x142" alt="">
              <span class="ib vam">重 置 密 码</span>
            </div>
          </el-form-item>
          <el-form-item prop="newPwd">
            <el-input
              placeholder="请输入新密码"
              v-model="pwdForm.newPwd">
              <template slot="prepend">
                <span class="iconfont icon-pwd"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPwd">
            <el-input
              placeholder="请再次输入新密码"
              v-model="pwdForm.confirmPwd"
              @keyup.enter.native="resetPwd">
              <template slot="prepend">
                <span class="iconfont icon-pwd"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="item-wrapper">
            <el-button type="primary" class="full-btn" @click="resetPwd"  :loading="flag.isLogin">{{ flag.isLogin ? '正 在 登 录 ...' : '重 置 密 码' }}</el-button>
          </el-form-item>
          <el-form-item class="item-wrapper">
            <div class="login"><span @click="gotoLogin">返回 登录</span></div>
          </el-form-item>
        </el-form>
      </transition>
    </div>
  </div>
</template>
<script>
import { mobileValidator, isMobile } from '@/utils/validators'
import { clearTimeout, setTimeout } from 'timers'
export default {
  data () {
    const comfirmPwdValidator = (rule, value, callback) => {
      if (value !== this.pwdForm.newPwd) {
        callback(new Error('与新密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        mobile: '',
        code: ''
      },
      pwdForm: {
        newPwd: '',
        confirmPwd: ''
      },
      flag: {
        isPassValidate: false,
        isLogin: false
      },
      code: {
        timer: null,
        seconds: 20,
        text: '发送验证码',
        showSendCode: false
      },
      formRules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: mobileValidator,
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ]
      },
      pwdFormRules: {
        newPwd: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }],
        confirmPwd: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }, {
          validator: comfirmPwdValidator,
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    formMobile: {
      handler (newVal) {
        // 此处不使用箭头函数 因为不绑定this 下面无法更改showSendCode的值
        if (isMobile(newVal)) {
          this.code.showSendCode = true
        }
      },
      immediate: true
    }
  },
  computed: {
    formMobile () {
      return this.form.mobile
    }
  },
  methods: {
    resetForm (refname) {
      // Dom更新了
      this.$nextTick(() => {
        var self = this
        // 延迟切换动画时间 1s
        var timer = setTimeout(function () {
          self.$refs[refname].resetFields()
          // resetFields清除不了属性值 还需要重新赋值
          self.pwdForm = {
            newPwd: '',
            confirmPwd: ''
          }
          clearTimeout(timer)
        }, 1000)
      })
    },
    gotoResetPwd () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.flag.isPassValidate = true
          this.resetForm('pwdForm')
        }
      })
    },
    sendCode () {
      var self = this
      self.code.count = self.code.seconds
      self.code.timer = setInterval(self.countDown, 1000)
    },
    countDown () {
      this.code.count--
      this.code.text = `${this.code.count} 秒`
      this.code.showSendCode = false
      if (!this.code.count) {
        clearInterval(this.code.timer)
        this.code.text = '重发验证码'
        this.code.showSendCode = true
      }
    },
    resetPwd () {
      var self = this
      self.$refs.pwdForm.validate(valid => {
        if (valid) {
          self.flag.isLogin = true
          self.loginTimer = setTimeout(function () {
            self.$store.dispatch('login/login', {
              username: self.form.mobile,
              password: self.pwdForm.newPwd
            }).then(() => {
              self.$router.push({ path: '/home' })
            })
          }, 5000)
        }
      })
    },
    gotoLogin () {
      this.$router.push({ path: '/login' })
    }
  },
  destroyed () {
    clearTimeout(this.loginTimer)
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/less/outside.less';
.form-enter-active, .form-leave-active {
  transition: opacity .5s ease;
}
.form-enter, .form-leave-to {
  opacity: 0;
}
.outside-container {
  .main {
    height: 316px;
  }
}
.main {
  .el-form {
    padding-top: 30px;
  }
  .send-code {
    padding: 0 10px;
    width: 90px;
    text-align: center;
    cursor: default;
  }
  .send-code.active {
    color: #0079FE;
    cursor: pointer;
  }
  .validate-code {
    width: 60px;
    height: 38px;
    line-height: 38px;
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
<style>
  .el-input-group__prepend {
    font-size: 16px;
  }
  .el-input-group__append {
    padding: 0 10px;
  }
</style>
