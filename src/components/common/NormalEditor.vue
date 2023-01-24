<template>
  <textarea class="w-full min-h-[100px] p-2 rounded-md border hover:border-blue-500 transition-colors overflow-y-hidden"
    :class="setting.stickyTextarea ? 'h-[300px] overflow-y-scroll' : ''"
    @input="resetHeight($event.target as HTMLTextAreaElement)" ref="eleTextarea"></textarea>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { nextTick, toRefs } from 'vue';

const store = useStore()

const { setting } = toRefs(store)

function resetHeight(ele: HTMLTextAreaElement) {
  if (setting.value.stickyTextarea) { return }
  ele.style.height = '100px'
  nextTick(() => {
    ele.style.height = ele.scrollHeight + 'px'
  })
}
</script>