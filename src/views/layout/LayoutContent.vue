<template>
  <div bordered class="layout-content-container">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta?.transitionName || 'slide-fade'">
        <keep-alive :max="MAX_KEEP_ALIVE" :include="keepAliveComponentNames">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { MAX_KEEP_ALIVE } from '@/config'
import routes from '@/router/routes'

// 需要缓存的组件名称集合
const filterComponentNames = (arr, result = new Set()) => {
  arr.forEach((r) => {
    if (r.meta?.keepAlive) {
      result.add(r.meta.keepAlive)
    }
    if (r.children && r.children.length) {
      filterComponentNames(r.children, result)
    }
  })
  return Array.from(result)
}

const keepAliveComponentNames = filterComponentNames(routes)
</script>

<style lang="scss" scoped>
.layout-content-container {
  overflow: hidden;
  flex: 1;
  background-color: var(--theme-body-color);
  padding: 8px;
  width: calc(100% - 16px);

  // 基础淡入淡出动画
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  // 滑动淡入淡出
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }

  .slide-fade-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }

  .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .slide-fade-enter-to,
  .slide-fade-leave-from {
    opacity: 1;
    transform: translateX(0);
  }

  // 缩放淡入淡出
  .zoom-fade-enter-active,
  .zoom-fade-leave-active {
    transition: all 0.3s ease;
  }

  .zoom-fade-enter-from {
    opacity: 0;
    transform: scale(0.95);
  }

  .zoom-fade-leave-to {
    opacity: 0;
    transform: scale(1.05);
  }

  .zoom-fade-enter-to,
  .zoom-fade-leave-from {
    opacity: 1;
    transform: scale(1);
  }

  // 从底部滑入
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.3s ease;
  }

  .slide-up-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }

  .slide-up-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }

  .slide-up-enter-to,
  .slide-up-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
