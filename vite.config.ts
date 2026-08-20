import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import chatHandler from './api/chat.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'chat-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && (req.url.startsWith('/api/chat') || req.url.split('?')[0] === '/api/chat')) {
            try {
              await chatHandler(req, res);
            } catch (err) {
              console.error('Vite Dev Server API Chat Error:', err);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal Dev Server Error' }));
            }
          } else {
            next();
          }
        });
      }
    }
  ],
})

