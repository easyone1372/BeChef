/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {
      maxWidth: {
        768: "768px",
        786: "786px",
        800: "800px",
      },

      width: {
        custom: "1000px",
        px100: "100px",
        px200: "200px",
        px300: "300px",
      },
      height: {
        custom: "900px",
        px100: "100px",
        px200: "200px",
        px300: "300px",
      },
      gap: {
        px20: "20px",
      },
    },
  },
  plugins: [],
};
