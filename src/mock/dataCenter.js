import Mock, { Random } from 'mockjs'
import { SERVER_DATACENTER } from '@/config'
import { random } from 'lodash-es'

Mock.mock(`${SERVER_DATACENTER}/line`, 'get', () => {
  return Mock.mock({
    code: 200,
    msg: '操作成功',
    [`data|3`]: [
      () => {
        return Array.from({ length: random(3, 7) }, () => random(50, 300))
      },
    ],
  })
})

Mock.mock(`${SERVER_DATACENTER}/bar`, 'get', () => {
  return Mock.mock({
    code: 200,
    msg: '操作成功',
    data: [
      () => {
        return Array.from({ length: 7 }, () => random(50, 300))
      },
    ],
  })
})

Mock.mock(`${SERVER_DATACENTER}/pie`, 'get', () => {
  return Mock.mock({
    code: 200,
    msg: '操作成功',
    'data|2-7': [
      () => {
        return Mock.mock({ value: random(0, 100), name: Random.cname() })
      },
    ],
  })
})
