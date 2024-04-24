import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = {
  headers: string[];
  size?: "small" | "medium";
};

export function Table({ children, headers, size }: PropsWithChildren<Props>) {
  function renderHeader(header: string, index: number) {
    return (
      <TableCell key={header} align={index === 0 ? undefined : "right"}>
        {header}
      </TableCell>
    );
  }

  return (
    <TableContainer>
      <MuiTable size={size}>
        <TableHead>
          <TableRow>{headers.map(renderHeader)}</TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </MuiTable>
    </TableContainer>
  );
}
