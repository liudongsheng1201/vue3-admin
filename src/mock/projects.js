import Mock, { Random } from 'mockjs'
import { SERVER_PROJECTS } from '@/config'

// 列表
Mock.mock(new RegExp(`\\${SERVER_PROJECTS}\\?page=.*`), 'get', (options) => {
  const params = options.url
    .split('?')
    .at(1)
    .split('&')
    .map((v) => v.split('='))
    .reduce((a, [key, value]) => {
      a[key] = value
      return a
    }, {})

  return Mock.mock({
    code: 200,
    msg: '操作成功',
    data: {
      count: 43,
      [`rows|${params.pageSize}`]: [
        () => {
          return Mock.mock({
            id: Random.increment(),
            title: Random.ctitle(5, 20),
            content: Random.csentence(30, 500),
            coverImage: Random.image('1600x900', Random.color(), '#FFF', Random.cname()),
            publishTime: Random.datetime(),
            'commentNo|2-200': 0,
            'readNo|2-2000': 0,
            createdAt: '@datetime()',
          })
        },
      ],
    },
  })
})

// 详情
Mock.mock(new RegExp(`\\${SERVER_PROJECTS}.*`), 'get', (options) => {
  const id = options.url.split('=').at(1)
  return Mock.mock({
    code: 200,
    msg: '操作成功！',
    data: {
      id,
      title: Random.ctitle(5, 20),
      content: Random.csentence(300, 500),
      coverImage: Random.image('1600x900', Random.color(), '#FFF', Random.cname()),
      publishTime: Random.datetime(),
      'commentNo|2-200': 0,
      'readNo|2-2000': 0,
    },
  })
})

// 创建
Mock.mock(SERVER_PROJECTS, 'post', (options) => {
  const body = JSON.parse(options.body)
  return Mock.mock({
    code: 200,
    msg: '操作成功',
    data: body,
  })
})

// 修改
Mock.mock(new RegExp(`\\${SERVER_PROJECTS}.*`), 'put', (options) => {
  const body = JSON.parse(options.body)
  return Mock.mock({
    code: 200,
    msg: '操作成功',
    data: body,
  })
})

// 删除
Mock.mock(new RegExp(`\\${SERVER_PROJECTS}.*`), 'delete', (options) => {
  const id = options.url.split('=').at(1)
  return {
    code: 200,
    msg: '操作成功！',
    data: {
      id,
    },
  }
})
