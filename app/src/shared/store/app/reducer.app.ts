import { createSlice } from "@reduxjs/toolkit";

import { Maybe } from "../../../types";

export type ExchangeRatesState = Record<string, number> & { _updatedAt: number };

export type AppState = {
  isAuthenticated: boolean;
  isAppLoading: boolean;
  exchangeRates: Maybe<ExchangeRatesState>;
  isLoading: Record<string, boolean>;
};

const INITIAL_STATE: AppState = {
  isAuthenticated: false,
  isAppLoading: true,
  exchangeRates: undefined,
  isLoading: {},
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
      state.isAppLoading = action.payload;
    },
    setExchangeRates: (state, action) => {
      state.exchangeRates = action.payload;
    },
    updateExchangeRates: (state, action) => (state.exchangeRates = { ...state.exchangeRates, ...action.payload }),
    setIsLoadingById: (state, action) => {
      state.isLoading[action.payload[0]] = Boolean(action.payload[1]);
    },
  },
});

export const {
  clearAppState,
  setIsAuthenticated,
  setIsAppLoading,
  setExchangeRates,
  updateExchangeRates,
  setIsLoadingById,
} = appSlice.actions;

export const app = appSlice.reducer;
