import { createTheme } from "@mui/material";

export const THEME = createTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: '"M PLUS Rounded 1c", sans-serif',
  },
  palette: {
    primary: {
      main: "#4f6992",
    },
    info: {
      main: "#5cd85a",
    },

    grey: {
      200: "color-mix(in srgb, #d0d0d0, #fff 95%)",
      300: "color-mix(in srgb, #d0d0d0, #fff 75%)",
      400: "color-mix(in srgb, #d0d0d0, #fff 50%)",
      500: "#d0d0d0",
      600: "color-mix(in srgb, #d0d0d0, #000 25%)",
      700: "color-mix(in srgb, #d0d0d0, #000 50%)",
      800: "color-mix(in srgb, #d0d0d0, #000 75%)",
    },
    text: {
      primary: "#444",
    },
  },
});
