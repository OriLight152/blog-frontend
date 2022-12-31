<template>
  <div class="w-full bg-white my-2 rounded-md overflow-hidden shadow-sm px-4 pt-2 pb-4">
    <h2>编辑文章</h2>
    <div v-if="postData">
      标题：
      <input class="w-full p-2 rounded-md border hover:border-blue-500 transition-colors" type="text"
        v-model="postData.title">
      内容：
      <textarea
        class="w-full h-[100px] p-2 rounded-md border resize-none hover:border-blue-500 transition-colors overflow-y-hidden"
        v-model="postData.text" @input="resetHeight($event.target as HTMLTextAreaElement)" ref="eleTextarea"></textarea>
      <NormalButton @click="handleSavePost">保存修改</NormalButton>
    </div>
    <div v-if="devMode">
      <div>postData: {{ postData }}</div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import NProgress from 'nprogress'
import { PostDetailData } from '@/core/types';
import { editPost, getPost } from '@/api/post';
import { useStore } from '@/store';
import router from '@/router';
import { useToast } from 'vue-toastification';
import NormalButton from '@/components/common/button/NormalButton.vue';

const store = useStore()
const route = useRoute()
const toast = useToast()

const { devMode, login, uid } = toRefs(store)
const pid = ref(String(route.params.pid))
const postData = ref<PostDetailData | null>(null)
const eleTextarea = ref<HTMLTextAreaElement | null>(null)



onMounted(async () => {
  NProgress.start()
  await fetchData()
  NProgress.done()
})

watch(postData, async () => {
  console.log('trigger resize textarea');
  await nextTick()
  resetHeight(eleTextarea.value as HTMLTextAreaElement)
})

async function fetchData() {
  getPost(Number(pid.value))
    .then((result: any) => {
      postData.value = result['post']
      if (!login.value) {
        toast.warning('请先登录')
        router.push('/login')
        return
      }
      if (uid.value !== postData.value?.author) {
        toast.warning('你没有权限编辑此文章'),
          router.push('/profile')
        return
      }
    })
    .catch((err: any) => {
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
      .then(result => {
        toast.success('保存成功')
        router.push('/post/' + pid.value)
      })
      .catch(err => {
        toast.error('保存失败：' + err)
      })
  }
}

async function resetHeight(ele: HTMLTextAreaElement) {
  ele.style.height = '100px'
  await nextTick();
  ele.style.height = ele.scrollHeight + 'px'
}
</script>