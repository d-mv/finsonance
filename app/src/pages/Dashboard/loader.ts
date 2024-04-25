import { faker } from "@faker-js/faker";
import { buildArrayWith } from "@mv-d/toolbelt";
import { nanoid } from "@reduxjs/toolkit";

import { Currency } from "@shared/data";
import { AccountStateItem, STORE, setAccounts } from "@shared/store";
import { TransactionsItem, setTransactions } from "@shared/store/transactions";
import { roundToTwoDecimals } from "@shared/utils";
import dayjs from "dayjs";
import { sample } from "lodash";

export async function loadDashboard() {
  const accounts = buildArrayWith(Math.round(Math.random() * 10) || 1, () => 0).map(
    (_, i) =>
      ({
        _id: String(`account-${i}`),
        label: faker.finance.accountName(),
        balance: roundToTwoDecimals(faker.number.float({ min: 10, max: 1_000_000 }) * 100),
        currency: sample(Currency),
      }) as AccountStateItem,
  );

  STORE.dispatch(setAccounts(accounts));

  STORE.dispatch(
    setTransactions(
      buildArrayWith(Math.round(Math.random() * 100) || 1, () => 0).map(
        (_, i) =>
          ({
            _id: String(`trx-${i}`),
            amount: roundToTwoDecimals(faker.number.float({ min: 10, max: 100_000 }) * 100),
            currency: sample(Currency),
            baseCurrency: Currency.EUR,
            inBaseCurrency: roundToTwoDecimals(faker.number.float({ min: 10, max: 100_000 }) * 100),
            account_id: sample(accounts)?._id || "",
            category_id: nanoid(),
            category_label: faker.commerce.department(),
            date: dayjs(faker.date.anytime()).valueOf(),
            payee_id: nanoid(),
            payee_label: faker.company.name(),
          }) as TransactionsItem,
      ),
    ),
  );

  return {};
}
