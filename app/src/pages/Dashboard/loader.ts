import { faker } from "@faker-js/faker";
import { buildArrayWith } from "@mv-d/toolbelt";

import { Currency } from "@shared/data";
import { AccountStateItem, STORE, setAccounts } from "@shared/store";
import { roundToTwoDecimals } from "@shared/utils";
import { sample } from "lodash";

export async function loadDashboard() {
  STORE.dispatch(
    setAccounts(
      buildArrayWith(Math.round(Math.random() * 10) || 1, () => 0).map(
        (_, i) =>
          ({
            _id: String(`account-${i}`),
            label: faker.finance.accountName(),
            balance: roundToTwoDecimals(faker.number.float({ min: 10, max: 1_000_000 }) * 100),
            currency: sample(Currency),
          }) as AccountStateItem,
      ),
    ),
  );

  return {};
}
