// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  colors: {
    light: {
      primary: "#DA1587",
      // Autres couleurs pour le mode light
    },
    dark: {
      primary: "#FAD3E9",
      // Autres couleurs pour le mode dark
    },
  },
});
export default theme;
