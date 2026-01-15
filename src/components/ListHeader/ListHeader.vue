<template>
  <div class="list-header-container" :class="{ shadow: boxShadow }">
    <n-card :content-class="contentClass" :bordered="false" v-bind="$attrs">
      <ExpandIcon
        v-if="goBack"
        name="ArrowUndoOutline"
        class="back-icon link"
        size="1.2rem"
        @click="$router.go(-1)"
      />
      <slot></slot>
    </n-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import ExpandIcon from '@/components/ExpandIcon/ExpandIcon.vue'
import propsObj from './props'

const props = defineProps(propsObj)

const contentClass = computed(() => {
  let classes = 'card-content'
  if (props.hasBorder) {
    const borders = props.hasBorder.reduce((acc, cur) => acc + ` border-${cur}`, '')
    classes += borders
  }
  return classes
})
</script>

<style lang="scss" scoped>
.list-header-container {
  position: sticky;
  z-index: 1;
  :deep(.card-content) {
    padding: var(--lds-block-interval-small);
  }
  :deep(.border-bottom, .border-top, .border-right, .border-left) {
    border-bottom: 1px solid var(--theme-border-color);
  }
  .back-icon {
    margin-right: 18px;
  }
}
.shadow {
  box-shadow: inset var(--lds-box-shadow1);
}
</style>
