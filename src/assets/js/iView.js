import { Tabs, TabPane } from 'iview'

const iView = {
  install (Vue) {
    Vue.component('Tabs', Tabs)
    Vue.component('TabPane', TabPane)
  }
}

export default iView
