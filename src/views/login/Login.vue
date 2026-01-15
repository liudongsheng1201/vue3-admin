<template>
  <div class="login-container">
    <!-- 背景 -->
    <div class="background-elements">
      <div v-for="i in 3" :key="i" class="circle" :class="`circle-${i}`"></div>
      <div class="grid-overlay"></div>
    </div>

    <!-- 主题切换 -->
    <ExpandIcon
      :name="isDark ? 'MoonOutline' : 'SunnyOutline'"
      class="theme link"
      size="25"
      @click="changeTheme"
    />

    <!-- 登录卡片 -->
    <div class="login-card">
      <!-- 卡片头部 -->
      <div class="card-header">
        <div class="logo">
          <div class="logo-icon">
            <ExpandIcon name="ShieldCheckmarkOutline" size="28" color="#4f8cff" />
          </div>
          <h1>vue3-admin</h1>
        </div>
        <p class="welcome-text">欢迎回来，请登录您的账户</p>
      </div>

      <!-- 登录表单 -->
      <n-form
        ref="formRef"
        :model="form"
        :rules="rules"
        size="large"
        label-placement="top"
        class="login-form"
      >
        <!-- 账号输入 -->
        <n-form-item label="账号" path="account">
          <n-input
            v-model:value.trim="form.account"
            placeholder="请输入账号"
            clearable
            round
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <ExpandIcon name="PersonOutline" color="#7c8db5" />
            </template>
          </n-input>
        </n-form-item>

        <!-- 密码输入 -->
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value.trim="form.password"
            type="password"
            placeholder="请输入密码"
            clearable
            round
            show-password-on="click"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <ExpandIcon name="LockClosedOutline" color="#7c8db5" />
            </template>
          </n-input>
        </n-form-item>

        <!-- 验证码输入 -->
        <n-form-item label="验证码" path="code">
          <div class="captcha-section">
            <n-input
              v-model:value.trim="form.code"
              placeholder="验证码"
              round
              @keyup.enter="handleLogin"
              style="flex: 1"
            >
              <template #prefix>
                <ExpandIcon name="KeyOutline" color="#7c8db5" />
              </template>
            </n-input>
            <div class="captcha-display" @click="refreshCaptcha">
              <span class="captcha-text">A3B8</span>
            </div>
          </div>
        </n-form-item>

        <!-- 选项栏 -->
        <div class="form-options">
          <n-checkbox v-model:checked="rememberMe">记住密码</n-checkbox>
          <n-button text type="primary" size="small" class="forgot-btn"> 忘记密码？ </n-button>
        </div>

        <!-- 登录按钮 -->
        <n-button
          type="primary"
          size="large"
          round
          block
          :loading="loginStore.loading"
          @click="handleLogin"
          class="login-btn"
        >
          <template #icon>
            <ExpandIcon name="LogInOutline" v-if="!loginStore.loading" />
          </template>
          {{ loginStore.loading ? '登录中...' : '立即登录' }}
        </n-button>

        <!-- 注册提示 -->
        <div class="register-hint">
          <span>还没有账号？</span>
          <n-button text type="primary" size="small">立即注册</n-button>
        </div>
      </n-form>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>© 2026 后台管理系统 版本 1.0.0</p>
      <div class="footer-links">
        <a href="#" class="footer-link">隐私政策</a>
        <span class="divider">|</span>
        <a href="#" class="footer-link">服务条款</a>
        <span class="divider">|</span>
        <a href="#" class="footer-link">帮助中心</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/stores/useLoginStore'
import { useThemeStore } from '@/stores/useTheme'

defineOptions({
  name: 'AdminLogin',
})

const rules = {
  account: [
    { required: true, message: '请输入账号', trigger: ['blur'] },
    { message: '账号长度为3~20个字符', trigger: ['input'], min: 3, max: 20 },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['input', 'blur'] },
    { message: '密码长度为6~20个字符', trigger: ['input'], min: 6, max: 20 },
  ],
  code: { required: true, message: '请输入验证码', trigger: ['blur'] },
}

// 切换主题
const themeStore = useThemeStore()
const { currentKey } = storeToRefs(themeStore)
const isDark = computed(() => currentKey.value === themeStore.themeKeys[1])
const changeTheme = () => {
  const key = themeStore.themeKeys[isDark.value ? 0 : 1]
  themeStore.changeTheme(key)
}

// 登录
const form = ref({
  account: 'admin',
  password: '123456',
  code: 'a3b8',
})
const formRef = ref(null)
const loginStore = useLoginStore()
const handleLogin = async () => {
  try {
    await formRef.value?.validate()
    loginStore.login(form.value)
  } catch (error) {
    console.error('登录失败:', error)
  }
}

const refreshCaptcha = () => {
  console.log('刷新验证码')
}

const rememberMe = ref(false)
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
