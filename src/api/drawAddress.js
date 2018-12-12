import mapi from './mapi'
import {showSuccess} from '../assets/js/common'

// 新增用户提币地址
export function createAddress (withdrawAddressForm, callback) {
  let requestData = {
    coinType: withdrawAddressForm.coinType,
    address: withdrawAddressForm.address,
    addressTag: withdrawAddressForm.tag,
    emailVerifyCode: withdrawAddressForm.emailVerifyCode,
    smsVerifyCode: withdrawAddressForm.phoneVerifyCode
  }

  let param = {command: '200102',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('创建成功', '提示', function () {
        if (callback) {
          callback(response)
        }
      })
    }
  }
  mapi.execute(param)
}

// 查询用户提币地址列表
export function queryAddressList (callback) {
  let param = {command: '200103',
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

// 切换默认用户提币地址
export function switchDefaultAddress (userWithdrawAddressId, callback) {
  let requestData = {userWithdrawAddressId: userWithdrawAddressId}

  let param = {command: '200104',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('设置成功', '提示', function () {
        if (callback) {
          callback(response)
        }
      })
    }
  }
  mapi.execute(param)
}

// 删除用户提币地址
export function deleteAddress (userWithdrawAddressId, callback) {
  let requestData = {userWithdrawAddressId: userWithdrawAddressId}

  let param = {command: '200105',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('删除成功', '提示', function () {
        if (callback) {
          callback(response)
        }
      })
    }
  }
  mapi.execute(param)
}
