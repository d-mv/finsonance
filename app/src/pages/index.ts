import { lazy } from "react";

export * from "./Dashboard";

export * from "./Transactions";

export * from "./Accounts";

export const NotFound = lazy(() => import("./NotFound"));

export const Account = lazy(() => import("./Account"));
