import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate' // 表单验证
import zh from 'vee-validate/dist/locale/zh_CN'// 引入中文文件
import {checkEmail, checkChinaMobile, isValidateIdCard, isValidChinaBankcard} from './common'

// 配置中文
Validator.addLocale(zh)

const config = {
  locale: 'zh_CN'
}

Vue.use(VeeValidate, config)

Validator.extend('email', {
  messages: {
    zh_CN: '请输入正确邮箱地址'
  },
  validate: value => {
    return checkEmail(value)
  }
})

Validator.extend('mobile', {
  messages: {
    zh_CN: '必须是11位手机号码'
  },
  validate: value => {
    return checkChinaMobile(value)
  }
})

Validator.extend('password', {
  messages: {
    zh_CN: '6-20位，包含字母、数字、字符的组合'
  },
  validate: value => {
    // return value.length >= 6 && value.length <= 20 && /^\S*([a-zA-Z]+\S*[0-9]+|[0-9]+\S*[a-zA-Z]+)\S*$/.test(value)
    return value.length >= 6 && value.length <= 20
  }
})

Validator.extend('idCard', {
  messages: {
    zh_CN: '请输入正确的身份证号'
  },
  validate: value => {
    return isValidateIdCard(value)
  }
})

Validator.extend('chinaBankcard', {
  messages: {
    zh_CN: '请输入正确的银行卡号'
  },
  validate: value => {
    return isValidChinaBankcard(value)
  }
})

Validator.extend('borrow_amount', {
  messages: {
    zh_CN: (field, args) => '借款金额必须是10000的倍数'
  },
  validate: value => {
    return value % 10000 === 0
  }
})

Validator.extend('borrow_amount_region', {
  messages: {
    zh_CN: (field, args) => '借款金额不能少于10万(含)且不超过20万(含)'
  },
  validate: value => {
    return value >= 100000 && value <= 200000
  }
})

const dictionary = {
  zh_CN: {
    custom: {
      borrow_amount: {
        required: '借款金额不能为空' // messages can be strings as well.
      }
    }
  }
}
Validator.updateDictionary(dictionary)
