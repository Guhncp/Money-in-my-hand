/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          base: 'var(--color-bg-base)',
          surface: 'var(--color-bg-surface)',
          subtle: 'var(--color-bg-subtle)',
          border: 'var(--color-border)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          accent: 'var(--color-accent)',
          accentHover: 'var(--color-accent-hover)',
          accentLight: 'var(--color-accent-light)',
          success: 'var(--color-success)',
          danger: 'var(--color-danger)',
          cardGlow: 'var(--color-card-glow)',
        },
      },
      borderRadius: {
        theme: 'var(--radius-theme)',
        'theme-sm': 'var(--radius-theme-sm)',
        'theme-lg': 'var(--radius-theme-lg)',
      },
      boxShadow: {
        'theme-card': 'var(--shadow-card)',
        'theme-glow': 'var(--shadow-glow)',
      },
      fontFamily: {
        theme: 'var(--font-theme)',
      },
    },
  },
  plugins: [],
};
