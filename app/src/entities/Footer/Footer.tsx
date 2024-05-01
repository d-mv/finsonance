import { Box, Button } from "@mui/material";
import { pick } from "lodash/fp";
import { useLocation } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { AppContext, Modals } from "../../context";

export default function Footer() {
  const { setModal } = useContextSelector(AppContext, pick(["setModal"]));

  const pathname = useLocation().pathname;

  function renderButtons() {
    const buttons = [];

    switch (pathname) {
      case "/transactions":
        buttons.push(
          <>
            <Button variant='contained' onClick={() => setModal(Modals.ADD_TRANSACTION)}>
              Add transaction
            </Button>
            {/* <button>Remove selected</button> */}
          </>,
        );

        break;
      default:
    }

    return buttons;
    // return interleave(buttons, <Box sx={{ width: "1rem" }} />);
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
        gap: "1rem",
      }}
    >
      {renderButtons()}
    </Box>
  );
}
