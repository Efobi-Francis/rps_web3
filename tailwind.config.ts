import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'Barlow': ['Barlow Semi Condensed', 'system-ui']
    },
    
    screens: {
      'sm': '375px',
      // => @media (min-width: 576px) { ... }
      'lg': '1366px',
      // => @media (min-width: 1366px) { ... }
    },

    container: {
      padding: {
        DEFAULT: '1rem',
      },
    },

    extend: {},
  },
  plugins: [],
}
export default config
