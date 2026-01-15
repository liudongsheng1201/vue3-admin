<template>
  <n-modal
    class="async-modal-container"
    preset="dialog"
    :showIcon="false"
    draggable
    :style="{ width: '800px' }"
    v-model:show="state"
    v-bind="$attrs"
  >
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #action>
      <div class="action-container">
        <n-button @click="close"> {{ cancelText }} </n-button>
        <n-button type="primary" @click="handleOk" :loading>
          {{ okText }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue'
import { debounce } from 'lodash-es'

import { COM_PREFIX } from '@/config'
import useState from '@/hooks/useState'
import propsObj from './props'

defineOptions({
  name: COM_PREFIX + 'AsyncModal',
})

const emit = defineEmits(['clickOk'])
defineProps(propsObj)
// 打开关闭弹窗
const { state, open, setState } = useState()
const loading = ref(false)
const setLoading = (status = false) => {
  loading.value = status
}

const close = () => {
  setLoading()
  setState(false)
}

/**
 * 确定按钮
 */
const handleOk = debounce(async () => {
  setLoading(true)
  emit('clickOk', close, setLoading)
}, 200)

defineExpose({ open, close })
</script>

<style lang="scss" scoped>
.async-modal-container {
  .action-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }
}
</style>
