import { Button, DialogActions } from "@mui/material";
import { useFormikContext } from "formik";
import { CSSProperties } from "react";

type Props = {
  sx?: CSSProperties;
  primaryLabel?: string;
  primaryAction?: () => void;
  secondaryLabel?: string;
  secondaryAction: (dirty: boolean) => void;
};

export default function ButtonGroupForm({
  sx,
  primaryLabel = "Save",
  primaryAction,
  secondaryLabel = "Cancel",
  secondaryAction,
}: Props) {
  const { dirty } = useFormikContext();

  return (
    <DialogActions sx={sx}>
      <Button variant='outlined' color='primary' type='button' onClick={() => secondaryAction(dirty)}>
        {secondaryLabel}
      </Button>
      <Button variant='contained' color='primary' type={primaryAction ? undefined : "submit"} onClick={primaryAction}>
        {primaryLabel}
      </Button>
    </DialogActions>
  );
}
