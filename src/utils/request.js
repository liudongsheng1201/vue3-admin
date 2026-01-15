import axios from 'axios'
import { createDiscreteApi } from 'naive-ui'

import { SERVER, TOKEN_KEY } from '../config'
import { getToken, goLogin } from '@/utils/auth'

const { message } = createDiscreteApi(['message'], {
  messageProviderProps: { placement: 'top' },
})

const instance = axios.create({
  baseURL: SERVER,
  timeout: 1000 * 60 * 3, // 3分钟
  // 自定义的属性
  customizeAttrs: {
    showMsg: true, // 使用接口返回的消息提示或者默认提示
    allResponse: false, // 返回完整的response
    carryToken: true, // 是否携带token
  },
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const { carryToken } = config.customizeAttrs
    // 统一添加令牌
    if (carryToken) {
      const token = getToken()
      if (token) {
        config.headers[TOKEN_KEY] = token
      } else {
        message.error('未登录或登录已过期！')
        goLogin()
      }
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    message.error('网络请求出现错误，请联系管理员！')
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const { showMsg, allResponse } = response.config.customizeAttrs
    const { code } = response.data

    if (code === 401) {
      message.error(response.data.msg || '未登录或登录已过期！')
      goLogin()
    }

    if (showMsg) {
      if (code === 200) {
        message.success(response.data.msg || '操作成功！')
      } else {
        message.error(response.data.msg || '操作失败！')
      }
    }
    return allResponse ? response : response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.config) {
      const { showMsg } = error.config.customizeAttrs
      if (showMsg) {
        message.error(error.config.errorMsg || '操作失败！')
      } else {
        message.error(error.message)
      }
    }
    return Promise.reject(error)
  },
)

export default instance
