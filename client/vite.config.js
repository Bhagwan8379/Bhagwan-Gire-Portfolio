import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  extend: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      playfair: ['"Playfair Display"', 'serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
  },
})