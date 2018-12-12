import mapi from './mapi'
import { showSuccess } from '../assets/js/common.js'
import router from '../router'

export function queryUserInfo (account, callback) {
  var requestData = {account: account}

  var param = {command: '200011',
    request: requestData,
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

// 忘记密码
export function resetPassword (resetPasswordForm) {
  let smsVerifyCode = resetPasswordForm.smsVerifyCode
  let emailVerifyCode = resetPasswordForm.emailVerifyCode
  let username = resetPasswordForm.username
  let newPassword = resetPasswordForm.password
  let confirmPassword = resetPasswordForm.confirmPassword

  var requestData = {
    username: username,
    smsVerifyCode: smsVerifyCode,
    emailVerifyCode: emailVerifyCode,
    newPassword: newPassword,
    confirmPassword: confirmPassword}

  var param = {command: '200005',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('重置密码成功', '提示', function () {
        router.push('/login')
      })
    }
  }
  mapi.execute(param)
}
