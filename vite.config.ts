import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vitePluginBuildInfo } from 'vite-plugin-build-info' 
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginBuildInfo({
      shortSha: true,
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@cp': path.resolve(__dirname, './src/components'),
    }
  },
  base: '/blog'
})
