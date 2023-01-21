<template>
  <div class="h-[60px] w-full">
    <div class="fixed h-[60px] w-full top-0 left-0 bg-white shadow-md z-[99]">
      <div class="lg:w-[960px] mx-auto my-0 flex">
        <RouterLink class="flex-1 hover:text-gray-400" to="/home">
          <button class="w-full h-[60px] ">
            主页
          </button>
        </RouterLink>
        <RouterLink class="flex-1 hover:text-gray-400" to="/hot">
          <button class="w-full h-[60px]">
            热门
          </button>
        </RouterLink>
        <RouterLink class="flex-1 hover:text-gray-400" :to="login ? '/profile' : '/login'">
          <button class="w-full h-[60px]">
            {{ login?'我的': '登录' }}
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { toRefs } from 'vue';

const store = useStore()
const { login } = toRefs(store)
</script>
