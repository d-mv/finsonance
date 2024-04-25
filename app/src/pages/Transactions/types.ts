import { CSSProperties } from "react";

export enum DataType {
  DATE = "date",
  FLOAT = "float",
  CURRENCY = "currency",
  BASE_CURRENCY = "baseCurrency",
}

export type ScenarioCell = {
  label: string;
  align: "left" | "right" | "center";
  type?: DataType;
  id: string;
  style?: CSSProperties;
};
