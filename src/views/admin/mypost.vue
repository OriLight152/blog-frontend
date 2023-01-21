<template>
  <div>
    <p class="mb-4 text-2xl font-bold">文章管理</p>
    <div class="text-center pb-4" v-if="postList.length === 0">
      <span>这里还什么都没有呢</span>
    </div>
    <template v-else>
      <table class="w-full table-fixed text-center" >
        <colgroup>
          <col width="700">
          <col width="10%">
          <col width="10%">
          <col width="30%">
        </colgroup>
        <tr>
          <th>标题</th>
          <th>浏览量</th>
          <th>评论数</th>
          <th>操作</th>
        </tr>
        <tr v-for="post in postList">
          <td class="whitespace-nowrap overflow-ellipsis">
            <RouterLink :to="'/post/' + post.pid">
              {{ post.title }}
            </RouterLink>
          </td>
          <td>{{ post.viewCount }}</td>
          <td>{{ post._count.comments }}</td>
          <td>
            <RouterLink :to="'/post/edit/' + post.pid">
              <NormalButton>编辑</NormalButton>
            </RouterLink>
            <NormalButton class="ml-2" @click="handlePostDelete(post.pid)">删除</NormalButton>
          </td>
        </tr>
      </table>
      <Pagination :current-page="currentPage" :total-count="postCount" :page-size="pageSize"
        @change="handlePageChange" />
    </template>

  </div>
</template>

<script setup lang="ts">
import { deletePost, getList } from '@/api/post';
import { useStore } from '@/store';
import { useToast } from 'vue-toastification';
import NProgress from 'nprogress'
import { onMounted, ref } from 'vue';
import { PostData } from '@/core/types';
import NormalButton from '@/components/common/button/NormalButton.vue';
import { pageSize } from '@/config';
import Pagination from '@/components/common/Pagination.vue';

const store = useStore()
const toast = useToast()

const postList = ref<PostData[]>([])
const currentPage = ref(1)
const postCount = ref(0)

onMounted(() => {
  fetchData()
})

function fetchData() {
  NProgress.start()
  postList.value = []
  getList(currentPage.value, store.uid)
    .then((res: any) => {
      postList.value = res['posts']
      postCount.value = res['count']
    })
    .catch((err: any) => {
      toast.error(err.message)
    })
    .finally(() => {
      NProgress.done()
    })
}

function handlePostDelete(postId: number) {
  deletePost(store.token, postId)
    .then((result) => {
      toast.success('删除成功')
      fetchData()
    })
    .catch((err) => {
      toast.error('删除失败：' + err.message)
    });
}

function handlePageChange(page: number) {
  currentPage.value = page
  fetchData()
}
</script>