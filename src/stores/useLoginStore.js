import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { createDiscreteApi } from 'naive-ui'

import { TOKEN_KEY } from '@/config'
import { getUserInfo, setUserInfo, goLogin } from '@/utils/auth'
import { loginApi } from '@/api/user'

const { message } = createDiscreteApi(['message'], {
  messageProviderProps: { placement: 'top' },
})

export const useLoginStore = defineStore('login', () => {
  const loading = ref(false)
  const router = useRouter()
  const userInfo = ref(getUserInfo())
  // 是否是管理员
  const isAdmin = computed(() => userInfo.value?.account === 'admin')

  /**
   * 登录
   */
  const login = async (formValue) => {
    loading.value = true
    try {
      const res = await loginApi(formValue)
      if (res.data.code === 200) {
        userInfo.value = res.data.data
        // 存储用户信息 // TOKEN_KEY应该是在响应头里面，这里是使用mockjs模拟

        setUserInfo(res.data.data, res.data[TOKEN_KEY])
        // 跳转首页
        router.push('/')
      } else {
        message.error(res.data.msg)
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * 登出
   */
  const logOut = async () => {
    goLogin()
  }

  return { userInfo, loading, isAdmin, login, logOut }
})
