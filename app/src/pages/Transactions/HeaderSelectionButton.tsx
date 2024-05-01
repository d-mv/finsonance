import { IconButton } from "@mui/material";
import { makeMatch } from "@mv-d/toolbelt";
import { pick } from "lodash/fp";
import { useMemo } from "react";
import { IconType } from "react-icons";
import { CiSquareCheck, CiSquareMinus, CiStop1 } from "react-icons/ci";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "./context";

const MATCH_SELECTION_ICON = makeMatch<IconType>(
  {
    none: CiStop1,
    all: CiSquareCheck,
    some: CiSquareMinus,
  },
  CiStop1,
);

export function HeaderSelectionButton() {
  const { selectedIds, clearSelection, selectAll, areAllSelected } = useContextSelector(
    TransactionsContext,
    pick(["selectedIds", "clearSelection", "selectAll", "areAllSelected"]),
  );

  const selectionType = useMemo(() => {
    if (!selectedIds.length) return "none";

    if (areAllSelected) return "all";

    return "some";
  }, [selectedIds, areAllSelected]);

  const MATCH_SELECTION_HANDLER = makeMatch(
    {
      none: selectAll,
      all: clearSelection,
      some: clearSelection,
    },
    () => console.error("Missing handler for selectionType", selectionType),
  );

  const Icon = MATCH_SELECTION_ICON[selectionType]!;

  const handler = MATCH_SELECTION_HANDLER[selectionType];

  return (
    <IconButton onClick={handler}>
      <Icon style={{ height: "2rem", width: "2rem" }} />
    </IconButton>
  );
}
