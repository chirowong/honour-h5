import mapi from './mapi'

// 查询
export function queryIndexLoanInfo (callback) {
  var param = {command: '600101',
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}
