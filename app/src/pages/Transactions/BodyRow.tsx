import { TableRow as MuiTableRow } from "@mui/material";
import { pick } from "lodash/fp";
import { useContextSelector } from "use-context-selector";
import { BodyCell } from "./BodyCell";
import { TransactionsCellContext, TransactionsContext, TransactionsRowContext } from "./context";

export function BodyRow() {
  const { cells, selectedIds, toggleSelection } = useContextSelector(TransactionsContext, c => c);

  const { row, isSelected } = useContextSelector(TransactionsRowContext, pick(["row", "isSelected"]));

  function renderCells() {
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
      onClick={toggleSelection(row._id)}
    >
      {renderCells()}
    </MuiTableRow>
  );
}
