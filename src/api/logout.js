import {removeUserInfo} from '../assets/js/common'
import router from '../router'

// 退出
export function logout (redirect) {
  removeUserInfo()
  let redirectUrl = decodeURIComponent(redirect || '/')
  router.push({
    path: redirectUrl
  })
}
