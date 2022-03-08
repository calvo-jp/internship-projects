import { extendTheme, theme as originalTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  base: "0px",
  sm: "300px",
  md: "600px",
  lg: "900px",
  xl: "1200px",
  "2xl": "1500px",
});

const theme = extendTheme({
  ...originalTheme,
  fonts: {
    body: "'Heebo', sans-serif",
    heading: "'Heebo', sans-serif",
  },
  colors: {
    brand: {
      white: "#FFFFFF",
      black: "#21243D",
      light: "#EDF7FA",
      gray: "#8695A4",
      sky: "#00A8CC",
      maroon: "#FF6464",
      indigo: "#142850",
    },
  },
  breakpoints,
});

export default theme;
