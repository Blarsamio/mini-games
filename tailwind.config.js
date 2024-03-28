module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      geistmono: ["Geist Mono", "monospace"],
      geist: ["Geist", "sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    colors: {
      white: '#d4d4d8',
      black: '#09090b',
      blue: {
        500: '#3b82f6',
        900: '#172554',
      },
      green: {
        500: '#10b981',
        700: '#047857',
      },
      red: {
        500: '#ef4444',
      },
    },
    extend: {
      width: {
        'w-partial': '60vw', // Custom width variable
        'w-total': '100vw', // Custom width variable
      },
      height: {
        'h-total': '100vh', // Custom height variable
        'h-partial': '60vh', // Custom height variable
      },
    },
  },
  plugins: [],
};
