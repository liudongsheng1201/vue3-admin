/**
 * 如果需要按需引入naive-ui
 * 直接在main.js引入该文件即可
 */
import {
  create,
  NIcon,
  NConfigProvider,
  NMessageProvider,
  NDataTable,
  NLayout,
  NLayoutContent,
  NLayoutSider,
  NLayoutHeader,
} from 'naive-ui'

export default create({
  components: [
    NIcon,
    NConfigProvider,
    NMessageProvider,
    NDataTable,
    NLayout,
    NLayoutContent,
    NLayoutSider,
    NLayoutHeader,
  ],
})
