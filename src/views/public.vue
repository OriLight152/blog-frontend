<template>
  <div class="w-full min-h-screen bg-gray-100">
    <Nav />
    <div class="lg:w-[960px] mx-auto my-0">
      <RouterView />
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
import { toRefs, watch } from 'vue';
import Nav from '@cp/Nav.vue';
import Footer from '@cp/Footer.vue';
import { useStore } from '@/store';
import ToolBar from '@cp/ToolBar.vue';
import IconLoading from '@cp/icon/IconLoading.vue';
import SettingPanel from '@cp/SettingPanel.vue';

const store = useStore()

const { likeCache,setting, pageLoading } = toRefs(store)

watch(likeCache, (like) => {
  localStorage.setItem('likeCache', JSON.stringify(like))
  console.debug('[like-cache] change detected, save to localStorage.', like);
}, { deep: true })



</script>