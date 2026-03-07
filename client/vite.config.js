import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      'viceregal-recompensable-april.ngrok-free.dev' // Your Ngrok tunnel
    ],
    // Add the proxy configuration here
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // Optional: If your Express routes don't actually start with /api, 
        // you can rewrite the path before it hits Express by uncommenting below:
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  plugins: [react(), tailwind(),
    VitePWA({
      useCredentials:true,
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true ,
        type:'module',
        navigateFallback:'index.html',
      },
      manifest: {
        name: 'Monni DevelopMent App',
        short_name: 'MoNNi',
        description: 'PWA for MoNNi Service ',
        display: 'standalone', 
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icon-192.png', 
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
});
