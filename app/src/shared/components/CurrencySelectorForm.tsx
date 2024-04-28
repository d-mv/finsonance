import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { CurrencyStateItem } from "@shared/store/currencies";
import { useFormikContext } from "formik";
import { path } from "lodash/fp";
import { CSSProperties } from "react";
import FormField from "./FormField";

type Props = {
  currencies: CurrencyStateItem[];
  id: string;
  label: string;
  required?: boolean;
  sx?: CSSProperties;
};

export default function CurrencySelectorForm({ currencies, id, label = "Currency", required, sx }: Props) {
  const { values, setFieldValue } = useFormikContext();

  function renderCurrencyItem(currency: CurrencyStateItem) {
    return (
      <MenuItem key={currency._id} value={currency._id}>
        {currency.label}
      </MenuItem>
    );
  }

  function handleSelect(e: SelectChangeEvent) {
    const selected = currencies.find(currency => currency._id === e.target.value);

    if (selected) setFieldValue(id, selected._id);
  }

  return (
    <FormField id={id} label={label} required={required} sx={sx}>
      <Select onChange={handleSelect} value={path(id, values)}>
        {currencies.map(renderCurrencyItem)}
      </Select>
    </FormField>
  );
}
