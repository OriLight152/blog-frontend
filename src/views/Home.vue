<template>
  <PostPreview v-for="post in posts" :post-data="post" />
  <Pagination :current-page="currentPage" :total-count="postCount" :page-size="pageSize" @change="handlePageChange" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from 'vue';
import PostPreview from '@cp/post/PostPreview.vue';
import { PostData } from '@/core/types';
import NProgress from 'nprogress'
import { getList } from '@/api/post';
import Pagination from '@/components/common/Pagination.vue';
import { pageSize } from '@/config';
import { useStore } from '@/store';

const store = useStore()

const { devMode } = toRefs(store)
const posts = ref<PostData[]>([])
const currentPage = ref(1)
const postCount = ref(0)

const pageCount = computed(() => Math.ceil(postCount.value / pageSize))

onMounted(async () => {
  NProgress.start()
  await fetchData()
  NProgress.done()
})

async function fetchData() {
  const res = posts.value = (await getList(currentPage.value))
  postCount.value = res['count']
  posts.value = res['posts']
}

async function handlePageChange(page: number) {
  currentPage.value = page
  await fetchData()
}
</script>

<style>

</style>