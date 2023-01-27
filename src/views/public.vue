<template>
  <div class="w-full min-h-screen bg-gray-100">
    <Nav />
    <div class="lg:w-[960px] mx-auto my-0">
      <Transition name="page-in">
        <RouterView />
      </Transition>
      <div class="w-full my-10 flex justify-center" v-if="pageLoading">
        <IconLoading class="w-20 h-20" />
      </div>
    </div>
    <Footer />
    <SettingPanel />
    <ToolBar />
  </div>
</template>

<script setup lang="ts">
import { toRefs, watchEffect } from 'vue';
import Nav from '@cp/Nav.vue';
import Footer from '@cp/Footer.vue';
import { useStore } from '@/store';
import ToolBar from '@cp/ToolBar.vue';
import IconLoading from '@cp/icon/IconLoading.vue';
import SettingPanel from '@cp/SettingPanel.vue';

const store = useStore()

const { likeCache, pageLoading, showToolBarBtn, showNav } = toRefs(store)

let oldY = 0

watchEffect(() => {
  localStorage.setItem('likeCache', JSON.stringify(likeCache.value))
  console.debug('[like-cache] change detected, save to localStorage.', likeCache.value);
})

window.onscroll = handleWindowScroll

function handleWindowScroll(e: Event) {
  const newY = document.documentElement.scrollTop
  if (newY > oldY && newY > 100) {
    showNav.value = false
  } else if (newY < oldY) {
    showNav.value = true
  }
  oldY = newY
  showToolBarBtn.value.top = document.documentElement.scrollTop > 20
  showToolBarBtn.value.bottom = (document.body.scrollHeight - window.screen.height - document.documentElement.scrollTop) > 20
}

</script>