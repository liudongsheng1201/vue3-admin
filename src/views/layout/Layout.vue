<template>
  <n-layout class="layout-container wh100" has-sider>
    <LayoutSider />
    <main class="layout-main">
      <LayoutHeader />
      <LayoutContent />
    </main>
  </n-layout>
</template>

<script setup>
import LayoutContent from './LayoutContent.vue'
import LayoutHeader from './LayoutHeader.vue'
import LayoutSider from './LayoutSider.vue'

defineOptions({
  name: 'AdminLayout',
})
</script>

<style lang="scss" scoped>
.layout-container {
  .layout-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
    .layout-header-container {
      height: 52px;
      box-sizing: border-box;
    }
    .layout-content-container {
      height: calc(100% - 52px);
      box-sizing: border-box;
      overflow-y: auto;
    }
  }
}
</style>
