import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Presentation is served both locally and through the Arena live-preview proxy
// (https://{port}-{sandboxId}.e2b.app). The proxy terminates TLS and forwards the
// original Host header, so `allowedHosts` must stay open for the preview to work.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    allowedHosts: true,
    cors: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
    allowedHosts: true,
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
  },
})
