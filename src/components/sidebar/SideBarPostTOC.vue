<template>
  <div class="w-[200px] flex-shrink-0 hidden xl:block mr-2" v-if="titles.length !== 0">
    <div class="fixed top-[68px] w-[200px] bg-white rounded-md h-fit p-2">
      <div class="font-bold text-lg">文章目录</div>
      <div class="px-2 py-1 hover:bg-gray-500/20 rounded-md cursor-pointer" v-for="title in titles"
        @click="navToTitle(title)">{{
  title.replace(/(#{1,6})\s/g, (item, p0) => {
    return '&nbsp;&nbsp;&nbsp;&nbsp;'.repeat((p0.length - 2))
  })
        }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps({
  content: String
})
const titles = ref<string[]>([])
const fold = ref(false)

let re = /(#{1,6})\s(.*)/g;

onMounted(() => {
  titles.value = Array(...props.content?.match(re) || [])
})

function navToTitle(title: string) {
  const ele = document.getElementById(title.replace(/(#{1,6})\s/g, '').toLowerCase().replace(/\.|,|\(|\)|\//g, '').replace(/\s/g, '-'))
  if (ele) {
    window.scrollTo({
      top: ele.offsetTop - 70,
      behavior: 'smooth'
    });
    setTimeout(() => {
      ele.classList.add('animate-twinkle')
    }, 200)
    setTimeout(() => {
      ele.classList.remove('animate-twinkle')
    }, 2200)
  }
}
</script>