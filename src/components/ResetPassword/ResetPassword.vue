<template>
  <div id='main'>
    <Header title="忘记密码"></Header>

    <div id="container">
      <div class='content'>
        <div class='form'>
          <ul>
            <li>
              <label>请输入邮箱或者手机号码</label>
              <input type="text" v-validate="'required'" name="username" :class="{'input': true, 'is-danger': errors.has('username') }"  ref="username"  class="inputSty" v-model="resetPwdForm.username">
              <div class="memo">
                <div v-show="errors.has('username')" class="danger-text"></div>
              </div>
            </li>
          </ul>
          <div class="resetPassword-btn-container">
            <mt-button type="primary" size="large" @click='next'>下一步</mt-button>
          </div>
        </div>
      </div> <!-- content end -->
    </div> <!-- container end -->

    <Modal
      v-model="reset_password_modal"
      :styles="{width: '100%', bottom: 0, position: 'fixed', top: 'unset'}">
      <div class='form'>
        <ul>
          <div class="input-desc">{{ email }}</div>
          <li>
            <label>邮箱验证码</label>
            <input type="number" v-validate="'required|digits:6'" name="emailVerifyCode" :class="{'input': true, 'is-danger': errors.has('emailVerifyCode') }"  ref="emailVerifyCode"  class="inputSty" v-model="resetPwdForm.emailVerifyCode">
            <div class="memo">
              <div v-show="errors.has('emailVerifyCode')" class="danger-text"></div>
              <div @click='sendEmailVerifyCode' class="verify-code">
                <span v-if="sendMsgDisabled">{{time+'s'}}</span>
                <span v-if="!sendMsgDisabled">发送验证码</span>
              </div>
            </div>
          </li>
          <div class="input-desc">{{ phone }}</div>
          <li>
            <label>短信验证码</label>
            <input type="number" v-validate="'required|digits:6'" name="phoneVerifyCode" :class="{'input': true, 'is-danger': errors.has('phoneVerifyCode') }"  ref="phoneVerifyCode"  class="inputSty" v-model="resetPwdForm.smsVerifyCode">
            <div class="memo">
              <div v-show="errors.has('phoneVerifyCode')" class="danger-text"></div>
              <div @click='sendPhoneVerifyCode' class="verify-code">
                <span v-if="sendPhoneMsgDisabled">{{phoneTime+'s'}}</span>
                <span v-if="!sendPhoneMsgDisabled">发送验证码</span>
              </div>
            </div>
          </li>
          <li>
            <label class="labPassword">设置密码</label>
            <label class="labPassword2">6-20位，包含字母、数字、字符的组合</label>
            <input type="password" v-validate="'required|password'" name="password" :class="{'input': true, 'is-danger': errors.has('password') }"  ref="password"  class="inputSty" v-model="resetPwdForm.password">
            <div class="memo">
              <div v-show="errors.has('password')" class="danger-text"></div>
            </div>
          </li>
          <li>
            <label>确认密码</label>
            <input type="password" v-validate="'required'" name="confirmPassword" :class="{'input': true, 'is-danger': errors.has('confirmPassword') }" ref="confirmPassword" class="inputSty" v-model="resetPwdForm.confirmPassword">
            <div class="memo">
              <div v-show="errors.has('confirmPassword')" class="danger-text"></div>
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer">
        <mt-button type="primary" size="large" @click='resetPassword'>确认重置密码</mt-button>
      </div>
    </Modal>
  </div><!-- main end -->
</template>

<script>
import { sendEmailVerifyCode, sendPhoneVerifyCode } from '../../api/verifyCode'
import { goBack } from '../../assets/js/common'
import { queryUserInfo, resetPassword } from '../../api/resetPassword'
import {RESET_PASSWORD_VERIFY_CODE_TYPE, SMS_SEND_TYPE} from '../../api/const'

export default {
  data () {
    return {
      phone: '',
      email: '',
      time: 60,
      phoneTime: 60,
      sendMsgDisabled: false,
      sendPhoneMsgDisabled: false,
      resetPwdForm: {
        username: null,
        password: null,
        confirmPassword: null,
        smsVerifyCode: null,
        emailVerifyCode: null
      },
      reset_password_modal: false
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
      me.sendMsgDisabled = true
      let interval = window.setInterval(function () {
        if ((me.time--) <= 0) {
          me.time = 60
          me.sendMsgDisabled = false
          window.clearInterval(interval)
        }
      }, 1000)
      sendEmailVerifyCode(me.resetPwdForm.username, RESET_PASSWORD_VERIFY_CODE_TYPE,
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
        }
      }, 1000)
      sendPhoneVerifyCode(me.resetPwdForm.username, RESET_PASSWORD_VERIFY_CODE_TYPE, SMS_SEND_TYPE,
        function () {
          me.sendPhoneMsgDisabled = false
          me.phoneTime = 60
        })
    },
    next () {
      let me = this
      me.$validator.validate('username').then(result => {
        if (result) {
          let username = me.resetPwdForm.username
          queryUserInfo(username, function (response) {
            me.phone = response.phone
            me.email = response.email
            me.reset_password_modal = true
          })
        }
      })
    },
    resetPassword () {
      this.$validator.validate().then(result => {
        if (result) {
          let me = this
          resetPassword(me.resetPwdForm)
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

  .resetPassword-btn-container {
    margin-top: 50px;
  }

  .input-desc {
    font-size: 11px;
    color: #a7abb1;
    height: 11px;
    margin: 17px 0 5px 0;
  }
</style>

<style type="text/css">
  @media (max-width:768px) {
    .ivu-modal {
      width: 100%!important;
      margin: 0;
    }
  }
</style>
