import { IconButton } from "@mui/material";
import { Currency } from "@shared/data";
import { useCurrency } from "@shared/hooks";
import { getCurrencies } from "@shared/store";
import { useFormikContext } from "formik";
import { path } from "lodash/fp";
import { CiRepeat } from "react-icons/ci";
import { useSelector } from "react-redux";

export default function CalculateInBaseCurrencyForm() {
  const { values, setFieldValue } = useFormikContext<{
    amount: number;
    base_currency_id: string;
    in_base_currency: number;
    currency_id: string;
  }>();

  const { toBaseCurrency } = useCurrency();

  const currencies = useSelector(getCurrencies);

  function handleCalculate() {
    if (values.amount === 0) {
      if (path("in_base_currency", values) === 0) {
        setFieldValue("in_base_currency", 0);
      } else return;
    }

    const result = toBaseCurrency(
      values.amount,
      currencies.find(c => c._id === values.currency_id)?.short ?? Currency.USD,
    );

    if (values.in_base_currency === result) return;

    setFieldValue("in_base_currency", result);
  }

  return (
    <IconButton onClick={handleCalculate}>
      <CiRepeat />
    </IconButton>
  );
}
