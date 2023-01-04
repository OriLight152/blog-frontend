<template>
  <div class="min-h-screen">
    <Nav />
    <div class="lg:w-[960px] mx-auto my-0">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import Footer from './components/Footer.vue';
import Nav from './components/Nav.vue';
import { useStore } from './store';

const store = useStore()

const { devMode } = toRefs(store)

devMode.value = localStorage.getItem('devMode') == 'true'

</script>

<style>
body {
  @apply bg-gray-100;
}
</style>