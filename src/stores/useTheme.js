import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { darkTheme, zhCN, dateZhCN } from 'naive-ui'

import { THEME_KEY } from '@/config'
import { set, get } from '@/utils/localStorage'

export const useThemeStore = defineStore('theme', () => {
  // 所有主题
  const themeMap = new Map()
  themeMap.set('light', null)
  themeMap.set('dark', darkTheme)
  const themeKeys = Array.from(themeMap.keys())

  // 当前主题
  const currentKey = ref(get(THEME_KEY) || themeKeys[0])
  const theme = computed(() => themeMap.get(currentKey.value))

  /**
   * 切换主题
   * @param {Boolean} key 主题key
   */
  const changeTheme = (key) => {
    set(THEME_KEY, key)
    currentKey.value = key
  }

  // 白 可以以下配置中覆盖和拓展主题变量
  const lightThemeOverrides = {
    common: {
      paginationBKColor: 'rgba(250,250,252)',
      loginBKColor: 'linear-gradient(135deg, #f0f9f4 0%, #e8f4ff 100%)',
      // 圆形装饰颜色（以 #18a058 为主色调）
      circle1: 'linear-gradient(135deg, #18a058 0%, #36ad6a 100%)',
      circle2: 'linear-gradient(135deg, #20b869 0%, #3dcf7c 100%)',
      circle3: 'linear-gradient(135deg, #00c6ff 0%, #4a9eff 100%)',
    },
  }
  // 黑
  const darkThemeOverrides = {
    common: {
      cardColor: 'rgb(33 ,33, 33)',
      paginationBKColor: 'rgba(46,46,46)',
      loginBKColor: 'rgba(30, 41, 59, 0.9)',
      circle1: 'linear-gradient(135deg, #1e8c4d 0%, #2d9a5b 100%)',
      circle2: 'linear-gradient(135deg, #d85f8f 0%, #e69a5a 100%)',
      circle3: 'linear-gradient(135deg, #00a3cc 0%, #3a7bd5 100%)',
    },
  }
  // 主题覆盖
  const themeOverrides = computed(() => {
    return theme.value ? darkThemeOverrides : lightThemeOverrides
  })

  return {
    zhCN,
    dateZhCN,
    theme,
    currentKey,
    themeOverrides,
    themeMap,
    themeKeys,
    changeTheme,
  }
})
