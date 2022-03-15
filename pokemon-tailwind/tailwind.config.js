module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    fontFamily: {
      sans: ["'PT Sans'", "sans-serif"],
      secondary: ["'Montserrat'", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
