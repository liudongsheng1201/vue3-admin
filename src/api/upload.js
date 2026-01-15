/**
 * 文件上传
 */
import request from '@/utils/request'
import { SERVICE_UPLOAD } from '@/config'

/**
 * 批量上传图片
 * @param {file[]} files
 * @returns
 */
export const uploadFileApi = (files, folder = 'images', options = {}) => {
  const formData = new FormData()
  for (const file of files) {
    formData.append('files', file)
  }

  return request.post(`${SERVICE_UPLOAD}/${folder}`, formData, {
    customizeAttrs: { showMsg: false },
    ...options,
  })
}
