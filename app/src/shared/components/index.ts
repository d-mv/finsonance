import { lazy } from "react";

export const WidgetLayout = lazy(() => import("./WidgetLayout"));

export const FormField = lazy(() => import("./FormField"));

export const ToggleForm = lazy(() => import("./ToggleForm"));

export const InputForm = lazy(() => import("./InputForm"));

export const CurrencySelectorForm = lazy(() => import("./CurrencySelectorForm"));

export const AccountType = lazy(() => import("./AccountType"));

export const ButtonGroupForm = lazy(() => import("./ButtonGroupForm"));

export const ConfirmationDialog = lazy(() => import("./ConfirmationDialog"));

export const CalculateInBaseCurrencyForm = lazy(() => import("./CalculateInBaseCurrencyForm"));

export const SelectorForm = lazy(() => import("./SelectorForm"));

export * from "./Toggle";
