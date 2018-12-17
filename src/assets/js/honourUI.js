import {Header, SearchHeader} from '../../components/Common'

const honourUI = {
  install (Vue) {
    Vue.component('Header', Header)
    Vue.component('SearchHeader', SearchHeader)
  }
}

export default honourUI
