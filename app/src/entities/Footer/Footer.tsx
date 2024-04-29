import { Box, Button } from "@mui/material";
import { pick } from "lodash/fp";
import { useLocation } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { AppContext, Modals } from "../../context";

export default function Footer() {
  const { setModal } = useContextSelector(AppContext, pick("setModal"));

  const pathname = useLocation().pathname;

  function renderButtons() {
    switch (pathname) {
      case "/transactions":
        return (
          <>
            <Button variant='contained' onClick={() => setModal(Modals.ADD_TRANSACTION)}>
              Add transaction
            </Button>
            {/* <button>Remove selected</button> */}
          </>
        );
      default:
        return null;
    }
  }

  return (
    <Box
      component='footer'
      id='footer'
      sx={{
        minHeight: "6rem",
        backgroundColor: "yellow",
        display: "flex",
        flexFlow: "row nowrap",
        width: "100%",
        alignItems: "center",
        paddingInline: "1rem",
      }}
    >
      {renderButtons()}
    </Box>
  );
}
