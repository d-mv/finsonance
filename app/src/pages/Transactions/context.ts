import { EnhancedTransactionsItem } from "@shared/store/transactions";
import { MaybeNull } from "src/types";
import { createContext } from "use-context-selector";
import { ScenarioCell } from "./types";

type TransactionsContextType = {
  transactions: EnhancedTransactionsItem[];
  isEditingId: MaybeNull<string>;
  setIsEditingId: (arg0: MaybeNull<string>) => void;
  updateNewTransaction: (cellId: string, value: string) => void;
  tempEditValue: MaybeNull<string>;
  setTempEditValue: (arg0: MaybeNull<string>) => void;
  selectedIds: string[];
  toggleRowSelection: (id: string) => () => void;
  handlePersistentUpdate: (rowId: string, cellId: string) => void;
  createNewTrx: () => void;
  cells: ScenarioCell[];
  newTrx: MaybeNull<EnhancedTransactionsItem>;
};

export const TransactionsContext = createContext<TransactionsContextType>({} as TransactionsContextType);

TransactionsContext.displayName = "TransactionsContext";

type TransactionsHeaderCellContextType = {
  cell: ScenarioCell;
};

export const TransactionsHeaderCellContext = createContext<TransactionsHeaderCellContextType>(
  {} as TransactionsHeaderCellContextType,
);

TransactionsHeaderCellContext.displayName = "TransactionsHeaderCellContext";

type TransactionsCellContextType = {
  cell: ScenarioCell;
};

export const TransactionsCellContext = createContext<TransactionsCellContextType>({} as TransactionsCellContextType);

TransactionsCellContext.displayName = "TransactionsCellContext";

type TransactionsRowContextType = {
  row: EnhancedTransactionsItem;
};

export const TransactionsRowContext = createContext<TransactionsRowContextType>({} as TransactionsRowContextType);

TransactionsRowContext.displayName = "TransactionsRowContext";
