import { AccountsState, CurrenciesState } from "@shared/store";
import { CSSProperties } from "react";

export enum DataType {
  DATE = "date",
  FLOAT = "float",
  CURRENCY = "currency",
  BASE_CURRENCY = "baseCurrency",
  CHECKBOX = "checkbox",
}

export type ScenarioCell = {
  label: string;
  align: "left" | "right" | "center";
  type?: DataType;
  id: string;
  style?: CSSProperties;
};

export type Context = {
  accounts: AccountsState;
  currencies: CurrenciesState;
};
