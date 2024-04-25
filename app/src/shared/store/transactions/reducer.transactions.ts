import { createSlice } from "@reduxjs/toolkit";

import { Currency } from "@shared/data";

export type TransactionsItem = {
  _id: string;
  amount: number;
  currency: string;
  baseCurrency: Currency;
  inBaseCurrency: number;
  account_id: string;
  category_id?: string;
  category_label: string;
  date: number;
  payee_id?: string;
  payee_label: string;
};

export type EnhancedTransactionsItem = TransactionsItem & { account: string; isEditing: boolean };

export type TransactionsState = TransactionsItem[];

const INITIAL_STATE: TransactionsState = [];

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: INITIAL_STATE,
  reducers: {
    clearTransactionsState: () => INITIAL_STATE,
    setTransactions: (_, action) => action.payload,
    updateTransactionById: (state, action) =>
      state.map(s => {
        if (s._id !== action.payload._id) return s;

        return { ...s, ...action.payload };
      }),
    deleteTransaactionById: (state, action) => state.filter(s => s._id !== action.payload),
  },
});

export const { clearTransactionsState, setTransactions, updateTransactionById, deleteTransaactionById } =
  transactionsSlice.actions;

export const transactions = transactionsSlice.reducer;
