import { Tabbar, TabItem, Button, Field, MessageBox, Loadmore } from 'mint-ui'

const mintUI = {
  install (Vue) {
    Vue.component(Tabbar.name, Tabbar)
    Vue.component(TabItem.name, TabItem)
    Vue.component(Button.name, Button)
    Vue.component(Field.name, Field)
    Vue.component(MessageBox.name, MessageBox)
    Vue.component(Loadmore.name, Loadmore)
  }
}

export default mintUI
