import store from 'store'
import expirePlugin from 'store/plugins/expire'
store.addPlugin(expirePlugin)

// 加载插件后的store
export default store
