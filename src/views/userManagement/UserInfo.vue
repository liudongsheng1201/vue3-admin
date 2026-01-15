<template>
  <div class="create-call-me-container">
    <AsyncModal ref="asyncModalRef" :style="{ width: '600px' }" title="个人信息" @clickOk="clickOk">
      <n-form
        ref="formRef"
        :model="form"
        :rules
        label-placement="left"
        label-width="80"
        :style="{ padding: '10px 40px 0 0' }"
        :disabled="loginStore.isAdmin"
      >
        <n-form-item path="name" label="昵称">
          <n-input v-model:value="form.name" placeholder="请输入昵称，昵称长度为2~10个字符！" />
        </n-form-item>
        <n-form-item path="account" label="账号">
          <n-input
            v-model:value="form.account"
            placeholder="请输入账号，账号长度为3~20个字符！"
            disabled
          />
        </n-form-item>
        <n-form-item path="oldPassword" label="密码" v-if="!loginStore.isAdmin">
          <n-input
            v-model:value="form.oldPassword"
            placeholder="请输入密码，密码长度为6~20个字符！"
          />
        </n-form-item>
        <n-form-item label="新密码" path="password" v-if="!loginStore.isAdmin">
          <n-input v-model:value="form.password" placeholder="输入新密码" />
        </n-form-item>
      </n-form>
    </AsyncModal>
  </div>
</template>

<script setup>
import { useTemplateRef, ref } from 'vue'
import { useNotification } from 'naive-ui'

import AsyncModal from '@/components/AsyncModal/AsyncModal.vue'
import { useLoginStore } from '@/stores/useLoginStore'
import { goLogin } from '@/utils/auth'
import { useUpdateEffect } from '@/hooks/useCRUD'
import { updateUserApi } from '@/api/user'

const loginStore = useLoginStore()
const notification = useNotification()

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
  oldPassword: [
    { required: true, message: '请输入密码', trigger: ['blur'] },
    { min: 6, max: 20, trigger: ['input'], message: '密码长度为6~20个字符！' },
  ],
  password: [
    { required: true, message: '请输入新的密码', trigger: ['blur'] },
    { min: 6, max: 20, trigger: ['input'], message: '密码长度为6~20个字符！' },
  ],
}

const form = ref({ ...loginStore.userInfo })
// 提交验证
const { execute } = useUpdateEffect(updateUserApi)
const formRef = useTemplateRef('formRef')
const clickOk = async (close, setLoading) => {
  formRef.value.validate((valid) => {
    if (valid) {
      setLoading(false)
    } else {
      onSubmit(close, setLoading)
    }
  })
}

const onSubmit = async (close, setLoading) => {
  const res = await execute(form.value.id, form.value)
  if (res.code !== 200) {
    setLoading(false)
  } else {
    const ins = notification['success']({
      content: '请重新登录！',
      meta: `3 秒后自动跳转登录！`,
      duration: 3000,
      keepAliveOnHover: true,
      onClose() {
        close()
        goLogin()
      },
      onAfterLeave() {
        close()
        goLogin()
      },
      onAfterEnter() {
        let time = ref(3)
        const timer = setInterval(() => {
          time.value -= 1
          ins.meta = `${time.value} 秒后自动跳转登录！`
          if (time.value <= 0) {
            clearInterval(timer)
          }
        }, 1000)
      },
    })
  }
}

// 暴露弹窗方法
const asyncModalRef = useTemplateRef('asyncModalRef')
defineExpose({
  open: () => asyncModalRef.value.open(),
})
</script>

<style lang="scss" scoped></style>
