<template>
  <div class="w-[250px] h-[calc(100vh-60px)] p-2 border-r-2 overflow-y-auto shrink-0">
    <div>
      <SideBarItem v-for="item in adminSideBarItem.user" :data="item" :active="active"
        @click="handlePageSwitch(item.name, item.to)" />
    </div>
    <div class="border-t pt-1" v-if="isAdmin">
      <SideBarItem v-for="item in adminSideBarItem.admin" :data="item" :active="active"
        @click="handlePageSwitch(item.name, item.to)" />
    </div>
    <div class="border-t pt-1">
      <SideBarItem v-for="item in adminSideBarItem.public" :data="item" :active="active"
        @click="handlePageSwitch(item.name, item.to)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { onMounted, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SideBarItem from './SideBarItem.vue';
import { adminSideBarItem } from '@/config'

const store = useStore()
const router = useRouter()
const route = useRoute()

const { isAdmin } = toRefs(store)
const active = ref('home')

onMounted(() => {
  active.value = String(route.name)
})

function handlePageSwitch(name: string, to: string) {
  if (to === 'APP_HOME') {
    router.push('/')
    return
  }
  active.value = name
  router.push('/admin' + to)
}
</script>