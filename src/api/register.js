import mapi from './mapi'
import { showSuccess, addUserInfo } from '../assets/js/common'
import router from '../router'

// 注册
export function register (registerForm) {
  let phone = registerForm.phone
  let emailAddress = registerForm.email
  let emailVerifyCode = registerForm.emailVerifyCode
  let smsVerifyCode = registerForm.phoneVerifyCode
  let password = registerForm.password
  let confirmPassword = registerForm.confirmPassword

  var requestData = {phone: phone,
    smsVerifyCode: smsVerifyCode,
    email: emailAddress,
    emailVerifyCode: emailVerifyCode,
    password: password,
    confirmPassword: confirmPassword}

  var param = {command: '200003',
    request: requestData,
    success: function (responseDataWrapper, response) {
      Object.keys(response).forEach(function (key) {
        addUserInfo(key, response[key])
      })
      showSuccess('注册成功', '提示', function () {
        router.push('/borrow')
      })
    }
  }
  mapi.execute(param)
}
