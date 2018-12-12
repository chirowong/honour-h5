import mapi from './mapi'

// 查询
export function queryCurrentCoinPrice (callback) {
  var param = {command: '700101',
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}
