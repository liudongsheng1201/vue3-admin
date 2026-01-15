<template>
  <div class="echarts-container wh100" ref="echartsContainer"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, useTemplateRef, onUnmounted } from 'vue'
import { debounce } from 'lodash-es'
import { useThemeStore } from '@/stores/useTheme'

defineOptions({
  name: 'AdminEcharts',
})

const themeStore = useThemeStore()
const emit = defineEmits(['inited'])
const props = defineProps({
  option: {
    type: Object,
    default: () => ({}),
  },
})

const chartDom = useTemplateRef('echartsContainer')
let chart
/**
 * 更新数据
 * @param newOpt
 */
const setOption = (newOpt) => {
  chart.setOption(newOpt, {
    notMerge: false, // 合并配置
    lazyUpdate: true, // 懒更新，提高性能
  })
}

/**
 * 设置loading
 * @param value
 */
const setLoading = (value) => {
  value ? chart.showLoading() : chart.hideLoading()
}

/**
 * 窗口大小变化时重绘
 */
const handleResize = debounce(() => {
  if (chart) chart.resize()
}, 300)

/**
 * 初始化完成
 */
onMounted(() => {
  chart = echarts.init(chartDom.value)

  chart.setOption(props.option, themeStore.currentKey)
  const handles = {
    setLoading,
    setOption,
  }
  emit('inited', handles)
  window.addEventListener('resize', handleResize)
})

/**
 * 销毁chart,移除监听
 */
onUnmounted(() => {
  if (chart) {
    chart.dispose()
    chart = null
  }
  window.removeEventListener('resize', handleResize)
})

defineExpose({
  setLoading,
  setOption,
})
</script>

<style lang="scss" scoped></style>
