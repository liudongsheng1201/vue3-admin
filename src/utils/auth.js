import router from '@/router/index'
import routes from '@/router/routes'
import { TOKEN_KEY, USER_INFO } from '@/config'
import { set, get, remove } from './localStorage'

/**
 * 获取路由白名单
 * @param {*} arr
 * @param {*} result
 * @returns
 */
export const findWhiteList = (arr = routes, result = []) => {
  arr.forEach((route) => {
    if (!route.meta || !route.meta.auth) {
      result.push(route)
    }
    if (route.children && route.children.length) {
      findWhiteList(route.children, result)
    }
  })
  return result
}

/**
 * 获取token
 */
export const getToken = () => get(TOKEN_KEY)

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = () => get(USER_INFO)

/**
 * 保存用户信息
 * @param {*} data
 * @param {*} token
 */
export const setUserInfo = (data, token) => {
  set(USER_INFO, data)
  set(TOKEN_KEY, token)
}

/**
 * 删除用户信息
 */
export const delUserInfo = () => {
  remove(USER_INFO)
  remove(TOKEN_KEY)
}

/**
 * 跳转登录页
 */
export const goLogin = () => {
  delUserInfo()
  router.push('/login')
}
