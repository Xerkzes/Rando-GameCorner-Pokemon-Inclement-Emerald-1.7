const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const brandColor = "rgb(137, 207, 240)";

module.exports = {
  // Enable JIT for a faster development experience:
  // https://tailwindcss.com/docs/just-in-time-mode
  // mode: "jit",
  // Add support for dark mode, toggled via a class:
  // https://tailwindcss.com/docs/dark-mode
  darkMode: "class",
  // Inform Tailwind of where our classes will be defined:
  // https://tailwindcss.com/docs/optimizing-for-production
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // NOTE: We modify the gray color, as the default Tailwind gray color is heavily saturated
        // with blue, which makes it look strange in dark mode. This gray color is more balanced,
        // and works better for sites supporting dark mode.
        gray: colors.gray,
        // Add a new "brand" color to all Tailwind utilities, so that we can easily change it.
        brand: brandColor,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {
      width: ["hover"],
    },
  },
  plugins: [],
};
