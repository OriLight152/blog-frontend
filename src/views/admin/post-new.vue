
<template>
  <div>
    <p class="mb-4 text-2xl font-bold">发布文章</p>
    <div class="w-full">
      <p class="my-2 font-bold">标题</p>
      <input class="w-full px-2 py-1 rounded-md border hover:border-blue-500 transition-colors" v-model="newPostTitle"
        placeholder="有什么新鲜事要向大家分享？" maxlength="30">
      <p class="my-2 font-bold">内容</p>
      <NormalEditor v-model="newPostContent" v-if="setting.legacyEditor" />
      <MarkdownEditor class="h-[calc(100vh-320px)]" v-model="newPostContent" v-else />
      <NormalButton class="mt-2" primary @click="handleNewPost">发布</NormalButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { ref, watchEffect, toRefs } from 'vue';
import { debounce } from 'lodash'
import { useStore } from '@/store';
import NormalButton from '@/components/common/NormalButton.vue';
import MarkdownEditor from '@/components/common/MarkdownEditor.vue';
import NormalEditor from '@/components/common/NormalEditor.vue';
import { newPost } from '@/api/post';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const store = useStore()
const toast = useToast()
const router = useRouter()

const { setting } = toRefs(store)

const newPostTitle = ref('')
const newPostContent = ref('')
const preview = ref('')

const update = debounce((value) => {
  preview.value = marked.parse(value)
}, 100)

watchEffect(() => {
  update(newPostContent.value)
})

async function handleNewPost() {
  // 发布文章
  if (newPostTitle.value.trim() == '') {
    toast.warning('文章标题不可为空')
    return
  }
  if (newPostContent.value.trim() == '') {
    toast.warning('文章内容不可为空')
    return
  }
  newPost(store.token, newPostTitle.value.trim(), newPostContent.value.trim())
    .then((result) => {
      toast.success('发布成功')
      router.push('/admin/mypost')
    })
    .catch((err) => {
      toast.error('发布失败: ' + err)
    });
}

</script>