import { Action as ReduxAction, Store as ReduxStore } from "@reduxjs/toolkit";
import { ExchangeRatesService, LocalStorageService, LoggerService } from "@services/index";
import { CONFIG } from "../../config";
import { AnyValue } from "../../types";
import { AccountsState } from "./accounts";
import { AppState } from "./app";
import { CategoriesState } from "./categories";
import { CurrenciesState } from "./currencies";
import { PayeesState } from "./payees";
import { TransactionsState } from "./transactions";

export type State = {
  app: AppState;
  accounts: AccountsState;
  transactions: TransactionsState;
  currencies: CurrenciesState;
  categories: CategoriesState;
  payees: PayeesState;
};

export type Middleware = AnyValue;

export enum ApiActionType {
  GET_EXCHANGE_RATES = "GET_EXCHANGE_RATES",
}

export enum ActionType {
  SET_APP_STATE = "SET_APP_STATE",
  SET_ACCOUNTS_STATE = "SET_ACCOUNTS_STATE",
}

export type ActionTypes = ApiActionType | ActionType | string;

export type Action = ReduxAction<ActionTypes> & { payload?: AnyValue };

export type Store = ReduxStore<State, Action>;

export type Context = {
  store: Store;
  config: typeof CONFIG;
  services: {
    LoggerService: typeof LoggerService;
    ExchangeRatesService: typeof ExchangeRatesService;
    LocalStorageService: typeof LocalStorageService;
  };
};
