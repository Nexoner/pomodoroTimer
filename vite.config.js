import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Явно указываем, что Tailwind должен использовать tailwind.config.js
  // Плагин @tailwindcss/vite автоматически читает tailwind.config.js из корня проекта
})
