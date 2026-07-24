import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})import { defineConfig } from 'vite'
import react from '@vitejs.plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/projeto-canil/', // <--- Adicione exatamente esta linha com o nome do seu repositório
})
