import mapi from './mapi'
import { showSuccess } from '../assets/js/common'
import router from '../router'

// 查询借款预览
export function queryBorrowPreview (amount, callback) {
  var requestData = {amount: amount}

  var param = {command: '600102',
    request: requestData,
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

// 查询用户借款列表
export function queryBorrowList (callback) {
  var pageData = {
    pageIndex: 0,
    pageSize: 20
  }

  var param = {command: '600103',
    page: pageData,
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

// 查询用户借款详情
export function queryBorrowDetail (borrowId, callback) {
  var requestData = {
    borrowId: borrowId
  }

  var param = {command: '600104',
    request: requestData,
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}

// 发起借款
export function submitBorrowPreview (borrowPreviewForm) {
  var requestData = {
    coinType: borrowPreviewForm.coinType,
    amount: borrowPreviewForm.expectAmount * 100,
    pledgeCoinAmount: borrowPreviewForm.expectCoinAmount
  }

  var param = {command: '600105',
    request: requestData,
    success: function (responseDataWrapper, response) {
      showSuccess('提交申请成功', '提示', function () {
        router.push({
          path: '/borrow/success'
        })
      })
    }
  }
  mapi.execute(param)
}

// 查询借款状态
export function queryBorrowViewStatus (callback) {
  var param = {command: '600106',
    success: function (responseDataWrapper, response) {
      if (callback) {
        callback(response)
      }
    }
  }
  mapi.execute(param)
}
