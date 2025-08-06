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
        // Exact colors from original Skillar.ai design
        background: {
          primary: '#0a0b14', // --bg-primary
          secondary: '#1a1b26', // --bg-secondary  
          card: '#16192e', // --bg-card
        },
        text: {
          primary: '#ffffff', // --text-primary
          secondary: '#94a3b8', // --text-secondary
        },
        border: '#334155', // --border-color
        accent: {
          blue: '#2563eb', // --accent-blue
          purple: '#7c3aed', // --accent-purple
        },
        success: '#10b981', // --success-color
        error: '#ef4444', // --error-color
        warning: '#e68161',
        // Primary teal colors from original
        primary: {
          DEFAULT: '#32b8c6', // color-teal-300
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#32b8c6',
          400: '#2da6b2',
          500: '#21808d',
          600: '#1d7480',
          700: '#1a6873',
          800: '#2996a1',
          900: '#134353',
        },
      },
      fontFamily: {
        sans: ['FKGroteskNeue', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        xs: ['11px', { lineHeight: '1.2' }],
        sm: ['12px', { lineHeight: '1.2' }],
        base: ['14px', { lineHeight: '1.5' }],
        lg: ['16px', { lineHeight: '1.5' }],
        xl: ['18px', { lineHeight: '1.2' }],
        '2xl': ['20px', { lineHeight: '1.2' }],
        '3xl': ['24px', { lineHeight: '1.2' }],
        '4xl': ['30px', { lineHeight: '1.2' }],
        '5xl': ['56px', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '72px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}