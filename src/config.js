// 服务器地址
export const SERVER = import.meta.env.VITE_API_BASE_URL

// 服务
export const SERVICE_UPLOAD = '/api/upload'
export const SERVER_FILES = '/res/files'
export const SERVICE_USERS = '/api/users'
export const SERVER_PROJECTS = '/api/projects'
export const SERVER_DATACENTER = '/api/dataCenter'

// 应用常量
export const TOKEN_KEY = 'authorization'
export const USER_INFO = 'userInfo'

// 当前环境
export const APP_ENV = import.meta.env.VITE_APP_ENV
export const IS_DEV = import.meta.env.DEV
export const IS_PROD = import.meta.env.PROD

// 操作类型
export const CREATE = 'create'
export const READ = 'read'
export const UPDATE = 'update'
export const DELETE = 'delete'

// 最大缓存实例数
export const MAX_KEEP_ALIVE = 10

// 组件前缀
export const COM_PREFIX = 'blog'

// 主题key
export const THEME_KEY = 'theme'
