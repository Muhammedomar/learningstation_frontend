/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // 👈 ensures Tailwind scans your files
  ],
  corePlugins: {
    preflight: false, // 👈 disables Tailwind's reset
  },
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg': "url('/src/assets/hero-bg.jpg')", // 👈 custom background
      },
    },
  },
  plugins: [],
}
