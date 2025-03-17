/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Ensures dark mode works
  content: [
    "./public/**/*.html",
    "./public/assets/js/**/*.js",
    "./public/wireframe/*.html"
  ],
  theme: {
    extend: {
      colors: {
        "navbar-color": "var(--navbar-color)",
      },
      fontFamily: {
        'body': [
          'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'system-ui',
          'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif',
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'
        ],
        'sans': [
          'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'system-ui',
          'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif',
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'
        ]
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        'slide-in': 'slideIn 1s ease-out'
      }
    }
  },
  plugins: [],
};
