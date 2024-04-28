export enum AppRoutes {
  NOT_FOUND = "/not-found",
  DASHBOARD = "/dashboard",
  ACCOUNT = "/accounts/:id",
  ACCOUNTS = "/accounts",
  TRANSACTIONS = "/transactions",
}

export type NavigationItem = {
  title: string;
  path: AppRoutes;
};

export const NAVIGATION = [
  {
    title: "Dashboard",
    path: AppRoutes.DASHBOARD,
  },
  {
    title: "Accounts",
    path: AppRoutes.ACCOUNTS,
  },
  {
    title: "Transactions",
    path: AppRoutes.TRANSACTIONS,
  },
];
