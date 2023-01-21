<template>
  <button class="mr-1 mb-1 border rounded-md transition-colors whitespace-nowrap" :class="(primary ? 'bg-blue-500 text-white hover:bg-blue-400' : 'hover:border-blue-500') + ' ' +
  (icon ? 'p-1' : 'px-6 py-1')">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  primary: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Boolean,
    default: false
  }
})
</script>