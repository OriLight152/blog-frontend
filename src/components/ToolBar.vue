<template>
  <div class="fixed bottom-6 right-4 flex flex-col space-y-1">
    <button v-show="showBtnT" class="rounded-md bg-gray-300/80 hover:bg-blue-500 hover:text-white p-2 transition-colors"
      @click="handleScrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
    <button v-show="showBtnB" class="rounded-md bg-gray-300/80 hover:bg-blue-500 hover:text-white p-2 transition-colors"
      @click="handleScrollToBottom">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';


const showBtnT = ref(true)
const showBtnB = ref(true)

window.onscroll = handleBtnShow

onMounted(() => {
  handleBtnShow()
})

function handleBtnShow() {
  showBtnT.value = document.documentElement.scrollTop > 20
  showBtnB.value = (document.body.scrollHeight - window.screen.height - document.documentElement.scrollTop) > 20
}

function handleScrollToTop() {
  document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleScrollToBottom() {
  document.body.scrollIntoView({ behavior: 'smooth', block: 'end' })
}

</script>