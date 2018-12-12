/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 *
 */

let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://192.168.5.56:8083/command/execute'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://coin-h5api.jieniba.com:8080/command/execute'
}

export default baseUrl
