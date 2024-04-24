import { getExchangeRates } from "@api/exchangeRates.api";
import { ExchangeRatesService, LocalStorageService, LoggerService } from "@services/index";
import { CONFIG } from "../../../config";
import { Action, ActionTypes, ApiActionType, Context, Store } from "../types.store";

const MAP = new Map<ActionTypes, (action: Action) => Promise<void>>();

export const apiMiddleware =
  (store: Store) =>
  (next: (arg0: Action) => void) =>
  async (action: Action): Promise<void> => {
    next(action);

    if (!MAP.size) {
      const ctx: Context = {
        store,
        config: CONFIG,
        services: { LoggerService, ExchangeRatesService, LocalStorageService },
      };

      MAP.set(ApiActionType.GET_EXCHANGE_RATES, getExchangeRates(ctx));
    }

    if (MAP.has(action.type)) MAP.get(action.type)?.(action);

    // eslint-disable-next-line no-console -- TEMP
    console.log("API Middleware", action);
  };
