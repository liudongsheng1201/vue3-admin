/**
 * 静态路由
 * 只列出自定义字段的说明，其余字段请参考vue-router
 * name保持全局唯一
 *
 * @param {Boolean} meta.hidden         default: false      菜单是否显示/隐藏
 * @param {String}  meta.title          default: undefined  菜单名称，在页面显示的名字
 * @param {String}  meta.icon           default: undefined  菜单前面的图标
 * @param {String}  meta.link           default: undefined  待开发，用于设置外链地址，如：link: https://www.baidu.com，设置了link后path属性不生效
 * @param {String}  meta.keepAlive      default: undefined  是否缓存页面组件,注意这里是组件名称
 * @param {String}  meta.transitionName default: fade       组件过渡动画
 * @param {Boolean} meta.auth           default: true       是否需要登录授权
 */

const routeViews = [
  {
    path: 'dataCenter',
    name: 'dataCenter',
    component: () => import('@/views/dataCenter/DataCenter.vue'),
    meta: {
      title: '数据中心',
      icon: 'GlobeOutline',
    },
  },
  {
    path: 'projects',
    name: 'projects',
    redirect: '/projects/projectList',
    meta: {
      title: '项目&效果',
      icon: 'AlbumsOutline',
    },
    children: [
      {
        path: 'projectList',
        name: 'projectList',
        component: () => import('@/views/projects/ProjectsList.vue'),
        meta: {
          title: '项目列表',
          icon: 'SparklesOutline',
        },
      },
      {
        path: 'createProject',
        name: 'createProject',
        component: () => import('@/views/projects/CreateProject.vue'),
        meta: {
          title: '添加',
          icon: 'create',
          hidden: true,
        },
      },
      {
        path: 'updateProject/:id',
        name: 'updateProject',
        component: () => import('@/views/projects/UpdateProject.vue'),
        meta: {
          title: '修改',
          hidden: true,
        },
      },
    ],
  },
  {
    path: 'icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
    meta: {
      title: '图标大全',
      icon: 'Icons24Regular',
    },
  },
  {
    path: 'userInfo',
    name: 'userInfo',
    component: () => import('@/views/userManagement/UserList.vue'),
    meta: {
      title: '用户管理',
      icon: 'IdCardOutline',
    },
  },
]

/**
 * 统一添加默认配置
 * @param {*} arr
 * @returns
 */
const defaultConf = {
  meta: {
    auth: true,
  },
}
const handleViews = (arr = routeViews) => {
  return arr.map((route) => {
    route.meta = { ...defaultConf.meta, ...(route.meta || {}) }
    if (route.children && route.children.length) {
      route.children = handleViews(route.children)
    }
    return route
  })
}

export const views = handleViews()

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/Layout.vue'),
    redirect: `/${views.at(0).path}`,
    children: views,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/notFound/NotFound.vue'),
  },
]

export default routes
