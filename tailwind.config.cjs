/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  plugins: [],
  theme: {
    extend: {
      brightness: {
        25: ".25",
      },
      fontFamily: {},
      minHeight: {
        28: "7rem",
        48: "12rem",
        screen: "100vh",
      },
      minWidth: {
        10: "2.5rem",
        48: "12rem",
        80: "20rem",
        96: "24rem",
      },
      scale: {
        102.5: "1.025",
      },
      transitionProperty: {
        colorsFilter: "background-color, border-color, color, fill, stroke, text-decoration-color, filter",
        colorsOpacity:
          "background-color, border-color, color, fill, opacity, stroke, text-decoration-color",
        colorsTransform:
          "transform, background-color, border-color, color, fill, opacity, stroke, text-decoration-color",
        colorsOpacityTransform:
          "transform, background-color, border-color, color, fill, opacity, stroke, text-decoration-color",
        opacityTransform: "opacity, transform",
        filter: "filter",
        height: "height",
        spacing: "margin, padding",
        width: "width",
      },
      width: {
        inherit: "inherit",
      },
    },
  },
};

module.exports = config;
