import { extendTheme, theme } from "@chakra-ui/react";

const useTheme = () => {
  return extendTheme({
    fonts: {
      ...theme.fonts,
      body: "'PT Sans', sans-serif",
      heading: "'PT Sans', sans-serif",
    },
  });
};

export default useTheme;
