/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-blue': '#3b82f6',
        'hightlight-light': '#DADBF8',
        'accent-light': '#D9EAE3',
        'primary-light': '#FFCFE1',
        'secondary-light': '#FFFCE5',
        'primary': '#FF0F67',
        'primary-content': '#fff',
        'secondary': '#FFF07C',
        'secondary-content': '#0A0A0A',
        'accent': '#439775',
        'accent-content': '#0A0A0A',
        'neutral': '#222222',
        'neutral-content': '#FFFFFF',
        'base-100': '#f0f0f0',
        'base-200': '#ffffff',
        'base-300': '#F2F2F2',
        'base-content': '#0A0A0A',
        'info': '#3ABFF8',
        'success': '#36D399',
        'warning': '#FBBD23',
        'error': '#F87272',
        'highlight': '#454ADE',
        'muted': '#777777',
      },
      fontFamily: {
        'display': ['Outfit', 'sans-serif'],
        'sans': ['Inter Tight', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

