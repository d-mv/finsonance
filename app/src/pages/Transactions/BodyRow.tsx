import { TableRow as MuiTableRow } from "@mui/material";
import { useContextSelector } from "use-context-selector";
import { TableCell } from "./TableCell";
import { TransactionsCellContext, TransactionsContext, TransactionsRowContext } from "./context";

export function BodyRow() {
  const { selectedIds, cells, toggleRowSelection } = useContextSelector(TransactionsContext, c => c);

  const row = useContextSelector(TransactionsRowContext, c => c.row);

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
      {cells.map(cell => (
        <TransactionsCellContext.Provider key={cell.id} value={{ cell }}>
          <TableCell />
        </TransactionsCellContext.Provider>
      ))}
    </MuiTableRow>
  );
}
