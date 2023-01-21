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
    component: () => import('@/views/public/Home.vue'),
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
          requireLogin: true
        }
      },
      {
        path: 'mypost',
        name: 'mypost',
        component: () => import('@/views/admin/mypost.vue'),
        meta: {
          requireLogin: true
        }
      },
      {
        path: 'user-setting',
        name: 'user-setting',
        component: () => import('@/views/admin/user-setting.vue'),
        meta: {
          requireLogin: true
        }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/admin/dashboard.vue'),
        meta: {
          requireAdmin: true
        }
      },
      {
        path: 'user-manage',
        name: 'user-manage',
        component: () => import('@/views/admin/user-manage.vue'),
        meta: {
          requireAdmin: true
        }
      },
      {
        path: 'post-manage',
        name: 'post-manage',
        component: () => import('@/views/admin/post-manage.vue'),
        meta: {
          requireAdmin: true
        }
      },
      {
        path: 'comment-manage',
        name: 'comment-manage',
        component: () => import('@/views/admin/comment-manage.vue'),
        meta: {
          requireAdmin: true
        }
      },
      {
        path: 'system-setting',
        name: 'system-setting',
        component: () => import('@/views/admin/system-setting.vue'),
        meta: {
          requireAdmin: true
        }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/admin/about.vue')
      }]
  },
  {
    path: '/',
    component: () => import('@/views/public.vue'),
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/public/Home.vue'),
      meta: {
        title: '主页',
      }
    },
    {
      path: 'hot',
      name: 'hot',
      component: () => import('@/views/public/Hot.vue'),
      meta: {
        title: '热门'
      }
    },
    {
      path: 'post/:pid',
      name: 'post',
      component: () => import('@/views/public/PostDetail.vue'),
      meta: {
        title: '文章详情'
      }
    },
    {
      path: 'post/edit/:pid',
      name: 'post-edit',
      component: () => import('@/views/public/EditPost.vue'),
      meta: {
        title: '文章编辑',
        requireLogin: true
      }
    },
    {
      path: 'user/:uid',
      name: 'user-profile',
      component: () => import('@/views/public/UserProfile.vue'),
      meta: {
        title: '用户主页'
      }
    },
    {
      path: 'login',
      name: 'user-login',
      component: () => import('@/views/public/Login.vue'),
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