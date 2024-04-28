import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = {
  open: boolean;
  primaryAction: () => void;
  secondaryAction: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  handleClose?: () => void;
  title: string;
};

export default function ConfirmationDialog({
  open,
  handleClose,
  children,
  primaryAction,
  primaryLabel,
  secondaryAction,
  secondaryLabel,
  title,
}: PropsWithChildren<Props>) {
  return (
    <Dialog open={open} onClose={handleClose ?? secondaryAction}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={secondaryAction}>{secondaryLabel}</Button>
        <Button onClick={primaryAction} autoFocus>
          {primaryLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
