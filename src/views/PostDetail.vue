<template>
  <div class="w-full bg-white my-2 rounded-md overflow-hidden">
    <template v-if="postData">
      <RouterLink :to="'/user/' + postData.user.uid">
        <div class="flex pt-6 px-4">
          <img class="rounded-full w-16 h-16 mr-4" :src="postData.user.avatar" alt="avatar">
          <div class="flex flex-col">
            <div>
              <span class="mt-2 text-lg font-bold">{{ postData.user.nickname }}</span>
              <span class="ml-2 text-sm bg-yellow-300 px-1 py-0.5 rounded-md" v-if="devMode">
                uid:{{ postData.user.uid }}
              </span>
              <span class="ml-2 text-sm bg-green-300 px-1 py-0.5 rounded-md" v-if="devMode">
                pid:{{ postData.pid }}
              </span>
            </div>
            <div class="text-gray-500">{{ formatTime(postData.createdAt) }}</div>
            <div class="text-gray-500 flex items-center text-sm">
              <IconView class="w-4 h-4 inline-block mr-1" />
              <span>{{ postData.viewCount }}</span>
              <IconComment class="w-4 h-4 inline-block ml-2 mr-1" />
              <span>{{ commentData.length }}</span>
              <IconLikeO class="w-4 h-4 inline-block ml-2 mr-1" />
              <span>{{ postData.like }}</span>
            </div>
          </div>
        </div>
      </RouterLink>
      <div class="p-8 pt-2">
        <p class="text-2xl leading-[60px] font-bold">{{ postData.title }}</p>
        <div v-html="marked.parse(postData.text)"></div>
      </div>
    </template>
  </div>
  <div class="w-full bg-white my-2 rounded-md overflow-hidden px-4 pt-2 pb-8" id="comment">
    <h2>评论区</h2>
    <div v-if="login">
      <div class="mb-2" v-if="replyTo !== 0">
        回复 {{ commentData.find((item) => item.cid === replyTo)?.user.nickname }}
      </div>
      <textarea class="w-full p-2 rounded-md border resize-none" v-model="newCommentContent" placeholder="发一条友善的评论"
        @input="resetHeight($event.target as HTMLTextAreaElement)"></textarea>
      <NormalButton @click="handleNewComment">{{ replyTo === 0 ? '发布' : '回复' }}</NormalButton>
      <NormalButton class="ml-2" v-if="replyTo !== 0" @click="replyTo = 0">取消回复</NormalButton>
    </div>
    <p class="text-center" v-if="commentData.length === 0">暂无评论</p>
    <p class="text-center mb-4" v-if="!login">登录后才可发布评论 <RouterLink to="/login" class="text-blue-800">去登录</RouterLink>
    </p>
    <div class="mt-4 p-1">
      <div class="my-2 flex" v-for="comment in commentData" :id="'comment-' + comment.cid">
        <div class="shrink-0">
          <img class="w-12 h-12 rounded-full" :src="comment.user.avatar">
          <button class="w-12 text-center text-sm" v-if="login" @click="replyTo = comment.cid">回复</button>
        </div>
        <div class="ml-2 flex-1">
          <div>
            <span class="font-bold"> {{ comment.user.nickname }}</span>
            <template v-if="postData?.author === comment.user.uid">
              <span class="ml-1 text-sm bg-blue-300 px-1 py-0.5 rounded-md">文章作者</span>
            </template>
            <template v-if="devMode">
              <span class="ml-1 text-sm bg-yellow-300 px-1 py-0.5 rounded-md" v-if="devMode">
                uid:{{ comment.user.uid }}
              </span>
              <span class="ml-1 text-sm bg-red-300 px-1 py-0.5 rounded-md" v-if="devMode">
                cid:{{ comment.cid }}
              </span>
            </template>
          </div>
          <template v-if="comment.replyTo">
            <CommentReply :comment="commentData.find((item) => item.cid === comment.replyTo)"
              @to-comment="handleToComment" @no-comment="toast.warning('评论不存在或已被屏蔽')" />
          </template>
          <div>{{ comment.text }}</div>
          <div class="mt-2 text-sm text-gray-500">{{ formatTime(comment.createdAt) }}</div>
        </div>
      </div>
    </div>

  </div>
  <div class="w-full bg-white my-2 rounded-md overflow-hidden px-4 pt-2 pb-4" v-if="devMode">
    <h2>开发数据</h2>
    <p>login: {{ login }}</p>
    <p>postData: {{ postData }}</p>
    <p>commentData: {{ commentData }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, nextTick } from 'vue';
import { CommentData, PostDetailData } from '@/core/types';
import { useRoute } from 'vue-router';
import { formatTime } from '@/utils';
import { marked } from 'marked'
import hljs from 'highlight.js/lib/common'
import NProgress from 'nprogress'
import { useStore } from '@/store';
import { useToast } from 'vue-toastification';
import { countPostView, getComment, getPost, newComment } from '@/api/post';
import NormalButton from '@/components/common/button/NormalButton.vue';
import CommentReply from '@/components/post/CommentReply.vue';
import IconView from '@/components/icon/IconView.vue';
import IconComment from '@/components/icon/IconComment.vue';
import IconLikeO from '@/components/icon/IconLikeO.vue';

const store = useStore()
const route = useRoute()
const toast = useToast()

const { pid } = route.params
const { navigate } = route.query
const { login, devMode } = toRefs(store)
const postData = ref<PostDetailData>()
const commentData = ref<CommentData[]>([])
const newCommentContent = ref('')
const replyTo = ref(0)

marked.setOptions({
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-'
})

onMounted(async () => {
  NProgress.start()
  await countPostView(Number(pid))
  postData.value = (await getPost(Number(pid)))['post']
  commentData.value = (await getComment(Number(pid)))['comments']
  NProgress.done()
  if (navigate) {
    switch (navigate) {
      case 'comments':
        document.getElementById('comment')?.scrollIntoView({ behavior: 'smooth' })
        console.log('navigate to comments');
        break;
      default:
        console.log('invalid navigate params');
    }
  }
})

async function handleNewComment() {
  if (newCommentContent.value.trim() == '') {
    toast.warning('评论内容不可为空')
    return
  }
  if (replyTo.value === 0) {
    newComment(store.token, Number(pid), newCommentContent.value.trim(), navigator.userAgent)
      .then(async (result) => {
        toast.success('评论发布成功')
        newCommentContent.value = ''
        commentData.value = (await getComment(Number(pid)))['comments']
      })
      .catch((err) => {
        toast.error('评论发布失败：' + err)
      });
  } else {
    newComment(store.token, Number(pid), newCommentContent.value.trim(), navigator.userAgent, replyTo.value)
      .then(async (result) => {
        toast.success('评论回复成功')
        newCommentContent.value = ''
        commentData.value = (await getComment(Number(pid)))['comments']
      })
      .catch((err) => {
        toast.error('评论回复失败：' + err)
      });
  }
}

function handleToComment(cid: number) {
  document.getElementById('comment-' + cid)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

async function resetHeight(e: HTMLTextAreaElement) {
  e.style.height = '100px'
  await nextTick();
  e.style.height = e.scrollHeight + 'px'
}
</script>

<style>
img {
  @apply w-full rounded-xl;
}

code.hljs {
  @apply rounded-xl leading-normal;
}
</style>
