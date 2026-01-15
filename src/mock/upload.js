import Mock, { Random } from 'mockjs'
import { SERVICE_UPLOAD } from '@/config'

Mock.mock(`${SERVICE_UPLOAD}/images`, 'post', (options) => {
  const body = options.body?.getAll('files')
  console.log(body, 'bodymock')

  return Mock.mock({
    code: 200,
    msg: '操作成功',
    data: body.map((item) => {
      return Mock.mock({
        id: Random.id(),
        url: Random.image('200x100', Random.color()),
        originalname: item.name,
        size: item.size,
        mimetype: item.type,
      })
    }),
  })
})
