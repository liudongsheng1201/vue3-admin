import md5 from 'md5'
import { cloneDeep } from 'lodash-es'

import request from '@/utils/request'
import { SERVICE_USERS } from '@/config'

const encryption = (formData) => {
  const data = cloneDeep(formData)
  if (formData.password) {
    data.password = md5(formData.password)
  }
  if (formData.oldPassword) {
    data.oldPassword = md5(formData.oldPassword)
  }
  return data
}

/**
 * 登录
 * @param {*} id
 * @param {*} password
 * @param {*} code
 * @returns
 */
export const loginApi = (formData) => {
  return request.post(`${SERVICE_USERS}/login`, encryption(formData), {
    customizeAttrs: {
      allResponse: true,
      carryToken: false,
    },
  })
}

/**
 * 恢复登录
 * @returns
 */
export const restoreLoginApi = () =>
  request.get(`${SERVICE_USERS}/whoAmI`, {
    customizeAttrs: { allResponse: true },
  })

/**
 * 创建用户
 * @param {*} formData
 * @returns
 */
export const createUserApi = (formData) => {
  return request.post(SERVICE_USERS, encryption(formData))
}

/**
 * 修改用户
 * @param {*} formData
 * @returns
 */
export const updateUserApi = (id, formData) => {
  return request.put(`${SERVICE_USERS}/${id}`, encryption(formData))
}

/**
 * 用户列表
 * @param {*} params
 * @returns
 */
export const userListApi = (params) => {
  return request.get(SERVICE_USERS, {
    params,
    customizeAttrs: {
      showMsg: false,
    },
  })
}

/**
 * 设置用户状态
 * @param {*} id
 * @param {*} status
 * @returns
 */
export const setUserStatusApi = (id, status) => {
  return request.patch(`${SERVICE_USERS}/${id}`, { status })
}
