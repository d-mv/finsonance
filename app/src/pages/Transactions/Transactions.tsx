import { Button, Table, TableContainer } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { EnhancedTransactionsItem, getTransactionsToDisplay, updateTransactionById } from "@shared/store/transactions";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaybeNull } from "../../types";
import { Body } from "./Body";
import { Header } from "./Header";
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

  const containerRef = useRef<HTMLDivElement>(null);

  // const isEditingId = useRef<MaybeNull<string>>(null);

  const [isEditingId, setIsEditingId] = useState<MaybeNull<string>>(null);

  const [newTrx, setNewTrx] = useState<MaybeNull<EnhancedTransactionsItem>>(null);

  function updateNewTransaction(cellId: string, value: string) {
    setNewTrx({ ...newTrx, [cellId]: value } as EnhancedTransactionsItem);
  }

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

  const createNewTrx = () => setNewTrx({ _id: nanoid(), isEditing: true } as EnhancedTransactionsItem);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleKeys = (e: KeyboardEvent) => e.key === "Escape" && setIsEditingId(null);

    containerRef.current.addEventListener("keydown", handleKeys);

    return () => containerRef.current?.removeEventListener("keydown", handleKeys);
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions: newTrx ? [...transactions, newTrx] : transactions,
        isEditingId,
        setIsEditingId,
        updateNewTransaction,
        tempEditValue,
        setTempEditValue,
        selectedIds,
        toggleRowSelection,
        handlePersistentUpdate,
        createNewTrx,
        cells: CELLS,
      }}
    >
      <TableContainer ref={containerRef}>
        <Table>
          <Header />
          <Body />
        </Table>
      </TableContainer>
      <Button onClick={createNewTrx}>Add new</Button>
    </TransactionsContext.Provider>
  );
}
