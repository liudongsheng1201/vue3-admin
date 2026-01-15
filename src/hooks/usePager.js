import { reactive, watchEffect } from 'vue'

/**
 * 分页器
 */
export default (options = {}) => {
  const pagination = reactive({
    // 当前页
    page: 1,
    // 每页展示多少条数据
    pageSize: 20,
    // 每页展示多少条数据选项
    pageSizes: [5, 7, 10, 20, 50, 100],
    // 总条数
    itemCount: 0,

    // 执行函数（外部传入）
    watcher: null,

    /**
     * 切换页
     * @param {Number} page
     */
    onUpdatePage(page) {
      pagination.page = page
    },

    /**
     * 切换每页展示多少条数据
     * @param {Number} pageSize
     */
    onUpdatePageSize(pageSize) {
      pagination.pageSize = pageSize
      pagination.page = 1
    },

    // 分页前缀
    prefix: ({ itemCount }) => `共 ${itemCount} 条`,
    'show-size-picker': true,
    'show-quick-jumper': true,
    immediate: true,
    ...options,
  })

  // 使用 watchEffect 自动监听 page 和 pageSize 的变化
  watchEffect(() => {
    const { page, pageSize, watcher, immediate } = pagination
    if (typeof watcher === 'function') {
      // immediate 为true 立即执行 ,否则跳过watcher赋值阶段，下一次执行
      if (immediate || watcher.created) {
        watcher(page, pageSize)
      }
      watcher.created = true
    }
  })

  return pagination
}
