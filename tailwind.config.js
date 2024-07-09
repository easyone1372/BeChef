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
      },
      height: {
        custom: "900px",
        px100: "100px",
      },
    },
  },
  plugins: [],
};
