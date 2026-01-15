<template>
  <div class="icons-container">
    <n-card
      v-for="Icon in iconMap.default"
      :key="Icon.name"
      class="icon-item"
      content-class="icon-item-content"
    >
      <n-popover trigger="hover">
        <template #trigger>
          <ExpandIcon :name="Icon.name" size="24" :color="themeVars.primaryColor" />
        </template>
        {{ Icon.name }}
      </n-popover>
    </n-card>
  </div>
</template>

<script setup>
import * as iconMap from '@/components/ExpandIcon/importXicons.js'
import { useThemeVars } from 'naive-ui'

defineOptions({
  name: 'AdminIcons',
})

const themeVars = useThemeVars()
</script>

<style lang="scss" scoped>
.icons-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  .icon-item {
    width: 100px;
    height: 60px;
  }
  :deep(.icon-item-content) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
