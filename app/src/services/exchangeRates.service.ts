import { AxiosError } from "axios";
import { toUpper } from "lodash/fp";

import { Currency } from "@shared/data";
import { Context } from "@shared/store";
import { Err, Ok } from "@sniptt/monads";

export type ExchangeRates<Symbols extends string> = Record<Symbols, number>;

export type ExchangeRatesApiReply<Symbols extends string> = {
  base: string;
  date: string;
  rates: ExchangeRates<Symbols>;
  //  {
  //   [key: Symbols]: number;
  // };

  // :
  // ILS
  // :
  // 4.038091
  // USD
  // :
  // 1.068622
  // [[Prototype]]
  // :
  // Object
  success: boolean;
  // :
  // true
  timestamp: number;
  // :
  // 1713975005
};

async function getLatest<Symbols extends string>(ctx: Context, symbols?: string) {
  let symbolsToUse = symbols;

  if (!symbolsToUse) symbolsToUse = Object.values(Currency).map(toUpper).join(",");

  const {
    config,
    services: { LoggerService },
  } = ctx;

  const logger = new LoggerService();

  logger.addContext({ service: "ExchangeRatesService", method: "getLatest" });

  const url = `${config.services.exchangeRates.baseUrl}/latest?access_key=${config.services.exchangeRates.apiKey}&base=${toUpper(config.services.exchangeRates.base)}&symbols=${symbolsToUse}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    const result = await response.json();

    return Ok(result);
  } catch (err) {
    return Err(err as AxiosError);
  }
}

export const ExchangeRatesService = { getLatest };
