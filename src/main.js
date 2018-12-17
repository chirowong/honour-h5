// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' // vue路由
import mintUI from './assets/js/mintUI' // mint-ui组件统一引用封装成插件
import honourUI from './assets/js/honourUI' // 自定义组件统一引用封装成插件
import iView from './assets/js/iView'
import './assets/js/validate' // 表单验证插件
import 'lib-flexible/flexible' // 移动端适配 px转rem插件

import 'iview/dist/styles/iview.css'
import './assets/css/reset.css' // 初始化各浏览器样式
import './assets/font/iconfont.css' // mint-ui内置iconfont
import './assets/css/my-mint.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import mock from './mock' // dev环境使用mock数据开发环境需删除

Vue.config.productionTip = false

Vue.use(mintUI) // vue挂载插件
Vue.use(iView) // vue挂载插件
Vue.use(honourUI)
Vue.use(ElementUI)

if (process.env.NODE_ENV === 'development') { // dev环境下才使用mock数据
  // mock数据
  // mock()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
