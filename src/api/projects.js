/**
 * 项目&效果
 */
import request from '@/utils/request'
import { SERVER_PROJECTS } from '@/config'

/**
 * 列表
 * @returns
 */
export const listApi = (params) => {
  return request.get(SERVER_PROJECTS, {
    params,
    customizeAttrs: { showMsg: false },
  })
}

/**
 * 创建
 * @returns
 */
export const creaetApi = (formValue) => request.post(SERVER_PROJECTS, formValue)

/**
 * 更新
 * @returns
 */
export const updateApi = (id, formValue) => {
  return request.put(`${SERVER_PROJECTS}/${id}`, formValue)
}

/**
 * 删除
 */
export const deleteApi = (id) => request.delete(`${SERVER_PROJECTS}/${id}`)

/**
 * 详情
 */
export const readApi = (id) => {
  return request.get(`${SERVER_PROJECTS}/${id}`, {
    customizeAttrs: { showMsg: false },
  })
}
