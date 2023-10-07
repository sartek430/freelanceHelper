import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  colors: {
    brand: {
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
    red: {
      100: "#FFE5EC",
      200: "#FCA8BC",
      300: "#F48FA7",
      400: "#F3688A",
      500: "#E04A6E",
      600: "#B7133A",
      700: "#8C0626",
      800: "#5F061B",
      900: "#33000C",
    },
    yellow: {
      100: "#FFF7E5",
      200: "#F4DAA1",
      300: "#F6D691",
      400: "#EEC05D",
      500: "#E3B145",
      600: "#AC7C14",
      700: "#885F08",
      800: "#684804",
      900: "#332300",
    },
    green: {
      100: "#D4F8E3",
      200: "#C0FFD9",
      300: "#8CEBB2",
      400: "#5DED96",
      500: "#16E86A",
      600: "#17BF5A",
      700: "#068438",
      800: "#045725",
      900: "#022B12",
    },
    gray: {
      100: "#F1FDFF",
      200: "#D9E4E5",
      300: "#B5BEBF",
      400: "#919899",
      500: "#7A8081",
      600: "#606566",
      700: "#3C3F40",
      800: "#18191A",
      900: "#000000",
    },
  },
});
export default theme;