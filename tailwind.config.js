/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // Tailwind escaneará todos los archivos de componentes aquí
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      // ➡️ 1. Definimos la paleta de colores de Pmate
      colors: {
        // Azul Principal (Fondo, Navbar, Botones Primarios)
        'pmate-primary': '#021341', 
        // Azul Secundario/Detalle (Botones de acento, sombras)
        'pmate-secondary': '#13254d', 
        // Crema/Fondo Claro (Fondo principal de la página, tarjetas)
        'pmate-background': '#f5e6c7', 
        // Azul Brillante (Acentos, Links, Hover)
        'pmate-accent': '#03bcfa', 
      },
      // ➡️ 2. Definimos una fuente (opcional, si conoces el nombre de la fuente del logo)
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'], 
      }
    },
  },
  plugins: [],
}