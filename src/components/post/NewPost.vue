<template>
  <div>
    <h2>新文章</h2>
    <p class="my-2 font-bold">标题</p>
    <input class="w-full p-2 rounded-md border hover:border-blue-500 transition-colors" v-model="data.title"
      placeholder="有什么新鲜事要向大家分享？" maxlength="30">
    <p class="my-2 font-bold">内容</p>
    <NormalEditor v-model="data.content" v-if="setting.legacyEditor" />
    <MarkdownEditor class="h-[400px]" v-model="data.content" v-else />
    <NormalButton class="mt-2" primary @click="$emit('newPost')">发布</NormalButton>
  </div>
</template>

<script setup lang="ts">
import { nextTick, toRefs } from 'vue';
import NormalButton from '@/components/common/NormalButton.vue';
import { newPostData } from '@/core/types';
import { useStore } from '@/store';
import MarkdownEditor from '../common/MarkdownEditor.vue';

defineEmits(['newPost'])

defineProps<{
  data: newPostData
}>()

const store = useStore()

const { setting } = toRefs(store)

</script>