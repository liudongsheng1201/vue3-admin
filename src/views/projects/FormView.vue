<template>
  <div class="form-view-container wh100">
    <ListHeader goBack :box-shadow="false" :has-border="['bottom']"></ListHeader>
    <div class="form-conteiner">
      <n-spin :show="submitLoading">
        <n-form
          ref="formRef"
          :model="model"
          :rules="rules"
          label-placement="left"
          label-width="auto"
        >
          <n-form-item label="名称：" path="title">
            <n-input v-model:value="model.title" placeholder="项目名称" />
          </n-form-item>
          <n-form-item label="封面图：" path="coverImage">
            <UploadFile v-model="model.coverImage" :max="1" />
          </n-form-item>
          <n-form-item label="正文：" path="content">
            <MarkDownEditor v-model="model.content" />
          </n-form-item>
          <n-button type="primary" :loading="submitLoading" class="submit-btn" @click="onSubmit">
            保存
          </n-button>
        </n-form>
      </n-spin>
    </div>
  </div>
</template>

<script setup>
import { useTemplateRef } from 'vue'

import MarkDownEditor from '@/components/MarkDownEditor/MarkDownEditor.vue'
import UploadFile from '@/components/UploadFile/UploadFile.vue'
import ListHeader from '@/components/ListHeader/ListHeader.vue'

defineProps({
  submitLoading: Boolean,
})

const formRef = useTemplateRef('formRef')
const rules = {
  title: [{ required: true, message: '名称不能为空！', trigger: ['blur'] }],
  coverImage: [{ required: true, type: 'array', message: '封面图不能为空！', trigger: ['blur'] }],
}
const model = defineModel('formData', {
  default: () => ({
    content: '',
  }),
})

const emit = defineEmits(['onSubmit'])
const onSubmit = async () => {
  await formRef.value.validate()
  emit('onSubmit', model.value)
}
</script>

<style lang="scss" scoped>
.form-view-container {
  background-color: var(--theme-base-color);
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .form-conteiner {
    flex: 1;
    padding: var(--lds-block-interval);
    padding-top: 30px;
    overflow-y: auto;
  }
  .submit-btn {
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>
