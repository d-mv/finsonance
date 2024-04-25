import { Header } from "@entities/index";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexFlow: "column" }}>
      <Header />
      <Box sx={{ flexGrow: 1, overflowX: "scroll" }}>
        <Outlet />
      </Box>
      <div>footer</div>
    </Box>
  );
}
