import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#14171A',
        paper: '#FAFAF9',
        forest: '#0F3D2E',
        'forest-dark': '#0A2C21',
        brass: '#B8862F',
        'brass-light': '#D9A94A',
        slate: '#3E4A47',
        grey: '#8A928E',
        hair: '#DDE3DF',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-plex)', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
