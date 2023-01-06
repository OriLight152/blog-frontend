<template>
  <div class="w-full bg-white my-2 rounded-md overflow-hidden">
    <template v-if="postData">
      <div class="px-8 pt-4">
        <p class="text-3xl leading-[60px] font-bold">{{ postData.title }}</p>
      </div>
      <div class="flex px-8 py-2 bg-gray-300/20">
        <RouterLink :to="'/user/' + postData.user.uid">
          <img class="rounded-full w-12 h-12 mr-4" :src="postData.user.avatar" alt="avatar">
        </RouterLink>
        <div class="flex flex-col">
          <RouterLink :to="'/user/' + postData.user.uid">
            <span class="mt-2 text-lg font-bold">{{ postData.user.nickname }}</span>
          </RouterLink>
          <div class="text-gray-500 flex items-center text-sm">
            <span>发布于 {{ formatTime(postData.createdAt) }}</span>
            <IconView class="w-4 h-4 inline-block ml-2 mr-1" />
            <span>{{ postData.viewCount }}</span>
            <IconComment class="w-4 h-4 inline-block ml-2 mr-1" />
            <span>{{ commentData.length }}</span>
            <IconLikeO class="w-4 h-4 inline-block ml-2 mr-1" />
            <span>{{ postData.like }}</span>
          </div>
        </div>
      </div>
      <!-- 文章内容 -->
      <div class="p-8 pt-4">
        <div class="leading-relaxed rendered" v-html="marked.parse(replaceShortcode(postData.text))"></div>
      </div>
      <div class="flex justify-center py-6">
        <button
          class="w-16 h-16 border-2 flex flex-col items-center justify-center rounded-full border-gray-200 hover:bg-gray-200 transition-colors"
          @click="handleLike">
          <IconLikeS v-if="likeStatus" class="w-6 h-6 text-red-500" />
          <IconLikeO v-else class="w-6 h-6 text-gray-500" />
          <span class="leading-4">{{ postData.like }}</span>
        </button>
      </div>
    </template>
  </div>
  <div class="w-full bg-white my-2 rounded-md overflow-hidden px-4 pt-2 pb-8" id="comment">
    <h2>评论区</h2>
    <div v-if="login">
      <div class="mb-2" v-if="replyTo !== 0">
        回复 {{ commentData.find((item) => item.cid === replyTo)?.user.nickname }}
      </div>
      <textarea class="w-full p-2 rounded-md border resize-none" v-model="newCommentContent"
        :placeholder="allowComment ? '发一条友善的评论' : '评论区已关闭'" :disabled="!allowComment"
        @input="resetHeight($event.target as HTMLTextAreaElement)"></textarea>
      <NormalButton class="mr-2" @click="handleNewComment" v-if="allowComment">{{ replyTo === 0 ? '发布' : '回复' }}
      </NormalButton>
      <NormalButton class="mr-2" v-if="replyTo !== 0" @click="replyTo = 0">取消回复</NormalButton>
    </div>
    <p class="text-center" v-if="commentData.length === 0">暂无评论</p>
    <p class="text-center mb-4" v-if="!login && allowComment">登录后才可发布评论 <RouterLink to="/login" class="text-blue-800">
        去登录</RouterLink>
    </p>
    <div class="mt-4 p-1">
      <div class="my-2 flex" v-for="comment in commentData" :id="'comment-' + comment.cid">
        <div class="shrink-0">
          <RouterLink :to="'/user/' + comment.user.uid">
            <img class="w-12 h-12 rounded-full" :src="comment.user.avatar">
          </RouterLink>
          <button class="w-12 text-center text-sm" v-if="login" @click="replyTo = comment.cid">回复</button>
        </div>
        <div class="ml-2 flex-1">
          <div>
            <span class="font-bold"> {{ comment.user.nickname }}</span>
            <span v-if="postData?.author === comment.user.uid"
              class="ml-1 text-sm bg-blue-300 px-1 py-0.5 rounded-md">文章作者</span>
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
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, nextTick, computed } from 'vue';
import { CommentData, PostDetailData } from '@/core/types';
import { useRoute } from 'vue-router';
import { formatTime } from '@/utils';
import { marked } from 'marked'
import hljs from 'highlight.js/lib/common'
import NProgress from 'nprogress'
import { useStore } from '@/store';
import { useToast } from 'vue-toastification';
import { cancelLike, countPostView, getComment, getPost, newComment, submitLike } from '@/api/post';
import NormalButton from '@/components/common/button/NormalButton.vue';
import CommentReply from '@/components/post/CommentReply.vue';
import IconView from '@/components/icon/IconView.vue';
import IconComment from '@/components/icon/IconComment.vue';
import IconLikeO from '@/components/icon/IconLikeO.vue';
import IconLikeS from '@/components/icon/IconLikeS.vue';

