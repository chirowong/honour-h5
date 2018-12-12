import mapi from './mapi'
import router from '../router'

// 查询用户交易地址
export function queryUserTradeAddressCommand (callback) {
  var requestData = {coinType: 10}

  var param = {command: '200101',
    request: requestData,
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

// 查询借款预览
export function queryRechargePreview (amount, callback) {
  var requestData = {amount: amount}

  var param = {command: '600107',
    request: requestData,
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

// 提交转入申请申请
export function submitRechargePreview (borrowPreviewForm) {
  var requestData = {
    coinType: borrowPreviewForm.coinType,
    expectAmount: borrowPreviewForm.expectAmount,
    proposeCount: borrowPreviewForm.proposeCount,
    usdPrice: borrowPreviewForm.usdPrice,
    rmbPrice: borrowPreviewForm.rmbPrice,
    exchangeRate: borrowPreviewForm.exchangeRate
  }

  var param = {command: '700102',
    request: requestData,
    success: function (responseDataWrapper, response) {
      router.push({
        name: 'Recharge',
        params: { proposeCount: borrowPreviewForm.proposeCount }
      })
    }
  }
  mapi.execute(param)
}

// 查询用户充币列表
export function queryRechargeList (callback) {
  var pageData = {
    pageIndex: 0,
    pageSize: 20
  }

  var param = {command: '700104',
    page: pageData,
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

// 查询用户充币详情
export function queryRechargeDetail (rechargeId, callback) {
  var requestData = {
    rechargeId: rechargeId
  }

  var param = {command: '700105',
    request: requestData,
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}
