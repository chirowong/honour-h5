import mapi from './mapi'
import { showSuccess } from '../assets/js/common.js'
// import { logout } from './logout'

// 修改密码
export function changePassword (changePasswordForm) {
  let smsVerifyCode = changePasswordForm.phoneVerifyCode
  let emailVerifyCode = changePasswordForm.emailVerifyCode
  let currentPassword = changePasswordForm.password
  let newPassword = changePasswordForm.newPassword
  let confirmPassword = changePasswordForm.confirmPassword

  var requestData = {
    smsVerifyCode: smsVerifyCode,
    emailVerifyCode: emailVerifyCode,
    currentPassword: currentPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword}

  var param = {command: '200006',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('修改密码成功', '提示', function () {
        // logout('/login')
      })
    }
  }
  mapi.execute(param)
}
