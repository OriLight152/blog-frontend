<template>
  <div class="fixed bottom-6 right-4 p-4 z-10 bg-white shadow-md" :class="{
    'animate-popup-right': aniPlayShow,
    'animate-popup-right-hidden': aniPlayHidden
  }" v-show="showSettingPanel" @transitionend="handleHidden">
    <div class="text-lg font-bold mb-2 flex justify-between items-center">
      <span>设置项</span>
      <button @click="hiddenPanel">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="p-4">
      <div class="flex justify-between items-center p-1">
        <span>固定输入框高度</span>
        <Switch class="ml-2" v-model="setting.stickyTextarea" />
      </div>
      <div class="flex justify-between items-center p-1">
        <span>固定输入框高度6666666666</span>
        <Switch class="ml-2" v-model="setting.stickyTextarea" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { ref, toRefs } from 'vue';
import Switch from './common/Switch.vue';

const store = useStore()

const { showSettingPanel } = toRefs(store)

const setting = ref({
  stickyTextarea: true
})
const aniPlayShow = ref(true)
const aniPlayHidden = ref(false)

function hiddenPanel() {
  aniPlayShow.value = false
  setTimeout(() => {
    aniPlayHidden.value = true
  }, 1)
}

function handleHidden() {
  if (aniPlayHidden.value) {
    aniPlayShow.value = true
    aniPlayHidden.value = false
    showSettingPanel.value = false
  }
}
</script>