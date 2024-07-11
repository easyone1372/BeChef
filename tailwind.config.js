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
        px75: "75px",
        px100: "100px",
        px150: "150px",
        px200: "200px",
        px250: "250px",
        px300: "300px",
        px350: "350px",
        px445: "445px",
      },
      height: {
        custom: "900px",
        px100: "100px",
        px200: "200px",
        px250: "250px",
        px300: "300px",
        px350: "350px",
      },
      gap: {
        px10: "10px",
        px20: "20px",
      },
      colors: {
        carrot: "#ffb534",
        beige: "#fffdde",
        lightG: "#E7FBBE",
      },
      fontSize: {
        px26: "26px",
      },
      margin: {
        px20: "20px",
      },
    },
  },
  plugins: [],
};
