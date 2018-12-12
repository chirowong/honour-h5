/**
 * 初始化MAPI
 */

import Vue from 'vue'
import MAPI from '../assets/js/mapi'
import baseURL from './env'
import { showErrorNeedLogin } from '../assets/js/common'

Vue.use(MAPI)

var CONFIG = {
  globalErrorHandler: function (responseDataWrapper, response, callback) {
    showErrorNeedLogin(responseDataWrapper.message, '提示', responseDataWrapper.code)
  },
  httpApi: baseURL
}

MAPI.init(CONFIG)

let mapi = MAPI

export default mapi
