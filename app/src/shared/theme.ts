import { createTheme } from "@mui/material";
import { blueGrey, deepOrange, grey } from "@mui/material/colors";

export const THEME = createTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: '"M PLUS Rounded 1c", sans-serif',
  },
  palette: {
    primary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[700],
      contrastText: "#fff",
    },
    info: {
      main: deepOrange[500],
    },
    grey: {
      200: grey[200],
      300: grey[300],
      400: grey[400],
      500: grey[500],
      600: grey[600],
      700: grey[700],
      800: grey[800],
    },
    text: {
      primary: "#444",
    },
  },
});
