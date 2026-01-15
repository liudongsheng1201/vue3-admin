<template>
  <div class="data-table-container wh100">
    <n-data-table
      remote
      flex-height
      class="wh100"
      :bordered="false"
      :columns="createColumns"
      :single-line="false"
      v-on="events"
      v-bind="$attrs"
    >
      <template #loading>
        <n-spin :show="true"></n-spin>
      </template>
      <template v-for="name in Object.keys(slots)" :key="name" #[name]>
        <slot :name></slot>
      </template>
    </n-data-table>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import propsObj from './props'

const props = defineProps(propsObj)

const slots = defineSlots()
// 所有列的默认配置
const defaultConfig = {
  ellipsis: {
    tooltip: {
      // width: 'trigger',
    },
  },
  resizable: true,
  align: 'center',
}

// 操作列
const actions = {
  ...defaultConfig,
  title: '操作',
  key: 'actions',
  render(...arg) {
    return slots.actions({ row: arg[0], index: arg[1], params: arg })
  },
}

const createColumns = computed(() => {
  if (!slots.actions) return props.columns

  const result = props.columns.reduce(
    (acc, cur, index) => {
      cur = { ...defaultConfig, ...cur }
      if (cur.key === 'actions') {
        cur = { ...actions, ...cur }
        acc.hasAction = true
      }
      acc.columns.push(cur)
      // 如果最后一个也没有，则在末尾追加
      if (index === props.columns.length - 1 && acc.hasAction === false) {
        acc.columns.push(actions)
      }
      return acc
    },
    { columns: [], hasAction: false },
  )

  return result.columns
})
</script>

<style lang="scss" scoped>
.data-table-container {
  box-sizing: border-box;
  :deep(.n-data-table__pagination) {
    padding: 12px 8px 8px 0;
    margin: 0;
    background: var(--theme-pagination-b-k-color);
    border-top: 1px solid var(--theme-border-color);
  }
}
</style>
