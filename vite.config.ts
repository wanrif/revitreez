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
        assetFileNames: `assets/[name]-[hash].[ext]`,
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/]react/,
              priority: 20,
            },
            {
              test: /node_modules[\\/]@tanstack[\\/]/,
              name: 'tanstack-vendor',
              priority: 15,
            },
            {
              test: /node_modules[\\/](axios|zustand|zod)[\\/]/,
              name: 'data-vendor',
              priority: 10,
            },
          ],
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
