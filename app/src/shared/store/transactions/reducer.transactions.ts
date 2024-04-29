import { createSlice } from "@reduxjs/toolkit";

export type TransactionsItem = {
  _id: string;
  amount: number;
  currency_id: string;
  base_currency_id: string;
  in_base_currency: number;
  account_id: string;
  category_id: string;
  category_label: string;
  date: number;
  payee_id: string;
  payee_label: string;
  description: string;
  notes?: string;
  _createdAt?: number;
  _updatedAt?: number;
};

export type EnhancedTransactionsItem = TransactionsItem;

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
    addTransaction: (state, action) => [...state, action.payload],
  },
});

export const {
  clearTransactionsState,
  setTransactions,
  updateTransactionById,
  deleteTransaactionById,
  addTransaction,
} = transactionsSlice.actions;

export const transactions = transactionsSlice.reducer;
