import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { path } from "lodash/fp";
import { JSX, MouseEvent } from "react";
import FormField from "./FormField";

export type ToggleButtonItem = {
  value: string;
  label: string;
  renderFn?: () => JSX.Element;
};

type Props = {
  id: string;
  buttons: ToggleButtonItem[];
  label: string;
  required?: boolean;
};

export default function ToggleForm({ id, buttons, label, required }: Props) {
  const { values, setFieldValue } = useFormikContext();

  const handleAlignment = (_: MouseEvent<HTMLElement>, value: string | null) => {
    setFieldValue(id, value);
  };

  function renderToggleButton(button: ToggleButtonItem) {
    return (
      <ToggleButton key={button.label} id={button.label} value={button.value} sx={{ padding: ".8rem 1rem" }}>
        <Typography variant='caption'> {button.renderFn ? button.renderFn() : button.label}</Typography>
      </ToggleButton>
    );
  }

  return (
    <FormField id={id} label={label} required={required}>
      <ToggleButtonGroup value={path(id, values)} exclusive onChange={handleAlignment} sx={{ marginBlock: "1rem" }}>
        {buttons.map(renderToggleButton)}
      </ToggleButtonGroup>
    </FormField>
  );
}
