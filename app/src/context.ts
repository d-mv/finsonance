import { createContext } from "use-context-selector";
import { MaybeNull } from "./types";

export enum Modals {
  ADD_TRANSACTION = "ADD_TRANSACTION",
}

export type AppContextType = {
  modal: MaybeNull<Modals>;
  setModal: (modal: MaybeNull<Modals>) => void;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

AppContext.displayName = "AppContext";
