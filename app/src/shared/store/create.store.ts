// import { devToolsEnhancer } from "@redux-devtools/extension";
import { Tuple, configureStore } from "@reduxjs/toolkit";

import { accounts } from "./accounts";
import { app } from "./app";
import { apiMiddleware } from "./middlewares";
import { Middleware } from "./types.store";

export const STORE = configureStore({
  reducer: {
    app,
    accounts,
  },
  // enhancers: () => new Tuple<AnyValue>(devToolsEnhancer()),
  middleware: () => new Tuple<Middleware>(apiMiddleware),
  devTools: { name: "Finsonance", shouldCatchErrors: true, trace: true, traceLimit: 25, features: { test: true } },
});
