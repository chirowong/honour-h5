/**
 * 初始化MAPI
 */

import Vue from 'vue'
import MAPI from '../assets/js/mapi'
import baseURL from './env'

Vue.use(MAPI)

var CONFIG = {
  httpApi: baseURL
}

MAPI.init(CONFIG)

let mapi = MAPI

export default mapi
