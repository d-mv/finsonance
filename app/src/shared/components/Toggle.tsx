import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { JSX, MouseEvent, useState } from "react";

export type ToggleButtonItem = {
  value: string;
  label: string;
  renderFn?: () => JSX.Element;
};

type Props<Mode> = {
  buttons: ToggleButtonItem[];
  mode: Mode;
  onClick?: (value: Mode) => void;
};

export function Toggle<Mode>({ mode, buttons, onClick }: Props<Mode>) {
  const [alignment, setAlignment] = useState<Mode>(mode);

  const handleAlignment = (_: MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment as Mode);
    onClick && onClick(newAlignment! as Mode);
  };

  function renderToggleButton(button: ToggleButtonItem) {
    return (
      <ToggleButton key={button.label} id={button.label} value={button.value} sx={{ padding: ".8rem 1rem" }}>
        <Typography variant='caption'> {button.renderFn ? button.renderFn() : button.label}</Typography>
      </ToggleButton>
    );
  }

  return (
    <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} sx={{ marginBlock: "1rem" }}>
      {buttons.map(renderToggleButton)}
    </ToggleButtonGroup>
  );
}
