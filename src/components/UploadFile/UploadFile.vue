<template>
  <div class="upload-image-container wh100">
    <n-upload
      list-type="image-card"
      :custom-request="customRequest"
      :file-list="fileList"
      @before-upload="handleBeforeUpload"
      @update:file-list="handleFileListUpdate"
      v-bind="$attrs"
    >
      <slot>点击上传</slot>
    </n-upload>
  </div>
</template>

<script setup>
import { onUnmounted } from 'vue'

import { uploadFileApi } from '@/api/upload'
import propsObj from './props'
import { random } from 'lodash-es'

const props = defineProps(propsObj)

// 使用 defineModel 来管理文件列表
const fileList = defineModel({ type: Array, default: () => [] })

// 处理文件列表更新
const handleFileListUpdate = (newList) => {
  fileList.value = newList
}

// 处理文件上传前的逻辑
const handleBeforeUpload = ({ file }) => {
  // 为新文件创建对象并添加到列表
  const newFile = {
    ...file,
    status: 'uploading', // 设置为 uploading 状态
    url: URL.createObjectURL(file.file), // 预览URL
  }

  // 添加到文件列表
  fileList.value = [...fileList.value, newFile]

  // 手动触发自定义上传
  triggerCustomUpload(newFile)

  // 返回 false 阻止默认上传行为
  return false
}

// 手动触发自定义上传
const triggerCustomUpload = async (file) => {
  // 模拟 custom-request 的参数
  const uploadOptions = {
    file: {
      ...file,
      file: file.file,
    },
    onFinish: (result) => {
      // 更新文件状态为完成
      updateFileStatus(file.id, 'finished', 100, result?.url)
    },
    onError: (error) => {
      console.error('上传失败:', error)
      // 更新文件状态为错误
      updateFileStatus(file.id, 'error', 0)
    },
    onProgress: (progress) => {
      // 更新上传进度
      updateFileStatus(file.id, 'uploading', progress.percent)
    },
  }

  // 调用您的自定义上传函数
  customRequest(uploadOptions)
}

// 自定义上传函数
const customRequest = async ({ file, onFinish, onError, onProgress }) => {
  try {
    const valid = props.onBeforeUpload(file)
    if (!valid) {
      throw new Error('验证失败！')
    }
    // 上传
    const res = await uploadFileApi([file.file], props.folder, {
      // 如果有进度回调，可以在这里使用
      // onUploadProgress(e) {
      //   const percent = Math.round((e.loaded * 100) / e.total)
      //   onProgress({ percent })
      // },
    })

    // 模拟进度
    const imgInfo = res.data.at(0)
    let percent = 0
    const id = setInterval(() => {
      if (percent >= 100) {
        clearInterval(id)
        onFinish({
          url: imgInfo.url,
          name: imgInfo.originalname,
        })
        return
      }
      percent += random(1, 10)
      onProgress({ percent })
    }, 100)

    // if (res.code === 200) {
    //   const imgInfo = res.data.at(0)

    //   onFinish({
    //     url: imgInfo.url,
    //     name: imgInfo.originalname,
    //   })
    // } else {
    //   onError({ message: res.message || '上传失败' })
    // }
  } catch (error) {
    onError({ message: error.message || '上传异常' })
  }
}

// 更新文件状态的辅助函数
const updateFileStatus = (fileId, status, percentage, url = null) => {
  fileList.value = fileList.value.map((file) => {
    if (file.id === fileId) {
      const updatedFile = {
        ...file,
        status,
        percentage,
      }

      if (url) {
        // 释放之前创建的预览URL
        if (file.url && file.url.startsWith('blob:')) {
          URL.revokeObjectURL(file.url)
        }
        updatedFile.url = url
      }

      return updatedFile
    }
    return file
  })
}

// 清理预览URL
onUnmounted(() => {
  fileList.value.forEach((file) => {
    if (file.url && file.url.startsWith('blob:')) {
      URL.revokeObjectURL(file.url)
    }
  })
})
</script>

<style lang="scss" scoped></style>
