<template>
  <div>
    <p class="mb-4 text-2xl font-bold">用户设置</p>
    <div class="flex items-center p-1">
      <span>根本对不齐的自动对齐</span>
      <Switch class="ml-2" v-model="setting.autoAlign" />
    </div>
    <div class="flex items-center p-1">
      <span>使用旧版编辑器</span>
      <Switch class="ml-2" v-model="setting.legacyEditor" />
    </div>
    <div class="flex items-center p-1">
      <span>固定输入框高度(旧版编辑器)</span>
      <Switch class="ml-2" v-model="setting.stickyTextarea" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Switch from '@/components/common/Switch.vue';
import { useStore } from '@/store';
import { toRefs } from 'vue';

const store = useStore()
const { setting } = toRefs(store)
</script>