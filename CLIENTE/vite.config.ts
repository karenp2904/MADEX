import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['react-router-dom'],
    // Otros módulos para incluir o excluir aquí
  },
  build: {
    chunkSizeWarningLimit: 5000 
  },
});



