import { TableCell } from "@mui/material";
import { path, pick } from "lodash/fp";
import { useContextSelector } from "use-context-selector";
import { TransactionsHeaderCellContext } from "./context";

export function HeaderCell() {
  const { cell } = useContextSelector(TransactionsHeaderCellContext, pick("cell"));

  return (
    <TableCell key={cell.label} align={cell.align} style={path("style", cell)}>
      {cell.label}
    </TableCell>
  );
}
