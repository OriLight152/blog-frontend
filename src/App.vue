<template>
  <RouterView />
</template>

<script setup lang="ts">
import { toRefs, watchEffect } from 'vue';
import { useStore } from './store';
const store = useStore()

const { setting } = toRefs(store)

const settingData = localStorage.getItem('setting')
if (settingData) {
  setting.value = JSON.parse(settingData)
}

watchEffect(() => {
  localStorage.setItem('setting', JSON.stringify(setting.value))
  console.debug('[setting] change detected, save to localStorage.', setting.value);
})
</script>