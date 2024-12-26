/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        themeColor1: 'var(--theme-color-1)',
        themeColorHover1: 'var(--theme-color-hover-1)',
        themeLightColor1: 'var(--theme-light-color-1)',
        headerColor: 'var(--header-color)',
      }
    },
  },
  plugins: [],
}

