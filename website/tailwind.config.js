/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F5EFE0',
          100: '#F0E6D2',
          200: '#E6D7C3',
          300: '#D1B99A',
          400: '#BD9C71',
          500: '#8B6D4C',
          600: '#7A5E3E',
          700: '#5F4D33',
          800: '#4D3B29',
          900: '#3D2E1F',
        },
        claude: '#8A85FF',
        gpt: '#19C37D',
        deepseek: '#FF7D4D',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
