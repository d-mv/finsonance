import { createSlice } from "@reduxjs/toolkit";

export type AccountStateItem = {
  _id: string;
  label: string;
  currency: string;
  balance: number;
  type: "cash" | "bank" | "crypto" | "credit" | "investment";
  _createdAt: number;
  _updatedAt: number;
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
      state.map(account => (account._id === action.payload._id ? { ...account, ...action.payload } : account)),
    addAccount: (state, action) => [...state, action.payload],
  },
});

export const { clearAccountsState, addAccount, setAccounts, updateAccountById } = accountsSlice.actions;

export const accounts = accountsSlice.reducer;
