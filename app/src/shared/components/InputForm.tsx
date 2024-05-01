import { TextField } from "@mui/material";
import { RecordObject } from "@mv-d/toolbelt";
import { Field, useFormikContext } from "formik";
import { path } from "lodash/fp";
import FormField from "./FormField";

type Props = {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  type?: string;
  InputProps?: RecordObject<unknown>;
};

export default function InputForm({ id, label, placeholder, required, autoFocus, type = "text", InputProps }: Props) {
  const { values, setFieldValue, touched, setTouched } = useFormikContext();

  return (
    <FormField id={id} label={label} required={required}>
      <Field name={id}>
        {(props: unknown) => {
          // console.log(props);
          return (
            <TextField
              {...path("field", props)}
              autoFocus={autoFocus}
              type={type}
              // value={path(id, values)}
              // onChange={e => {
              //   setFieldValue(id, e.target.value);
              //   // setTouched({ ...touched, [id]: true });
              // }}
              placeholder={placeholder}
              InputProps={InputProps}
            />
          );
        }}
      </Field>
    </FormField>
  );
}
