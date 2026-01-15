import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const def = {
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve('src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (/\.css$/.test(assetInfo.name)) {
            return 'css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
}

const dev = {
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/res': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
}

const prod = {
  base: '/admin/',
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    ...def,
    ...(env.VITE_APP_ENV === 'production' ? prod : dev),
  }
})
