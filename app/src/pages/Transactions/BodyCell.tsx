import { TableCell as MuiTableCell } from "@mui/material";
import { AnyValue, makeMatch } from "@mv-d/toolbelt";
import { toCurrency, toFinancial } from "@shared/formatters";
import { EnhancedTransactionsItem } from "@shared/store/transactions";
import { THEME } from "@shared/theme";
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

export function BodyCell() {
  const {
    isEditingId,
    setIsEditingId,
    tempEditValue,
    setTempEditValue,
    handlePersistentUpdate,
    updateNewTransaction,
    newTrx,
  } = useContextSelector(TransactionsContext, c => c);

  const row = useContextSelector(TransactionsRowContext, c => c.row);

  const cell = useContextSelector(TransactionsCellContext, c => c.cell);

  const joinedId = `${row._id}-${cell.id}`;

  if (isEditingId === joinedId || row.isEditing) {
    return (
      <MuiTableCell
        key={cell.id}
        align={cell.align}
        sx={{
          ...path("style", cell),
        }}
      >
        <input
          id={cell.id}
          autoFocus={true}
          type='text'
          key={cell.id}
          value={row.isEditing ? path(cell.id, newTrx) : tempEditValue || ""}
          onKeyDown={e => {
            if (e.code === "Enter") handlePersistentUpdate(row._id, cell.id);
          }}
          onChange={e =>
            row.isEditing ? updateNewTransaction(cell.id, e.target.value) : setTempEditValue(e.target.value)
          }
          style={{
            border: 0,
            backgroundColor: THEME.palette.grey[400],
            paddingBlock: "1rem",
          }}
        />
      </MuiTableCell>
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
