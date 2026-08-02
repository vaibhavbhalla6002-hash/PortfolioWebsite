/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0b0b0c',
          card: '#121215',
          border: '#1f1f24',
          subtle: '#16161a',
        },
        accent: {
          DEFAULT: '#00f0ff',
          glow: 'rgba(0, 240, 255, 0.15)',
          muted: '#00b8c4',
        },
        surface: {
          light: '#f4f4f6',
          muted: '#8a8a93',
          dim: '#4a4a52',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
