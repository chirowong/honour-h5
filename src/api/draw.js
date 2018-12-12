import mapi from './mapi'
import {showSuccess} from '../assets/js/common'
import router from '../router'

// 提交提币申请
export function submitWithdraw (withdrawForm) {
  var requestData = {
    coinType: withdrawForm.coinType,
    amount: withdrawForm.amount,
    addressTag: withdrawForm.addressTag,
    withdrawAddress: withdrawForm.withdrawAddress,
    emailVerifyCode: withdrawForm.emailVerifyCode,
    smsVerifyCode: withdrawForm.smsVerifyCode
  }

  var param = {command: '700106',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('提交提币申请成功', '提示', function () {
        router.push('/draw/success')
      })
    }
  }
  mapi.execute(param)
}

// 查询用户提币列表
export function queryWithdrawList (callback) {
  var pageData = {
    pageIndex: 0,
    pageSize: 20
  }

  var param = {command: '700107',
    page: pageData,
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

// 查询用户提币详情
export function queryWithdrawDetail (withdrawId, callback) {
  var requestData = {
    withdrawId: withdrawId
  }

  var param = {command: '700108',
    request: requestData,
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

// 查询用户提币预览
export function queryWithdrawPreview (callback) {
  var param = {command: '700112',
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}
