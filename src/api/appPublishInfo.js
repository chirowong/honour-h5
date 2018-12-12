import mapi from './mapi'

// 查询公用信息
export function queryAppPublishInfo (callback) {
  var param = {command: '900900',
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}
