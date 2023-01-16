<template>
  <PostPreview v-for="post in posts" :post-data="post" />
  <Pagination :current-page="currentPage" :total-count="postCount" :page-size="pageSize" @change="handlePageChange" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PostPreview from '@cp/post/PostPreview.vue';
import { PostData } from '@/core/types';
import NProgress from 'nprogress'
import { getList } from '@/api/post';
import Pagination from '@/components/common/Pagination.vue';
import { pageSize } from '@/config';
import { useStore } from '@/store';

const store = useStore()

const posts = ref<PostData[]>([])
const currentPage = ref(1)
const postCount = ref(0)

onMounted(() => {
  fetchData()
})

function fetchData() {
  NProgress.start()
  store.pageLoading = true
  posts.value = []
  getList(currentPage.value)
    .then((res: any) => {
      posts.value = res['posts']
      postCount.value = res['count']
    })
    .finally(() => {
      NProgress.done()
      store.pageLoading = false
    })
}

function handlePageChange(page: number) {
  currentPage.value = page
  fetchData()
}
</script>
