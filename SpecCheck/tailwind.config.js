/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#00002B',       // Left dark blue
        royal: '#000080',
        mib :'000066',    // Right wave blue
      },
    },
  },
  plugins: [],
}