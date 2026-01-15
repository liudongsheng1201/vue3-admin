<template>
  <div>
    <FormView :formData :handleType @submit="onSubmit" title="修改用户" ref="formViewRef" />
  </div>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue'
import FormView from './FormView.vue'
import { useUpdateEffect } from '@/hooks/useCRUD'
import { updateUserApi } from '@/api/user'

const emit = defineEmits(['refresh'])

const { execute, handleType } = useUpdateEffect(updateUserApi)
const formData = ref({})
const onSubmit = async (close) => {
  const res = await execute(formData.value.id, { ...formData.value })
  if (res.code === 200) {
    close()
    emit('refresh')
  }
}

const formViewRef = useTemplateRef('formViewRef')
defineExpose({
  open: (row) => {
    formData.value = { ...row }
    formViewRef.value.open()
  },
})
</script>

<style lang="scss" scoped></style>
