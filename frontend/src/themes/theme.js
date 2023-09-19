// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

const lightTheme = {
  colors: {
    primary: "#007BFF",
    background: "#FFFFFF",
    text: "#333333",
  },
};

const darkTheme = {
  colors: {
    primary: "#007BFF",
    background: "#333333",
    text: "#FFFFFF",
  },
};

export const themeConfig = {
  initialColorMode: "dark", // Définir le mode sombre par défaut
  useSystemColorMode: false, // Désactiver la détection automatique du système
};

// 3. extend the theme
const theme = {
  light: extendTheme({ ...lightTheme }),
  dark: extendTheme({ ...darkTheme }),
};

export default theme;
