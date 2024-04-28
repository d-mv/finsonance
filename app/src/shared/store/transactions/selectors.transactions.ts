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

export const getTransactionsAccountId = (state: State) => (accountId: string) => {
  const transactions = getTransactions(state);

  const accounts = getAccounts(state);

  return transactions
    .map(t => {
      if (t.account_id !== accountId) return undefined;

      return {
        ...t,
        account: accounts.find(a => a._id === t.account_id)?.label,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a!.date - b!.date) as EnhancedTransactionsItem[];
};
