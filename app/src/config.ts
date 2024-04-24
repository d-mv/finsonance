import { Currency } from "@shared/data";
import { env } from "@shared/utils";
import { path } from "lodash/fp";

export const CONFIG = {
  version: path("PACKAGE_VERSION", import.meta.env),
  services: {
    exchangeRates: {
      apiKey: env("ENV_EXCHANGE_RATES_API_KEY").expect("Exchange rates API key is not set"),
      baseUrl: env("ENV_EXCHANGE_RATES_API_BASE_URL").expect("Exchange rates API base URL is not set"),
      base: Currency.EUR,
    },
  },
};
