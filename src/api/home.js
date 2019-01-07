import mapi from './mapi'

// 查询
export function queryCategorys (callback) {
  var param = {method: 'get',
    url: '/api/category/',
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}
