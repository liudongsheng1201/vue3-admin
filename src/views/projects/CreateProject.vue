<template>
  <div class="create-project-container wh100">
    <FormView @onSubmit="onSubmit" :formData :submitLoading="loading" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import FormView from './FormView.vue'

import { useCreateEffect } from '@/hooks/useCRUD'
import { creaetApi } from '@/api/projects'

const formData = ref({})

const router = useRouter()

const { loading, execute } = useCreateEffect(creaetApi)

const onSubmit = async () => {
  const data = {
    ...formData.value,
    coverImage: formData.value.coverImage?.at(0)?.url,
  }
  const res = await execute(data)
  if (res.code === 200) {
    router.go(-1)
  }
}
</script>

<style lang="scss" scoped></style>
