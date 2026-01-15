import { ref, nextTick, computed } from 'vue'
import usePager from './usePager'

/**
 * 统一列表管理 Hook
 * @example
 *  使用示例
 *    const { dataList: data, loading, pagination }= useListManager(articleApi, {
 *      immediate: true,
 *      defaultParams: { status: 1 },
 *      transformResponse: (res) => res.data,
 *    })
 *  在模板中直接使用
 *    dataList
 *    pagination
 *    search({ keyword: '搜索词' })
 */
export default (fetchApi, options = {}) => {
  const {
    immediate = true, // 是否立即加载
    isPagination = true, // 是否分页
    defaultParams = {}, // 默认参数
    transformResponse = (res) => res.data, // 响应转换
    errorCallback, // 错误处理函数
    scrollLoad = false, // 滚动加载
    usePagerProps = {}, // 分页参数
  } = options

  const loading = ref(false)

  // 分页
  const pagination = usePager({ immediate: false, ...usePagerProps })
  // 数据
  const dataList = ref([])
  // 搜索参数
  const searchParams = ref({ ...defaultParams })
  // 总条数
  const total = ref(0)

  // 统一的数据获取方法
  const fetchData = async (params = {}) => {
    const page = pagination.page
    const pageSize = pagination.pageSize

    loading.value = true
    try {
      let fetchParams = { page, pageSize, ...searchParams.value, ...params }
      if (!isPagination) {
        fetchParams = { ...searchParams.value, ...params }
      }

      const res = await fetchApi(fetchParams)
      // 确保返回的是 { rows: [], count: number } 格式
      const { rows, count } = transformResponse(res)
      dataList.value = scrollLoad ? dataList.value.concat(rows) : rows
      total.value = count || dataList.value.length
      pagination.itemCount = count || dataList.value.length
      return dataList
    } catch (error) {
      console.error('获取数据失败:', error)
      errorCallback && errorCallback(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 搜索方法
  const search = (params = {}) => {
    pagination.page = 1
    searchParams.value = { ...defaultParams, ...params }
    return fetchData()
  }

  // 重置搜索
  const resetSearch = () => {
    pagination.page = 1
    searchParams.value = { ...defaultParams }
    dataList.value = []
    return fetchData()
  }

  // 刷新
  const refresh = () => {
    resetSearch()
  }

  // 如果设置了立即加载，则初始化时执行一次
  if (immediate) {
    nextTick(() => {
      fetchData()
    })
  }

  // 设置分页监听（调用分页变化时重新获取数据）
  pagination.watcher = fetchData

  // 是否加载完成
  const isLoaded = computed(() => dataList.value.length >= total.value)

  // 加载下一页
  const nextPage = () => {
    if (isLoaded.value) return
    pagination.page++
  }

  return {
    // 状态
    loading,
    dataList,
    total,
    pagination,
    searchParams,
    isLoaded,

    // 方法
    fetchData,
    search,
    resetSearch,
    refresh,
    nextPage,
  }
}
