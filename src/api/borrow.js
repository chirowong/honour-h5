import mapi from './mapi'

// 查询
export function queryUserWallet (callback) {
  var param = {command: '300101',
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

export function queryUserAccount (callback) {
  var param = {command: '400101',
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

export function queryCoinSubmissionData (callback) {
  var clientInfo = {platform: 4}

  var param = {command: '500101',
    clientInfo: clientInfo,
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}
