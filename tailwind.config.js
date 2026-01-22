/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          'main-dark': 'var(--bg-dark)',
          'card-dark': 'var(--card-bg)',
          'neon-purple': 'var(--accent-purple)',
          'game-bg': 'var(--bg-dark)',
          'game-card': 'var(--card-bg)',
          'game-purple': 'var(--accent-purple)',
          'game-pink': 'var(--accent-pink)',
        },
        boxShadow: {
          'glow': 'var(--glow-purple)',
          'neon': 'var(--glow-purple)',
        }
      },
    },
    plugins: [],
  }