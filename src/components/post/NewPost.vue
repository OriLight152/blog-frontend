<template>
  <div>
    <h2>新文章</h2>
    标题：
    <input class="w-full p-2 rounded-md border hover:border-blue-500 transition-colors" v-model="data.title"
      placeholder="有什么新鲜事要向大家分享？" maxlength="30">
    内容：
    <textarea
      class="w-full min-h-[100px] p-2 rounded-md border hover:border-blue-500 transition-colors overflow-y-hidden"
      :class="setting.stickyTextarea ? 'h-[300px] overflow-y-scroll' : ''" v-model="data.content"
      @input="resetHeight($event.target as HTMLTextAreaElement)"></textarea>
    <NormalButton @click="$emit('newPost')">发布</NormalButton>
  </div>
</template>

<script setup lang="ts">
import { nextTick, toRefs } from 'vue';
import NormalButton from '@/components/common/NormalButton.vue';
import { newPostData } from '@/core/types';
import { useStore } from '@/store';

defineEmits(['newPost'])

defineProps<{
  data: newPostData
}>()

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