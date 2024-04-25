import { makeMatch } from "@mv-d/toolbelt";

import { Currency } from "@shared/data";

const toEuro = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
}).format;

const toUsDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

const toShekel = new Intl.NumberFormat("he-IL", {
  style: "currency",
  currency: "ILS",
}).format;

const MATCH_CURRENCY_FORMATTER = makeMatch(
  {
    [Currency.EUR]: (amount: number) => toEuro(amount),
    [Currency.USD]: (amount: number) => toUsDollar(amount),
    [Currency.ILS]: (amount: number) => toShekel(amount),
  },
  (amount: number) => toEuro(amount),
);

function stringOrNumberToNumber(amount: number | string) {
  let arg = amount;

  if (typeof arg !== "number") {
    arg = parseFloat(arg);

    if (isNaN(arg)) {
      return -999_999_999;
    }
  }

  return arg;
}

export function toCurrency(amount: number | string, currency = Currency.EUR) {
  return MATCH_CURRENCY_FORMATTER[currency]!(stringOrNumberToNumber(amount));
}

export function toFinancial(amount: number | string) {
  return new Intl.NumberFormat("pt-PT").format(stringOrNumberToNumber(amount));
}
