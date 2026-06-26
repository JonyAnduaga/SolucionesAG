import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0B0F19',
          secondary: '#111827',
          card: '#1A2235',
        },
        brand: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          glow: '#1D4ED8',
        },
        ink: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
        line: '#1E293B',
        success: '#22C55E',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      maxWidth: {
        '7xl': '80rem',
      },
    },
  },
  plugins: [],
};

export default config;
