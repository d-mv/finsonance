import { createSlice } from "@reduxjs/toolkit";
import { Currency } from "@shared/data";
import { omit } from "lodash";

export type AccountStateItem = {
  _id: string;
  label: string;
  currency: Currency;
  balance: number;
};

export type AccountsState = AccountStateItem[];

const INITIAL_STATE: AccountsState = [];

const accountsSlice = createSlice({
  name: "accounts",
  initialState: INITIAL_STATE,
  reducers: {
    clearAccountsState: () => INITIAL_STATE,
    setAccounts: (_, action) => action.payload,
    updateAccountById: (state, action) =>
      state.map(account =>
        account._id === action.payload._id ? { ...account, ...omit(["_id"], action.payload) } : account,
      ),
  },
});

export const { clearAccountsState, setAccounts, updateAccountById } = accountsSlice.actions;

export const accounts = accountsSlice.reducer;