const store = useStore()
const route = useRoute()
const toast = useToast()

const { pid } = route.params
const { navigate } = route.query
const { login, likeCache } = toRefs(store)
const postData = ref<PostDetailData>()
const commentData = ref<CommentData[]>([])
const newCommentContent = ref('')
const replyTo = ref(0)
const likeStatus = ref(false)

const allowComment = computed(() => postData.value && postData.value.allowComment === 1)

if (login.value) {
  likeStatus.value = likeCache.value.POST.includes(String(pid))
}

// 使用 marked 自定义渲染
const rendererPost = new marked.Renderer()
rendererPost.link = (href, title, text) =>
  `<a href=${href} target="_blank" class="relative px-1 z-10 hover:text-white after:link hover:after:link-hover transition-colors">${text}</a>`
rendererPost.blockquote = (quote) =>
  `<blockquote class="pl-4 pr-2 py-2 border-l-4 border-gray-300 bg-gray-300/20">${quote}</blockquote>`

marked.setOptions({
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
  renderer: rendererPost
})

onMounted(() => {
  fetchData()
    .then(() => {
      if (navigate) {
        switch (navigate) {
          case 'comments':
            // document.getElementById('comment')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            window.scrollTo({
              top: (document.getElementById('comment')?.getBoundingClientRect().top as number) - 65,
              behavior: 'smooth'
            });
            console.log('navigate to comments');
            break;
          default:
            console.log('invalid navigate params');
        }
      }
    })
})

async function fetchData() {
  NProgress.start()
  const countPostViewPromise = countPostView(Number(pid))
  const postDataPromise = getPost(Number(pid))
  const commentDataPromise = getComment(Number(pid))
  return Promise
    .all([
      countPostViewPromise,
      postDataPromise,
      commentDataPromise,
    ])
    .then(([count, post, comment]) => {
      postData.value = post['post']
      commentData.value = comment['comments']
      document.title = postData.value?.title + ' - ' + postData.value?.user.nickname + ' - 博客'
    })
    .catch(err => {
      toast.error(err.message)
    })
    .finally(() => {
      NProgress.done()
    })
}

function handleLike() {
  if (!login.value) {
    toast.warning('请先登录')
    return
  }
  if (!likeStatus.value) {
    submitLike(store.token, 'POST', Number(pid))
      .then((result) => {
        likeStatus.value = !likeStatus.value
        postData.value && (postData.value.like += 1)
      })
      .catch((err) => {
        likeStatus.value = !likeStatus.value
        toast('点赞失败：' + err.message)
      })
      .finally(() => {
        likeCache.value.POST.push(String(pid))
      })
  } else {
    cancelLike(store.token, 'POST', Number(pid))
      .then((result) => {
        likeStatus.value = !likeStatus.value
        postData.value && (postData.value.like -= 1)
      })
      .catch((err) => {
        toast('取消点赞失败：' + err.message)
      })
      .finally(() => {
        let exist = likeCache.value.POST.indexOf(String(pid))
        if (exist !== -1) {
          likeCache.value.POST.splice(exist, 1)
        }
      })
  }
}

function handleNewComment() {
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

function replaceShortcode(text: string) {
  return marked.parse(text)
    .replaceAll('[notice]', '<div class="bg-orange-200/20 border-l-4 border-orange-400 pl-4 pr-2 py-2 my-1">')
    .replaceAll('[/notice]', '</div>')
}

function resetHeight(e: HTMLTextAreaElement) {
  e.style.height = '100px'
  nextTick(() => {
    e.style.height = e.scrollHeight + 'px'
  });
}
</script>

<style>
@tailwind utilities;

@layer utilities {
  .link {
    display: block;
    content: ' ';
    position: absolute;
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgb(86, 145, 255);
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    z-index: -1;
  }

  .link-hover {
    height: 100%;
  }
}

img {
  @apply max-w-full rounded-xl;
}

code.hljs {
  @apply rounded-xl leading-normal;
}

.rendered>* {
  @apply my-2;
}
</style>
