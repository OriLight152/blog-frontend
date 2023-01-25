<template>
  <div class="flex min-h-[400px] h-full shadow-[0_2px_12px_0_rgb(0_0_0/10%)]">
    <div class="flex-1 flex-shrink-0 flex flex-col pl-4 pb-4 w-1/2 h-full overflow-hidden">
      <h2>Markdown</h2>
      <textarea class="w-full h-full pr-4 overflow-y-auto resize-none border-none outline-none" :value="modelValue"
        @input="handleInput($event.target as HTMLTextAreaElement)"></textarea>
    </div>
    <div class="flex-1 flex-shrink-0 flex flex-col pl-4 pb-4 w-1/2 h-full overflow-hidden border-l">
      <h2>预览</h2>
      <div class="w-full h-full pr-4 overflow-y-auto">
        <div v-html="preview"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { renderMarkdown } from '@/utils';
import { debounce } from 'lodash';
import { ref } from 'vue';

const props = defineProps<{
  modelValue: string
}>()
const emits = defineEmits(['update:modelValue'])

const preview = ref(renderMarkdown(props.modelValue))

// 使用 debounce 防抖函数减少更新，优化性能
const update = debounce((value) => {
  preview.value = renderMarkdown(value)
  emits('update:modelValue', value)
}, 100)

function handleInput(ele: HTMLTextAreaElement) {
  update(ele.value)
}

</script>