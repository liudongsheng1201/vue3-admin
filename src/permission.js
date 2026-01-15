import { createDiscreteApi } from 'naive-ui'

import router from '@/router/index'
import { TOKEN_KEY } from '@/config'
import { findWhiteList, getToken, goLogin, setUserInfo, getUserInfo } from '@/utils/auth'
import { restoreLoginApi } from '@/api/user'

// loadingBar
const { loadingBar } = createDiscreteApi(['loadingBar'])

// 白名单
const whitelist = new Set(findWhiteList().map((d) => d.path))

/**
 * 1. 验证是否在白名单中
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const validInWhiteList = (to, from, next) => {
  // 在白名单中
  if (whitelist.has(to.path)) {
    next()
  }
  // 不在白名单中
  else {
    validHasToken(to, from, next)
  }
}

/**
 * 2. 验证是否有token
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const validHasToken = (to, from, next) => {
  // 有token,验证用户信息
  const token = getToken()
  if (token && token.startsWith('Bearer')) {
    validHasUserInfo(to, from, next)
  }
  // 没有token,跳转登录页重新登录
  else {
    goLogin()
  }
}

/**
 * 3. 验证是否有用户信息
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const validHasUserInfo = (to, from, next) => {
  // 如果有用户信息,直接放行
  if (getUserInfo()) {
    next()
  }
  // 没有用户信息，执行恢复登录
  else {
    restoreLogin(to, from, next)
  }
}

/**
 * 4. 恢复登录
 * 当本地有token,没有用户信息，执行恢复登录,后端验证是否过期
 * 1-1 执行恢复登录，成功放行
 * 1-2 失败，跳转登录页重新登录
 */
const restoreLogin = async (to, from, next) => {
  try {
    validTokenIsExpire(to, from, next)
  } catch (error) {
    console.error('恢复登录失败！' + error)
    // 出现错误重新登录
    goLogin()
  }
}

/**
 * 5. 验证token是否过期
 */
const validTokenIsExpire = async (to, from, next) => {
  const res = await restoreLoginApi()
  // 未过期，放行
  if (res.data.code === 200) {
    next()
    // 更新本地用户信息 , TOKEN_KEY此处是模拟，正常应该在响应头
    setUserInfo(res.data.data, res.data[TOKEN_KEY])
  }
  // 已过期，重新登录
  else {
    goLogin()
  }
}

router.beforeEach((to, from, next) => {
  loadingBar.start()
  try {
    validInWhiteList(to, from, next)
  } catch (err) {
    console.error('进入页面失败！', err)
    loadingBar.error()
  }
})

router.afterEach(() => {
  loadingBar.finish()
})
