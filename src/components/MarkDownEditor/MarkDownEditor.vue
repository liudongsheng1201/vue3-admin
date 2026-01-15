<template>
  <MdEditor v-model="model" :theme="theme" @onUploadImg="onUploadImg" />
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

import { useThemeStore } from '@/stores/useTheme'
import { uploadFileApi } from '@/api/upload'

// 使用示例参阅：https://imzbf.github.io/md-editor-v3/zh-CN/demo
const model = defineModel({ type: String, default: '' })

// 初始化主题仓库
const themeStore = useThemeStore()
const { theme: themeValue } = storeToRefs(themeStore)
const theme = computed(() => (themeValue.value ? 'dark' : ''))

// 上传图片
const onUploadImg = async (files, callback) => {
  const res = await uploadFileApi(files)
  callback(res.data.map((item) => item.url))
}
</script>
