import mapi from './mapi'
import router from '../router'
import {showSuccess, addUserInfo} from '../assets/js/common'
import {queryCoinSubmissionData} from './borrow'

// 是否已实名
export function identification (callback) {
  var param = {command: '200010',
    success: function (responseDataWrapper, response) {
      addUserInfo('verified', response.verified)
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

// 用户实名认证
export function userVerification (userVerificationForm, redirect) {
  let name = userVerificationForm.name
  let idCardNum = userVerificationForm.idCardNum

  var requestData = {name: name,
    idCardNum: idCardNum}

  var param = {command: '200009',
    request: requestData,
    success: function (responseDataWrapper, response) {
      addUserInfo('verified', 1)
      // 实名认证成功查询进件信息
      queryCoinSubmissionData()
      showSuccess('实名认证成功', '提示', function () {
        let redirectUrl = decodeURIComponent(redirect || '/borrow')
        router.push({
          path: redirectUrl
        })
      })
    }
  }
  mapi.execute(param)
}
