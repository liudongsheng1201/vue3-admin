<template>
  <n-layout-sider
    class="layout-sider-container"
    collapse-mode="width"
    :collapsed-width="60"
    :collapsed="collapsed"
    :width="240"
    show-trigger="arrow-circle"
    content-style="padding: 6px;"
    bordered
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <h1 class="title">blog-admin</h1>
    <i class="logo" :class="{ transform: collapsed }" v-html="logoSvg"></i>
    <n-menu :options="menuOptions" :value="activeValue" />
  </n-layout-sider>
</template>

<script setup>
import { computed, h, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import ExpandIcon from '@/components/ExpandIcon/ExpandIcon.vue'
import { views } from '@/router/routes'
import { useLoginStore } from '@/stores/useLoginStore'

import logoSvg from '@/assets/images/logo.svg?raw'

const { isAdmin } = useLoginStore()

const collapsed = ref(false)

/**
 * 处理菜单格式
 * @param views
 * @param upPath
 */
const handleViews = (views, upPath) => {
  const routers = []
  views.forEach((route) => {
    const path = upPath + route.path
    const iconName = route.meta.icon
    const result = {
      label: () => h(RouterLink, { to: path }, () => route.meta.title),
      key: route.name,
      icon: () => (iconName ? h(ExpandIcon, { name: iconName, size: '1.1rem' }) : ''),
    }
    if (route.children && route.children.length) {
      const c = handleViews(route.children, path + '/')
      if (c.length) {
        result.children = c
      }
    }
    if (!route.meta.hidden) {
      // 如果是用户管理页面，只有管理员用户可以访问
      if (route.name === 'userInfo') {
        if (isAdmin) {
          routers.push(result)
        }
      } else {
        routers.push(result)
      }
    }
  })
  return routers
}

const menuOptions = handleViews(views, '/')

const route = useRoute()
const activeValue = computed(() => {
  const target = route.matched.findLast(
    (r) => r.meta.hidden === undefined || r.meta.hidden !== true,
  )
  return target.name
})
</script>

<style lang="scss" scoped>
.layout-sider-container {
  padding: 10px 0;
  height: 100%;

  .title {
    display: none;
  }

  .logo {
    display: block;
    margin: 0 auto;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    user-select: none;
    transition: var(--lds-transition-duration);
    color: var(--theme-primary-color);
  }
  .transform {
    transform: scale(0.5) translate(-54%, 0);
  }
}
</style>
