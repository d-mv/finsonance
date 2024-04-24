import type { State } from "../types.store";

export const getIsAppLoading = (state: State) => state.app.isLoading;

export const getExchangeRates = (state: State) => state.app.exchangeRates;
