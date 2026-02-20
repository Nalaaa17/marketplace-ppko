/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#02253d',   // Navy Gelap (sesuai gambar)
        'secondary': '#2f496e', // Biru Medium (sesuai gambar)
        'accent': '#94afc9',    // Biru Langit Pucat (sesuai gambar)
        'sand': '#c2b2a3',      // Coklat Pasir (sesuai gambar)
        'background': '#f8f7f3' // Putih Tulang (sesuai gambar)
      },
    },
  },
  plugins: [],
}