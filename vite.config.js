import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // 3D background runtime is route-level lazy-loaded; keep warning threshold aligned.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) return 'vendor-react-core'
          if (id.includes('/node_modules/react-router') || id.includes('/node_modules/@remix-run/')) return 'vendor-router'
          if (id.includes('/node_modules/three/examples/')) return 'vendor-three-extras'
          if (id.includes('/node_modules/three/')) return 'vendor-three-core'
          if (id.includes('/node_modules/@react-three/')) return 'vendor-react-three'
          if (id.includes('framer-motion') || id.includes('gsap')) return 'vendor-motion'
          if (id.includes('react-markdown') || id.includes('remark-gfm') || id.includes('rehype-raw')) return 'vendor-markdown'
          return 'vendor-misc'
        },
      },
    },
  },
})
