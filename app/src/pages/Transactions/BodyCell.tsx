import { TableCell as MuiTableCell } from "@mui/material";
import { AnyValue, makeMatch } from "@mv-d/toolbelt";
import { toCurrency, toFinancial } from "@shared/formatters";
import { EnhancedTransactionsItem } from "@shared/store/transactions";
import { THEME } from "@shared/theme";
import dayjs from "dayjs";
import { path, pick, toUpper } from "lodash/fp";
import { CSSProperties, JSX } from "react";
import { CiSquareCheck, CiStop1 } from "react-icons/ci";
import { useContextSelector } from "use-context-selector";
import { TransactionsCellContext, TransactionsContext, TransactionsRowContext } from "./context";
import { Context, DataType } from "./types";

const SELECTION_BUTTON_STYLE: CSSProperties = {
  height: "2rem",
  width: "2rem",
};

type MatchProps = {
  v: AnyValue;
  row: EnhancedTransactionsItem;
  ctx: Context;
  isSelected: boolean;
};

const MATCH_CELL_RENDER = makeMatch<(props: MatchProps) => JSX.Element | string>(
  {
    [DataType.CHECKBOX]: ({ isSelected }) =>
      isSelected ? <CiSquareCheck style={SELECTION_BUTTON_STYLE} /> : <CiStop1 style={SELECTION_BUTTON_STYLE} />,
    [DataType.DATE]: ({ v }) => dayjs(v).format("DD/MM/YYYY"),
    [DataType.FLOAT]: ({ v }) => toFinancial(String(v)),
    [DataType.CURRENCY]: ({ v }) => toUpper(String(v)),
    [DataType.BASE_CURRENCY]: ({ v, row, ctx }) =>
      toCurrency(String(v), ctx.currencies.find(c => c._id === row.base_currency_id)?.short),
  },
  ({ v }) => v,
);

export function BodyCell() {
  const { isEditingId, setIsEditingId, tempEditValue, setTempEditValue, handlePersistentUpdate } = useContextSelector(
    TransactionsContext,
    c => c,
  );

  const ctx = useContextSelector(TransactionsRowContext, c => c.ctx);

  const { row, isSelected } = useContextSelector(TransactionsRowContext, pick(["row", "isSelected"]));

  const cell = useContextSelector(TransactionsCellContext, c => c.cell);

  const joinedId = `${row._id}-${cell.id}`;

  if (isEditingId === joinedId) {
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
          value={tempEditValue || ""}
          onKeyDown={e => {
            if (e.code === "Enter") handlePersistentUpdate(row._id, cell.id);
          }}
          onChange={e => setTempEditValue(e.target.value)}
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
      {MATCH_CELL_RENDER[cell.type || ""]!({ v: path(cell.id, row), row, ctx, isSelected })}
    </MuiTableCell>
  );
}
