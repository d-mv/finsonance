import { createSlice } from "@reduxjs/toolkit";
import { Currency } from "@shared/data";

export type CurrencyStateItem = {
  _id: string;
  label: string;
  short: Currency;
  symbol: string;
};

export type CurrenciesState = CurrencyStateItem[];

const INITIAL_STATE: CurrenciesState = [];

const currenciesSlice = createSlice({
  name: "currencies",
  initialState: INITIAL_STATE,
  reducers: {
    clearCurrenciesState: () => INITIAL_STATE,
    setCurrencies: (_, action) => action.payload,
    addCurrency: (state, action) => [...state, action.payload],
  },
});

export const { clearCurrenciesState, setCurrencies, addCurrency } = currenciesSlice.actions;

export const currencies = currenciesSlice.reducer;
