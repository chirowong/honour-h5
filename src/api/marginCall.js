import mapi from './mapi'
import {showSuccess} from '../assets/js/common'
import router from '../router'

export function queryMarginCallPreview (borrowId, callback) {
  var requestData = {
    borrowId: borrowId
  }

  var param = {command: '700109',
    request: requestData,
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

export function submitMarginCall (marginCallForm, callback) {
  var requestData = {
    coinAmount: marginCallForm.coinAmount,
    coinType: marginCallForm.coinType,
    borrowId: marginCallForm.borrowId
  }

  var param = {command: '700110',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('申请成功', '提示', function () {
        router.push('/borrow/list')
      })
    }
  }
  mapi.execute(param)
}
