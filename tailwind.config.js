/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Cairo — modern premium Arabic + Latin font
        cairo: ['"Cairo"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
