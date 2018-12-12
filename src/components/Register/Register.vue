<template>
  <div id='main'>
    <!-- 头部 -->
    <div id='header'>
      <div class="navbar">
        <ul>
          <li @click='goBack'><span><img src="../../assets/images/ic_back_white_@2x.png"/></span></li>
          <li class="register-title"><span class="active">注册</span></li>
          <li class="login-title"><router-link to='/login'><span>登录</span></router-link></li>
        </ul>
      </div>
    </div>
    <div id="container">
      <div class="content">
        <div class='form'>
          <ul>
            <li>
                <label>邮箱地址</label>
                <input type="email" v-validate="'required|email'" name="email" :class="{'input': true, 'is-danger': errors.has('email') }"  ref="email"  class="inputSty" v-model="registerForm.email">
                <div class="memo">
                  <div v-show="errors.has('email')" class="danger-text"></div>
                </div>
            </li>
            <li>
                <label>邮件验证码</label>
                <input type="number" v-validate="'required|digits:6'" name="emailVerifyCode" :class="{'input': true, 'is-danger': errors.has('emailVerifyCode') }"  ref="emailVerifyCode"  class="inputSty" v-model="registerForm.emailVerifyCode">
                <div class="memo">
                  <div v-show="errors.has('emailVerifyCode')" class="danger-text"></div>
                  <div @click='sendEmailVerifyCode' class="verify-code">
                    <span v-if="sendMsgDisabled">{{time+'s'}}</span>
                    <span v-else>{{sendTitle}}</span>
                  </div>
                </div>
            </li>
            <li>
                <label class="labPassword">设置密码</label>
                <label class="labPassword2">8-20位，包含字母、数字、字符的组合</label>
                <input type="password" v-validate="'required|password'" name="password" :class="{'input': true, 'is-danger': errors.has('password') }"  ref="password"  class="inputSty" v-model="registerForm.password">
                <div class="memo">
                  <div v-show="errors.has('password')" class="danger-text"></div>
                </div>
            </li>
            <li>
              <label>确认密码</label>
              <input type="password" v-validate="'required|confirmed:password'" name="confirmPassword" :class="{'input': true, 'is-danger': errors.has('confirmPassword') }" ref="confirmPassword" class="inputSty" v-model="registerForm.confirmPassword">
              <div class="memo">
                <div v-show="errors.has('confirmPassword')" class="danger-text"></div>
              </div>
            </li>
            <li>
              <label>手机号码</label>
                <input type="number" v-validate="'required|mobile'" name="phone" :class="{'input': true, 'is-danger': errors.has('phone') }"  ref="phone"  class="inputSty" v-model="registerForm.phone">
              <div class="memo">
                <div v-show="errors.has('phone')" class="danger-text"></div>
              </div>
            </li>
            <li>
            <label>短信验证码</label>
            <input type="number" v-validate="'required|digits:6'" name="phoneVerifyCode" :class="{'input': true, 'is-danger': errors.has('phoneVerifyCode') }"  ref="phoneVerifyCode"  class="inputSty" v-model="registerForm.phoneVerifyCode">
            <div class="memo">
                <div v-show="errors.has('phoneVerifyCode')" class="danger-text"></div>
                <div @click='sendPhoneVerifyCode' class="verify-code">
                  <span v-if="sendPhoneMsgDisabled">{{phoneTime+'s'}}</span>
                  <span v-if="!sendPhoneMsgDisabled">{{sendTitle}}</span>
              </div>
            </div>
            </li>
          </ul>
          <div class="register-protocol-container">
          <Checkbox v-model="registerForm.protocol">
          我已阅读并同意
          <router-link to='/registerProtocol'>
            <span>注册服务与隐私授权协议</span>
          </router-link>
          </Checkbox>
          </div>
          <div class="register-btn-container">
            <mt-button type="primary" size="large" @click='register'>注册</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '../../api/register'
import { showError, goBack } from '../../assets/js/common'
import { sendEmailVerifyCode, sendPhoneVerifyCode } from '../../api/verifyCode'
import { REGISTER_VERIFY_CODE_TYPE, SMS_SEND_TYPE } from '../../api/const'

export default {
  data () {
    return {
      time: 60,
      phoneTime: 60,
      sendTitle: '发送验证码',
      sendMsgDisabled: false,
      sendPhoneMsgDisabled: false,
      registerForm: {
        email: null,
        emailVerifyCode: null,
        password: null,
        confirmPassword: null,
        phone: null,
        phoneVerifyCode: null,
        protocol: false
      }
    }
  },
  methods: {
    goBack () {
      goBack()
    },
    sendEmailVerifyCode () {
      let me = this
      if (me.sendMsgDisabled) {
        return
      }
      me.$validator.validate('email').then(
        result => {
          if (!result) {
            showError('邮箱不能为空或格式错误')
          } else {
            let email = me.registerForm.email
            me.sendMsgDisabled = true
            let interval = window.setInterval(function () {
              if ((me.time--) <= 0) {
                me.time = 60
                me.sendMsgDisabled = false
                window.clearInterval(interval)
                me.sendTitle = '重新发送'
              }
            }, 1000)
            sendEmailVerifyCode(email, REGISTER_VERIFY_CODE_TYPE,
              function () {
                me.sendMsgDisabled = false
                me.time = 60
              })
          }
        })
    },
    sendPhoneVerifyCode () {
      let me = this
      if (me.sendPhoneMsgDisabled) {
        return
      }
      me.$validator.validate('phone').then(
        result => {
          if (!result) {
            showError('手机号不能为空或格式错误')
          } else {
            let phone = me.registerForm.phone
            me.sendPhoneMsgDisabled = true
            let interval = window.setInterval(function () {
              if ((me.phoneTime--) <= 0) {
                me.phoneTime = 60
                me.sendPhoneMsgDisabled = false
                window.clearInterval(interval)
                me.sendTitle = '重新发送'
              }
            }, 1000)
            sendPhoneVerifyCode(phone, REGISTER_VERIFY_CODE_TYPE, SMS_SEND_TYPE,
              function () {
                me.sendPhoneMsgDisabled = false
                me.phoneTime = 60
              })
          }
        })
    },
    register () {
      this.$validator.validate().then(result => {
        if (result) {
          let me = this
          let protocol = me.registerForm.protocol
          if (!protocol) {
            showError('请已阅读并同意注册服务与隐私授权协议')
          } else {
            register(me.registerForm)
          }
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

.labPassword2{
    top:15px;
    font-size: 11px;
}

.protocol {
  position: absolute;
  bottom: 47px;
}

.register-protocol-container {
  margin: 20px 0;
}
</style>
