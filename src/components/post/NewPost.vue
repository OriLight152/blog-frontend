<template>
  <div>
    <h2>新文章</h2>
    标题：
    <input class="w-full p-2 rounded-md border hover:border-blue-500 transition-colors" v-model="data.title"
      placeholder="有什么新鲜事要向大家分享？" maxlength="30">
    内容：
    <textarea
      class="w-full min-h-[100px] p-2 rounded-md border hover:border-blue-500 transition-colors overflow-y-hidden"
      v-model="data.content" placeholder="" @input="resetHeight($event.target as HTMLTextAreaElement)"></textarea>
    <NormalButton @click="$emit('newPost')">发布</NormalButton>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue';
import NormalButton from '@cp/common/button/NormalButton.vue';
import { newPostData } from '@/core/types';

defineEmits(['newPost'])

defineProps<{
  data: newPostData
}>()

async function resetHeight(e: HTMLTextAreaElement) {
  e.style.height = '100px'
  await nextTick();
  e.style.height = e.scrollHeight + 'px'
}
</script>