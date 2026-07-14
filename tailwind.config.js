/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Sora"', 'system-ui', 'sans-serif'],
      },
      colors: {
        terracotta: {
          50: '#FBF3EC',
          100: '#F6E2D3',
          200: '#ECC4A8',
          300: '#E0A077',
          400: '#D17A4A',
          500: '#C25E2E',
          600: '#A64A22',
          700: '#823A1E',
          800: '#5E2C18',
          900: '#3F1E11',
        },
        sahel: {
          50: '#F0F9F1',
          100: '#DCF2DE',
          200: '#BBE4BF',
          300: '#8DD094',
          400: '#5BB567',
          500: '#37993F',
          600: '#287B30',
          700: '#21622A',
          800: '#1B4E24',
          900: '#163D1E',
        },
        sand: {
          50: '#FAF7F2',
          100: '#F3ECE0',
          200: '#E6D7C2',
          300: '#D6BD9C',
          400: '#C29F70',
          500: '#B38954',
        },
        ink: {
          50: '#F7F6F4',
          100: '#EEEBE6',
          200: '#DAD4CB',
          300: '#B8AE9F',
          400: '#8C8273',
          500: '#6A6053',
          600: '#4F463B',
          700: '#3A332B',
          800: '#272220',
          900: '#1A1614',
        },
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(38, 28, 20, 0.08), 0 4px 20px -4px rgba(38, 28, 20, 0.06)',
        card: '0 1px 3px rgba(38, 28, 20, 0.06), 0 8px 24px -8px rgba(38, 28, 20, 0.10)',
        glow: '0 0 0 4px rgba(194, 94, 46, 0.12)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-in': 'slide-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-ring': 'pulse-ring 1.6s ease-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};
