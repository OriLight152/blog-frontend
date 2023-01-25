import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vitePluginVersionMark } from 'vite-plugin-version-mark'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginVersionMark({
      ifGitSHA: true,
      ifShortSHA: true,
      ifMeta: false,
      ifLog: false,
      ifGlobal: true,
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
