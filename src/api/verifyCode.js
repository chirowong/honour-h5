import mapi from './mapi'
import { showSuccess, showErrorNeedLogin } from '../assets/js/common'

// 发送手机验证码
export function sendPhoneVerifyCode (phone, type, sendType, errorCallback) {
  var requestData = {phone: phone, type: type, sendType: sendType}
  var param = {command: '200001',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('发送成功')
    },
    ignoreGlobalErrorHandler: true,
    error: function (responseDataWrapper, response) {
      if (errorCallback) {
        errorCallback(responseDataWrapper, response)
      }
      showErrorNeedLogin(responseDataWrapper.message, '提示', responseDataWrapper.code)
    }
  }
  mapi.execute(param)
}

// 发送邮箱验证码
export function sendEmailVerifyCode (email, type, errorCallback) {
  var requestData = {email: email, type: type}
  var param = {command: '200002',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('发送成功')
    },
    ignoreGlobalErrorHandler: true,
    error: function (responseDataWrapper, response) {
      if (errorCallback) {
        errorCallback(responseDataWrapper, response)
      }
      showErrorNeedLogin(responseDataWrapper.message, '提示', responseDataWrapper.code)
    }
  }
  mapi.execute(param)
}

// 发送手机验证码
export function sendPhoneVerifyCodeNeedSession (phone, type, sendType, errorCallback) {
  var requestData = {phone: phone, type: type, sendType: sendType}
  var param = {command: '200013',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('发送成功')
    },
    ignoreGlobalErrorHandler: true,
    error: function (responseDataWrapper, response) {
      if (errorCallback) {
        errorCallback(responseDataWrapper, response)
      }
      showErrorNeedLogin(responseDataWrapper.message, '提示', responseDataWrapper.code)
    }
  }
  mapi.execute(param)
}

// 发送邮箱验证码
export function sendEmailVerifyCodeNeedSession (email, type, errorCallback) {
  var requestData = {email: email, type: type}
  var param = {command: '200014',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('发送成功')
    },
    ignoreGlobalErrorHandler: true,
    error: function (responseDataWrapper, response) {
      if (errorCallback) {
        errorCallback(responseDataWrapper, response)
      }
      showErrorNeedLogin(responseDataWrapper.message, '提示', responseDataWrapper.code)
    }
  }
  mapi.execute(param)
}
