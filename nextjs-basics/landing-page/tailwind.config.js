// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2', // Blue
        secondary: '#FF6F61', // Coral
        accent: '#00C8A8', // Greenish teal
      },
    },
  },
  plugins: [],
}
