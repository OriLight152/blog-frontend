<template>
  <div class="w-full min-h-screen bg-white">
    <NavAdmin />
    <div class="flex w-full">
      <SideBarAdmin />
      <div class="w-full p-6 h-[calc(100vh-60px)] overflow-y-auto">
        <RouterView v-slot="{ Component }">
          <Transition name="page-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavAdmin from '@/components/NavAdmin.vue';
import SideBarAdmin from '@/components/sidebar/SideBarAdmin.vue';

</script>