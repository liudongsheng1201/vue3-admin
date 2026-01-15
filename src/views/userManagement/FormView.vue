<template>
  <div class="create-call-me-container">
    <AsyncModal ref="asyncModalRef" :style="{ width: '600px' }" :title @clickOk="onSubmit">
      <n-form
        ref="formRef"
        :model="form"
        :rules
        label-placement="left"
        label-width="80"
        :style="{ padding: '10px 40px 0 0' }"
      >
        <n-form-item path="name" label="昵称">
          <n-input v-model:value="form.name" placeholder="请输入昵称，昵称长度为2~10个字符！" />
        </n-form-item>
        <n-form-item path="account" label="账号">
          <n-input
            v-model:value="form.account"
            placeholder="请输入账号，账号长度为3~20个字符！"
            :disabled="handleType !== CREATE"
          />
        </n-form-item>
        <n-form-item path="password" label="密码" v-if="handleType === CREATE">
          <n-input v-model:value="form.password" placeholder="请输入密码，密码长度为6~20个字符！" />
        </n-form-item>
      </n-form>
    </AsyncModal>
  </div>
</template>

<script setup>
import { useTemplateRef } from 'vue'
import AsyncModal from '@/components/AsyncModal/AsyncModal.vue'
import { CREATE } from '@/config'

// form校验规则
const rules = {
  name: [
    { required: true, message: '请输入名称', trigger: ['blur'] },
    { min: 2, max: 10, trigger: ['input'], message: '昵称长度为2~10个字符！' },
  ],
  account: [
    { required: true, message: '请输入账号', trigger: ['blur'] },
    { min: 3, max: 20, trigger: ['input'], message: '账号长度为3~20个字符！' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['blur'] },
    { min: 6, max: 20, trigger: ['input'], message: '密码长度为6~20个字符！' },
  ],
}

const emit = defineEmits(['submit'])
defineProps({
  title: {
    type: String,
    default: '创建用户',
  },
  handleType: {
    type: String,
    default: CREATE,
  },
})
const form = defineModel('formData', {
  type: Object,
  required: true,
})

// 提交验证
const formRef = useTemplateRef('formRef')
const onSubmit = async (close, setLoading) => {
  formRef.value.validate((valid) => {
    if (valid) {
      setLoading(false)
    } else {
      emit('submit', close, setLoading)
    }
  })
}

// 暴露弹窗方法
const asyncModalRef = useTemplateRef('asyncModalRef')
defineExpose({
  open: () => asyncModalRef.value.open(),
})
</script>

<style lang="scss" scoped></style>
