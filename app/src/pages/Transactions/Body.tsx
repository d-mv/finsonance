import { TableBody } from "@mui/material";
import { EnhancedTransactionsItem } from "@shared/store/transactions";
import { useContextSelector } from "use-context-selector";
import { BodyRow } from "./BodyRow";
import { TransactionsContext, TransactionsRowContext } from "./context";

export function Body() {
  const transactions = useContextSelector(TransactionsContext, c => c.transactions);

  const renderRow = (row: EnhancedTransactionsItem) => (
    <TransactionsRowContext.Provider key={row._id} value={{ row }}>
      <BodyRow />
    </TransactionsRowContext.Provider>
  );

  return <TableBody>{transactions.map(renderRow)}</TableBody>;
}
