/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {
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
