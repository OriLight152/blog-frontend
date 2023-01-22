import { useStore } from "@/store";
import { createRouter, createWebHistory } from "vue-router";
import { useToast } from "vue-toastification";
import routes from "./routes";
import { verify } from "@/api/user";

const router = createRouter({
  history: createWebHistory('/blog'),
  routes,
})

router.beforeEach(async (to) => {
  const store = useStore()
  if (to.meta.title) {
    document.title = to.meta.title as string + ' - 博客'
  }
  if (!store.login) {
    let token = localStorage.getItem('token')
    let uid = localStorage.getItem('uid') || '0'
    if (token) {
      try {
        let res: any = await verify(token, Number(uid))
        if (res) {
          store.login = true
          store.uid = res['uid']
          store.token = token as string
          if (res['role'] === 'ADMIN') {
            store.isAdmin = true
          }
          store.likeCache = JSON.parse(localStorage.getItem('likeCache') || '{"POST":[],"COMMENT":[]}')
          console.debug('[router] user verify successful, uid:' + res['uid'] + ', role:' + res['role'])
        }
      } catch {
        localStorage.removeItem('uid')
        localStorage.removeItem('token')
        localStorage.removeItem('likeCache')
        useToast().warning('登录已过期，请重新登录')
        console.debug('[router] user login expired.')
      }

    }
  }
  if (to.meta.requireLogin && !store.login){
    useToast().warning('请先登录')
    console.log('req login');
    return '/login'
  }
  if (to.meta.requireAdmin && !store.isAdmin) {
    useToast().warning('无访问权限')
    console.log('req admin role');
    return '/admin'
  }
  if (to.meta.blockAfterLogin && store.login) {
    console.log('req no login');
    return '/home'
  }
  if (to.path == '/profile') {
    return '/user/' + store.uid
  }
  store.currentPage = to.name?.toString() || ''
  console.debug('[router] to ', to);
})

export default router