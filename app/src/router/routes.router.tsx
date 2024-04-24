import { Navigate, createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@layouts/index";
import { Account, Dashboard, NotFound, loadDashboard } from "@pages/index";
import { AppRoutes } from "./data.router";

export const ROUTES: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: AppLayout,
    // loader: async () => await initializeLoader.run(),
    children: [
      {
        path: AppRoutes.DASHBOARD,
        Component: Dashboard,
        loader: loadDashboard,
      },
      {
        path: AppRoutes.ACCOUNT,
        Component: Account,
        loader: loadDashboard,
      },
      {
        path: AppRoutes.NOT_FOUND,
        Component: NotFound,
      },
      {
        path: "*",
        element: <Navigate to={AppRoutes.NOT_FOUND} replace={true} />,
      },
      // {
      // 	index: true,
      // 	path: '*',
      // 	Component: ()=>(<div>404</div>),
      // 	// path: AppRoutes.LOGIN,
      // 	// Component: Login,
      // 	// loader: async () => await dataLoader("logInFormScenario"),
      // },
    ],
  },
]);
