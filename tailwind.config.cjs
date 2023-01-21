/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'popup-right': 'popup-right 0.3s',
        'popup-right-hidden': 'popup-right 0.3s reverse',
        wiggle: 'wiggle 0.2s ease-in-out',
        twinkle: 'twinkle 2s ease-in-out',
      },
      keyframes: {
        'popup-right': {
          '0%': { transform: 'translate(300px)', opacity: 0 },
          '100%': { transform: 'translate(0px)', opacity: 1 }
        },
        wiggle: {
          '0%, 100%': { transform: 'translate(-5px)' },
          '50%': { transform: 'translate(5px)' },
        },
        twinkle: {
          '0%, 100%': { backgroundColor: '#fff' },
          '20%': { backgroundColor: '#ddd' },
        }
      }
    },
  },
  plugins: [],
}
