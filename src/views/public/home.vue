<template>
  <RouterLink
    class="w-full text-center text-2xl font-bold block py-4 my-2 bg-white hover:bg-gray-200 transition-colors rounded-md shadow-sm"
    to="/post/35">
    点击前往作业报告
  </RouterLink>
  <Transition>
    <div v-show="posts.length !== 0">
      <PostPreview v-for="post in posts" :post-data="post" />
    </div>
  </Transition>
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
import { useRoute, useRouter } from 'vue-router';

const store = useStore()
const route = useRoute()
const router = useRouter()

const posts = ref<PostData[]>([])
const currentPage = ref(1)
const postCount = ref(0)

onMounted(() => {
  if (route.query.page) {
    currentPage.value = Number(route.query.page)
  }
  fetchData()
})

function fetchData() {
  // 获取主页文章数据
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
  router.push({ query: { page } })
  fetchData()
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>