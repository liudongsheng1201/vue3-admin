import request from '@/utils/request'
import { SERVER_DATACENTER } from '@/config'

export const getLineApi = () => {
  return request.get(`${SERVER_DATACENTER}/line`, {
    customizeAttrs: { showMsg: false },
  })
}

export const getPieApi = () => {
  return request.get(`${SERVER_DATACENTER}/pie`, {
    customizeAttrs: { showMsg: false },
  })
}

export const getBarApi = () => {
  return request.get(`${SERVER_DATACENTER}/bar`, {
    customizeAttrs: { showMsg: false },
  })
}
