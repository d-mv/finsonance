import { Currency } from "@shared/data";
import { getExchangeRates } from "@shared/store";
import { roundToTwoDecimals } from "@shared/utils";
import { toUpper } from "lodash";
import { useSelector } from "react-redux";

export function useCurrency() {
  const exRates = useSelector(getExchangeRates);

  function toBaseCurrency(amount: number, currency: Currency) {
    if (!exRates) return -999_999_999;

    const rate = exRates[toUpper(currency)];

    if (!rate) return -999_999_999_999;

    return roundToTwoDecimals(amount / rate);
  }

  return { toBaseCurrency };
}
