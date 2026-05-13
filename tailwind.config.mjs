/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",   // catch everything in src
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'kgf-blue': '#2563eb',
        'kgf-green': '#16a34a',
        'kgf-red': '#dc2626',
        sage: {
          50: '#f4f7f4',
          100: '#e6ede6',
          200: '#d1ddd1',
          300: '#b0c2b0',
          400: '#88a188',
          500: '#6d866d',
          600: '#546a54',
          700: '#435543',
          800: '#384538',
          900: '#2f3b2f',
          950: '#1a211a',
        },
        gold: {
          50: '#fbf9f1',
          100: '#f5f0db',
          200: '#ebdcae',
          300: '#dfc278',
          400: '#d4a84d',
          500: '#c58a36',
          600: '#aa6d2b',
          700: '#8b5327',
          800: '#734424',
          900: '#613b21',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
