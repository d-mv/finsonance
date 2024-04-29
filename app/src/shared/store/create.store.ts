// import { devToolsEnhancer } from "@redux-devtools/extension";
import { Tuple, configureStore } from "@reduxjs/toolkit";

import { accounts } from "./accounts";
import { app } from "./app";
import { categories } from "./categories";
import { currencies } from "./currencies";
import { apiMiddleware } from "./middlewares";
import { transactions } from "./transactions";
import { Middleware } from "./types.store";

export const STORE = configureStore({
  reducer: {
    app,
    accounts,
    transactions,
    currencies,
    categories,
  },
  middleware: () => new Tuple<Middleware>(apiMiddleware),
  devTools: { name: "Finsonance", shouldCatchErrors: true, trace: true, traceLimit: 25, features: { test: true } },
});
