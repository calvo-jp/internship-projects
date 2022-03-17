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
        100: "#EDF2F7",
        200: "#E2E8F0",
        400: "#A0AEC0",
        500: "#718096",
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
        // this was only added here since progress component
        // only picks up the 500 shade in a pallete
        500: "#FFA000",
        700: "#FFA000",
      },
      green: {
        50: "#ECFDF5",
        200: "#A7F3D0",
        500: "#10B981",
        700: "#047857",
      },
      rose: {
        500: "#F43F5E",
      },
      teal: {
        400: "#2DD4BF",
        // see above comment
        500: "#2DD4BF",
      },
      purple: {
        500: "#8B5CF6",
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
