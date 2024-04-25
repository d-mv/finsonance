import { TableCell as MuiTableCell } from "@mui/material";
import { AnyValue, makeMatch } from "@mv-d/toolbelt";
import { toCurrency, toFinancial } from "@shared/formatters";
import { EnhancedTransactionsItem } from "@shared/store/transactions";
import dayjs from "dayjs";
import { path, toUpper } from "lodash/fp";
import { useContextSelector } from "use-context-selector";
import { TransactionsCellContext, TransactionsContext, TransactionsRowContext } from "./context";
import { DataType } from "./types";

const MATCH_CELL_RENDER = makeMatch(
  {
    [DataType.DATE]: (v: AnyValue) => dayjs(v).format("DD/MM/YYYY"),
    [DataType.FLOAT]: (v: AnyValue) => toFinancial(String(v)),
    [DataType.CURRENCY]: (v: AnyValue) => toUpper(String(v)),
    [DataType.BASE_CURRENCY]: (v: AnyValue, row: EnhancedTransactionsItem) => toCurrency(String(v), row.baseCurrency),
  },
  (v: AnyValue) => v,
);

export function TableCell() {
  const { isEditingId, setIsEditingId, tempEditValue, setTempEditValue, handlePersistentUpdate } = useContextSelector(
    TransactionsContext,
    c => c,
  );

  const row = useContextSelector(TransactionsRowContext, c => c.row);

  const cell = useContextSelector(TransactionsCellContext, c => c.cell);

  const joinedId = `${row._id}-${cell.id}`;

  if (isEditingId === joinedId) {
    return (
      <input
        autoFocus={true}
        type='text'
        key={cell.id}
        value={tempEditValue || ""}
        onKeyDown={e => {
          if (e.code === "Enter") handlePersistentUpdate(row._id, cell.id);
        }}
        onChange={e => setTempEditValue(e.target.value)}
      />
    );
  }

  return (
    <MuiTableCell
      key={cell.id}
      align={cell.align}
      style={path("style", cell)}
      onDoubleClick={() => {
        setIsEditingId(joinedId);
        setTempEditValue(path(cell.id, row));
      }}
    >
      {MATCH_CELL_RENDER[cell.type || ""]!(path(cell.id, row), row)}
    </MuiTableCell>
  );
}
