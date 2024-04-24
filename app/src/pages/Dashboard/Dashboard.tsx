import Grid from "@components/Grid";
import { Box } from "@mui/material";
import { Balance, TotalBalance } from "@widgets/index";

export default function Dashboard() {
  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%", display: "flex", flexFlow: "column" }}>
      <h1>Dashboard</h1>
      <Grid container sx={{ width: "100%", height: "100%" }}>
        <Balance />
        <TotalBalance />
      </Grid>
    </Box>
  );
}
