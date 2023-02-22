<template>
  <div>
    <div class="w-full bg-white my-2 rounded-md overflow-hidden shadow-sm">
      <div class="px-4 pt-2 pb-5 bg-red-200/50">
        <h2>🔥热门文章</h2>
        <p>浏览量最多的20篇文章</p>
      </div>
    </div>
    <slot name="loading" />
    <Transition name="popup-t">
      <div v-show="posts.length !== 0">
        <PostPreview v-for="post in posts" :post-data="post" />
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { PostData } from '@/core/types';
import { onMounted, ref } from 'vue';
import NProgress from 'nprogress'
import { getHotList } from '@/api/post';
import PostPreview from '@/components/post/PostPreview.vue';
import { useStore } from '@/store';

const store = useStore()

const posts = ref<PostData[]>([])

onMounted(() => {
  fetchData()
})

function fetchData() {
  // 获取热门文章数据
  NProgress.start()
  store.pageLoading = true
  getHotList()
    .then((res: any) => {
      posts.value = res['posts']
    })
    .finally(() => {
      NProgress.done()
      store.pageLoading = false
    })
}

</script>