import { TableBody } from "@mui/material";
import { getAccounts, getCurrencies } from "@shared/store";
import { EnhancedTransactionsItem } from "@shared/store/transactions";
import { pick } from "lodash/fp";
import { useSelector } from "react-redux";
import { useContextSelector } from "use-context-selector";
import { BodyRow } from "./BodyRow";
import { TransactionsContext, TransactionsRowContext } from "./context";
import { Context } from "./types";

export function Body() {
  const { transactions, selectedIds } = useContextSelector(TransactionsContext, pick(["transactions", "selectedIds"]));

  const accounts = useSelector(getAccounts);

  const currencies = useSelector(getCurrencies);

  const ctx: Context = { accounts, currencies };

  const renderRow = (row: EnhancedTransactionsItem) => (
    <TransactionsRowContext.Provider key={row._id} value={{ row, ctx, isSelected: selectedIds.includes(row._id) }}>
      <BodyRow />
    </TransactionsRowContext.Provider>
  );

  return <TableBody>{transactions.map(renderRow)}</TableBody>;
}
