import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  //重定向
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/admin',
    redirect: '/admin/home'
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/public/home.vue'),
    meta: {
      requireLogin: true
    }
  },
  // 路由项
  {
    path: '/admin',
    component: () => import('@/views/admin.vue'),
    children: [
      {
        path: 'home',
        name: 'admin-home',
        component: () => import('@/views/admin/home.vue'),
        meta: {
          title: '个人资料 - 管理后台',
          requireLogin: true
        }
      },
      {
        path: 'mypost',
        name: 'mypost',
        component: () => import('@/views/admin/mypost.vue'),
        meta: {
          title: '我的文章 - 管理后台',
          requireLogin: true
        }
      },
      {
        path: 'user-setting',
        name: 'user-setting',
        component: () => import('@/views/admin/user-setting.vue'),
        meta: {
          title: '用户设置 - 管理后台',
          requireLogin: true
        }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/admin/dashboard.vue'),
        meta: {
          title: '仪表盘 - 管理后台',
          requireAdmin: true
        }
      },
      {
        path: 'user-manage',
        name: 'user-manage',
        component: () => import('@/views/admin/user-manage.vue'),
        meta: {
          title: '用户管理 - 管理后台',
          requireAdmin: true
        }
      },
      {
        path: 'post-manage',
        name: 'post-manage',
        component: () => import('@/views/admin/post-manage.vue'),
        meta: {
          title: '文章管理 - 管理后台',
          requireAdmin: true
        }
      },
      {
        path: 'comment-manage',
        name: 'comment-manage',
        component: () => import('@/views/admin/comment-manage.vue'),
        meta: {
          title: '评论管理 - 管理后台',
          requireAdmin: true
        }
      },
      {
        path: 'system-setting',
        name: 'system-setting',
        component: () => import('@/views/admin/system-setting.vue'),
        meta: {
          title: '系统设置 - 管理后台',
          requireAdmin: true
        }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/admin/about.vue'),
        meta:{
          title: '关于'
        }
      }]
  },
  {
    path: '/',
    component: () => import('@/views/public.vue'),
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/public/home.vue'),
      meta: {
        title: '主页',
      }
    },
    {
      path: 'hot',
      name: 'hot',
      component: () => import('@/views/public/hot.vue'),
      meta: {
        title: '热门'
      }
    },
    {
      path: 'post/:pid',
      name: 'post',
      component: () => import('@/views/public/post-detail.vue'),
      meta: {
        title: '文章详情'
      }
    },
    {
      path: 'post/edit/:pid',
      name: 'post-edit',
      component: () => import('@/views/public/post-edit.vue'),
      meta: {
        title: '文章编辑',
        requireLogin: true
      }
    },
    {
      path: 'user/:uid',
      name: 'user-profile',
      component: () => import('@/views/public/user-profile.vue'),
      meta: {
        title: '用户主页'
      }
    },
    {
      path: 'login',
      name: 'user-login',
      component: () => import('@/views/public/login.vue'),
      meta: {
        title: '用户登录',
        blockAfterLogin: true
      }
    }]
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
]

export default routes