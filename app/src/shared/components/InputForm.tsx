import { TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { path } from "lodash/fp";
import FormField from "./FormField";

type Props = {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  type?: string;
};

export default function InputForm({ id, label, placeholder, required, autoFocus, type = "text" }: Props) {
  const { values, setFieldValue } = useFormikContext();

  return (
    <FormField id={id} label={label} required={required}>
      <TextField
        autoFocus={autoFocus}
        type={type}
        value={path(id, values)}
        onChange={e => setFieldValue(id, e.target.value)}
        placeholder={placeholder}
      />
    </FormField>
  );
}
