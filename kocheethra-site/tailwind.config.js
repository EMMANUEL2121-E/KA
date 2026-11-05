/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Derived from the logo's royal blue and green, softened so they complement rather than copy it
        ink: { DEFAULT: '#110d47', 800: '#1a1560', 900: '#0b0833' },
        royal: { DEFAULT: '#3730b8', dark: '#29229a' },
        sky: '#7c86ff',
        mist: '#eff1ff',
        leaf: { DEFAULT: '#14b866', dark: '#0e9150' },
        mint: '#8ff0bd',
        cream: '#fbfaf6',
      },
    },
  },
  plugins: [],
};
