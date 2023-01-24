<template>
  <div class="w-full bg-white my-2 rounded-md overflow-hidden shadow-sm px-4 pt-2 pb-4">
    <h2>编辑文章</h2>
    <div v-if="postData">
      <p class="my-2 font-bold">标题</p>
      <input class="w-full p-2 rounded-md border hover:border-blue-500 transition-colors" type="text"
        v-model="postData.title">
      <p class="my-2 font-bold">内容</p>
      <NormalEditor v-model="postData.text" v-if="setting.legacyEditor" />
      <MarkdownEditor class="h-[calc(100vh-400px)]" v-model="postData.text" v-else />
      <div class="mt-2">
        <NormalButton primary @click="handleSavePost">保存修改</NormalButton>
        <NormalButton @click="router.back()">取消</NormalButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import NProgress from 'nprogress'
import { PostDetailData } from '@/core/types';
import { editPost, getPost } from '@/api/post';
import { useStore } from '@/store';
import router from '@/router';
import { useToast } from 'vue-toastification';
import NormalButton from '@/components/common/NormalButton.vue';
import MarkdownEditor from '@/components/common/MarkdownEditor.vue';
import NormalEditor from '@/components/common/NormalEditor.vue';

const store = useStore()
const route = useRoute()
const toast = useToast()

const { login, uid, setting } = toRefs(store)
const pid = ref(String(route.params.pid))
const postData = ref<PostDetailData | null>(null)
const eleTextarea = ref<HTMLTextAreaElement | null>(null)

onMounted(async () => {
  if (!login.value) {
    toast.warning('请先登录')
    router.push('/login')
    return
  }
  NProgress.start()
  await fetchData()
  NProgress.done()
})

async function fetchData() {
  // 获取文章数据
  store.pageLoading = true
  getPost(Number(pid.value))
    .then((result: any) => {
      postData.value = result['post']
      store.pageLoading = false
      if (uid.value !== postData.value?.author) {
        toast.warning('你没有权限编辑此文章'),
          router.push('/profile')
        return
      }
    })
    .catch((err: any) => {
      store.pageLoading = false
    });
}

async function handleSavePost() {
  if (postData.value?.title.trim() === '') {
    toast.warning('文章标题不可为空')
    return
  }
  if (postData.value?.text.trim() === '') {
    toast.warning('文章内容不可为空')
    return
  }
  if (postData.value) {
    editPost(store.token, postData.value.pid, postData.value.title.trim(), postData.value.text.trim())
      .then(res => {
        toast.success('保存成功')
        router.back()
      })
      .catch(err => {
        toast.error('保存失败：' + err.message)
      })
  }
}

</script>