import { Fn, SingletonFn } from "@mv-d/toolbelt";
import { EnhancedTransactionsItem } from "@shared/store/transactions";
import { MaybeNull } from "src/types";
import { createContext } from "use-context-selector";
import { Context, ScenarioCell } from "./types";

type TransactionsContextType = {
  transactions: EnhancedTransactionsItem[];
  isEditingId: MaybeNull<string>;
  setIsEditingId: SingletonFn<MaybeNull<string>>;
  tempEditValue: MaybeNull<string>;
  setTempEditValue: SingletonFn<MaybeNull<string>>;
  selectedIds: string[];
  toggleSelection: SingletonFn<string, Fn>;
  handlePersistentUpdate: (rowId: string, cellId: string) => void;
  cells: ScenarioCell[];
  clearSelection: Fn;
  selectAll: Fn;
  areAllSelected: boolean;
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
  ctx: Context;
  isSelected: boolean;
};

export const TransactionsRowContext = createContext<TransactionsRowContextType>({} as TransactionsRowContextType);

TransactionsRowContext.displayName = "TransactionsRowContext";
