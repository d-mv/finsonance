import { TableRow as MuiTableRow } from "@mui/material";
import { useContextSelector } from "use-context-selector";
import { BodyCell } from "./BodyCell";
import { TransactionsCellContext, TransactionsContext, TransactionsRowContext } from "./context";

export function BodyRow() {
  const { selectedIds, cells, toggleRowSelection } = useContextSelector(TransactionsContext, c => c);

  const row = useContextSelector(TransactionsRowContext, c => c.row);

  function renderCells() {
    if (!row.isEditing) {
      return cells.map(cell => (
        <TransactionsCellContext.Provider key={cell.id} value={{ cell }}>
          <BodyCell />
        </TransactionsCellContext.Provider>
      ));
    }

    return cells.map(cell => (
      <TransactionsCellContext.Provider key={cell.id} value={{ cell }}>
        <BodyCell />
      </TransactionsCellContext.Provider>
    ));
  }

  return (
    <MuiTableRow
      hover
      id={row._id}
      sx={{
        backgroundColor: selectedIds.includes(row._id) ? "rgba(0, 0, 0, 0.04)" : "inherit",
        "&:last-child td, &:last-child th": { border: 0 },
      }}
      onClick={toggleRowSelection(row._id)}
    >
      {renderCells()}
    </MuiTableRow>
  );
}
