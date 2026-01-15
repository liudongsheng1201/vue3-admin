<template>
  <n-layout-header class="layout-header-container flexCSB" bordered>
    <n-breadcrumb>
      <n-breadcrumb-item v-for="item in breadcrumb" :key="item.path" :href="item.path">
        <n-button text>
          <template #icon>
            <ExpandIcon :name="item.meta.icon" v-if="item.meta.icon" class="ber-icon" />
          </template>
          <span>{{ item.meta.title }}</span>
        </n-button>
        <div class="ber-item"></div>
      </n-breadcrumb-item>
    </n-breadcrumb>
    <div class="header-right flexCSB">
      <!-- 主题切换 -->
      <ExpandIcon
        :name="isDark ? 'MoonOutline' : 'SunnyOutline'"
        class="theme link"
        size="25"
        @click="changeTheme"
      />

      <n-avatar round size="small" :src="userInfo.avatar" />
      <n-dropdown :options :on-select="(key, option) => option.callback()">
        <n-button text icon-placement="right">
          {{ name }}
          <template #icon>
            <ExpandIcon name="EllipsisVerticalOutline" />
          </template>
        </n-button>
      </n-dropdown>
      <UserInfo ref="userInfoRef" />
    </div>
  </n-layout-header>
</template>

<script setup>
import { h, computed, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import ExpandIcon from '@/components/ExpandIcon/ExpandIcon.vue'
import UserInfo from '@/views/userManagement/UserInfo.vue'

import { useLoginStore } from '@/stores/useLoginStore'
import { useThemeStore } from '@/stores/useTheme'

const loginStore = useLoginStore()
const { userInfo } = storeToRefs(loginStore)

const name = computed(() => {
  return userInfo.value?.name || userInfo.value?.account || '未登录'
})

// 切换主题
const themeStore = useThemeStore()
const { currentKey } = storeToRefs(themeStore)
const isDark = computed(() => currentKey.value === themeStore.themeKeys[1])
const changeTheme = () => {
  const key = themeStore.themeKeys[isDark.value ? 0 : 1]
  themeStore.changeTheme(key)
}

const options = [
  {
    label: '个人信息',
    key: 'profile',
    icon: () => h(ExpandIcon, { name: 'Accessibility16Regular' }),
    callback() {
      open()
    },
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h(ExpandIcon, { name: 'LogOutOutline' }),
    callback() {
      loginStore.logOut()
    },
  },
]

// 处理面包屑
const route = useRoute()
const breadcrumb = computed(() => {
  // 使用路由的matched属性获取已匹配的路由记录
  return route.matched.filter((route) => route.meta?.title) // 只保留有标题的路由
})

// 个人信息
const userInfoRef = useTemplateRef('userInfoRef')
const open = () => {
  userInfoRef.value.open()
}
</script>

<style lang="scss" scoped>
.layout-header-container {
  flex-shrink: 0;
  padding: 0 12px;
  .header-right {
    gap: 15px;
  }
  .n-breadcrumb-item,
  .icon-container {
    font-size: 12px;
  }
}
</style>
