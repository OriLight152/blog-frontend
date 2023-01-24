<template>
  <RouterView />
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue';
import { useStore } from './store';
const store = useStore()

const { setting } = toRefs(store)

const settingData = localStorage.getItem('setting')
if (settingData) {
  setting.value = JSON.parse(settingData)
}

watch(setting, (setting) => {
  localStorage.setItem('setting', JSON.stringify(setting))
  console.debug('[setting] change detected, save to localStorage.', setting);
}, { deep: true })
</script>