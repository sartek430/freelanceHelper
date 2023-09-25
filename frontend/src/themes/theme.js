// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  colors: {
    primary: {
      dark: "#003100",
      light: "#e6f6e6",
    },
    secondary: "#009400",
    text: {
      dark: "#000",
      light: "#fff",
    },
    icon: "#ffd700",
  },
});
export default theme;
