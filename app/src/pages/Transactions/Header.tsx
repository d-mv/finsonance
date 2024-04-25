import { TableHead, TableRow } from "@mui/material";
import { pick } from "lodash/fp";
import { useContextSelector } from "use-context-selector";
import { HeaderCell } from "./HeaderCell";
import { TransactionsContext, TransactionsHeaderCellContext } from "./context";

export function Header() {
  const { cells } = useContextSelector(TransactionsContext, pick(["cells"]));

  return (
    <TableHead>
      <TableRow>
        {cells.map(cell => (
          <TransactionsHeaderCellContext.Provider key={cell.id} value={{ cell }}>
            <HeaderCell />
          </TransactionsHeaderCellContext.Provider>
        ))}
      </TableRow>
    </TableHead>
  );
}
