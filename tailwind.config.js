/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ts-page':        '#0A0A0B',
        'ts-deeper':      '#111113',
        'ts-sidebar':     '#141417',
        'ts-card':        '#141417',
        'ts-surface':     '#1A1A1D',
        'ts-border':      '#1F1F23',
        'ts-border-el':   '#2A2A2E',
        'ts-primary':     '#FFFFFF',
        'ts-secondary':   '#ADADB0',
        'ts-tertiary':    '#8B8B90',
        'ts-muted':       '#6B6B70',
        'ts-disabled':    '#4A4A4E',
        'ts-orange':      '#edab00',
        'ts-orange-lt':   '#f5c842',
        'ts-green':       '#22C55E',
        'ts-red':         '#EF4444',
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        serif:   ['Instrument Serif', 'serif'],
        mono:    ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
