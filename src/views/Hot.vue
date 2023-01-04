<template>
  <div class="w-full bg-white my-2 rounded-md overflow-hidden shadow-sm">
    <div class="px-4 pt-2 pb-5">
      <h2>🔥热门文章</h2>
      <p>浏览量最多的20篇文章</p>
    </div>
  </div>
  <PostPreview v-for="post in posts" :post-data="post" />
</template>
<script setup lang="ts">
import { PostData } from '@/core/types';
import { onMounted, ref } from 'vue';
import NProgress from 'nprogress'
import { getHotList } from '@/api/post';
import PostPreview from '@/components/post/PostPreview.vue';

const posts = ref<PostData[]>([])

onMounted(() => {
  fetchData()
})

function fetchData() {
  NProgress.start()
  getHotList()
    .then((res: any) => {
      posts.value = res['posts']
    })
    .finally(() => {
      NProgress.done()
    })
}

</script>
