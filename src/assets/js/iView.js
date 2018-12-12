import { Row, Col, Icon, Checkbox, Modal, Circle, Select, Option } from 'iview'

const iView = {
  install (Vue) {
    Vue.component('Row', Row)
    Vue.component('Col', Col)
    Vue.component('Icon', Icon)
    Vue.component('Checkbox', Checkbox)
    Vue.component('Modal', Modal)
    Vue.component('iCircle', Circle)
    Vue.component('Select', Select)
    Vue.component('Option', Option)
  }
}

export default iView
