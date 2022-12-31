import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  // 路由项
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/hot',
    name: 'hot',
    component: () => import('@/views/Hot.vue'),
  },
  {
    path: '/post/:pid',
    name: 'post',
    component: () => import('@/views/PostDetail.vue')
  },
  {
    path: '/post/edit/:pid',
    name: 'post-edit',
    component: () => import('@/views/EditPost.vue')
  },
  {
    path: '/user/:uid',
    name: 'user-profile',
    component: () => import('@/views/UserProfile.vue')
  },
  {
    path: '/login',
    name: 'user-login',
    component: () => import('@/views/Login.vue')
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