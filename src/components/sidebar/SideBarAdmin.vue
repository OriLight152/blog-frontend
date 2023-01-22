<template>
  <div class="w-[250px] h-[calc(100vh-60px)] p-2 border-r-2 overflow-y-auto shrink-0">
    <div>
      <SideBarItem v-for="item in publicItem" :data="item" :active="active"
        @click="handlePageSwitch(item.name, item.to)" />
    </div>
    <div class="border-t pt-1" v-if="isAdmin">
      <SideBarItem v-for="item in adminItem" :data="item" :active="active"
        @click="handlePageSwitch(item.name, item.to)" />
    </div>
    <div class="border-t pt-1">
      <SideBarItem v-for="item in infoItem" :data="item" :active="active"
        @click="handlePageSwitch(item.name, item.to)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { onMounted, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SideBarItem from './SideBarItem.vue';

const store = useStore()
const router = useRouter()
const route = useRoute()

const { isAdmin } = toRefs(store)
const active = ref('home')
const publicItem = ref([
  {
    name: 'admin-home',
    to: '/home',
    display: '个人资料'
  },
  {
    name: 'mypost',
    to: '/mypost',
    display: '文章管理'
  },
  {
    name: 'user-setting',
    to: '/user-setting',
    display: '用户设置'
  }
])

const adminItem = ref([
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
])
const infoItem = ref([
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
])

onMounted(()=>{
  active.value = String(route.name)
})

function handlePageSwitch(name: string, to: string) {
  active.value = name
  if (to === 'APP_HOME') {
    router.push('/')
    return
  }
  router.push('/admin' + to)
}
</script>