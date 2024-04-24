import { lazy } from "react";

export * from "./Dashboard";

export * from "./Account";

export const NotFound = lazy(() => import("./NotFound"));
