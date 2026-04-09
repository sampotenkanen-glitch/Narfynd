import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#25cfc9',
        'primary-dark': '#1db8b2',
        'primary-light': '#e0faf9',
        bg: '#f0fffe',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 18px 50px -28px rgba(19,84,91,0.45)',
        'card-hover': '0 24px 60px -24px rgba(19,84,91,0.55)',
        'card-sm': '0 12px 35px -24px rgba(19,84,91,0.4)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 450ms ease-out',
        shimmer: 'shimmer 1.4s infinite linear',
      },
    },
  },
  plugins: [],
};

export default config;
