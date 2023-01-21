<template>
  <div>
    <p class="mb-4 text-2xl font-bold">用户管理</p>
    <p>用户总数：{{ userCount }}</p>
    <p>当前页：{{ currentPage }} , 总页数：{{ Math.ceil(userCount / pageSize) }}</p>
    <table class="w-full table-fixed text-center">
      <colgroup>
        <col width="10">
        <col width="10%">
        <col width="700">
        <col width="10%">
        <col width="10%">
        <col width="10%">
        <col width="10%">
        <col width="10%">
        <col width="30%">
      </colgroup>
      <tr>
        <th>UID</th>
        <th>用户名</th>
        <th>昵称</th>
        <th>邮箱</th>
        <th>性别</th>
        <th>用户组</th>
        <th>状态</th>
        <th>头像</th>
        <th>操作</th>
      </tr>
      <tr v-for="user in userList">
        <td>
          <RouterLink :to="'/user/' + user.uid">
            {{ user.uid }}
          </RouterLink>
        </td>

        <td class="whitespace-nowrap">{{ user.name }}</td>
        <td class="whitespace-nowrap">{{ user.nickname }}</td>
        <td>{{ user.email }}</td>
        <td>{{ userSexEnum[user.sex] }}</td>
        <td>{{ user.role }}</td>
        <td :class="user.status === 2 ? 'text-red-500' : ''"> {{ userStatusEnum[user.status] }}</td>
        <td class="whitespace-nowrap overflow-ellipsis">
          <NormalButton @click="openAvatar(user.avatar)">查看图片</NormalButton>
          <!-- <a :href="user.avatar" target="_blank">查看图片</a> -->
        </td>
        <td>
          <NormalButton @click="handleBanUser(user.uid, user.status)">{{ user.status === 0 ? '封禁' : '解禁' }}
          </NormalButton>
          <!-- <NormalButton>换组</NormalButton> -->
          <NormalButton @click="handleDeleteUser(user.uid)">删除</NormalButton>
        </td>
      </tr>
    </table>
    <Pagination :current-page="currentPage" :total-count="userCount" :page-size="pageSize" @change="handlePageChange" />
  </div>
</template>

<script setup lang="ts">
import { getUserList, deleteUser, banUser, unbanUser } from '@/api/admin';
import NormalButton from '@/components/common/button/NormalButton.vue';
import Pagination from '@/components/common/Pagination.vue';
import { pageSize } from '@/config';
import { useStore } from '@/store';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import NProgress from 'nprogress'
import { AdminUserData } from '@/core/types';

const store = useStore()
const toast = useToast()

const userList = ref<AdminUserData[]>([])
const currentPage = ref(1)
const userCount = ref(0)
const userStatusEnum: {
  [key: number]: string
} = {
  0: '正常',
  2: '封禁'
}
const userSexEnum: {
  [key: string]: string
} = {
  'MALE': '男',
  'FEMALE': '男',
  'SECRET': '保密'
}

onMounted(() => {
  fetchData()
})

function fetchData() {
  NProgress.start()
  userList.value = []
  getUserList(store.token, currentPage.value)
    .then((res: any) => {
      userList.value = res['users']
      userCount.value = res['count']
    })
    .catch((err: any) => {
      toast.error(err.message)
    })
    .finally(() => {
      NProgress.done()
    })
}

function openAvatar(url: string) {
  window.open(url)
}

function handleBanUser(uid: number, curStatus: number) {
  if (curStatus === 0) {
    banUser(store.token, uid)
      .then((res: any) => {
        toast.success('封禁用户成功')
        fetchData()
      })
      .catch((err: any) => {
        toast.error('封禁用户失败' + err.message)
      });
  } else {
    unbanUser(store.token, uid)
      .then((res: any) => {
        toast.success('解禁用户成功')
        fetchData()
      })
      .catch((err: any) => {
        toast.error('解禁用户失败：' + err.message)
      });
  }
}

function handleDeleteUser(uid: number) {
  deleteUser(store.token, uid)
    .then((res: any) => {
      toast.success('删除用户成功：')
      fetchData()
    })
    .catch((err: any) => {
      toast.error('解禁用户失败：' + err.message)
    })
}

function handlePageChange(page: number) {
  currentPage.value = page
  fetchData()
}
</script>