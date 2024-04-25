import { InWork } from "@entities/InWork";
import { Navigation } from "@entities/Navigation";
import { Stack, Typography } from "@mui/material";
import { THEME } from "@shared/theme";

export default function Header() {
  return (
    <Stack
      component='header'
      direction='row'
      style={{
        backgroundColor: THEME.palette.grey[400],
        justifyContent: "space-between",
        alignItems: "center",
        height: "4rem",
        minHeight: "4rem",
        boxShadow: "0 .1rem .24rem rgba(0,0,0,0.12)",
      }}
    >
      <Stack direction='row' sx={{ paddingInlineStart: "1rem" }}>
        <Typography variant='h6' sx={{ fontWeight: 600, textShadow: "0 .1rem .1rem rgba(0,0,0,0.05)" }}>
          Finsonance
        </Typography>
      </Stack>
      <Navigation />
      <Stack direction='row'>
        <InWork />
      </Stack>
    </Stack>
  );
}
