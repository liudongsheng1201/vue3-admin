import ExpandIcon from '@/components/ExpandIcon/ExpandIcon.vue'

// 全局注册组件
export default {
  install(app) {
    app.component(ExpandIcon.name, ExpandIcon)
  },
}
