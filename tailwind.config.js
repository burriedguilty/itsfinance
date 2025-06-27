/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textShadow: {
        DEFAULT: '0 0 15px rgba(0,240,255,0.7)',
      },
      colors: {
        background: '#000C1F',
        accent: '#00FF88',
        secondary: '#08F7FE',
        glow: '#00FFCC',
        softWhite: '#EAEAEA'
      },
      fontFamily: {
        mono: ['Space Mono', 'IBM Plex Mono', 'VT323', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        strikethrough: 'strikethrough 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            'text-shadow': '0 0 4px rgba(147,197,253,0.3), 0 0 8px rgba(147,197,253,0.3)',
            'font-weight': '400'
          },
          '50%': {
            'text-shadow': '0 0 16px rgba(147,197,253,0.8), 0 0 24px rgba(147,197,253,0.8)',
            'font-weight': '500'
          }
        },
        strikethrough: {
          '0%': { 
            left: '-100%',
            opacity: 0,
            borderColor: 'rgb(147, 197, 253)'
          },
          '10%': {
            opacity: 1
          },
          '30%': {
            borderColor: 'rgb(239, 68, 68)'
          },
          '50%': {
            opacity: 0.2
          },
          '70%': {
            borderColor: 'rgb(147, 197, 253)',
            opacity: 1
          },
          '90%': {
            borderColor: 'rgb(239, 68, 68)',
            opacity: 0.5
          },
          '100%': {
            left: '200%',
            opacity: 0,
            borderColor: 'rgb(147, 197, 253)'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.3)' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
