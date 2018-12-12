<template>
  <div id='main'>
    <Header title="修改密码"></Header>

    <div id="container">
      <div class='content'>
        <div class='form'>
          <ul>
            <li>
              <label>请输入原密码</label>
              <input type="password" v-validate="'required|password'" name="password" :class="{'input': true, 'is-danger': errors.has('password') }" ref="password" class="inputSty" v-model="changePasswordForm.password">
              <div class="memo">
                <div v-show="errors.has('password')" class="danger-text"></div>
              </div>
            </li>
            <li>
                <label class="labPassword">设置密码</label>
                <label class="labPassword2">8-20位，包含字母、数字、字符的组合</label>
                <input type="password" v-validate="'required|password'" name="password" :class="{'input': true, 'is-danger': errors.has('password') }"  ref="password"  class="inputSty" v-model="changePasswordForm.newPassword">
                <div class="memo">
                  <div v-show="errors.has('password')" class="danger-text"></div>
                </div>
            </li>
            <li>
              <label>确认密码</label>
              <input type="password" v-validate="'required|confirmed:password'" name="confirmPassword" :class="{'input': true, 'is-danger': errors.has('confirmPassword') }" ref="confirmPassword" class="inputSty" v-model="changePasswordForm.confirmPassword">
              <div class="memo">
                <div v-show="errors.has('confirmPassword')" class="danger-text"></div>
              </div>
            </li>
            <div class="input-desc">{{ email }}</div>
            <li>
            <label>邮箱验证码</label>
            <input type="number" v-validate="'required|digits:6'" name="emailVerifyCode" :class="{'input': true, 'is-danger': errors.has('emailVerifyCode') }"  ref="emailVerifyCode"  class="inputSty" v-model="changePasswordForm.emailVerifyCode">
            <div class="memo">
                <div v-show="errors.has('emailVerifyCode')" class="danger-text"></div>
                <div @click='sendEmailVerifyCode' class="verify-code">
                  <span v-if="sendMsgDisabled">{{time+'s'}}</span>
                  <span v-else>{{sendTitle}}</span>
              </div>
            </div>
            </li>
            <div class="input-desc">{{ phone }}</div>
            <li>
            <label>短信验证码</label>
            <input type="number" v-validate="'required|digits:6'" name="phoneVerifyCode" :class="{'input': true, 'is-danger': errors.has('phoneVerifyCode') }"  ref="phoneVerifyCode"  class="inputSty" v-model="changePasswordForm.phoneVerifyCode">
            <div class="memo">
                <div v-show="errors.has('phoneVerifyCode')" class="danger-text"></div>
                <div @click='sendPhoneVerifyCode' class="verify-code">
                  <span v-if="sendPhoneMsgDisabled">{{phoneTime+'s'}}</span>
                  <span v-else>{{sendTitle}}</span>
              </div>
            </div>
            </li>
          </ul>
          <div class="changePassword-btn-container">
            <mt-button type="primary" size="large" @click='changePassword'>修改密码</mt-button>
          </div>
        </div>
      </div> <!-- content end -->
    </div> <!-- container end -->
  </div><!-- main end -->
</template>

<script>
import { sendEmailVerifyCodeNeedSession, sendPhoneVerifyCodeNeedSession } from '../../api/verifyCode'
import { changePassword } from '../../api/changePassword'
import {getUserInfo, goBack} from '../../assets/js/common'
import {CHANGE_PASSWORD_VERIFY_CODE_TYPE, SMS_SEND_TYPE} from '../../api/const'

export default {
  data () {
    return {
      phone: '',
      email: '',
      time: 60,
      sendTitle: '发送验证码',
      phoneTime: 60,
      sendMsgDisabled: false,
      sendPhoneMsgDisabled: false,
      changePasswordForm: {
        password: null,
        newPassword: null,
        confirmPassword: null,
        phoneVerifyCode: null,
        emailVerifyCode: null
      }
    }
  },
  created: function () {
    let me = this
    getUserInfo(function (user) {
      if (user) {
        me.phone = user.phone
        me.email = user.email
      }
    })
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
      me.sendMsgDisabled = true
      let interval = window.setInterval(function () {
        if ((me.time--) <= 0) {
          me.time = 60
          me.sendMsgDisabled = false
          window.clearInterval(interval)
          me.sendTitle = '重新发送'
        }
      }, 1000)
      sendEmailVerifyCodeNeedSession('', CHANGE_PASSWORD_VERIFY_CODE_TYPE,
        function () {
          me.sendMsgDisabled = false
          me.time = 60
        })
    },
    sendPhoneVerifyCode () {
      let me = this
      if (me.sendPhoneMsgDisabled) {
        return
      }
      me.sendPhoneMsgDisabled = true
      let interval = window.setInterval(function () {
        if ((me.phoneTime--) <= 0) {
          me.phoneTime = 60
          me.sendPhoneMsgDisabled = false
          window.clearInterval(interval)
          me.sendTitle = '重新发送'
        }
      }, 1000)
      sendPhoneVerifyCodeNeedSession('', CHANGE_PASSWORD_VERIFY_CODE_TYPE, SMS_SEND_TYPE,
        function () {
          me.sendPhoneMsgDisabled = false
          me.phoneTime = 60
        })
    },
    changePassword () {
      this.$validator.validate().then(result => {
        if (result) {
          let me = this
          changePassword(me.changePasswordForm)
        }
      })
    }
  }
}
</script>

<style type="text/less" lang='less' scoped>
.labPassword2{
    top:15px;
    font-size: 11px;
}

.changePassword-btn-container {
  margin-top: 50px;
}

.input-desc {
  font-size: 11px;
  color: #a7abb1;
  height: 11px;
  margin: 17px 0 5px 0;
}
</style>
