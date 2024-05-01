import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { RecordObject } from "@mv-d/toolbelt";
import { Field, FieldAttributes, useFormikContext } from "formik";
import { path } from "lodash/fp";
import { CSSProperties, FormEvent, JSX, useEffect, useState } from "react";
import { Maybe, MaybeNull } from "../../types";
import FormField from "./FormField";

const filter = createFilterOptions<RecordObject<string>>();

type Props<T> = {
  set: RecordObject<string>[];
  id: string;
  targetValueKey?: string;
  targetLabelKey?: string;
  label: string;
  required?: boolean;
  sx?: CSSProperties;
  valueKey?: string;
  labelKey?: string;
  createNewItemFn?: (value: Maybe<string>) => T;
  renderAddDialog: (
    dialogValue: MaybeNull<T>,
    handleClose: () => void,
    handleSubmit: (event: FormEvent<HTMLFormElement>, values: T) => void,
  ) => JSX.Element;
};

export default function SelectorForm<T>({
  set,
  id,
  label,
  required,
  sx,
  valueKey = "_id",
  labelKey = "label",
  targetValueKey = id,
  targetLabelKey,
  createNewItemFn,
  renderAddDialog,
}: Props<T>) {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!targetLabelKey) return;

    const v = path(targetValueKey, values);

    const item = set.find(el => path(valueKey, el) === v);

    const isSame = path(targetLabelKey, values) === path(labelKey, item);

    if (!isSame) setFieldValue(targetLabelKey, path(labelKey, item));
  }, [values]);

  const [open, toggleOpen] = useState(false);

  const [dialogValue, setDialogValue] = useState<MaybeNull<T>>(null);

  const handleClose = () => {
    setDialogValue(null);

    toggleOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // setValue({
    //   title: dialogValue.title,
    //   year: parseInt(dialogValue.year, 10),
    // });
    // handleClose();
  };

  return (
    <>
      <FormField id={id} label={label} required={required} sx={sx}>
        <Field id={id}>
          {(props: FieldAttributes<unknown>) => (
            <Autocomplete<RecordObject<string>>
              {...path("field", props)}
              onChange={(_, newValue) => {
                if (!createNewItemFn) return setFieldValue(targetValueKey, path(valueKey, newValue));

                if (typeof newValue === "string") {
                  // timeout to avoid instant validation of the dialog's form.
                  setTimeout(() => {
                    toggleOpen(true);
                    setDialogValue(createNewItemFn(newValue["inputValue"]));
                  });
                } else if (newValue && path("inputValue", newValue)) {
                  toggleOpen(true);
                  setDialogValue(createNewItemFn(newValue["inputValue"]));
                } else {
                  setFieldValue(targetValueKey, path(valueKey, newValue));
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== "") {
                  filtered.push({
                    [valueKey]: params.inputValue,
                    inputValue: params.inputValue,
                    [labelKey]: `Add "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
              id={id}
              options={set}
              getOptionLabel={option => {
                if (typeof option === "string") return option;

                if (!targetLabelKey || !(targetLabelKey in option)) return "";

                return path(targetLabelKey, option);
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => (
                <li {...props} key={path(valueKey, option)}>
                  {String(path(labelKey, option))}
                </li>
              )}
              sx={{ width: 300 }}
              freeSolo
              renderInput={params => <TextField {...params} />}
            />
          )}
        </Field>
      </FormField>
      {open && renderAddDialog(dialogValue, handleClose, handleSubmit)}
    </>
  );
}
