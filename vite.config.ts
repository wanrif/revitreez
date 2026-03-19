import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const isAnalyze = process.env.ANALYZE === 'true'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    cssMinify: 'lightningcss',
    minify: 'oxc',
    rolldownOptions: {
      plugins: [
        ...(isAnalyze
          ? [
              visualizer({
                filename: 'dist/stats.html',
                template: 'treemap',
                gzipSize: true,
                brotliSize: true,
                open: false,
              }),
            ]
          : []),
      ],
      output: {
        minify: {
          compress: {
            dropConsole: true,
            dropDebugger: true,
          },
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames(assetInfo) {
          const extension = assetInfo.name?.split('.').pop() ?? ''

          if (extension === 'css') {
            return 'assets/css/[name]-[hash][extname]'
          }

          if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif', 'ico'].includes(extension)) {
            return 'assets/images/[name]-[hash][extname]'
          }

          if (['woff', 'woff2', 'ttf', 'otf', 'eot'].includes(extension)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }

          return 'assets/[name]-[hash][extname]'
        },
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }

          const modulePath = id.split('node_modules/')[1]
          const segments = modulePath.split('/')
          const packageName = segments[0].startsWith('@')
            ? `${segments[0]}/${segments[1]}`
            : segments[0]

          // Keep major framework dependencies in stable chunks for better long-term caching.
          if (
            packageName === 'react' ||
            packageName === 'react-dom' ||
            packageName === 'scheduler'
          ) {
            return 'react-vendor'
          }

          if (packageName.startsWith('@tanstack')) {
            return 'tanstack-vendor'
          }

          if (packageName === 'axios' || packageName === 'zustand' || packageName === 'zod') {
            return 'data-vendor'
          }

          return 'vendor'
        },
      },
    },
  },
  server: {
    port: Number(process.env.VITE_PORT) || 5173,
    host: false,
  },
  preview: {
    port: 4173,
    host: false,
  },
})
