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
        pinLiG: "#DBED89",
        pinDG: "#65A119",
        pinLB: "#FBFFFB",
        skipDB: "#0A3677",
        skipMB: "#0078B3",
        skipLB: "#00BBCC",
        skipM: "#6EFACC",
        colY: "#FFFCF4",
        colG: "#D0D8B4",
        colB: "#BAE2Bc",
        sspB: "#0AA2CC",
        sspG: "#DBE8E5",
        sspDG: "#408579",
        npGB: "#0AA2CC",
        npB: "#00A4E9",
        npLG: "#F0FBFF",
        npLM: "#E6F4F1",
        cubeY: "#FFE325",
        cubeR: "#C9A38D",
        cubeG: "#90B6A5",
        cubeB: "#FFF9EA",
        disP: "#FFCFCC",
        disR: "#EF6366",
        disLP: "#FFF4F2",
        disGB: "#2F2C23",
      },
      fontSize: {
        px26: "26px",
        px32: "32px",
      },
      margin: {
        px10: "10px",
        px20: "20px",
      },
    },
  },
  plugins: [],
};
