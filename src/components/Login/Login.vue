<template>
  <div id='main'>
    <!-- 头部 -->
    <div id='header'>
      <div class="navbar">
        <ul>
          <li @click='goBack'><span><img src="../../assets/images/ic_back_white_@2x.png"/></span></li>
          <li class="register-title"><router-link to='/register'><span>注册</span></router-link></li>
          <li class="login-title"><span class="active">登录</span></li>
        </ul>
      </div>
    </div>

    <div id="container">
      <div class="content">
        <div class='form'>
          <ul>
            <li>
                <label>邮箱或手机号码</label>
                <input type="username" v-validate="'required'" name="username" :class="{'input': true, 'is-danger': errors.has('username') }"  ref="email"  class="inputSty" v-model="loginForm.username">
                <div class="memo">
                  <div v-show="errors.has('username')" class="danger-text"></div>
                </div>
            </li>
            <li>
              <label>密码</label>
              <input type="password" v-validate="'required|password'" name="password" :class="{'input': true, 'is-danger': errors.has('password') }" ref="password" class="inputSty" v-model="loginForm.password">
              <div class="memo">
                <div v-show="errors.has('password')" class="danger-text"></div>
              </div>
            </li>
            <li>
            <label>短信验证码</label>
            <input type="number" v-validate="'required|digits:6'" name="verifyCode" :class="{'input': true, 'is-danger': errors.has('verifyCode') }"  ref="verifyCode"  class="inputSty" v-model="loginForm.verifyCode">
            <div class="memo">
                <div v-show="errors.has('verifyCode')" class="danger-text"></div>
                <div @click='sendVerifyCode' class="verify-code">
                  <span v-if="sendMsgDisabled">{{time+'s'}}</span>
                  <span v-else>{{sendTitle}}</span>
              </div>
            </div>
            </li>
          </ul>
          <div class="forget-password-container">
            <router-link to='/resetPwd'>
              忘记密码
          </router-link>
          </div>
          <div class="login-btn-container">
            <mt-button type="primary" size="large" @click='login'>登录</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../../api/login'
import { showError, checkEmail, checkChinaMobile, goBack } from '../../assets/js/common.js'
import { sendPhoneVerifyCode } from '../../api/verifyCode'
import { LOGIN_VERIFY_CODE_TYPE, SMS_SEND_TYPE } from '../../api/const'

export default {
  data () {
    return {
      time: 60,
      sendMsgDisabled: false,
      sendTitle: '发送验证码',
      loginForm: {
        username: null,
        password: null,
        verifyCode: null
      }
    }
  },
  methods: {
    goBack () {
      goBack()
    },
    sendVerifyCode () {
      let me = this
      if (me.sendMsgDisabled) {
        return
      }

      let username = me.loginForm.username
      if (username == null || (!checkChinaMobile(username) && !checkEmail(username))) {
        showError('手机号或邮箱格式错误')
      } else {
        me.sendMsgDisabled = true
        let interval = window.setInterval(function () {
          if ((me.time--) <= 0) {
            me.time = 60
            me.sendMsgDisabled = false
            window.clearInterval(interval)
            me.sendTitle = '重新发送'
          }
        }, 1000)
        sendPhoneVerifyCode(username, LOGIN_VERIFY_CODE_TYPE, SMS_SEND_TYPE,
          function () {
            me.sendMsgDisabled = false
            me.time = 60
          })
      }
    },
    login () {
      this.$validator.validate().then(result => {
        if (result) {
          let me = this
          login(me.loginForm, this.$route.query.redirect)
        }
      })
    }
  }
}
</script>

<style type="text/less" lang='less' scoped>
.register-title {
  width: 74px;
}

.login-title {
  width: 74px;
}

.forget-password-container {
  text-align:right;
  margin: 20px 0;
  font-size: 13px;
}
</style>
