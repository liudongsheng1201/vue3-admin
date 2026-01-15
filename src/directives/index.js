import infiniteScroll from './infiniteScroll'
import { markdown } from './md'

// 全局注册指令
export default {
  install(app) {
    app.directive('infiniteScroll', infiniteScroll)
    app.directive('md', markdown)
  },
}
