export const baseURL = 'https://blog-server-api.amarea.cn'
// export const baseURL = 'http://localhost:3000'
export const imageUploadApiURL ='https://img.amarea.cn/api/v1/upload'

export const pageSize = 10
export const appVersion = '0.2 Beta'

export const publicItem = [
  {
    name: 'admin-home',
    to: '/home',
    display: '个人资料'
  },
  {
    name: 'mypost',
    to: '/mypost',
    display: '我的文章'
  },
  {
    name: 'user-setting',
    to: '/user-setting',
    display: '用户设置'
  }
]

export const adminItem = [
  {
    name: 'dashboard',
    to: '/dashboard',
    display: '仪表盘'
  },
  {
    name: 'user-manage',
    to: '/user-manage',
    display: '用户管理'
  },
  {
    name: 'post-manage',
    to: '/post-manage',
    display: '文章管理'
  },
  {
    name: 'comment-manage',
    to: '/comment-manage',
    display: '评论管理'
  },
  {
    name: 'system-setting',
    to: '/system-setting',
    display: '系统设置'
  }
]

export const infoItem = [
  {
    name: 'about',
    to: '/about',
    display: '关于'
  },
  {
    name: 'APP_HOME',
    to: 'APP_HOME',
    display: '主页'
  }
]