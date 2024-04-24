import { CssBaseline, ThemeProvider } from "@mui/material";
import { STORE } from "@shared/store";
import { THEME } from "@shared/theme";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement!);

root.render(
  <Provider store={STORE}>
    <ThemeProvider theme={THEME}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
);
