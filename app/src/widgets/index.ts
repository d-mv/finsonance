import { lazy } from "react";

export * from "./Balance";

export const TotalBalance = lazy(() => import("./TotalBalance"));
