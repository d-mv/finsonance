import { Box, Stack, Typography } from "@mui/material";
import { THEME } from "@shared/theme";
import { Link, useLocation } from "react-router-dom";
import { NAVIGATION, NavigationItem } from "../../router";

export default function Navigation() {
  const { pathname } = useLocation();

  function renderItem(item: NavigationItem) {
    return (
      <Box
        component='li'
        key={item.path}
        sx={{
          listStyle: "none",
          borderBottomWidth: ".2rem",
          borderBottomStyle: "solid",
          borderColor: pathname.includes(item.path) ? THEME.palette.info.main : "#0000",
          transition: "border-bottom .3s",
          "&:hover p": {
            color: THEME.palette.grey[600],
          },
        }}
      >
        <Link
          key={item.path}
          to={item.path}
          style={{
            textDecoration: "none",
            color: THEME.palette.text.primary,
          }}
        >
          <Typography sx={{ textShadow: "0 .1rem .1rem rgba(0,0,0,0.05)" }}>{item.title}</Typography>
        </Link>
      </Box>
    );
  }

  return (
    <Stack direction='row' component='ul' gap='2rem'>
      {NAVIGATION.map(renderItem)}
    </Stack>
  );
}
