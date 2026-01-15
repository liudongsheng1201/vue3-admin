<template>
  <div>
    <FormView ref="formViewRef" :handleType :formData @submit="onSubmit" />
  </div>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue'
import FormView from './FormView.vue'
import { useCreateEffect } from '@/hooks/useCRUD'
import { createUserApi } from '@/api/user'

const emit = defineEmits(['refresh'])

const formData = ref({})
const { execute, handleType } = useCreateEffect(createUserApi)
const onSubmit = async (close, setLoading) => {
  const res = await execute(formData.value)
  setLoading(false)
  if (res.code === 200) {
    emit('refresh')
    close()
  }
}

const formViewRef = useTemplateRef('formViewRef')
defineExpose({
  open: () => {
    formData.value = {
      password: '123456',
    }
    formViewRef.value.open()
  },
})
</script>

<style lang="scss" scoped></style>
