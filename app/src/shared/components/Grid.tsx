import { SxProps, Theme } from "@mui/material";
import type { Grid2Props } from "@mui/material/Unstable_Grid2";
import MuiGridv2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import { PropsWithChildren } from "react";

export default function Grid(
  props: PropsWithChildren<
    Grid2Props & {
      sx?: SxProps<Theme>;
    }
  >,
) {
  return <MuiGridv2 {...props} />;
}
