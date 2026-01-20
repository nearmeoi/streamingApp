// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import { VitePWA } from 'vite-plugin-pwa';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'HuaStream',
          short_name: 'HuaStream',
          description: 'Streaming Anime & Donghua',
          theme_color: '#0f0f0f',
          background_color: '#0f0f0f',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/favicon.svg',
              sizes: '192x192',
              type: 'image/svg+xml'
            },
            {
              src: '/favicon.svg',
              sizes: '512x512',
              type: 'image/svg+xml'
            }
          ]
        },
        workbox: {
          navigateFallback: '/offline',
          globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}']
        }
      })
    ]
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  }
});