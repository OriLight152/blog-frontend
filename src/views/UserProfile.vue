<template>
  <div class="w-full bg-white my-2 rounded-md overflow-hidden shadow-sm px-4 pt-2 pb-4 relative">
    <div class="absolute top-4 right-4" v-if="enableEditMode">
      <NormalButton @click="handleLogout">退出登录</NormalButton>
    </div>
    <h2>{{ enableEditMode ? '我的' : '用户' }}信息</h2>
    <template v-if="!userProfile">
      <div class="text-center">加载中</div>
    </template>
    <template v-else>
      <img class="rounded-full w-[150px] h-[150px] shadow-md" :src="userProfile?.avatar" alt="user avatar">
      <div class="font-bold mt-4">{{ userProfile?.nickname }}</div>
      <div class="text-gray-500">
        @{{ userProfile?.name }}
      </div>
      <div class="mt-2">
        <span class="mr-2 text-sm bg-yellow-300 px-1 py-0.5 rounded-md">uid:{{ userProfile?.uid }}</span>
        <span class="mr-2 text-sm bg-red-300 px-1 py-0.5 rounded-md">用户组:{{ userProfile?.role }}</span>
      </div>
    </template>

  </div>
  <div class="w-full bg-white my-2 rounded-md overflow-hidden shadow-sm px-4 pt-2 pb-4" v-if="enableEditMode">
    <h2>新博文</h2>
    标题：
    <input class="w-full p-2 rounded-md border hover:border-blue-500 transition-colors" v-model="newPostTitle"
      placeholder="有什么新鲜事要向大家分享？" maxlength="30">
    内容：
    <textarea
      class="w-full h-[100px] p-2 rounded-md border resize-none hover:border-blue-500 transition-colors overflow-y-hidden"
      v-model="newPostContent" placeholder="" @input="resetHeight($event.target as HTMLTextAreaElement)"></textarea>
    <NormalButton @click="handleNewPost">发布</NormalButton>
  </div>
  <div class="w-full bg-white my-2 rounded-md overflow-hidden shadow-sm px-4 pt-2 pb-2">
    <h2>{{ enableEditMode ? '我的' : '用户' }}博客</h2>
    <div class="text-center pb-4" v-if="userPosts.length == 0">
      <span>这里还什么都没有呢</span>
    </div>
    <template v-else>
      <UserProfilePost v-for="post in userPosts" :post-data="post" :edit-mode="enableEditMode"
        @delete="handleDeletePost" />
      <Pagination :current-page="currentPage" :total-count="postCount" :page-size="pageSize"
        @change="handlePageChange" />
    </template>

  </div>


  <div class="w-full bg-white my-2 rounded-md overflow-hidden shadow-sm px-4 pt-2 pb-4" v-if="devMode">
    <h2>开发数据</h2>
    <p>userProfile: {{ userProfile }}</p>
    <p>userPosts: {{ userPosts }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import NProgress from 'nprogress'
import { PostData, UserProfile } from '@/core/types';
import UserProfilePost from '@/components/post/UserProfilePost.vue';
import { useToast } from 'vue-toastification';
import { useStore } from '@/store';
import { getInfo } from '@/api/user';
import { deletePost, getList, newPost } from '@/api/post';
import NormalButton from '@/components/common/button/NormalButton.vue';
import { pageSize } from '@/config';
import Pagination from '@/components/common/Pagination.vue';
import router from '@/router';

const store = useStore()
const route = useRoute()
const toast = useToast()

const { devMode, login } = toRefs(store)
const userId = ref(String(route.params.uid))
const userProfile = ref<UserProfile | null>()
const userPosts = ref<PostData[]>([])
const newPostTitle = ref('')
const newPostContent = ref('')
const currentPage = ref(1)
const postCount = ref(0)

const enableEditMode = computed(() => login.value && userId.value == String(store.uid))
const pageCount = computed(() => Math.ceil(postCount.value / pageSize))

watch(route, async (to, from) => {
  NProgress.start()
  userId.value = String(route.params.uid);
  await fetchData()
  NProgress.done()
})

onMounted(async () => {
  NProgress.start()
  await fetchData()
  NProgress.done()
})

// 获取数据
async function fetchData() {
  try {
    userProfile.value = (await getInfo(Number(userId.value)))['userInfo']
    let res = await getList(currentPage.value, Number(userId.value))
    userPosts.value = res['posts']
    postCount.value = res['count']
  } catch (err: any) {
    toast.error(err.message)
  }

}

async function handleNewPost() {
  if (newPostTitle.value.trim() == '') {
    toast.warning('文章标题不可为空')
    return
  }
  if (newPostContent.value.trim() == '') {
    toast.warning('文章内容不可为空')
    return
  }
  newPost(store.token, newPostTitle.value.trim(), newPostContent.value.trim())
    .then((result) => {
      toast.success('发布成功')
      newPostTitle.value = ''
      newPostContent.value = ''
      fetchData()
    })
    .catch((err) => {
      toast.error('发布失败: ' + err)
    });
}

async function handleDeletePost(pid: number) {
  deletePost(store.token, pid)
    .then((result) => {
      toast.success('删除成功')
      fetchData()
    })
    .catch((err) => {
      toast.error('删除失败: ' + err)
    });
}

function handleLogout() {
  localStorage.removeItem('uid')
  localStorage.removeItem('token')
  store.login = false
  store.uid = 0
  store.token = ''
}

async function handlePageChange(page: number) {
  currentPage.value = page
  await fetchData()
}

async function resetHeight(e: HTMLTextAreaElement) {
  e.style.height = '100px'
  await nextTick();
  e.style.height = e.scrollHeight + 'px'
}
</script>