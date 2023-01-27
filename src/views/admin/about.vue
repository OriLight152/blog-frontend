<template>
  <div>
    <p class="mb-4 text-2xl font-bold">关于</p>
    <p class="font-bold text-4xl mb-4">Ori博客</p>
    <p><strong>程序版本：</strong><a :href="frontendRepo + '/tree/' + commitHash">{{ commitHash }}</a></p>
    <p><strong>Vue版本：</strong>{{ versionVue }}</p>
    <p><strong>作者：</strong><a href="https://github.com/OriLight152" target="_blank">OriLight</a></p>
    <p><strong>前端仓库：</strong><a :href="frontendRepo" target="_blank">{{ frontendRepo }}</a></p>
    <p><strong>后端仓库：</strong><a :href="backendRepo" target="_blank">{{ backendRepo }}</a></p>
  </div>
</template>

<script setup lang="ts">
import { version as versionVue } from 'vue';
import { frontendRepo, backendRepo } from '@/config'

const commitHash = window.__BLOG_VERSION__ || 'dev'
</script>