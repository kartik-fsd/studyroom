/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        chambray: {
          50: "#f3f6fb",
          100: "#e3ebf6",
          200: "#ceddef",
          300: "#acc6e4",
          400: "#84a9d6",
          500: "#668bcb",
          600: "#5373bd",
          700: "#4862ad",
          800: "#445797",
          900: "#374671",
          950: "#252d46",
        },
      },
    },
  },
  plugins: ["/forms"],
};
