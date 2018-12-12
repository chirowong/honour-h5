import mapi from './mapi'
import {showSuccess} from '../assets/js/common'

// 新增用户用户银行卡
export function createBankcard (bankcardForm, callback) {
  let requestData = {
    bankCardNum: bankcardForm.bankCardNum,
    bankPhoneNum: bankcardForm.bankPhoneNum
  }

  let param = {command: '200012',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('银行卡绑定成功', '提示', function () {
        if (callback) {
          callback(response)
        }
      })
    }
  }
  mapi.execute(param)
}

// 查询用户银行卡列表
export function queryBankcardList (callback) {
  let param = {command: '200007',
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}
