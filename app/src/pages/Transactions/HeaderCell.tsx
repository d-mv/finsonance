import { TableCell } from "@mui/material";
import { path } from "lodash/fp";
import { useContextSelector } from "use-context-selector";
import { HeaderSelectionButton } from "./HeaderSelectionButton";
import { TransactionsHeaderCellContext } from "./context";

export function HeaderCell() {
  const cell = useContextSelector(TransactionsHeaderCellContext, c => c.cell);

  function renderCell() {
    if (cell.id.startsWith("_")) {
      if (cell.id === "_select") return <HeaderSelectionButton />;

      console.error("Missing render", cell.id);
      return null;
    }

    return cell.label;
  }

  return (
    <TableCell key={cell.label} align={cell.align} style={path("style", cell)}>
      {renderCell()}
    </TableCell>
  );
}
