import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Ubuntu, sans-serif",
    body: "Ubuntu, sans-serif",
  },
  colors: {
    brand: {
      yellow: "#ffd200",
      darkGray: "#cfcfcf",
      lightGray: "#f5f5f5",
      red: "#9d0606",
    },
  },
});

export default theme;
