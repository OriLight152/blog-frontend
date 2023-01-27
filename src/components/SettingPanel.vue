<template>
  <Transition name="popup-b">
    <div class="fixed w-full bottom-0 right-0 lg:w-auto lg:bottom-6 lg:right-4 p-4 z-10 bg-white border rounded-md shadow-md" v-show="showSettingPanel">
      <div class="text-lg font-bold mb-2 flex justify-between items-center">
        <span>设置项</span>
        <button @click="hiddenPanel">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="p-4">
        <div class="flex justify-between items-center p-1">
          <span>根本对不齐的自动对齐</span>
          <Switch class="ml-2" v-model="setting.autoAlign" />
        </div>
        <div class="flex justify-between items-center p-1">
          <span>使用旧版编辑器</span>
          <Switch class="ml-2" v-model="setting.legacyEditor" />
        </div>
        <div class="flex justify-between items-center p-1">
          <span>固定输入框高度(旧版编辑器)</span>
          <Switch class="ml-2" v-model="setting.stickyTextarea" />
        </div>
      </div>
    </div>
  </Transition>

</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { onUnmounted,ref, toRefs } from 'vue';
import Switch from './common/Switch.vue';

const store = useStore()

const { showSettingPanel, setting } = toRefs(store)

onUnmounted(()=>{
  showSettingPanel.value = false
})

function hiddenPanel() {
  showSettingPanel.value = false
}

</script>