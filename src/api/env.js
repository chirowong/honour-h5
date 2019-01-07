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
  baseUrl = 'http://coin-h5api.jieniba.com:8080/command/execute'
}

export default baseUrl
