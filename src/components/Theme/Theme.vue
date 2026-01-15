<template>
  <div class="global-theme-container wh100" :style="cssVars">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeVars } from 'naive-ui';
defineOptions({
  name: 'GlobalTheme'
})
// 全局注入主题变量，必须放在n-config-provider的子组件中
const themeVars = useThemeVars()
/**
 * 将themeVars转换为CSS变量对象
 * 示例：border-radius: var(--theme-border-radius);
 * 更多变量参考：https://www.naiveui.com/zh-CN/os-theme/docs/theme#use-theme-vars
 */
const cssVars = computed(() => {
  const vars = {}
  for (const key in themeVars.value) {
    // 将驼峰式键名转换为横线分隔，例如：textColor -> --text-color
    const cssKey = `--theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
    vars[cssKey] = themeVars.value[key]
  }
  return vars
})
</script>
<style lang="scss" scoped></style>
