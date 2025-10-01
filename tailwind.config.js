/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // Tailwind escaneará todos los archivos de componentes aquí
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}