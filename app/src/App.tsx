import { ApiActionType } from "@shared/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { AppContext, Modals } from "./context";
import { ROUTES } from "./router";
import { MaybeNull } from "./types";

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ApiActionType.GET_EXCHANGE_RATES });
  }, []);

  const [modal, setModal] = useState<MaybeNull<Modals>>(null);

  return (
    <AppContext.Provider value={{ modal, setModal }}>
      <RouterProvider
        router={ROUTES}
        // fallbackElement={<Spinner />}
        future={{ v7_startTransition: true }}
      />
    </AppContext.Provider>
  );
}
