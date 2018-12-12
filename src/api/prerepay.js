import mapi from './mapi'
import {showSuccess} from '../assets/js/common'

export function submitPrepay (borrowId, callback) {
  var requestData = {borrowId: borrowId}

  var param = {command: '700111',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('申请成功', '提示', function () {
        if (callback) {
          callback(response)
        }
      })
    }
  }
  mapi.execute(param)
}
