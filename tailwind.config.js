/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilitar el modo oscuro basado en clases
  theme: {
    extend: {
      colors: {
        // Colores personalizados para modo oscuro
        dark: {
          bg: '#1a1a1a',
          text: '#ffffff',
          primary: '#3b82f6',
          secondary: '#4b5563',
        },
      },
    },
  },
  plugins: [],
} 