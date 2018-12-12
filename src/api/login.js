import mapi from './mapi'
import { showSuccess, addUserInfo } from '../assets/js/common'
import router from '../router'

// 登录
export function login (loginForm, redirect) {
  let username = loginForm.username
  let password = loginForm.password
  let verifyCode = loginForm.verifyCode

  var requestData = {username: username,
    password: password,
    verifyCode: verifyCode}

  var param = {command: '200004',
    request: requestData,
    success: function (responseDataWrapper, response) {
      Object.keys(response).forEach(function (key) {
        addUserInfo(key, response[key])
      })
      showSuccess('登录成功', '提示', function () {
        let redirectUrl = decodeURIComponent(redirect || '/borrow')
        router.push({
          path: redirectUrl
        })
      })
    }
  }
  mapi.execute(param)
}
