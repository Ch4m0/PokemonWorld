/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'btn-red-normal': '#F22539',
        'btn-red-pressed': '#C00E20'
      },
      padding: {
        'py-main': '35px'
      }
    }
  },
  plugins: []
}
