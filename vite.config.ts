import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  base: "/your-repo-name/", // Replace with your GitHub repository name
});
// https://vitejs.dev/config/
export default defineConfig({
  base: "https://github.com/dinesh-budidha/VideoTranslate.git",
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
