import { ApiActionType } from "@shared/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ROUTES } from "./router";

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ApiActionType.GET_EXCHANGE_RATES });
  }, []);

  [];
  return (
    <RouterProvider
      router={ROUTES}
      // fallbackElement={<Spinner />}
      future={{ v7_startTransition: true }}
    />
  );
}
