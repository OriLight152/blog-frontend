<template>
  <div>
    <p class="mb-4 text-2xl font-bold">评论管理</p>
    <p>评论总数：{{ commentCount }}</p>
    <p>当前页：{{ currentPage }} , 总页数：{{ Math.ceil(commentCount / pageSize) }}</p>
    <table class="w-full table-fixed text-center">
      <colgroup>
        <col width="10">
        <col width="700">
        <col width="100">
        <col width="100">
        <col width="20%">
        <col width="10%">
        <col width="10%">
        <col width="10%">
        <col width="30%">
      </colgroup>
      <tr>
        <th>CID</th>
        <th>内容</th>
        <th>发布者</th>
        <th>所在文章</th>
        <th>IP</th>
        <th>回复ID</th>
        <th>状态</th>
        <th>评论时间</th>
        <th>操作</th>
      </tr>
      <tr v-for="comment in commentList">
        <td>
          {{ comment.cid }}
        </td>
        <td class="whitespace-nowrap">{{ comment.text }}</td>
        <td class="whitespace-nowrap">{{ comment.user.nickname + '(' + comment.user.uid + ')' }}</td>
        <td class="whitespace-nowrap">{{ comment.post.title + '(' + comment.post.pid + ')' }}</td>
        <td>{{ comment.ip }}</td>
        <td>{{ comment.replyTo }}</td>
        <td :class="comment.status === 2 ? 'text-red-500' : ''">{{ commentStatusEnum[comment.status] }}</td>
        <td class="whitespace-nowrap">{{ formatTime(comment.createdAt) }}</td>
        <td>
          <NormalButton @click="handleMarkComment(comment.cid, comment.status)">{{
            comment.status === 0 ? '标记为违规' :
              '标记为正常'
          }}</NormalButton>
          <NormalButton @click="handleDeleteComment(comment.cid)">删除</NormalButton>
        </td>
      </tr>
    </table>
    <Pagination :current-page="currentPage" :total-count="commentCount" :page-size="pageSize" @change="handlePageChange" />
  </div>
</template>

<script setup lang="ts">
import { getCommentList, deleteComment, banComment, approveComment } from '@/api/admin';
import NormalButton from '@/components/common/button/NormalButton.vue';
import Pagination from '@/components/common/Pagination.vue';
import { pageSize } from '@/config';
import { useStore } from '@/store';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import NProgress from 'nprogress'
import { formatTime } from '@/utils';
import { AdminCommentData } from '@/core/types';

const store = useStore()
const toast = useToast()

const commentList = ref<AdminCommentData[]>([])
const currentPage = ref(1)
const commentCount = ref(0)

const commentStatusEnum: {
  [key: number]: string
} = {
  0: '正常',
  2: '违规'
}

onMounted(() => {
  fetchData()
})

function fetchData() {
  NProgress.start()
  commentList.value = []
  getCommentList(store.token, currentPage.value)
    .then((res: any) => {
      commentList.value = res['comments']
      commentCount.value = res['count']
    })
    .catch((err: any) => {
      toast.error(err.message)
    })
    .finally(() => {
      NProgress.done()
    })
}

function handleMarkComment(cid: number, curStatus: number) {
  if (curStatus === 0) {
    banComment(store.token, cid)
      .then((res: any) => {
        toast.success('标记评论成功')
        fetchData()
      })
      .catch((err: any) => {
        toast.error('标记评论失败：' + err.message)
      });
  } else {
    approveComment(store.token, cid)
      .then((res: any) => {
        toast.success('标记评论成功')
        fetchData()
      })
      .catch((err: any) => {
        toast.error('标记评论失败：' + err.message)
      });
  }
}

function handleDeleteComment(cid: number) {
  deleteComment(store.token, cid)
    .then((res: any) => {
      toast.success('删除评论成功')
      fetchData()
    })
    .catch((err: any) => {
      toast.error('解禁评论失败：' + err.message)
    })
}

function handlePageChange(page: number) {
  currentPage.value = page
  fetchData()
}
</script>