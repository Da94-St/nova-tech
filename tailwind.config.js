/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '100xl': '100rem',
        '110xl': '110rem',
        '120xl': '120rem',
        '160xl': '160rem',
        'screen-2xl': '1400px',
        'prose': '65ch',
      },
      fontSize: {
        // Restored full scale with custom sizes
        'sm': '0.875rem',      // 14px
        'base': '1rem',        // 16px
        'lg': '1.125rem',      // 18px
        'xl': '1.25rem',       // 20px
        '2xl': '1.5rem',       // 24px
        '3xl': '1.875rem',     // 30px
        '4xl': '2.25rem',      // 36px
        '5xl': '3rem',         // 48px
        '6xl': '3.75rem',      // 60px
        '7xl': '4.5rem',       // 72px
        '8xl': '6rem',         // 96px
        '9xl': '8rem',         // 128px
        // Custom sizes
        'ls': '1.3rem',        // 20.8px
        'xl-custom': '1.4rem', // 22.4px
      },
      fontWeight: {
        'normal': 400,
        'medium': 500,
        'bold': 700,
      },
      // Glass theme enhancements
      backgroundImage: {
        'glass': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
        'glass-active': 'linear-gradient(to bottom right, rgba(199, 210, 254, 0.4), rgba(199, 210, 254, 0.15))',
        'shine': 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
      },
      boxShadow: {
        'glass': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'glass-active': '0 4px 25px rgba(99, 102, 241, 0.2)',
      },
      
    },
  },
  plugins: [],
};