import { MessageBox } from 'mint-ui'
import store from './local.storage'
import {TYPE_ANDROID, TYPE_IOS, TYPE_OTHER, NOT_LOGIN_ERROR_CODE, USER_SESSION_KEY} from '../../api/const'
import router from '../../router'
import mapi from '../../api/mapi'

export function showSuccess (message, title, callback) {
  let osType = getMobileOperatingSystem()
  switch (osType) {
    case TYPE_ANDROID: {
      let params = {
        title: title,
        content: message,
        callback: callback
      }
      mapi.showSuccess(params)
      break
    }
    case TYPE_IOS: {
      console.log('is ios')
      break
    }
    default: {
      if (callback) {
        MessageBox.alert(message, title).then(() => {
          callback()
        })
      } else {
        MessageBox.alert(message, title)
      }
    }
  }
}

export function showError (message, title, callback) {
  let osType = getMobileOperatingSystem()
  switch (osType) {
    case TYPE_ANDROID: {
      let params = {
        title: title,
        content: message,
        callback: callback
      }
      mapi.showError(params)
      break
    }
    case TYPE_IOS: {
      console.log('is ios')
      break
    }
    default: {
      if (callback) {
        MessageBox.alert(message, title).then(() => {
          callback()
        })
      } else {
        MessageBox.alert(message, title)
      }
    }
  }
}

export function showErrorNeedLogin (message, title, code) {
  showError(message, title, function () {
    if (code === NOT_LOGIN_ERROR_CODE) {
      router.push('/login')
    }
  })
}

export function confirm (message, title, callback) {
  let osType = getMobileOperatingSystem()
  switch (osType) {
    case TYPE_ANDROID: {
      let params = {
        title: title,
        content: message,
        callback: callback
      }
      mapi.showError(params)
      break
    }
    case TYPE_IOS: {
      console.log('is ios')
      break
    }
    default: {
      if (callback) {
        MessageBox.confirm(message, title).then(() => {
          callback()
        })
      } else {
        MessageBox.confirm(message, title)
      }
    }
  }
}

export function getUserInfo (callback) {
  let osType = getMobileOperatingSystem()
  switch (osType) {
    case TYPE_ANDROID: {
      getUserInfoFromAndroid(callback)
      break
    }
    case TYPE_IOS: {
      console.log('is ios')
      break
    }
    default: {
      callback(store.get(USER_SESSION_KEY))
    }
  }
}

function getUserInfoFromAndroid (callback) {
  let params = {
    callback: function (userInfo) {
      callback(userInfo)
    }
  }
  mapi.getUserInfo(params)
}

export function addUserInfo (key, value) {
  var osType = getMobileOperatingSystem()
  switch (osType) {
    case TYPE_ANDROID: {
      console.log('is android')
      break
    }
    case TYPE_IOS: {
      console.log('is ios')
      break
    }
    default: {
      let userInfo = store.get(USER_SESSION_KEY)
      if (userInfo === undefined) {
        userInfo = {}
      }
      userInfo[key] = value
      store.set(USER_SESSION_KEY, userInfo)
    }
  }
}

export function removeUserInfo () {
  var osType = getMobileOperatingSystem()
  switch (osType) {
    case TYPE_ANDROID: {
      console.log('is android')
      break
    }
    case TYPE_IOS: {
      console.log('is ios')
      break
    }
    default: {
      store.remove(USER_SESSION_KEY)
    }
  }
}

export function goBack () {
  var osType = getMobileOperatingSystem()
  switch (osType) {
    case TYPE_ANDROID: {
      if (router.history.current.query.from === 'android') {
        mapi.executeReturn()
      } else {
        router.go(-1)
      }
      break
    }
    case TYPE_IOS: {
      console.log('is ios')
      break
    }
    default: {
      if (window.history.length <= 1) {
        router.push('/')
      } else {
        router.go(-1)
      }
    }
  }
}

