<template>
  <p class="mb-4 text-2xl font-bold">关于</p>
  <p class="font-bold text-4xl mb-4">Ori博客</p>
  <p><strong>程序版本：</strong>{{ versionApp }}</p>
  <p><strong>Vue版本：</strong>{{ versionVue }}</p>
  <p><strong>作者：</strong><a href="https://github.com/OriLight152" target="_blank">OriLight</a></p>
  <p><strong>前端仓库：</strong><a href="https://github.com/OriLight152/blog-frontend" target="_blank">https://github.com/OriLight152/blog-frontend</a></p>
  <p><strong>后端仓库：</strong><a href="https://github.com/OriLight152/blog-server" target="_blank">https://github.com/OriLight152/blog-server</a></p>
</template>

<script setup lang="ts">
import { version as versionVue } from 'vue';

const versionApp = window.__blog_VERSION__ || 'dev'
</script>