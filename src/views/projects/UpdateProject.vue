<template>
  <div class="update-project-container wh100">
    <FormView
      :formData="formData"
      @onSubmit="onSubmit"
      :submitLoading="getDetailLoading || loading"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import FormView from './FormView.vue'
import { useUpdateEffect, useReadEffect } from '@/hooks/useCRUD'
import { updateApi, readApi } from '@/api/projects'

const route = useRoute()
const router = useRouter()

const formData = ref({})

const { loading: getDetailLoading, execute: getDetail } = useReadEffect(readApi)

// 获取详情
getDetail(route.params.id, (res) => {
  console.log(res, '详情！')

  formData.value = {
    ...res.data,
    coverImage: [
      {
        id: Date.now(),
        url: res.data.coverImage,
        type: 'image/jpeg',
        status: 'finished',
      },
    ],
  }
})

// 修改数据
const { loading, execute } = useUpdateEffect(updateApi)
const onSubmit = async () => {
  const data = {
    ...formData.value,
    coverImage: formData.value.coverImage?.at(0)?.url,
  }
  const res = await execute(route.params.id, data)
  if (res.code === 200) {
    router.go(-1)
  }
}
</script>

<style lang="scss" scoped></style>
