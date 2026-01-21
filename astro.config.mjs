// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import { VitePWA } from 'vite-plugin-pwa';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
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
          globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
          runtimeCaching: [
            {
              // Cache pages - Network first, fallback to cache
              urlPattern: ({ request }) => request.mode === 'navigate',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'pages-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 // 1 day
                },
                networkTimeoutSeconds: 3
              }
            },
            {
              // Cache API responses
              urlPattern: /^https:\/\/www\.sankavollerei\.com\/anime\/donghua/,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 5 // 5 minutes
                }
              }
            },
            {
              // Cache images
              urlPattern: /\.(?:png|jpg|jpeg|webp|gif|svg)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
                }
              }
            }
          ]
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