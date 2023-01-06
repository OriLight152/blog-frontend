<template>
  <div class="min-h-screen">
    <Nav />
    <div class="lg:w-[960px] mx-auto my-0">
      <RouterView />
    </div>
    <Footer />
    <ToolBar />
  </div>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue';
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
import { useStore } from './store';
import ToolBar from './components/ToolBar.vue';

const store = useStore()

const { likeCache } = toRefs(store)

watch(likeCache, (like) => {
  localStorage.setItem('likeCache', JSON.stringify(like))
  console.debug('[like-cache] change detected, save to localStorage.', like);
}, { deep: true })

</script>

<style>
body {
  @apply bg-gray-100;
}
</style>