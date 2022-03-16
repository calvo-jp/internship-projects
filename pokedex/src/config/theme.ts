import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Inter', sans-serif",
  },
  colors: {
    brand: {
      tertiary: "#3F81E4",
    },
  },
});

export default theme;
