module.exports = {
  content: ['./dist/**/*.html', './src/**/*.{js,jsx,ts,tsx}', './*.html'],
  plugins: [require('@tailwindcss/forms')],
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  theme: {
    extend: {
      fontFamily: {
        title: ['Josefin Sans', 'sans-serif']
      },
      fontSize: {
        large: '42px'
      },
      colors: {
        blackbrown: '#333333'
      }
    }
  }
}
