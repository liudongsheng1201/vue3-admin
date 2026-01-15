<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="app-container _wh100"
  >
    <Theme>
      <n-message-provider>
        <n-loading-bar-provider>
          <n-notification-provider>
            <router-view></router-view>
          </n-notification-provider>
        </n-loading-bar-provider>
      </n-message-provider>
    </Theme>
  </n-config-provider>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import Theme from '@/components/Theme/Theme.vue'

import { useThemeStore } from '@/stores/useTheme.js'

const themeStore = useThemeStore()
const { zhCN, dateZhCN } = themeStore
const { theme, themeOverrides } = storeToRefs(themeStore)
</script>

<style lang="scss" scoped></style>