export function getMobileOperatingSystem () {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera

  if (/Lanyidai Android/i.test(userAgent)) {
    return TYPE_ANDROID
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/Lanyidai iOS/.test(userAgent) && !window.MSStream) {
    return TYPE_IOS
  }

  return TYPE_OTHER
}

export function checkEmail (email) {
  return /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(email)
}

export function checkChinaMobile (mobile) {
  return mobile.length === 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(mobile)
}

/**
 * 检验中国的银行卡格式
 *
 * @param bankcard 银行卡号
 * @return 检测通过则返回true
 */
export function isValidChinaBankcard (bankcard) {
  var checkCode = getBankcardCheckCode(bankcard.substring(0, bankcard.length - 1))
  if (checkCode === 'N') {
    return false
  }
  return bankcard.substring(bankcard.length - 1) === checkCode
}

/**
 * 从不含校验位的银行卡卡号采用 Luhn 校验算法获得校验位
 *
 * @param nonCheckCodeCard
 * @return 校验位
 */
export function getBankcardCheckCode (nonCheckCodeCard) {
  if (!nonCheckCodeCard) {
    return 'N'
  }
  if (isNaN(nonCheckCodeCard)) {
    return 'N'
  }
  var chs = nonCheckCodeCard.split('')
  var luhnSum = 0
  for (var i = chs.length - 1, j = 0; i >= 0; i--, j++) {
    var k = parseInt(chs[i], 10)
    if (j % 2 === 0) {
      k *= 2
      k = parseInt(k / 10, 10) + k % 10
    }
    luhnSum += k
  }
  return (luhnSum % 10 === 0) ? '0' : ((10 - luhnSum % 10) + '')
}

export function isValidateIdCard (idCard) {
  // 非18位为假
  if (idCard.length !== 18) {
    return false
  }

  var idCard17 = idCard.substring(0, 17)
  var idCard18Code = idCard.substring(17, 18)
  var c

  // 是否都为数字
  if (!isNaN(idCard17)) {
    c = idCard17.split('')
  } else {
    return false
  }

  var sum17 = 0
  var power = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]

  for (var i = 0; i < c.length; i++) {
    for (var j = 0; j < power.length; j++) {
      if (i === j) {
        sum17 += parseInt(c[i], 10) * power[j]
      }
    }
  }

  // 将和值与11取模得到余数进行校验码判断
  var checkCode = null
  switch (sum17 % 11) {
    case 10:
      checkCode = '2'
      break
    case 9:
      checkCode = '3'
      break
    case 8:
      checkCode = '4'
      break
    case 7:
      checkCode = '5'
      break
    case 6:
      checkCode = '6'
      break
    case 5:
      checkCode = '7'
      break
    case 4:
      checkCode = '8'
      break
    case 3:
      checkCode = '9'
      break
    case 2:
      checkCode = 'x'
      break
    case 1:
      checkCode = '0'
      break
    case 0:
      checkCode = '1'
      break
  }
  if (checkCode == null) {
    return false
  }

  // 将身份证的第18位与算出来的校码进行匹配，不相等就为假
  return idCard18Code === checkCode
}

export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

export function formatMoney (money, digit) {
  var tpMoney = '0.00'
  if (undefined !== money) {
    tpMoney = money
  }

  tpMoney = Number(tpMoney)
  if (isNaN(tpMoney)) {
    return '0.00'
  }
  tpMoney = tpMoney.toFixed(digit) + ''
  var re = /^(-?\d+)(\d{3})(\.?\d*)/
  while (re.test(tpMoney)) {
    tpMoney = tpMoney.replace(re, '$1,$2$3')
  }

  return tpMoney
}

export function formatBtc (money) {
  var tpMoney = '0.00'
  if (undefined !== money) {
    tpMoney = money
  }

  tpMoney = Number(tpMoney)
  if (isNaN(tpMoney)) {
    return '0.00'
  }
  return tpMoney + ''
}

export function formatMoneyWithRMB (money, digit) {
  return formatMoney(money / 100, digit) + ' 元'
}
