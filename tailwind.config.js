/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {
      width: {
        custom: "1000px",
      },
      height: {
        custom: "900px",
      },
    },
  },
  plugins: [],
};
