import { TableCell, TableRow } from "@mui/material";

import { Table } from "@components/Table";
import { WidgetLayout } from "@components/index";
import { toCurrency } from "@shared/formatters";
import { AccountStateItem, getAccounts } from "@shared/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Balance() {
  const accounts = useSelector(getAccounts);

  const navigate = useNavigate();

  function handleRowClick(row: AccountStateItem) {
    return function call() {
      navigate(`/accounts/${row._id}`);
    };
  }

  function renderRow(item: AccountStateItem) {
    return (
      <TableRow hover key={item._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component='th' scope='row' onClick={handleRowClick(item)} sx={{ cursor: "pointer" }}>
          {item.label}
        </TableCell>
        <TableCell align='right'>{toCurrency(item.balance, item.currency)}</TableCell>
      </TableRow>
    );
  }

  return (
    <WidgetLayout title='Balance'>
      <Table size='small' headers={["Account", "Amount"]}>
        {accounts.map(renderRow)}
      </Table>
    </WidgetLayout>
  );
}
