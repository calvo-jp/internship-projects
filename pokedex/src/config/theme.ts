import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
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
        100: "#EDF2F7",
        200: "#E2E8F0",
        300: "#CBD5E0",
        400: "#A0AEC0",
        500: "#718096",
        600: "#4A5568",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
      },
      blue: {
        50: "#EFF6FF",
        200: "#BFDBFE",
        400: "#60A5FA",
        700: "#1D4ED8",
      },
      red: {
        50: "#FEF2F2",
        200: "#FECACA",
        500: "#EF4444",
        700: "#B91C1C",
      },
      amber: {
        400: "#FFCA28",
        700: "#FFA000",
        // this was only added here since progress component
        // only picks up the 500 shade in a pallete
        200: "#FFA000",
      },
      green: {
        50: "#ECFDF5",
        200: "#A7F3D0",
        500: "#10B981",
        700: "#047857",
      },
      rose: {
        500: "#F43F5E",
        // see above comment
        200: "#F43F5E",
      },
      teal: {
        400: "#2DD4BF",
        // see above comment
        200: "#2DD4BF",
      },
      purple: {
        500: "#8B5CF6",
        // see above comment
        200: "#8B5CF6",
      },
      inconsistent: {
        gray: {
          // there are 2 different shade of gray.800 found in figma
          800: "#1A202C",
        },
      },
    },
  },
});

export default theme;
