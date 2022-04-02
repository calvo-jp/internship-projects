import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "'PT Sans', sans-serif",
    heading: "'PT Sans', sans-serif",
  },
  styles: {
    global: {
      body: {
        minH: "100vh",
        color: "gray.700",
        bgColor: "gray.50",
        scrollBehavior: "smooth",
      },
    },
  },
});

export default theme;
