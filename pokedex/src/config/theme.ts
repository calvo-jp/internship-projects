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
  styles: {
    global() {
      return {
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          minH: "100vh",
          color: "white",
          bgColor: "brand.gray.900",
          scrollBehavior: "smooth",
        },
      };
    },
  },
  colors: {
    brand: {
      primary: "#FFD12D",
      primaryDark: "#806917",
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
      },
      purple: {
        500: "#8B5CF6",
      },
    },

    /**
     *
     * Colors with conflicts to brand colors
     *
     */

    others: {
      gray: {
        800: "#1A202C",
      },
    },

    /**
     *
     * This is here due to components which
     * only accepts colorScheme to change their backgrounds.
     * Color scheme needs to be a palette and only 200 shade/variant
     * if on dark mode and 500 in light mode will be picked up.
     *
     */

    colorSchemeHacks: {
      yellow: {
        200: "#FFD12D",
      },
      rose: {
        200: "#F43F5E",
      },
      teal: {
        200: "#2DD4BF",
      },
      amber: {
        200: "#FFA000",
      },
      purple: {
        200: "#8B5CF6",
      },
      gray: {
        200: "#718096",
      },
    },
  },
});

export default theme;
