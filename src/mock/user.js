import Mock, { Random } from 'mockjs'
import { SERVICE_USERS, TOKEN_KEY } from '@/config'

const data = {
  name: Random.cname(),
  loginTime: Random.now(),
  avatar: Random.image('200x200', Random.color(), '#FFF', 'hello'),
}
// 登录
Mock.mock(`${SERVICE_USERS}/login`, 'post', (options) => {
  const body = JSON.parse(options.body)
  return {
    code: 200,
    msg: '登录成功！',
    [TOKEN_KEY]: 'Bearer ' + Math.random().toString(16).padStart(32, Math.random()),
    data: {
      ...data,
      account: body.account,
    },
  }
})

// 恢复登录
Mock.mock(`${SERVICE_USERS}/whoAmI`, 'get', () => {
  return {
    code: 200,
    msg: '登录成功！',
    [TOKEN_KEY]: 'Bearer ' + Math.random().toString(16).padStart(32, Math.random()),
    data: {
      ...data,
      account: 'admin',
    },
  }
})

// 列表
Mock.mock(new RegExp(`\\${SERVICE_USERS}\\?page=.*`), 'get', (options) => {
  const params = options.url
    .split('?')
    .at(1)
    .split('&')
    .map((v) => v.split('='))
    .reduce((a, [key, value]) => {
      a[key] = value
      return a
    }, {})
  return {
    code: 200,
    msg: '操作成功！',
    data: Mock.mock({
      count: 28,
      [`rows|${params.pageSize}`]: [
        () => {
          return Mock.mock({
            id: Random.increment(),
            name: Random.ctitle(5, 20),
            account: Random.zip(),
            avatar: Random.image('200x200', Random.color(), '#FFF', Random.cname()),
            createAt: '@datetime()',
            updateAt: '@datetime()',
            status: Math.random() > 0.3,
          })
        },
      ],
    }),
  }
})

// 更新状态
Mock.mock(new RegExp(`\\${SERVICE_USERS}.*`), 'patch', (options) => {
  const body = JSON.parse(options.body)
  return {
    code: 200,
    msg: '操作成功！',
    data: {
      ...body,
    },
  }
})

// 修改
Mock.mock(new RegExp(`\\${SERVICE_USERS}.*`), 'put', (options) => {
  const body = JSON.parse(options.body)
  return {
    code: 200,
    msg: '操作成功！',
    data: {
      ...body,
    },
  }
})
