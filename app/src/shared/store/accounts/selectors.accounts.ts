import { createSelector } from "@reduxjs/toolkit";
import { roundToTwoDecimals } from "@shared/utils";
import { None, Some } from "@sniptt/monads";
import { toUpper } from "lodash/fp";
import { getExchangeRates } from "../app";
import { State } from "../types.store";

export const getAccounts = (state: State) => state.accounts || [];

export const getAccountById = createSelector(getAccounts, accounts => (id: string) => {
  const result = accounts.find(account => account._id === id);

  if (result) return Some(result);

  return None;
});

export const getBalance = createSelector(getExchangeRates, getAccounts, (exchangeRates, accounts) => {
  if (!exchangeRates) return 0;

  const accountsBalances = accounts.map(a => a.balance / (exchangeRates![toUpper(a.currency)] || 0));

  return roundToTwoDecimals(accountsBalances.reduce((acc, balance) => acc + balance, 0));
});
