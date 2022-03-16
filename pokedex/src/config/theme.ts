import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Inter', sans-serif",
  },
  colors: {
    brand: {
      primary: "#FFD12D",
      tertiary: "#3F81E4",
      gray: {
        50: "#F7FAFC",
        400: "#A0AEC0",
        500: "#718096",
        800: "#1F2937",
        900: "#111827",
      },
      red: {
        500: "#EF4444",
      },
    },
  },
});

export default theme;
