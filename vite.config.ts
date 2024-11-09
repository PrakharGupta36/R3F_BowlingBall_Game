import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Allows Vite to use your local IP
    port: 3000, // You can change this to your preferred port
    strictPort: true, // Ensures Vite uses the specified port or fails
  },
});
