import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import user from './datas/user.json'

const mock = new AxiosMockAdapter(axios)

const service = () => {
  mock.onGet('/api/user').reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // 模拟接口返回时间
        resolve([200, user])
      }, 1000)
    })
  })
  mock.onPost('/api/register').reply((config) => {
    console.log(config) // post传来都参数
    return new Promise((resolve, reject) => {
      resolve([200, { code: 0, message: '注册成功' }])
    })
  })
}

export default service
