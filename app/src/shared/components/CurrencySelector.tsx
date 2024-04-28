import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { CurrencyStateItem } from "@shared/store/currencies";

type Props = {
  currencies: CurrencyStateItem[];
  onSelect: (currencyId: string) => void;
  value: string;
};

export default function CurrencySelector({ currencies, onSelect, value }: Props) {
  function renderCurrencyItem(currency: CurrencyStateItem) {
    return (
      <MenuItem key={currency._id} value={currency._id}>
        {currency.label}
      </MenuItem>
    );
  }

  function handleSelect(e: SelectChangeEvent) {
    const selected = currencies.find(currency => currency._id === e.target.value);

    if (selected) onSelect(selected._id);
  }

  return (
    <Select onChange={handleSelect} value={value}>
      {currencies.map(renderCurrencyItem)}
    </Select>
  );
}
