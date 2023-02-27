import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import toast from 'vue-toastification'
import VueViewer from 'v-viewer'
import '@/assets/tailwind.css'
import 'nprogress/nprogress.css'
import "vue-toastification/dist/index.css";
import 'highlight.js/styles/github-dark.css'
import 'viewerjs/dist/viewer.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(toast)
app.use(VueViewer)
app.mount('#app')
