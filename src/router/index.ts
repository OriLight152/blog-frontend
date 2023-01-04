import { useStore } from "@/store";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { useToast } from "vue-toastification";
import routes from "./routes";
import { verify } from "@/api/user";

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
const blockBeforeLogin = ['/profile']
const blockAfterLogin = ['/login', '/register']

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
          store.likeCache = JSON.parse(localStorage.getItem('likeCache') || '{"POST":[],"COMMENT":[]}')
        }
      } catch {
        localStorage.removeItem('uid')
        localStorage.removeItem('token')
        localStorage.removeItem('likeCache')
        useToast().warning('登录已过期，请重新登录')
      }

    }
  }
  if (blockBeforeLogin.includes(to.path) && !store.login) {
    useToast().warning('请先登录')
    return '/login'
  }
  if (blockAfterLogin.includes(to.path) && store.login) {
    return '/home'
  }
  if (to.path == '/profile') {
    return '/user/' + store.uid
  }
  store.currentPage = to.name?.toString() || ''
  console.log(to);
})

export default router