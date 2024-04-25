import { createSelector } from "@reduxjs/toolkit";
import { getAccounts } from "../accounts";
import { State } from "../types.store";
import { EnhancedTransactionsItem } from "./reducer.transactions";

const getTransactions = (state: State) => state.transactions;

export const getTransactionsToDisplay = createSelector(
  getTransactions,
  getAccounts,
  (transactions, accounts) =>
    transactions
      .map(t => ({
        ...t,
        account: accounts.find(a => a._id === t.account_id)?.label,
      }))
      .sort((a, b) => a.date - b.date) as EnhancedTransactionsItem[],
);
