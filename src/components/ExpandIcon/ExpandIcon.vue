<template>
  <n-icon class="expand-icon-container" :component v-bind="$attrs"></n-icon>
</template>

<script setup>
import { computed } from 'vue'
import { NIcon } from 'naive-ui'

import xicons from './importXicons'
import propsObj from './props'

defineOptions({
  name: 'ExpandIcon',
})

const props = defineProps(propsObj)
const component = computed(() => xicons[props.name])
</script>

<style lang="scss" scoped></style>
