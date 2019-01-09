/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 *
 */

let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:8080'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://chirowong.jios.org:9000'
}

export default baseUrl
