import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  // 路由项
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '主页'
    }
  },
  {
    path: '/hot',
    name: 'hot',
    component: () => import('@/views/Hot.vue'),
    meta: {
      title: '热门'
    }
  },
  {
    path: '/post/:pid',
    name: 'post',
    component: () => import('@/views/PostDetail.vue'),
    meta: {
      title: '文章详情'
    }
  },
  {
    path: '/post/edit/:pid',
    name: 'post-edit',
    component: () => import('@/views/EditPost.vue'),
    meta: {
      title: '文章编辑'
    }
  },
  {
    path: '/user/:uid',
    name: 'user-profile',
    component: () => import('@/views/UserProfile.vue'),
    meta: {
      title: '用户主页'
    }
  },
  {
    path: '/login',
    name: 'user-login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Home.vue'),
  },
  //重定向
  {
    path: '/',
    redirect: '/home'
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
]

export default routes