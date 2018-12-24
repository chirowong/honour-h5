import {Header, SearchHeader, ContentCard} from '../../components/Common'

const honourUI = {
  install (Vue) {
    Vue.component('Header', Header)
    Vue.component('SearchHeader', SearchHeader)
    Vue.component('ContentCard', ContentCard)
  }
}

export default honourUI
