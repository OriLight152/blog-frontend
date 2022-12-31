<template>
  <div class="w-full flex flex-col items-center py-4">
    <div v-if="devMode">
      <p>当前页面：{{ currentPage }}</p>
      <p>登录状态: {{ login }}</p>
      <div v-if="login">
        <p>当前用户：{{ uid }}</p>
      </div>
    </div>
    <div>
      大作业报告
    </div>
    <div>© 2022 OriLight</div>
    <div>
      <button @click="switchDevMode">{{ devMode ? '关闭' : '打开' }}开发模式</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { toRefs } from 'vue';

const store = useStore()
const { devMode, currentPage,login,uid } = toRefs(store)

function switchDevMode() {
  devMode.value = !devMode.value
  localStorage.setItem('devMode', devMode.value.toString())
}
</script>