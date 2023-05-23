import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import GlobPlugin from 'vite-plugin-test-glob'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(fileURLToPath(import.meta.url), '../src')}/`,
    },
  },
  plugins: [
    GlobPlugin({
      takeover: true,
    }),
  ],
  build: {
    target: 'esnext',
  },
  clearScreen: false,
  optimizeDeps: {
    entries: [],
  },
})
