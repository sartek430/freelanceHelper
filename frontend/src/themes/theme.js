// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  colors: {
    primary: {
      100: "#E7E5FF",
      200: "#B4B0F4",
      300: "#958EF9",
      400: "#6B63EB",
      500: "#4E44E1",
      600: "#2D24B2",
      700: "#150C95",
      800: "#0A0465",
      900: "#030033",
    },
  },
  dark: {
    primary: "#FAD3E9",
  },
});
export default theme;
