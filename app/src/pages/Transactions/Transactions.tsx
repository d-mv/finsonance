import { Table, TableContainer } from "@mui/material";
import { getTransactionsToDisplay, updateTransactionById } from "@shared/store/transactions";
import { pick } from "lodash/fp";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContextSelector } from "use-context-selector";
import { AppContext, Modals } from "../../context";
import { MaybeNull } from "../../types";
import { Body } from "./Body";
import { Header } from "./Header";
import { TransactionForm } from "./TransactionForm";
import { TransactionsContext } from "./context";
import { DataType, ScenarioCell } from "./types";

const CELLS: ScenarioCell[] = [
  { label: "Date", align: "left", type: DataType.DATE, id: "date" },
  { label: "Payee", align: "left", id: "payee_label" },
  { label: "Category", align: "left", id: "category_label" },
  { label: "Amount", align: "right", type: DataType.FLOAT, id: "amount" },
  {
    label: "Currency",
    align: "right",
    type: DataType.CURRENCY,
    id: "currency",
    style: { maxWidth: "4rem", textAlign: "center" },
  },
  { label: "In Base Currency", align: "right", id: "inBaseCurrency", type: DataType.BASE_CURRENCY },
  { label: "Account", align: "left", id: "account" },
];

export default function Transactions() {
  const transactions = useSelector(getTransactionsToDisplay);

  const { modal } = useContextSelector(AppContext, pick("modal"));

  // eslint-disable-next-line no-console
  console.log(modal);

  const containerRef = useRef<HTMLDivElement>(null);

  // const isEditingId = useRef<MaybeNull<string>>(null);

  const [isEditingId, setIsEditingId] = useState<MaybeNull<string>>(null);

  const [tempEditValue, setTempEditValue] = useState<MaybeNull<string>>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function toggleRowSelection(id: string) {
    return function onClick() {
      setSelectedIds(selectedIds.includes(id) ? selectedIds.filter(i => i !== id) : [...selectedIds, id]);
    };
  }

  const dispatch = useDispatch();

  function handlePersistentUpdate(rowId: string, cellId: string) {
    setIsEditingId(null);
    dispatch(updateTransactionById({ _id: rowId, [cellId]: tempEditValue }));
    setTempEditValue(null);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    const handleKeys = (e: KeyboardEvent) => e.key === "Escape" && setIsEditingId(null);

    containerRef.current.addEventListener("keydown", handleKeys);

    return () => containerRef.current?.removeEventListener("keydown", handleKeys);
  }, []);

  function renderTransactionForm() {
    if (modal !== Modals.ADD_TRANSACTION) return null;

    return <TransactionForm />;
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        isEditingId,
        setIsEditingId,
        tempEditValue,
        setTempEditValue,
        selectedIds,
        toggleRowSelection,
        handlePersistentUpdate,
        cells: CELLS,
      }}
    >
      <TableContainer ref={containerRef}>
        <Table>
          <Header />
          <Body />
        </Table>
      </TableContainer>
      {renderTransactionForm()}
    </TransactionsContext.Provider>
  );
}
