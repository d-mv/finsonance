import { createSlice } from "@reduxjs/toolkit";

import { Maybe } from "../../../types";

export type ExchangeRatesState = Record<string, number> & { _updatedAt: number };

export type AppState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  exchangeRates: Maybe<ExchangeRatesState>;
};

const INITIAL_STATE: AppState = {
  isAuthenticated: false,
  isLoading: true,
  exchangeRates: undefined,
};

const appSlice = createSlice({
  name: "app",
  initialState: INITIAL_STATE,
  reducers: {
    clearAppState: () => INITIAL_STATE,
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setExchangeRates: (state, action) => {
      state.exchangeRates = action.payload;
    },
    updateExchangeRates: (state, action) => (state.exchangeRates = { ...state.exchangeRates, ...action.payload }),
  },
});

export const { clearAppState, setIsAuthenticated, setIsAppLoading, setExchangeRates, updateExchangeRates } =
  appSlice.actions;

export const app = appSlice.reducer;
